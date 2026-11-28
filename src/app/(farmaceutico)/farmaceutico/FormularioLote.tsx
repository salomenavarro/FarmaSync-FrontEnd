"use client";

import { useRef, useState } from "react";
import {
  Camera,
  CheckCircle2,
  Minus,
  Package,
  Plus,
  ScanBarcode,
  XCircle,
} from "lucide-react";
import { farmaciaService } from "@/features/farmacia/services/farmacia.service";

// Estilo de foco visible para accesibilidad con teclado.
const FOCO =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0755D8]";

interface FormularioLoteProps {
  sedeId?: number;
  onLoteRegistrado?: () => void | Promise<void>;
}

export default function FormularioLote({
  sedeId,
  onLoteRegistrado,
}: FormularioLoteProps) {
  // Referencia al input de EAN-13 para enfocarlo rápido al escanear.
  const eanInputRef = useRef<HTMLInputElement | null>(null);
  // Referencia al video cuando se usa la cámara del dispositivo para leer códigos.
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Referencia al stream activo para detener la cámara al terminar.
  const streamRef = useRef<MediaStream | null>(null);

  const [codigo, setCodigo] = useState("");
  const [cantidad, setCantidad] = useState(1);
  const [camaraActiva, setCamaraActiva] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [feedback, setFeedback] = useState<{
    tipo: "exito" | "error";
    texto: string;
  } | null>(null);

  // Garantiza que la cantidad nunca sea menor a 1.
  const cambiarCantidad = (nuevo: number) => {
    setCantidad(Math.max(1, Number.isNaN(nuevo) ? 1 : nuevo));
  };

  // Detiene la cámara si estaba encendida.
  const detenerCamara = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCamaraActiva(false);
  };

  // Intenta leer un código de barras con la cámara usando BarcodeDetector;
  // si no está disponible, enfoca el campo para lector USB o ingreso manual.
  const activarEscanerEan = async () => {
    setFeedback(null);
    eanInputRef.current?.focus();

    const BarcodeDetectorClass = (
      window as unknown as {
        BarcodeDetector?: new (opts?: { formats?: string[] }) => {
          detect: (source: HTMLVideoElement) => Promise<Array<{ rawValue?: string }>>;
        };
      }
    ).BarcodeDetector;

    if (
      !BarcodeDetectorClass ||
      typeof navigator === "undefined" ||
      !navigator.mediaDevices?.getUserMedia
    ) {
      setFeedback({
        tipo: "exito",
        texto:
          "Campo listo para pistola lectora EAN-13 o ingreso manual del código.",
      });
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      setCamaraActiva(true);

      // Espera un instante breve para que el elemento <video> monte su ref.
      setTimeout(async () => {
        if (!videoRef.current || !streamRef.current) return;
        videoRef.current.srcObject = streamRef.current;
        await videoRef.current.play();

        const detector = new BarcodeDetectorClass({
          formats: ["ean_13", "ean_8", "code_128", "qr_code"],
        });

        const intervalId = window.setInterval(async () => {
          if (!videoRef.current || !streamRef.current) {
            window.clearInterval(intervalId);
            return;
          }
          try {
            const codigos = await detector.detect(videoRef.current);
            const detectado = codigos[0]?.rawValue?.trim();
            if (detectado) {
              window.clearInterval(intervalId);
              setCodigo(detectado);
              detenerCamara();
              setFeedback({
                tipo: "exito",
                texto: `Código detectado: ${detectado}. Revisa la cantidad y registra el lote.`,
              });
            }
          } catch {
            // Ignora frames sin lectura válida mientras escanea.
          }
        }, 350);

        // Detiene automáticamente el escaneo tras 15 segundos si no lee nada.
        window.setTimeout(() => {
          window.clearInterval(intervalId);
          detenerCamara();
        }, 15000);
      }, 100);
    } catch {
      setFeedback({
        tipo: "exito",
        texto:
          "No se pudo abrir la cámara; puedes escanear con lector USB o escribir el EAN-13.",
      });
    }
  };

  // Envía el lote al backend mediante POST /medicines/lotes/ean.
  const manejarRegistro = async (evento: React.FormEvent) => {
    evento.preventDefault();
    setFeedback(null);

    const codigoLimpio = codigo.trim();
    if (!codigoLimpio) {
      setFeedback({
        tipo: "error",
        texto: "Ingresa o escanea un código EAN-13 o código de medicamento.",
      });
      eanInputRef.current?.focus();
      return;
    }

    setEnviando(true);
    try {
      const resultado = await farmaciaService.ingresarLoteEan({
        codigo: codigoLimpio,
        cantidad,
        sedeId,
      });

      setCodigo("");
      setCantidad(1);
      setFeedback({
        tipo: "exito",
        texto: `Lote registrado: ${resultado.medicamento.nombreGenerico} en ${resultado.sede.nombre}. Stock actual: ${resultado.cantidad} unidades.`,
      });

      if (onLoteRegistrado) {
        await onLoteRegistrado();
      }
    } catch (err: unknown) {
      // Extrae el mensaje del backend (NestJS) si viene en la respuesta HTTP.
      const mensajeApi =
        (err as { response?: { data?: { message?: string | string[] } } })
          ?.response?.data?.message;
      const textoError = Array.isArray(mensajeApi)
        ? mensajeApi.join(", ")
        : mensajeApi ||
          "No se pudo registrar el lote. Verifica el código EAN-13 y tu sesión.";

      setFeedback({
        tipo: "error",
        texto: textoError,
      });
    } finally {
      setEnviando(false);
    }
  };

  return (
    <form className="mt-4 flex flex-col gap-3" onSubmit={manejarRegistro}>
      {/* Botón para activar escáner o enfocar lector de código de barras */}
      <button
        type="button"
        onClick={activarEscanerEan}
        disabled={enviando}
        className={`flex items-center justify-center gap-3 rounded-xl border-2 border-[#8ABBF6] bg-[#E5F1FF] px-4 py-3 text-base font-extrabold text-[#0755D8] transition hover:bg-[#D8E8FF] disabled:opacity-50 ${FOCO}`}
      >
        <ScanBarcode size={26} aria-hidden="true" />
        Escanear EAN-13
      </button>

      {/* Vista previa de cámara solo cuando el usuario activa el escáner */}
      {camaraActiva && (
        <div className="overflow-hidden rounded-xl border border-[#B9C9DE] bg-black p-2">
          <div className="mb-1.5 flex items-center justify-between text-xs text-white">
            <span className="inline-flex items-center gap-1.5 font-semibold">
              <Camera size={14} aria-hidden="true" />
              Apunta la cámara al código de barras...
            </span>
            <button
              type="button"
              onClick={detenerCamara}
              className="rounded bg-white/15 px-2 py-0.5 text-[11px] font-bold hover:bg-white/25"
            >
              Cerrar cámara
            </button>
          </div>
          <video
            ref={videoRef}
            muted
            playsInline
            className="h-40 w-full rounded-lg object-cover"
          />
        </div>
      )}

      {/* Campo del código EAN-13 / código interno y selector de cantidad */}
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
        <div>
          <label
            htmlFor="ean"
            className="text-sm font-bold text-[#14285B]"
          >
            Código / EAN-13
          </label>
          <input
            ref={eanInputRef}
            id="ean"
            name="ean"
            type="text"
            value={codigo}
            onChange={(evento) => setCodigo(evento.target.value)}
            placeholder="Ej. 7501234567890 o MED-001"
            disabled={enviando}
            className={`mt-1 h-11 w-full rounded-xl border border-[#B9C9DE] bg-white px-3 text-sm text-[#14285B] placeholder:text-[#6B7C98] ${FOCO}`}
          />
        </div>

        <div>
          <label
            htmlFor="cantidad"
            className="text-sm font-bold text-[#14285B]"
          >
            Cantidad
          </label>
          <div className="mt-1 flex h-11 items-center overflow-hidden rounded-xl border border-[#B9C9DE] bg-white">
            <button
              type="button"
              aria-label="Disminuir cantidad"
              disabled={enviando}
              onClick={() => cambiarCantidad(cantidad - 1)}
              className={`flex h-full w-10 items-center justify-center bg-[#EAF2FF] text-[#0755D8] transition hover:bg-[#D8E8FF] disabled:opacity-50 ${FOCO}`}
            >
              <Minus size={18} aria-hidden="true" />
            </button>
            <input
              id="cantidad"
              name="cantidad"
              type="number"
              min={1}
              value={cantidad}
              disabled={enviando}
              onChange={(evento) =>
                cambiarCantidad(Number(evento.target.value))
              }
              className={`h-full w-14 text-center text-sm font-bold text-[#14285B] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${FOCO}`}
            />
            <button
              type="button"
              aria-label="Aumentar cantidad"
              disabled={enviando}
              onClick={() => cambiarCantidad(cantidad + 1)}
              className={`flex h-full w-10 items-center justify-center bg-[#EAF2FF] text-[#0755D8] transition hover:bg-[#D8E8FF] disabled:opacity-50 ${FOCO}`}
            >
              <Plus size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Mensaje de confirmación o error del backend */}
      {feedback && (
        <div
          role="status"
          className={`flex items-start gap-2 rounded-xl border px-3 py-2.5 text-xs font-semibold ${
            feedback.tipo === "exito"
              ? "border-[#BFE6D1] bg-[#E4F6EC] text-[#13693D]"
              : "border-[#F5BDBD] bg-[#FDE8E8] text-[#B42318]"
          }`}
        >
          {feedback.tipo === "exito" ? (
            <CheckCircle2 size={16} className="mt-0.5 shrink-0" />
          ) : (
            <XCircle size={16} className="mt-0.5 shrink-0" />
          )}
          <span>{feedback.texto}</span>
        </div>
      )}

      {/* Botón para enviar y registrar el lote */}
      <button
        type="submit"
        disabled={enviando}
        className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0649D8] to-[#0876E9] px-4 py-3.5 text-base font-extrabold text-white shadow-[0_8px_18px_rgba(5,91,210,0.22)] transition hover:brightness-95 disabled:opacity-60 ${FOCO}`}
      >
        <Package size={21} aria-hidden="true" />
        {enviando ? "Registrando lote..." : "Registrar lote"}
      </button>
    </form>
  );
}