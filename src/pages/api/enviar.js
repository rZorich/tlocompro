export async function POST({ request }) {
  try {
    const formData = await request.formData();

    const data = {
      marca: formData.get("marca"),
      modelo: formData.get("modelo"),
      anio: formData.get("anio"),
      version: formData.get("version"),
      transmision: formData.get("transmision"),
      combustible: formData.get("combustible"),
      kilometraje: formData.get("kilometraje"),
      patente: formData.get("patente"),
      nombre: formData.get("nombre"),
      whatsapp: formData.get("whatsapp"),
      email: formData.get("email"),
      ciudad: formData.get("ciudad"),
      cuandovender: formData.get("cuandovender"),
    };

    // Tu URL del script de Google Apps Script (debe terminar en /exec)
    const endpoint = "https://script.google.com/macros/s/AKfycbytNU6f5GNyXVRHsq95bqkJ-ZrgERJusH9OpufhJs0eRUxdx3NAaGisE9Qw1ndy-RLZRA/exec";

    const response = await fetch(endpoint, {
      method: "POST",
      body: new URLSearchParams(data),
    });

    if (!response.ok) {
      return new Response("Error al guardar en Google Sheets", { status: 500 });
    }

    return new Response("OK");
  } catch (err) {
    return new Response("Error interno: " + err.message, { status: 500 });
  }
}
