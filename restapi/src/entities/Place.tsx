export { Place }
class Place {
    name: string
    street: string
    postalcode: string
    city: string
    country: string
    coordinates: string
    review: string
    score: string
    image: string

    constructor(name: string, street: string, postalcode: string, city: string, country: string, coordinates: string, review: string, score: string, image: string) {
        this.name = name
        this.street = street
        this.postalcode = postalcode
        this.city = city
        this.country = country
        this.review = review
        this.coordinates = coordinates
        this.score = score
        this.image = image
    }
}