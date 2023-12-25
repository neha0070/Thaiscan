const express = require('express');
const router = express.Router();
const { upload } = require('../middleware/upload');
const { addDetail, showAddDetail, showLogs, showEditDetail, updateEditDetails, deleteDetail} = require('../controllers/detail');


router.get('/add', showAddDetail);
router.get('/logs', showLogs)
router.get('/edit/:detailId', showEditDetail)

// input image is frontend input image
router.post('/add', upload.single('ipImage'), addDetail);
router.post('/edit/:detailId', updateEditDetails);
router.get('/delete/:detailId', deleteDetail);

module.exports = router;