const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
    cloud_name: 'dsiawbmn8',
    api_key: '284229214228359',
    api_secret: '1DmWr2gEMDQmG5rJR424omYZnHE',
    secure: true
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        allowed_formats: ['jpg', 'png', 'jpeg']
    }
});
const upload = multer({ storage });

module.exports = upload;