// 扩展脚本

/*
 * 判断IE浏览器版本是否低于IE10
 */
var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
var isOpera = userAgent.indexOf('Opera') > -1; // 判断是否Opera浏览器
var isIE =
  userAgent.indexOf('compatible') > -1 &&
  userAgent.indexOf('MSIE') > -1 &&
  !isOpera; // 判断是否IE浏览器
if (isIE) {
  var reIE = new RegExp('MSIE (\\d+\\.\\d+);');
  reIE.test(userAgent);
  var fIEVersion = parseFloat(RegExp['$1']);
  if (fIEVersion < 10) {
    // alert("您的浏览器版本太低，建议更换chrome或IE10及以上浏览器");
    window.location.href = './static/browser.html';
  }
}
