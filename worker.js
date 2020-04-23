self.onmessage = e => {
  if (e.data) {
    // count2aili
    fetch(`https://1798248453614055.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/getBdy-GreetingService-EE494AFDB77E/wmask/`, { method: 'post', body: e.data })
  }
}
