const express = require('express');
const patientController = require('../controllers/patientController');
const verifyToken = require('../middleware/authMiddleware');

const router = express.Router();

// 保存（添加）就诊人信息
router.post('/save', verifyToken, patientController.savePatientInfo);

// 删除就诊人信息
router.delete('/:id', verifyToken, patientController.deletePatientInfo);

// 更新就诊人信息
router.put('/update', verifyToken, patientController.updatePatientInfo);

// 获取账号下的所有就诊人信息
router.get('/findAll', verifyToken, patientController.getAllPatientInfo);

// 获取就诊人信息
router.get('/:id', verifyToken, patientController.getPatientInfo);

module.exports = router;
