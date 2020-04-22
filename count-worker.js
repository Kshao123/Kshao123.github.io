self.onmessage = e => {
  fetch(`//localhost:8888/test`, { method: 'post' })
    .then(res => res.json())
    .then(res => {
      console.log(res);
    })
}
