const path = require('path');
const fs = require('fs');
const config = require('../config/config');

// 判断文件夹是否存在 如果不存在则创建文件夹
checkDirExist = p => {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p);
  }
};

// 设置文件保存的目录
getUploadDirName = () => {
  const date = new Date();
  let month = Number.parseInt(date.getMonth()) + 1;
  month = month.toString().length > 1 ? month : `0${month}`;
  const dir = `${date.getFullYear()}${month}${date.getDate()}`;
  return dir;
};

// 设置文件名
getUploadFileName = ext => {
  return `${Date.now()}${Number.parseInt(Math.random() * 10000)}.${ext}`;
};

// 获取文件后缀
getUploadFileExt = name => {
  let ext = name.split('.');
  return ext[ext.length - 1];
};

// 获取文件后缀
exports.saveUploadFile = fname => {
  // 临时文件的路径
  const temppath = path.join(__dirname, `../${config.uploadtemp}/${fname}`);
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(temppath)) {
      resolve({ status: 1, message: '文件不存在', data: temppath });
      return;
    }
    // 创建可读流
    const reader = fs.createReadStream(temppath);
    // 目标文件夹
    const _dir = getUploadDirName();
    // 目标目录
    let targetDir = path.join(__dirname, `../${config.uploadpath}/${_dir}`);
    // 创建目标目录
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir);
    }
    // 目标文件全名
    const newFileName = getUploadFileName(getUploadFileExt(fname));
    console.log(path.join(targetDir, newFileName));
    // 创建可写流
    const upStream = fs.createWriteStream(path.join(targetDir, newFileName));
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    // 写入完成回调
    reader.on('end', () => {
      // 删除临时文件(异步)
      fs.unlink(temppath);
      resolve({
        status: 0,
        data: `${_dir}/${newFileName}`
      });
    });
  });
};
