const hospitalService = require('../services/hospitalService');

// 分页获取医院列表
const getHospitalList = async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    
    // 验证参数
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '页码和每页数量必须是正整数'
      });
    }
    
    const result = await hospitalService.getHospitalList(page, limit);
    
    res.json({
      code: 200,
      success: true,
      data: result,
      message: '获取医院列表成功'
    });
  } catch (error) {
    console.error('Error in getHospitalList:', error);
    res.status(500).json({
      code: 500,
      success: false,
      message: '获取医院列表失败',
      error: error.message
    });
  }
};

module.exports = {
  getHospitalList
};
