"use client";

import { Search, X } from "lucide-react";

interface MedicamentoSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MedicamentoSearch({
  value,
  onChange,
}: MedicamentoSearchProps) {
  return (
    <div className="w-full">
      <label
        htmlFor="buscar-medicamento"
        className="mb-2 block text-[12px] font-bold text-[#14285B]"
      >
        Buscar medicamento
      </label>

      <div
        className="
          flex h-[46px] items-center gap-3
          rounded-[14px] border border-[#DCE8F7]
          bg-white px-4
          transition-all duration-200
          focus-within:border-[#0876E9]
          focus-within:ring-2 focus-within:ring-[#0876E9]/10
        "
      >
        <Search
          size={19}
          className="shrink-0 text-[#0876E9]"
          aria-hidden="true"
        />

        <input
          id="buscar-medicamento"
          type="search"
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="Buscar por nombre genérico o código..."
          autoComplete="off"
          className="
            min-w-0 flex-1 bg-transparent
            text-[13px] text-[#14285B]
            outline-none
            placeholder:text-[#91A0B5]
            [&::-webkit-search-cancel-button]:hidden
          "
        />

        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange("")}
            aria-label="Limpiar búsqueda"
            title="Limpiar búsqueda"
            className="
              flex h-7 w-7 shrink-0
              items-center justify-center
              rounded-full text-[#71829B]
              transition-colors
              hover:bg-[#EAF3FF]
              hover:text-[#0755D8]
            "
          >
            <X size={17} />
          </button>
        )}
      </div>

      <p className="mt-2 text-[11px] text-[#71829B]">
        Ingresa el nombre genérico o el código del medicamento.
      </p>
    </div>
  );
}