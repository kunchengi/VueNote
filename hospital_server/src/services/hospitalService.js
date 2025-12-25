const fs = require('fs');
const path = require('path');

// 引入数据模型
const BookingSchedule = require('../models/bookingScheduleModel');

// 读取医院数据
const readHospitalData = () => {
  const filePath = path.join(__dirname, '../../data/hospital.json');
  
  // 调试：检查文件是否存在
  if (!fs.existsSync(filePath)) {
    console.error(`医院数据文件不存在: ${filePath}`);
    return [];
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    console.log(`成功读取医院数据，数量: ${parsedData.length}`);
    return parsedData;
  } catch (error) {
    console.error(`读取医院数据失败: ${error.message}`);
    return [];
  }
};

// 读取科室数据
const readDepartmentData = () => {
  const filePath = path.join(__dirname, '../../data/department.json');
  
  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    console.error(`科室数据文件不存在: ${filePath}`);
    return [];
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    console.log(`成功读取科室数据，数量: ${parsedData.length}`);
    return parsedData;
  } catch (error) {
    console.error(`读取科室数据失败: ${error.message}`);
    return [];
  }
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

// 根据医院名称模糊查找医院列表
const findByHosname = (hosname) => {
  const hospitalData = readHospitalData();
  
  // 模糊匹配医院名称，不区分大小写
  const filteredData = hospitalData.filter(hospital => 
    hospital.hosname.toLowerCase().includes(hosname.toLowerCase())
  );
  
  return filteredData;
};

// 通过hoscode获取医院详情
const getHospitalByHoscode = (hoscode) => {
  const hospitalData = readHospitalData();
  
  // 根据hoscode查找医院
  const hospital = hospitalData.find(hospital => hospital.hoscode === hoscode);
  
  return hospital;
};

// 根据医院编码获取科室信息
const getDepartmentByHoscode = (hoscode) => {
  // 目前不管hoscode是什么，都返回department.json中的所有科室信息
  const departmentData = readDepartmentData();
  return departmentData;
};

// 获取预约挂号列表
const getBookingScheduleRule = async (page, limit, hoscode, depcode) => {
  // 调试：打印所有传入的参数
  console.log(`获取预约挂号列表 - 传入参数:`);
  console.log(`page: ${page}`);
  console.log(`limit: ${limit}`);
  console.log(`hoscode: ${hoscode}`);
  console.log(`depcode: ${depcode}`);
  
  // 1. 读取医院数据，获取预约周期
  const hospitalData = readHospitalData();
  
  console.log(`Step 1: 读取医院数据成功，数量: ${hospitalData.length}`);
  
  // 调试：打印医院数据的前几条，查看hoscode格式
  console.log(`Step 1: 前3条医院数据的hoscode: ${hospitalData.slice(0, 3).map(h => h.hoscode).join(', ')}`);
  
  // 查找医院
  const hospital = hospitalData.find(hospital => hospital.hoscode === hoscode);
  
  console.log(`Step 1: 医院查找结果: ${JSON.stringify(hospital)}`);
  
  if (!hospital) {
    // 在错误信息中包含更多调试信息
    const availableHoscodes = hospitalData.map(h => h.hoscode).join(', ');
    throw new Error(`医院不存在。传入的hoscode: ${hoscode}，可用的hoscode: ${availableHoscodes}`);
  }
  
  const cycle = hospital.bookingRule?.cycle || 7; // 预约周期，默认7天
  
  // 2. 读取科室数据，获取大科室和小科室名称
  const departmentData = readDepartmentData();
  
  // 递归查找科室
  const findDepartment = (departments, depcode) => {
    for (const dept of departments) {
      if (dept.depcode === depcode) {
        return { dept, isChild: false };
      }
      if (dept.children && dept.children.length > 0) {
        const result = findDepartment(dept.children, depcode);
        if (result) {
          return { dept: result.dept, parent: dept, isChild: true };
        }
      }
    }
    return null;
  };
  
  const departmentResult = findDepartment(departmentData, depcode);
  
  if (!departmentResult) {
    throw new Error('科室不存在');
  }
  
  // 大科室和小科室名称
  const bigname = departmentResult.isChild ? departmentResult.parent.depname : departmentResult.dept.depname;
  const depname = departmentResult.dept.depname;
  
  // 3. 生成从今天开始到预约周期结束的日期列表
  const today = new Date();
  const bookingDates = [];
  
  for (let i = 0; i < cycle; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    bookingDates.push(date.toISOString().split('T')[0]); // 格式：yyyy-MM-dd
  }
  
  // 4. 从数据库中获取对应日期的预约数据
  const existingSchedules = await BookingSchedule.find({
    hoscode,
    depcode,
    workDate: { $in: bookingDates }
  });
  
  // 5. 构建日期到预约数据的映射
  const scheduleMap = new Map();
  existingSchedules.forEach(schedule => {
    scheduleMap.set(schedule.workDate, schedule);
  });
  
  // 6. 处理每个日期，如果没有数据则创建新数据
  const bookingScheduleList = [];
  for (const workDate of bookingDates) {
    let schedule = scheduleMap.get(workDate);
    
    if (!schedule) {
      // 创建新数据
      schedule = new BookingSchedule({
        hoscode,
        depcode,
        workDate,
        docCount: 3,
        reservedNumber: 0,
        availableNumber: 10,
        status: 0
      });
      await schedule.save();
    }
    
    // 添加到结果列表
    bookingScheduleList.push({
      id: schedule._id.toString(),
      workDate: schedule.workDate,
      docCount: schedule.docCount,
      reservedNumber: schedule.reservedNumber,
      availableNumber: schedule.availableNumber,
      status: schedule.status
    });
  }
  
  // 7. 处理分页
  const total = bookingScheduleList.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedList = bookingScheduleList.slice(startIndex, endIndex);
  
  // 8. 构建baseMap
  const baseMap = {
    workDateString: `${today.getFullYear()}年${String(today.getMonth() + 1).padStart(2, '0')}月`,
    releaseTime: hospital.bookingRule?.releaseTime || '08:00',
    stopTime: hospital.bookingRule?.stopTime || '17:00',
    bigname,
    depname: departmentResult.dept.depname,
    hosname: hospital.hosname
  };
  
  // 9. 返回结果
  return {
    total,
    bookingScheduleList: paginatedList,
    baseMap
  };
};

module.exports = {
  getHospitalList,
  findByHosname,
  getHospitalByHoscode,
  getDepartmentByHoscode,
  getBookingScheduleRule
};
