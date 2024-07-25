// controllers/imageController.js

const { bucket } = require('../config/firebaseConfig');

exports.getImageUrl = async (req, res) => {
 const fileName = req.params.fileName;
 const file = bucket.file(fileName);

 try {
    const [url] = await file.getSignedUrl({
      action: 'read',
      expires: '03-17-2025'
    });
    res.json({ imageUrl: url });
 } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener la URL de la imagen');
 }
};
