
var multer = require("multer");
var severPath = multer.diskStorage({
    destination:(req, file, path)=> {
    path(null, "public/images");
},
    filename: (req, file, path) => {

        console.log(file, path);

        var newfilename = file.originalname 
            // file.originalname.substring(file.originalname.lastIndexOf("."))

        req["myfilename"] = newfilename
        path(null, newfilename)
}
})
var multer = multer({ storage: severPath })
module.exports = multer;