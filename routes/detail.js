const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const { addDetail, editDetail, deleteDetail } = require('../controllers/detail');


// input image is frontend input image
router.post('/add', upload.single('ipImage'), addDetail);
router.post('/edit/:recordId', editDetail);
router.get('/delete/:recordId', deleteDetail);

module.exports = router;