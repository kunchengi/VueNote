const hospitalService = require('../services/hospitalService');

// 分页获取医院列表
const getHospitalList = async (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    
    // 获取查询参数
    const hostype = req.query.hostype;
    const districtCode = req.query.districtCode;
    
    // 验证参数 - 如果page不是数字，直接调用医院详情控制器
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      // 如果不是有效的数字分页参数，将请求视为根据医院编码获取详情
      const hoscode = req.params.page;
      return getHospitalByHoscode({ ...req, params: { hoscode } }, res);
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

// 根据医院名称模糊查找医院列表
const findByHosname = async (req, res) => {
  try {
    const hosname = req.params.hosname;
    
    // 验证参数
    if (!hosname || hosname.trim() === '') {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '医院名称不能为空'
      });
    }
    
    const result = await hospitalService.findByHosname(hosname);
    
    res.json({
      code: 200,
      success: true,
      data: result,
      message: '获取医院列表成功'
    });
  } catch (error) {
    console.error('Error in findByHosname:', error);
    res.status(500).json({
      code: 500,
      success: false,
      message: '获取医院列表失败',
      error: error.message
    });
  }
};

// 通过hoscode获取医院详情
const getHospitalByHoscode = async (req, res) => {
  try {
    const hoscode = req.params.hoscode;
    
    // 验证参数
    if (!hoscode || hoscode.trim() === '') {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '医院编码不能为空'
      });
    }
    
    const result = await hospitalService.getHospitalByHoscode(hoscode);
    
    if (!result) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '医院编码不存在'
      });
    }
    
    res.json({
      code: 200,
      success: true,
      data: result,
      message: '获取医院详情成功'
    });
  } catch (error) {
    console.error('Error in getHospitalByHoscode:', error);
    res.status(500).json({
      code: 500,
      success: false,
      message: '获取医院详情失败',
      error: error.message
    });
  }
};

module.exports = {
  getHospitalList,
  findByHosname,
  getHospitalByHoscode
};
