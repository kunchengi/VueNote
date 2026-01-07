const hospitalService = require('../services/hospitalService');
const fs = require('fs');
const path = require('path');

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

// 通过文件名获取文件内容
const getArticleByFilename = (req, res) => {
  try {
    const filename = req.params.filename;
    
    // 验证参数
    if (!filename || filename.trim() === '') {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '文件名不能为空'
      });
    }
    
    // 构建文件路径
    const filePath = path.join(__dirname, '../../data/article', filename);
    
    // 检查文件是否存在
    if (!fs.existsSync(filePath)) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '文件不存在'
      });
    }
    
    // 读取文件内容
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // 设置响应头为HTML
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.send(fileContent);
  } catch (error) {
    console.error('Error in getArticleByFilename:', error);
    res.status(500).json({
      code: 500,
      success: false,
      message: '读取文件失败',
      error: error.message
    });
  }
};

// 根据医院编码获取科室信息
const getDepartmentByHoscode = async (req, res) => {
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
    
    const result = await hospitalService.getDepartmentByHoscode(hoscode);
    
    res.json({
      code: 200,
      success: true,
      data: result,
      message: '获取医院科室成功'
    });
  } catch (error) {
    console.error('Error in getDepartmentByHoscode:', error);
    res.status(400).json({
      code: 400,
      success: false,
      message: '获取医院科室失败'
    });
  }
};

// 获取医院预约挂号列表
const getBookingScheduleRule = async (req, res) => {
  try {
    // 获取查询参数
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const hoscode = req.query.hoscode;
    const depcode = req.query.depcode;
    
    // 验证参数
    if (!hoscode || !depcode) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '医院编码和科室编码不能为空'
      });
    }
    
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '页码和每页数量必须为正整数'
      });
    }
    
    // 调用服务层获取数据
    const result = await hospitalService.getBookingScheduleRule(page, limit, hoscode, depcode);
    
    res.json({
      code: 200,
      success: true,
      data: result,
      message: '获取医院预约挂号列表成功'
    });
  } catch (error) {
    console.error('Error in getBookingScheduleRule:', error);
    res.status(400).json({
      code: 400,
      success: false,
      message: error.message, // 返回详细错误信息
      error: error.stack
    });
  }
};

// 获取科室对应日期的医生排班信息
const findScheduleList = async (req, res) => {
  try {
    // 获取查询参数
    const hoscode = req.query.hoscode;
    const depcode = req.query.depcode;
    const workDate = req.query.workDate;
    
    // 验证参数
    if (!hoscode || !depcode || !workDate) {
      return res.status(400).json({
        code: 400,
        success: false,
        message: '医院编码、科室编码和日期不能为空'
      });
    }
    
    // 调用服务层获取数据
    const result = await hospitalService.findScheduleList(hoscode, depcode, workDate);
    
    res.json({
      code: 200,
      success: true,
      data: result,
      message: '获取医院预约挂号列表成功'
    });
  } catch (error) {
    console.error('Error in findScheduleList:', error.message);
    res.status(400).json({
      code: 400,
      success: false,
      message: '获取排班信息失败'
    });
  }
};

module.exports = {
  getHospitalList,
  findByHosname,
  getHospitalByHoscode,
  getArticleByFilename,
  getDepartmentByHoscode,
  getBookingScheduleRule,
  findScheduleList
};
