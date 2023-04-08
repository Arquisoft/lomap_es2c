const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "dlemjid7n",
    api_key: "467962783828192",
    api_secret: "b-xgn8LNDXiSUaT-iuX0IQZAZvQ"
});
module.exports={

 uploadImage : async (imagePath:string,name :string):Promise<string> => {

    // Use the uploaded file's name as the asset's public ID and
    // allow overwriting the asset with new versions
    const options = {
        public_id:name,
        unique_filename: false,
        overwrite: true,
    };

    try {
        // Upload the image
        const result = await cloudinary.uploader.upload(imagePath, options);
        console.log(result);
        return result.public_id;
    } catch (error) {
        console.error(error);
    }
},

 getImageURL:async (public_id:string,width:number,height:number):Promise<string>=>{
    const url = cloudinary.url(public_id, {
        width: width,
        height: height,
        Crop: 'fill'
    });
    return url;
}}