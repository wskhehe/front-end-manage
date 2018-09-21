import * as home from './action-type';
// import axios from 'axios';
import axios from '@/utils/axios';
import api from '@/api/base.api';

// 设置全局loading
export const setLoading = value => {
  return {
    type: home.SETLOADING,
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
          type: home.GETPRODUCTION,
          dataList: result.data.list
        });
      }
    } catch (err) {
      console.error(err);
    }
  };
};
