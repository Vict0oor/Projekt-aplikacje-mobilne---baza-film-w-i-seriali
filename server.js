const express = require('express');
const multer = require('multer');
const app = express();
const port = 3000;
const { PATH_TO_AVATARS, PHOTO_SERVER_ADDRESS } = require('./config-server');


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = PATH_TO_AVATARS;
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.use(express.json());

app.post('/images', upload.single('photo'), async (req, res) => {
  try {
    console.log("Zapisano obraz.");
    const url = `${PHOTO_SERVER_ADDRESS}/images/`;
    res.json({ message: 'Zdjęcie odebrane i zapisane na serwerze:', url });
  } catch (error) {
    console.error('Błąd zapisu zdjęcia:', error);
    res.status(500).json({ error: 'Błąd zapisu zdjęcia.' });
  }
});

app.listen(port, () => {
  console.log(`Serwer działa na ${PHOTO_SERVER_ADDRESS}:${port}`);
});