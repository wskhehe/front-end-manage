import * as types from './action-type';

let defaultState = {
  globalLoading: false, // 全局loading
  menuActive: '', // 侧栏选中
  proData: []
};
// 全局rudex数据
export const globalData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case types.SETLOADING:
      return { ...state, ...{ globalLoading: action.value } };
    case types.SETMENUACTION:
      return { ...state, ...{ menuActive: action.value } };
    case types.GETPRODUCTION:
      return { ...state, ...{ proData: action.data } };
    default:
      return state;
  }
};
