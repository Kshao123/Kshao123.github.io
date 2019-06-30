---
title: 图片懒加载的两种方法-节流 IntersectionObserver
url: 197.html
id: 197
categories:
  - JavaScript
date: 2019-03-17 18:10:17
tags:
---

**第一种：**

> 以下代码皆在 React 中测试使用

使用 **_window_** 上的 **_onscroll_** 事件，配合封装好的 throttle 节流函数实现图片的懒加载。

render 函数内：

    render() {
        const data = [
          {
            url: 'https://dwz.cn/Jwg1UQEj',
            text: '图片1-1',
          },
          {
            url: 'https://dwz.cn/w8t4A0WD',
            text: '图片1-2',
          },
          {
            url: 'https://dwz.cn/l1nYpL4U',
            text: '图片1-3',
          },
          {
            url: 'https://dwz.cn/2XrYhRBX',
            text: '图片1-4',
          },
          {
            url: 'https://dwz.cn/00pSTOtm',
            text: '图片1-5',
          },
          {
            url: 'https://dwz.cn/Hg1aIh3e',
            text: '图片1-6',
          },
        ];
        return(
          <ul className={styles.list}>
            {Object.keys(data).length ? data.map(item => {
              return (
                <li key={item.url} >
                  <h2>{item.text}</h2>
                  <img className={styles.lazyImg} src='https://dwz.cn/qLQmSywT' _src={item.url} alt={item.text}/>
                </li>
              )
            }) : 'loading'}
          </ul>
        )
      }

componentDidmount 函数内

    // 获取所有的需要懒加载的图片元素
    const imgs = document.querySelectorAll('.'+styles.lazyImg);
    // 首次执行 手动触发滚动事件
    this.lazyLoad(imgs);
    // 节流函数
    const lazyLoad = this.throttle(e => this.lazyLoad(imgs), 400, true);window.onscroll - lazyLoad

lazyLoad 方法

    lazyLoad = (imgs) => {
        imgs.forEach(item => {
          console.log('lazyLoad');
          const top = item.getBoundingClientRect().top;
          if (top < window.innerHeight && item.src !== item.getAttribute('_src')) {
            item.src = item.getAttribute('_src');
          }
        })
      };

// 节流函数的封装  
throttle = (fn, wait, immediate) => {  
  let timer = null;  
  let callNow = immediate;  
  return function() {  
    const args = arguments,  
          that = this;  
    if (callNow) {  
      fn.apply(that, args);  
      callNow = false  
  }  
    if (!timer) {  
      setTimeout(() =\> {  
        fn.apply(that, args);  
        timer = null;  
      }, wait)  
    }  
  }  
};

**第二种**

使用 IntersectionObserver 接口，具体使用方法请去 MDN 查看

    const io = new IntersectionObserver(callback);
     // 获取所有的需要懒加载的图片元素
    const imgs = document.querySelectorAll('.'+styles.lazyImg);
    function callback(entries) {
          entries.forEach((item) => {
            if(item.isIntersecting){
              item.target.src = item.target.getAttribute('_src');
              io.unobserve(item.target)
            }
          })
    }
    imgs.forEach((item)=>{
       io.observe(item)
    })

componentDidmount 函数内

> 本文引荐 https://www.jianshu.com/p/84a86e41eb2b
> 
> IntersectionObserver 亦可以实现 导航栏吸顶效果