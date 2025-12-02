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
        code: 400,
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
      code: 200,
      success: true,
      data: {
        content: paginatedData,// 分页数据列表
        // 分页信息
        pageable: {

        },
        // 总页数
        totalPages: Math.ceil(total / limit),
        // 总元素数
        totalElements: total,
        // 是否第一页
        first: page === 1,
        // 是否最后一页
        last: page >= Math.ceil(total / limit),
        // 排序信息
        sort: {
        },
        // 当前页元素数
        numberOfElements: paginatedData.length,
        // 每页元素数
        size: limit,
        // 当前页索引（从0开始）
        number: page - 1,
        // 是否为空页
        empty: paginatedData.length === 0,
      },
      message: '获取医院列表成功'
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      code: 500,
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
