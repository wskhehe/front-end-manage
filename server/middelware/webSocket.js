const webSocket = require('ws');
var request = require('request');

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

module.exports = async server => {
  const service = {
    Authorization: 'services',
    clientName: '服务台',
    clientAvatar:
      'https://avatars2.githubusercontent.com/u/25722049?s=400&u=65ec4fdbcb03a163fd111849c23638defcd18854&v=4'
  };

  const wss = new webSocket.Server({ server });

  wss.on('connection', function connection(ws, req) {
    const url = req.url;
    // 服务台在url上带上特殊标识
    if (url.indexOf('client=service') > -1) {
      ws.clientID = service.Authorization;
      ws.clientName = service.clientName;
      ws.clientAvatar = service.clientAvatar;
    } else {
      ws.clientID = req.headers.authorization;
      ws.clientName = decodeURIComponent(req.headers.clientname);
      ws.clientAvatar = decodeURIComponent(req.headers.clientavatar);
    }

    ws.isAlive = true;
    ws.on('pong', heartbeat);

    ws.on('error', function incoming(message) {
      console.log('error: %s', message);
    });

    ws.on('close', function incoming(message) {
      // console.log('close: %s', message);
      ws.terminate(); // 关闭连接
    });

    ws.on('message', function incoming(message) {
      // 收到消息 推送给所有客户端
      wss.clients.forEach(function each(client) {
        if (client.clientID !== ws.clientID) {
          client.send(
            encodeURIComponent(
              JSON.stringify({
                name: ws.clientName,
                avatar: ws.clientAvatar,
                message: message
              })
            )
          );
        }
      });

      // 消息入库
      request(
        {
          url: 'https://webtest1.sijibao.com/OA/intfz/lucklyPerson/saveMessage',
          method: 'POST',
          json: true,
          headers: {
            'content-type': 'application/json'
          },
          body: {
            dateTimes: new Date().getTime(),
            messageText: message,
            openId: ws.clientID
          }
        },
        (error, response, body) => {
          if (error) {
            console.log(error);
          } else {
            if (body.status != 0) {
              // console.log(body);
            } else {
              // console.log(body); // 请求成功的处理逻辑
            }
          }
        }
      );
    });
    // 加入消息 推送给所有客户端
    wss.clients.forEach(function each(client) {
      client.send(
        encodeURIComponent(
          JSON.stringify({
            name: ws.clientName,
            avatar: ws.clientAvatar,
            message: ws.clientName + '已连接'
          })
        )
      );
    });
  });

  // 心跳检测
  const interval = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws.isAlive === false) return ws.terminate();

      ws.isAlive = false;
      ws.ping(noop);
    });
  }, 30000);
};
