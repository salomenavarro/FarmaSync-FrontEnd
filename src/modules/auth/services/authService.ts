// 1. Importamos el puente de peticiones HTTP desde nuestro lib/api.ts
import apiRequest from "@/lib/api";

// 2. Definimos las reglas (interfaces) de TypeScript 
// para asegurar que el frontend envíe los datos exactos que el backend necesita.

// Requerimientos basicamente para registrar o loguear un paciente

interface RegisterData {
  nombre_completo: string;
  numero_documento: string;
  correo: string;
  telefono: string;
  password: string;
}

interface LoginData {
  numero_documento: string;
  password: string;
}

// 3. Función para ENVIAR los datos del formulario de registro, agregando automáticamente el rol de Paciente (role_id: 1).

// Registrar un nuevo usuario (siempre como paciente, role_id fijo)
export async function registrar(data: RegisterData) { // exportamos esta funcion para q sea utilizable en el front
  return apiRequest("/auth/register", { // y cuando responda (Return) va a devolver el resultado final a la pantalla (front) que la llamo
    method: "POST", // Con este metodo Le avisa a la funcion q vamos a enviar datos nuevos para q el servidor los guarde en DB
    body: JSON.stringify({ // el JSON va agarrar el objeto (estructura de datos) q esta en JS y lo va convertir en una cadena JSON
      ...data, // con el spread va tomar todos lo datos que el usuario escribe en el registro y le agregue a TODOS el role de paciente
      role_id: 1, // Paciente por defecto
    }),
  });
}

// 3. Función para ENVIAR los datos del formulario de registro, agregando automáticamente el rol de Paciente (role_id: 1).

// Iniciar sesión
export async function login(data: LoginData) { // se exporta la funcion para q sea reutilizables
  return apiRequest("/auth/login", { // Cuando retorne va a mos el resultado en la pantalla de front
    method: "POST", // Enviamos datos para q el servidor lo compare y veas quien es
    body: JSON.stringify(data),
  });
}


// esta carpeta contiene la logica de negocio va utilizar a lib/api.ts para ejecutar acciones!!