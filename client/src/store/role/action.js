import * as home from './action-type';

// 保存表单数据 单项
export const saveFormData = (value, datatype) => {
  return {
    type: home.SAVEFORMDATA,
    value,
    datatype
  };
};
// 保存表单数据
export const saveFormDataAll = (value) => {
  return {
    type: home.SAVEFORMDATAALL,
    value
  };
};

// 保存图片地址
export const saveImg = (path) => {
  return {
    type: home.SAVEIMG,
    path
  };
};

// 保存图片地址
export const clearData = () => {
  return {
    type: home.CLEARDATA
  };
};
