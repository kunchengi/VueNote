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

// 读取医生数据
const readDoctorData = () => {
  const filePath = path.join(__dirname, '../../data/doctorData.json');
  
  // 检查文件是否存在
  if (!fs.existsSync(filePath)) {
    console.error(`医生数据文件不存在: ${filePath}`);
    return [];
  }
  
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
    console.log(`成功读取医生数据，数量: ${parsedData.length}`);
    return parsedData;
  } catch (error) {
    console.error(`读取医生数据失败: ${error.message}`);
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
  const releaseTime = hospital.bookingRule?.releaseTime || '08:00'; // 挂号开始时间
  const stopTime = hospital.bookingRule?.stopTime || '17:00'; // 挂号结束时间
  
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
  
  // 3. 生成从今天开始到预约周期结束+1天的日期列表
  const today = new Date();
  const bookingDates = [];
  
  for (let i = 0; i < cycle + 1; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    bookingDates.push(date.toISOString().split('T')[0]); // 格式：yyyy-MM-dd
  }
  
  // 3.5 读取医生数据，用于计算每个日期的值班医生数量
  const doctorData = readDoctorData();
  
  // 根据日期获取星期几（0-6，周日到周六）
  const getDayOfWeek = (dateStr) => {
    const date = new Date(dateStr);
    return date.getDay();
  };
  
  // 根据日期和科室代码计算值班医生数量
  const getDocCountForDate = (workDate, depcode) => {
    const dayOfWeek = getDayOfWeek(workDate);
    const doctorsOnDuty = doctorData.filter(doctor => 
      doctor.depcode === depcode && 
      doctor.param.weekType && 
      doctor.param.weekType.includes(dayOfWeek)
    );
    return doctorsOnDuty.length;
  };
  
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
      const docCount = getDocCountForDate(workDate, depcode);
      const availableNumber = docCount * 5;
      
      schedule = new BookingSchedule({
        hoscode,
        depcode,
        workDate,
        docCount: docCount,
        reservedNumber: 0,
        availableNumber: availableNumber
      });
      await schedule.save();
    }
    
    // 7. 计算status
    let status = 0;
    const currentDate = new Date();
    const scheduleDate = new Date(workDate);
    
    // 计算日期差，只比较日期部分，忽略时间部分
    const currentOnlyDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const scheduleOnlyDate = new Date(scheduleDate.getFullYear(), scheduleDate.getMonth(), scheduleDate.getDate());
    const dateDiff = Math.floor((scheduleOnlyDate - currentOnlyDate) / (1000 * 60 * 60 * 24));
    
    // 将时间字符串转换为分钟数，便于比较
    const timeToMinutes = (timeStr) => {
      const [hours, minutes] = timeStr.split(':').map(Number);
      return hours * 60 + minutes;
    };
    
    const currentTimeMinutes = timeToMinutes(currentDate.toTimeString().slice(0, 5)); // 当前时间，转换为分钟数
    const releaseTimeMinutes = timeToMinutes(releaseTime); // 挂号开始时间，转换为分钟数
    const stopTimeMinutes = timeToMinutes(stopTime); // 挂号结束时间，转换为分钟数
    
    // 重新梳理status判断逻辑
    // status=1的情况：在挂号周期之后，或者在预约挂号周期最后一天且在releaseTime之前
    
    // 规则1：如果是当前日期且已超过挂号结束时间stopTime，则为-1表示停止预约
    if (dateDiff === 0 && currentTimeMinutes > stopTimeMinutes) {
      status = -1;
    } 
    // 规则2：如果是第cycle+1天（挂号周期之后的第一天）
    else if (dateDiff === cycle) {
      // 挂号周期之后的第一天，直接显示即将放号
      status = 1; // 即将放号
    }
    // 规则3：如果在挂号周期内（0到cycle-1天）
    else if (dateDiff >= 0 && dateDiff < cycle) {
      // 检查是否是预约周期的最后一天（第cycle天）
      // 注意：cycle是预约周期，所以第cycle-1天是预约周期的最后一天
      if (dateDiff === cycle - 1) {
        // 预约周期最后一天，且在releaseTime之前，表示即将放号
        if (currentTimeMinutes < releaseTimeMinutes) {
          status = 1; // 即将放号
        } else {
          status = 0; // 可预约
        }
      } else {
        status = 0; // 可预约
      }
    }
    // 规则4：其他情况（理论上不会出现）
    else {
      status = 1; // 即将放号
    }
    
    // 添加到结果列表
    const docCount = getDocCountForDate(workDate, depcode);
    const availableNumber = docCount * 5;
    bookingScheduleList.push({
      id: schedule._id.toString(),
      workDate: schedule.workDate,
      docCount: docCount,
      reservedNumber: schedule.reservedNumber,
      availableNumber: availableNumber,
      status: status // 使用计算得到的status，而不是数据库中的值
    });
  }
  
  // 8. 处理分页
  const total = bookingScheduleList.length;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedList = bookingScheduleList.slice(startIndex, endIndex);
  
  // 9. 构建baseMap
  const baseMap = {
    workDateString: `${today.getFullYear()}年${String(today.getMonth() + 1).padStart(2, '0')}月`,
    releaseTime: releaseTime,
    stopTime: stopTime,
    bigname,
    depname: departmentResult.dept.depname,
    hosname: hospital.hosname
  };
  
  // 10. 返回结果
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
