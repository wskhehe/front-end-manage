import * as home from './action-type';

let defaultState = {
  globalLoading: false, // 全局loading
  proData: []
};
// 全局rudex数据
export const globalData = (state = defaultState, action = {}) => {
  switch (action.type) {
    case home.SETLOADING:
      return { ...state, ...{ globalLoading: action.value } };
    case home.GETPRODUCTION:
      return { ...state, ...{ proData: action.data } };
    default:
      return state;
  }
};
