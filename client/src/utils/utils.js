/* 业务公用处理脚本 */
import api from '@/api/base.api';
import axios from '@/utils/axios';
import { Message } from 'element-ui';

var utils = {
  href: window.location.href,
  autoHeight: window.innerHeight - 90,
  // 时间相关 时间毫秒叫时间戳  带GTM这种叫标准时间对象 "2018-02-01"叫时间字符串
  // 时间戳转标准时间GTM new Date(val)
  // 时间戳转时间字符串 new Date(val).Format(yyyy-MM-dd) 详见下方extend Date扩展
  // 时间字符串 和标准时间GTM 转时间戳 Date.parse()
  // 时间字符串 如：2018-02-01 请使用2018/02/01 不要使用'-'连接符
  time: function() {
    var date = new Date();
    var y = date.getFullYear();

    var m = date.getMonth() + 1;
    m = m < 10 ? '0' + m : m;

    var d = date.getDate();
    d = d < 10 ? '0' + d : d;

    var h = date.getHours();

    var rtnDate = {};
    rtnDate.y = y;
    rtnDate.m = m;
    rtnDate.d = d;
    rtnDate.h = h;
    rtnDate.monthfirst = y + '-' + m + '-' + '01';
    rtnDate.monthlast = y + '-' + m + '-' + d;
    rtnDate.nowtime = h + ':00';
    rtnDate.nowtimes = h + ':00' + ':00';
    rtnDate.timestart = new Date(y + '-' + m + '-' + '01 00:00:00').getTime(); // 当月第一天 00:00:00
    rtnDate.timeend = new Date(y + '-' + m + '-' + d + ' 00:00:00').getTime(); // 当前日期(当天00：00：00 作为默认显示值使用  请求发送时加上8.64e7)
    rtnDate.oneday = 8.64e7; // 1天的毫秒数86400*1000
    return rtnDate;
  },
  /*
     * 获取地址栏GET参数
     * name 参数名
     */
  getQuery: function(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
  },
  // 设置cookie
  setCookie: function(cname, cvalue, exdays) {
    var d = new Date();
    exdays = exdays || 365;
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = 'expires=' + d.toUTCString();
    document.cookie = cname + '=' + cvalue + '; ' + expires;
  },
  // 获取cookie
  getCookie: function(cname) {
    var name = cname + '=';
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') c = c.substring(1);
      if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
    }
    return '';
  },
  // 清除cookie
  clearCookie: function(name) {
    utils.setCookie(name, '', -1);
  },
  // 打开新的标签页
  openNewtab: function(url) {
    var a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('target', '_blank');
    a.setAttribute('id', 'camnpr');
    document.body.appendChild(a);
    a.click();
  },
  // 设置localStorage数据 item指定项
  setLocalData: function(item, data) {
    if (!item || !data) return false;
    localStorage.setItem(item, JSON.stringify(data));
    return true;
  },
  // 获取localStorage数据 item指定项(如果要获取item值非json对象 请直接localStorage.getItem)
  getLocalData: function(item) {
    if (!item) return '';
    var localdata = localStorage.getItem(item);
    if (localdata === undefined || localdata === null || localdata == '') {
      return '';
    } else {
      try {
        localdata = JSON.parse(localdata);
        return localdata;
      } catch (e) {
        return '';
      }
    }
  },
  // 获取全局配置
  getGlobal: function() {
    var g_config = localStorage.getItem('g_config');
    if (g_config === undefined || g_config === null || g_config == '') {
      return {
        isCollapse: false
      };
    } else {
      try {
        g_config = JSON.parse(g_config);
        return g_config;
      } catch (e) {
        return {
          isCollapse: false
        };
      }
    }
  },
  // 获取企业信息
  getCompany: function() {
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: api.company
      }).then(response => {
        if (response.status == 0) {
          localStorage.setItem(
            'trade_currentData',
            JSON.stringify(response.data)
          );
          resolve(response);
        } else {
          Message.warning(response.messsage);
          reject(response.messsage);
        }
      });
    });
  },
  // 获取字典数据 若不指定key则返回所有字典
  getSysdict: function(key) {
    let url = '',
      params = {};
    if (key) {
      url = api.getSysDict;
      params.key = key;
    } else {
      url = api.getSysDictByTypeList;
    }
    return new Promise((resolve, reject) => {
      axios({
        method: 'GET',
        url: url,
        params: params
      }).then(response => {
        if (response.status == 1) {
          Message.warning(response.messsage);
          reject(response.messsage);
        }
        resolve(response);
      });
    });
  }
};
export default utils;
