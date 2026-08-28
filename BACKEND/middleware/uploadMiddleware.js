const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        if (req.baseUrl.includes("users")) {
            cb(null, "uploads/profiles");
        } else {
            cb(null, "uploads/blogs");
        }

    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() + path.extname(file.originalname);

        cb(null, uniqueName);

    }

});

const fileFilter = (req, file, cb) => {

    const allowedTypes = /jpeg|jpg|png/;

    const ext = path.extname(file.originalname).toLowerCase();

    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, JPEG and PNG files are allowed."));
    }

};

module.exports = multer({
    storage,
    fileFilter
});