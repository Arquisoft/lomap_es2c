import { CloudinaryImage, URLConfig, Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";

export function loadImage(imageUrl: string): CloudinaryImage {

    if (imageUrl) {
        if (imageUrl.includes("cloudinary")) {
            let url = imageUrl.split("/");
            console.log(url[3])

            const cld = new Cloudinary({
                cloud: {
                    cloudName: url[3],

                },
                url: {
                    secure: true
                }
            });
            return cld.image(url[7]).resize(thumbnail().width(150).height(150));

        } else {
            return null;
        }
    }
}