const path = require('path');
const Image = require('../Model/Image');
const multer = require('multer');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const imageTypeValidation = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Only .png, .jpg, .jpeg,  format allowed!"));
        }
    }
}).single('image');

function renderImageUploadPage(req, res) {
    res.sendFile(path.join(__dirname, '..', 'view', 'imageUpload.html'));
}


function handleImageUpload(req, res) {
    imageTypeValidation(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).send(err.message);
        }else if (err) {
            return res.status(500).send('Error uploading image.');
        }if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }
        const imageName = req.file.originalname;
        const imageType = req.file.mimetype.split('/');
        const imagePath = req.file.path;
        Image.insertImage(imageName, imageType, imagePath, (err, result) => {
            if (err) {
                return res.status(500).send('Error inserting image into database.');
            }
            res.status(200).send('Image uploaded successfully.');
        });
    });
}

module.exports = {
    renderImageUploadPage,
    handleImageUpload
};