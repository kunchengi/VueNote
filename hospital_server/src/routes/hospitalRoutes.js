const express = require('express');
const hospitalController = require('../controllers/hospitalController');

const router = express.Router();

// 分页获取医院列表
router.get('/:page/:limit', hospitalController.getHospitalList);

module.exports = router;
