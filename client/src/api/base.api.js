// 公用部分api

import config from '@/config/config';
let api = {};

const baseURL = config.baseURL;
api.baseURL = baseURL;

/*----------公共接口----------*/

//mock测试
api.mock = baseURL + '/mock/getlist';

export default api;
