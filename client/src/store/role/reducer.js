import * as types from './action-type';

let defaultState = {
  orderSum: '', //金额
  name: '', //姓名
  phoneNo: '', //手机号
  imgpath: '' //图片地址
};
// 首页表单数据
export const formData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case types.SAVEFORMDATA:
      return { ...state, ...{ [action.datatype]: action.value } };
    case types.SAVEFORMDATAALL:
      return { ...state, ...action.value };
    case types.SAVEIMG:
      return { ...state, ...{ imgpath: action.path } };
    case types.CLEARDATA:
      return { ...state, ...defaultState };
    default:
      return state;
  }
};
