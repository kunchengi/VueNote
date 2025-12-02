const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

// 读取医院数据
const getHospitalData = () => {
  const filePath = path.join(__dirname, 'data', 'hospital.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// 分页获取医院列表接口
app.get('/api/hosp/hospital/:page/:limit', (req, res) => {
  try {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    
    // 验证参数
    if (isNaN(page) || isNaN(limit) || page < 1 || limit < 1) {
      return res.status(400).json({
        success: false,
        message: '页码和每页数量必须是正整数'
      });
    }
    
    const hospitalData = getHospitalData();
    const total = hospitalData.length;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    
    // 获取分页数据
    const paginatedData = hospitalData.slice(startIndex, endIndex);
    
    res.json({
      success: true,
      data: {
        list: paginatedData,
        total: total,
        page: page,
        limit: limit,
        pages: Math.ceil(total / limit)
      },
      message: '获取医院列表成功'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      message: '获取医院列表失败',
      error: error.message
    });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
