const fs = require('fs');
const path = require('path');

// 读取字典数据
const readDictData = () => {
  const filePath = path.join(__dirname, '../../data/dictData.json');
  const data = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(data);
};

// 根据字典代码获取子目录列表
const findByDictCode = (dictCode) => {
  const dictData = readDictData();
  
  // 首先找到对应的父级目录
  const parentDict = dictData.find(item => item.dictCode === dictCode);
  
  if (!parentDict) {
    return null;
  }
  
  // 然后找到所有子目录
  const children = dictData.filter(item => item.parentId === parentDict.id);
  
  return children;
};

module.exports = {
  findByDictCode
};