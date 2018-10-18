/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : fem

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2018-10-18 17:49:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for fem_dict
-- ----------------------------
DROP TABLE IF EXISTS `fem_dict`;
CREATE TABLE `fem_dict` (
  `id` varchar(32) NOT NULL COMMENT '主键',
  `value` varchar(100) DEFAULT NULL COMMENT '数据值',
  `label` varchar(100) DEFAULT NULL COMMENT '标签名',
  `type` varchar(2) DEFAULT NULL COMMENT '类型',
  `desc` varchar(255) DEFAULT NULL COMMENT '描述',
  `sort` decimal(10,0) DEFAULT NULL COMMENT '排序',
  `parent_id` varchar(32) DEFAULT NULL COMMENT '父级编号',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字典管理';

-- ----------------------------
-- Table structure for fem_employee
-- ----------------------------
DROP TABLE IF EXISTS `fem_employee`;
CREATE TABLE `fem_employee` (
  `id` varchar(32) NOT NULL COMMENT '主键',
  `name` varchar(30) DEFAULT NULL COMMENT '姓名',
  `account` varchar(20) DEFAULT NULL COMMENT '账号',
  `password` varchar(32) DEFAULT NULL COMMENT '密码',
  `icon` varchar(255) DEFAULT NULL COMMENT '头像',
  `group` varchar(32) DEFAULT NULL COMMENT '小组：字典维护',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='人员信息';

-- ----------------------------
-- Table structure for fem_task
-- ----------------------------
DROP TABLE IF EXISTS `fem_task`;
CREATE TABLE `fem_task` (
  `id` varchar(32) NOT NULL COMMENT '主键',
  `project` varchar(32) DEFAULT NULL COMMENT '项目',
  `module` varchar(100) DEFAULT NULL COMMENT '模块',
  `developer` varchar(32) DEFAULT NULL COMMENT '开发者',
  `level` varchar(32) DEFAULT NULL COMMENT '优先级',
  `task_desc` varchar(255) DEFAULT NULL COMMENT '任务描述',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `plan_start_time` datetime DEFAULT NULL COMMENT '计划开始时间',
  `plan_end_time` datetime DEFAULT NULL COMMENT '计划完成时间',
  `real_end_time` datetime DEFAULT NULL COMMENT '实际完成时间',
  `remarks` varchar(255) DEFAULT NULL COMMENT '备注',
  `state` varchar(1) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='任务信息';
