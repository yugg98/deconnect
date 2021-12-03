const express = require('express');
const {getShorts,setShorts} = require('../controllers/shortController')

const router = express.Router();

router.route('/getShorts').get(getShorts)
router.route('/setShorts').post(setShorts)
module.exports = router;
