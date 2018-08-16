/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2018/8/10 16:46:47                           */
/*==============================================================*/


drop table if exists fem_dict;

drop table if exists fem_employee;

drop table if exists fem_task;

/*==============================================================*/
/* Table: fem_dict                                              */
/*==============================================================*/
create table fem_dict
(
   id                   varchar(32) not null comment '主键',
   value                varchar(100) comment '数据值',
   label              varchar(100) comment '标签名',
   type                 varchar(2) comment '类型',
   `desc`                varchar(255) comment '描述',
   `sort`                 decimal(10,0) comment '排序',
   parent_id            varchar(32) comment '父级编号',
   remarks              varchar(255) comment '备注',
   primary key (id)
);

alter table fem_dict comment '字典管理';

/*==============================================================*/
/* Table: fem_employee                                          */
/*==============================================================*/
create table fem_employee
(
   id                   varchar(32) not null comment '主键',
   name                 varchar(30) comment '姓名',
   account              varchar(20) comment '账号',
   password             varchar(32) comment '密码',
   icon                 varchar(255) comment '头像',
   `group`                varchar(32) comment '小组：字典维护',
   primary key (id)
);

alter table fem_employee comment '人员信息';

/*==============================================================*/
/* Table: fem_task                                              */
/*==============================================================*/
create table fem_task
(
   id                   varchar(32) not null comment '主键',
   project              varchar(2) comment '项目',
   module               varchar(10) comment '模块',
   developer            varchar(32) comment '开发者',
   level                varchar(1) comment '优先级',
   task_desc            varchar(255) comment '任务描述',
   create_time          datetime comment '创建时间',
   plan_start_time      datetime comment '计划开始时间',
   plan_end_time        datetime comment '计划完成时间',
   real_end_time        datetime comment '实际完成时间',
   remarks              varchar(255) comment '备注',
   state                varchar(1) comment '状态',
   primary key (id)
);

alter table fem_task comment '任务信息';

