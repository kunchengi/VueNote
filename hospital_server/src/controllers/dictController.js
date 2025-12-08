const dictService = require('../services/dictService');

// 根据字典代码获取子目录列表
const findByDictCode = async (req, res) => {
  try {
    const dictCode = req.params.dictCode;
    
    // 调用服务层获取数据
    const result = dictService.findByDictCode(dictCode);
    
    if (!result) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '目录代码不存在'
      });
    }
    
    res.json({
      code: 200,
      success: true,
      data: result,
      message: '获取目录列表成功'
    });
  } catch (error) {
    console.error('Error in findByDictCode:', error);
    res.status(500).json({
      code: 500,
      success: false,
      message: '获取目录列表失败',
      error: error.message
    });
  }
};

module.exports = {
  findByDictCode
};