"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import type { SedeFarmacia } from "../types";

interface MapaSedesProps {
  sedes: SedeFarmacia[];
  userCoords: { lat: number; lng: number } | null;
  sedeActivaId?: string;
  onSeleccionarSede?: (sede: SedeFarmacia) => void;
}

export default function MapaSedes({
  sedes,
  userCoords,
  sedeActivaId,
  onSeleccionarSede,
}: MapaSedesProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<import("leaflet").Map | null>(null);

  useEffect(() => {
    let cancelado = false;

    async function inicializarMapa() {
      if (!mapContainerRef.current || cancelado) return;

      const L = await import("leaflet");

      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }

      const sedesConCoords = sedes.filter(
        (s): s is SedeFarmacia & { latitud: number; longitud: number } =>
          typeof s.latitud === "number" && typeof s.longitud === "number"
      );

      const centroInicial: [number, number] = userCoords
        ? [userCoords.lat, userCoords.lng]
        : sedesConCoords.length > 0
          ? [sedesConCoords[0].latitud, sedesConCoords[0].longitud]
          : [6.29, -75.56];

      const map = L.map(mapContainerRef.current, {
        zoomControl: true,
      }).setView(centroInicial, 12);
      mapInstanceRef.current = map;

      // Estilo claro minimalista (tipo Airbnb / Uber)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
        maxZoom: 19,
        className: "saturate-[0.65] brightness-[1.03] contrast-[0.95]",
      }).addTo(map);

      const bounds = L.latLngBounds([]);

      if (userCoords) {
        const userIcon = L.divIcon({
          className: "",
          html: `<div style="width:16px;height:16px;border-radius:9999px;background:#0755D8;border:3px solid #ffffff;box-shadow:0 0 0 5px rgba(7,85,216,0.25);"></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        L.marker([userCoords.lat, userCoords.lng], { icon: userIcon })
          .addTo(map)
          .bindPopup("<strong>Tu ubicación actual</strong>");

        bounds.extend([userCoords.lat, userCoords.lng]);
      }

      for (const sede of sedesConCoords) {
        const esActiva = sede.id === sedeActivaId;
        const nombreCorto = sede.nombre.replace(/^FarmaSync\s+/i, "");
        const kmBadge =
          typeof sede.distanciaKm === "number"
            ? ` · ${sede.distanciaKm.toFixed(1)} km`
            : "";

        const sedeIcon = L.divIcon({
          className: "",
          html: `<div style="
            display:inline-flex;
            align-items:center;
            white-space:nowrap;
            padding:5px 10px;
            border-radius:9999px;
            background:${esActiva ? "#0755D8" : "#14285B"};
            color:#ffffff;
            font-size:11px;
            font-weight:700;
            border:2px solid #ffffff;
            box-shadow:0 4px 12px rgba(20,40,91,0.28);
            cursor:pointer;
          ">${nombreCorto}${kmBadge}</div>`,
          iconSize: [140, 28],
          iconAnchor: [70, 14],
        });

        const marker = L.marker([sede.latitud, sede.longitud], {
          icon: sedeIcon,
        })
          .addTo(map)
          .bindPopup(
            `<div style="font-size:12px;line-height:1.45;">
              <strong style="color:#14285B;">${sede.nombre}</strong><br/>
              <span style="color:#62748E;">${sede.ciudad} · ${sede.zona}</span>
              ${sede.direccion ? `<br/><span>${sede.direccion}</span>` : ""}
              ${
                typeof sede.distanciaKm === "number"
                  ? `<br/><span style="color:#0755D8;font-weight:700;">A ${sede.distanciaKm.toFixed(1)} km de ti</span>`
                  : ""
              }
            </div>`
          );

        if (onSeleccionarSede) {
          marker.on("click", () => onSeleccionarSede(sede));
        }

        bounds.extend([sede.latitud, sede.longitud]);
      }

      if (bounds.isValid()) {
        map.fitBounds(bounds, { padding: [55, 55], maxZoom: 14 });
      }
    }

    inicializarMapa();

    return () => {
      cancelado = true;
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [sedes, userCoords, sedeActivaId, onSeleccionarSede]);

  return (
    <div className="overflow-hidden rounded-[20px] border border-[#DFE9F6] bg-white p-3 shadow-sm">
      <div className="mb-2.5 flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-3 text-[11px] font-bold text-[#14285B]">
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#0755D8]" />
            Tú
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#14285B]" />
            Sedes ({sedes.length})
          </span>
        </div>
        <span className="text-[11px] text-[#71829B]">
          Pulsa una sede para filtrar
        </span>
      </div>

      <div
        ref={mapContainerRef}
        className="z-0 h-[520px] w-full rounded-[14px]"
      />
    </div>
  );
}