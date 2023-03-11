
class Place {
    name: String
    street: String
    postalcode: String
    city: String
    country: String
    coordinates: String
    review: String
    score: String
    image: String

    constructor(name: String, street: String, postalcode: String, city: String, country: String, coordinates: String, review: String, score: String, image: String) {
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