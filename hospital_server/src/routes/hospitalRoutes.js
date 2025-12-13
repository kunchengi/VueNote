const express = require('express');
const hospitalController = require('../controllers/hospitalController');

const router = express.Router();

// 1. 医院名称模糊查找 - 最具体的路由
router.get('/findByHosname/:hosname', hospitalController.findByHosname);

// 2. 单个路径段路由 - 处理根据医院编码获取医院详情
router.get('/:hoscode', hospitalController.getHospitalByHoscode);

// 3. 两个路径段路由 - 处理旧版分页请求
router.get('/:page/:limit', hospitalController.getHospitalList);

module.exports = router;
