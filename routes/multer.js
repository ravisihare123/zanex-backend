var multer = require("multer");
var severPath = multer.diskStorage({
  destination: (req, file, path) => {
    path(null, "public/images");
  },
  filename: (req, file, path) => {
    console.log(file, path);

    var newfilename = file.originalname;
    // file.originalname.substring(file.originalname.lastIndexOf("."))
    req["myfilename"] = newfilename
    req[file.fieldname] = newfilename;

    path(null, newfilename);
  },
});
// const fileStorage = multer.diskStorage({
//   destination: (req, file, path) => {
//     // // setting destination of uploading files
//     // if (file.fieldname === "resume") {
//     //   // if uploading resume
//     //   path(null, "resumes");
//     // } else {
//     //   // else uploading image
//     //   path(null, "public/images");
//     //     }
//         path(null, "public/images");

//   },
//   filename: (req, file, path) => {
//     // naming file
//       var multpleimg = file.fieldname + "-" + file.originalname;
//       req["multpleimg"] = multpleimg
//       path(null, multpleimg)
//   },
// });
var multer = multer({ storage: severPath });
module.exports = multer;
