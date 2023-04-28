type PlaceCategory = {
    name: string,
    categories: string[]
}
const categories: PlaceCategory[] = [
    {
        name: "Gastronomía",
        categories: ["Bar", "Restaurante"]
    },
    {
        name: "Compras",
        categories: ["Centro comercial", "Mercado", "Farmacia", "Supermercado", "Tienda"]
    },
    {
        name: "Servicios",
        categories: ["Servicio médico", "Aparcamiento", "Banco",
            "Gasolinera", "Peluquería", "Servicio de transporte", "Estación de policía", "Institución pública"]
    },
    {
        name: "Alojamiento",
        categories: ["Hotel", "Camping"]
    },
    {
        name: "Ocio y aire libre",
        categories: ["Club de deportes", "Museo", "Biblioteca", "Monumento", "Parque temático", "Espacio natural"]
    },
    {
        name: "Religión",
        categories: ["Lugar de culto"]
    },
    {
        name: "Oficinas e industria",
        categories: ["Empresa", "Almacén", "Fábrica",]
    },
    {
        name: "Educación",
        categories: ["Autoescuela", "Centro educativo", "Universidad"]
    },
    {
        name: "¿No encuentras la categoría?",
        categories: ["Otro"]
    },
];

export default categories;