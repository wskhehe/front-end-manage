import * as types from './action-type';
import axios from '@/utils/axios';
import api from '@/api/base.api';

// 设置全局loading
export const setLoading = value => {
  return {
    type: types.SETLOADING,
    value
  };
};
// 设置侧栏选中
export const setMenuAction = value => {
  return {
    type: types.SETMENUACTION,
    value
  };
};
// redux异步
export const saveProduction = () => {
  // 返回函数，异步dispatch
  return async dispatch => {
    try {
      let result = await axios.get(api.mock);
      if (result && result.status === 0) {
        dispatch({
          type: types.GETPRODUCTION,
          data: result.data.list
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
};
