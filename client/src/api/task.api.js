import baseApi from './base.api';

let api = { ...baseApi };

// 查询全部任务列表
api.getTaskList = '/task/getTaskList';

export default api;
