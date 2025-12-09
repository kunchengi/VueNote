const hospitalService = require('../services/hospitalService');

// 分页获取医院列表
const getHospitalList = async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    
    // 获取查询参数
    const hostype = req.query.hostype;
    const districtCode = req.query.districtCode;
    
    // 验证参数
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '页码和每页数量必须是正整数'
      });
    }
    
    // 构建过滤条件
    const filters = {};
    if (hostype) {
      filters.hostype = hostype;
    }
    if (districtCode) {
      filters.districtCode = districtCode;
    }
    
    const result = await hospitalService.getHospitalList(page, limit, filters);
    
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
