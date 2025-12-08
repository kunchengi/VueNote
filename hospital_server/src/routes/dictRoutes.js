const express = require('express');
const dictController = require('../controllers/dictController');

const router = express.Router();

// 根据字典代码获取子目录列表
router.get('/findByDictCode/:dictCode', dictController.findByDictCode);

module.exports = router;