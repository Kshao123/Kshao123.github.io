self.onmessage = async e => {
  if (e.data) {
    const countUrl = 'https://1798248453614055.cn-shanghai.fc.aliyuncs.com/2016-08-15/proxy/getBdy-GreetingService-EE494AFDB77E/count-wmask/';
    // const countUrl = 'http://localhost:8000/2016-08-15/proxy/getBdy-GreetingService-EE494AFDB77E/count-wmask';
    await fetch(countUrl, {
      headers: {
        "content-type": "application/json; charset=UTF-8",
      },
      method: 'post',
      body: e.data,
    })
  }
}
