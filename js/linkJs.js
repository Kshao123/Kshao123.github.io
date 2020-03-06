// 引入 js
(
  function (window) {
    // 在线聊天、留言工具
    // https://www.tidio.com/panel/tour/code-install
    const tidio = document.createElement('script');
    tidio.src = '//code.tidio.co/55l5jjfkbaab78j17fpfbldcybiixeyi.js';
    document.body.appendChild(tidio);
    console.log('append');
  }
)(this);
