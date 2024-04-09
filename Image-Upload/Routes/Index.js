const express = require('express');
const router = express.Router();
const ImageController = require('../controller/imageController');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' });

router.get('/', ImageController.renderImageUploadPage);
router.post('/upload', upload.single('image'), ImageController.handleImageUpload);

module.exports = router;