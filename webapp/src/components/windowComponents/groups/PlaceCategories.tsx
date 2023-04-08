type PlaceCategory = {
    name: string,
    categories: string[]
}
const categories: PlaceCategory[] = [
    {
       name: "Gastronomía",
       categories: ["Bar", "Restaurante", "Cafetería", "Club nocturno", "Heladería"] 
    },
    {
        name: "Compras",
        categories: ["Centro comercial", "Librería", "Estanco", "Joyería", "Mercado", "Panadería", "Farmacia", "Floristería", 
                        "Supermercado", "Tienda de alimentos", "Tienda"] 
    },
    {
        name: "Servicios",
        categories: ["Servicio médico", "Agencia de viajes", "Agencia inmobiliaria", "Aparcamiento", "Banco", "Barbería", 
                        "Cajero automático", "Centro de estética", "Gasolinera", "Peluquería", "Servicio de transporte", 
                        "Taller de reparación"] 
    },
    {
        name: "Alojamiento",
        categories: ["Hotel", "Albergue", "Camping", "Motel"] 
    },
    {
        name: "Ocio y aire libre",
        categories: ["Club deportivo", "Gimnansio", "Museo", "Biblioteca", "Monumento", "Parque temático", "Acuario", "Casino",
            "Galería de arte", "Parque", "Playa", "Montaña", "Lago", "Reserva natural", "Zoológico", "Jardín botánico"] 
    },
    {
        name: "Religión",
        categories: ["Lugar de culto", "Iglesia", "Santuario", "Templo"] 
    },
    {
        name: "Oficinas e industria",
        categories: ["Empresa", "Oficina", "Almacén", "OSAL", "Fábrica",] 
    },
    {
        name: "Educación",
        categories: ["Autoescuela", "Centro de educación preescolar", "Centro de educación primaria", "Centro educativo",
                        "Centro de educación secundaria", "Instituto", "Formación profesional", "Jardín de infancia", "Universidad"] 
    },
];

export default categories;