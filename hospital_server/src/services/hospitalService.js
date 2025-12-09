const fs = require('fs');
const path = require('path');

// 读取医院数据
const readHospitalData = () => {
  const filePath = path.join(__dirname, '../../data/hospital.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// 分页获取医院列表
const getHospitalList = (page, limit, filters = {}) => {
  const hospitalData = readHospitalData();
  
  // 应用过滤条件
  let filteredData = hospitalData;
  if (filters.hostype) {
    filteredData = filteredData.filter(hospital => hospital.hostype === filters.hostype);
  }
  if (filters.districtCode) {
    filteredData = filteredData.filter(hospital => hospital.districtCode === filters.districtCode);
  }
  
  const total = filteredData.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  // 获取分页数据
  const paginatedData = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(total / limit);
  
  // 构建响应数据格式
  return {
    content: paginatedData, // 分页数据列表
    pageable: {
      sort: {
        sorted: false,
        unsorted: true,
        empty: true
      },
      offset: startIndex,
      pageSize: limit,
      pageNumber: page - 1,
      paged: true,
      unpaged: false
    },
    totalPages: totalPages, // 总页数
    totalElements: total, // 总元素数
    first: page === 1, // 是否第一页
    last: page >= totalPages, // 是否最后一页
    sort: {
      sorted: false,
      unsorted: true,
      empty: true
    },
    numberOfElements: paginatedData.length, // 当前页元素数
    size: limit, // 每页元素数
    number: page - 1, // 当前页索引（从0开始）
    empty: paginatedData.length === 0 // 是否为空页
  };
};

module.exports = {
  getHospitalList
};
