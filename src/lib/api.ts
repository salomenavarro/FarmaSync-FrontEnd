const API_BASE_URL = "http://localhost:3000/api";

// guarda la direccion donde esta el backend en desarrollo 


// Este codigo API es el puente entre el front y el back, va recibir datos del servidor 
// y los va a procesar para poder usarlo en el front

// Pide los datos de forma segura agregando las etiquetas necesarias (headers).
// Espera a que el servidor responda sin congelar la pantalla del usuario (async/await).
// Traduce el formato plano del servidor (JSON) a un objeto que JavaScript q sí entiende.
// Filtra errores para avisar si algo salió mal antes de entregar la información limpia al frontend.


// 1. Declaramos una función asíncrona que va a recibir el endpoint(ruta): string, y cualquier
// información adicional options: RequestInit = {} que puede ser el método o el cuerpo.
// Funciones asíncronas: permiten que el programa ejecute tareas en segundo plano sin bloquear el flujo principal.

async function apiRequest(endpoint: string, options: RequestInit = {}) {

// 2. Declaramos una variable response que va a esperar a que el método fetch termine de pedir los datos 
// al servidor y que nos devuelva una respuesta.

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {

// Spread Operator: toma todas las propiedades que le vayamos a pasar al llamar la función y las copia dentro del fetch
    ...options,
    // Headers: esta etiqueta le dará información extra al servidor sobre la petición que realizamos    
    headers: {
      // Le avisa al servidor que los datos están en formato JSON        
      "Content-Type": "application/json",
      // Si sobreescribo algo en las opciones, se enviará y respetará lo que decidí mandar aquí
      ...options.headers,
    },
  });

  // 3. Declaramos una variable data que espera a que la respuesta del servidor (JSON) se transforme en un objeto de JavaScript usable.

  const data = await response.json();

  // 4. Evaluamos si la respuesta del servidor falló (si response.ok es falso).

  if (!response.ok) {
    throw new Error(data.mensaje || "Error en la petición");
  }
  // 5. Si todo salió bien, retornamos los datos procesados para usarlos en la aplicación.
  return data;
}

// 6. Exportamos la función por defecto para poder importarla y usarla en otros archivos del proyecto.
export default apiRequest; // funcion reutlizable


// Este archivo solo se encarga 

// src/lib/api.ts: Se encarga únicamente 
// del "cómo" comunicarse con el servidor (hacer el fetch, poner cabeceras y gestionar errores HTTP).