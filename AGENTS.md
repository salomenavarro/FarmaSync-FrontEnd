# Frontend FarmaSync

- Stack: React sobre Next.js, TypeScript, Axios, Zustand, Shadcn/UI, React Hook Form y Zod.
- Flujo obligatorio: componente → hook → service → Axios → API.
- Los componentes no llaman Axios/fetch ni contienen reglas de negocio.
- Zustand se reserva para estado cliente global; no duplicar estado remoto ni guardar secretos.
- Formularios: React Hook Form + schemas Zod.
- Mantener accesibilidad, responsive desde 360 px y TypeScript estricto.
