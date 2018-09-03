/*
 * 列表页混入对象
 * page: 页码
 * limit: 每页条数
 * tableOptions:工具栏筛选字段
 * sendOptions:发送请求实际字段
 * */
var listMixin = {
    data() {
        return {
            page: 1,
            limit: 20,
            tableOptions: {},
            sendOptions: {},
            firstLoad: true //是否首次加载
        };
    },
    methods: {
        //筛选查询
        search() {
            this.sendOptions = { ...this.tableOptions };
            // 在第一页时直接查询  不在第一页时通过设置currentpage来自动改变数据
            // this.page == 1 ? this.axiosRequest() : (this.page = 1);

            /*
             * 2018年7月31日 14:44:18代码修改 不用再设置currentpage来获取数据
             * element已修复这个问题 currentpage仅响应用户交互 手动设置currentpage不再触发handleCurrentChange事件
             * https://element.faas.ele.me/2.4/#/zh-CN/component/changelog
             * https://github.com/ElemeFE/element/pull/10247
             * 同时导致删除数据不再触发handleCurrentChange 页面需要在删除操作后自行处理
             */
            this.page = 1;
            this.axiosRequest();
        },
        // 分页change
        handleCurrentChange(val) {
            this.axiosRequest({ page: val });
        },
        // 进入页面就立即查询数据的列表  第一次查询没有数据不出现message
        // 如果是进入页面不查询数据的列表 请在页面内data设置firstLoad:false
        checkNodata(response) {
            if (this.firstLoad) {
                this.firstLoad = false;
            } else {
                if (response.data.count == 0) {
                    this.$message.warning('未查询到数据，请重新筛选');
                }
            }
        }
    }
};
export default listMixin;
