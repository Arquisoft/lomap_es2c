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
        categories: ["Servicio médico", "Agencia", "Aparcamiento", "Banco", "Centro de estética",
            "Gasolinera", "Peluquería", "Servicio de transporte", "Taller"]
    },
    {
        name: "Alojamiento",
        categories: ["Hotel", "Albergue", "Camping", "Motel"]
    },
    {
        name: "Ocio y aire libre",
        categories: ["Club deportivo", "Gimnansio", "Museo", "Biblioteca", "Monumento", "Parque temático", "Espacio natural"]
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
        name: "Otro",
        categories: ["Sin categoría"]
    },
];

export default categories;