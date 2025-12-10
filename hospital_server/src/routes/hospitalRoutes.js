const express = require('express');
const hospitalController = require('../controllers/hospitalController');

const router = express.Router();

// 根据医院名称模糊查找医院列表
router.get('/findByHosname/:hosname', hospitalController.findByHosname);

// 分页获取医院列表
router.get('/:page/:limit', hospitalController.getHospitalList);

module.exports = router;
