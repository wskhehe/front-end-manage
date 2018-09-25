import baseApi from './base.api';

let api = { ...baseApi };

// 查询字典列表
api.getDict = '/setting/getDict';

export default api;
