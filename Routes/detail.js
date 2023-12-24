const router = express.Router();

const { addDetail, editDetail, deleteDetail } = require('../controllers/detail');

router.post('/add', upload.single('inputImage'), addDetail);
router.post('/edit/:recordId', editDetail);
router.get('/delete/:recordId', deleteDetail);

module.exports = router;