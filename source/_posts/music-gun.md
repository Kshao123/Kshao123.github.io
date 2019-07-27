---
title: 滚动歌词
date: 2019-07-02 19:30:37
categories:
  - JavaScript
tags:
  - demo
---
#### 滚动歌词
1. 把获取到的歌词 用换行符 split 分割
2. 使用正则判断并分割出时间和歌词
3. 把正则匹配出的 分、秒、毫秒 转换成秒 做 key 传入 temp 对象，或者 push 数组也可以，没有 key 的排序问题
4. 通过 temp 遍历出 html 元素放入 content
5. 监听 audio 的 [on]timeupdate 事件，关键字 e.target.currentTime 为当前播放时间
6. 根据 时间 找到 匹配的歌词元素，计算元素的 top 与 父元素 top 的差，即为上滚的距离
7. 滚动时给当前 歌词元素 加上 active class 使其突出

###### 获取到的歌词可在 log 里查看

{% raw %}
<style>
    audio {
        width: 300px;
        height: 100px;
      }
    
      .lrc-box {
        margin: 100px auto;
      }
    
      .lrc-wrap {
        margin: auto;
        width: 80%;
        height: 400px;
        background-color: rgba(153, 204, 153, 0.48);
        overflow: hidden;
        padding: 0 15px;
        position: relative;
      }
    
      .lrc-content {
        margin-top: 60px;
        position: absolute;
        text-align: center;
        padding-top: 60px;
        left: 50%;
        transform: translate(-50%, 0);
        transition: all 1s;
      }
    
      .lrc-content p {
        text-align: center;
        transition: all .1s;
        /*transition-delay: .4s;*/
      }
    
      .active {
        color: white;
        background-color: hotpink;
      }
</style>
{% endraw %}
{% raw %}
<div class="lrc-box">
<audio id="musicBtn" style="width: 200px; height: 100px" autoplay controls="controls" src="../assets/music-gun/music.mp3"> </audio>
  <div class="lrc-wrap">
    <div class="lrc-content">

    </div>
  </div>
</div>
{% endraw %}
<script>
const data = {
    music: "[00:01.00]岁月神偷 - 金玟岐\n" +
        "[00:06.00]\n" +
        "[00:07.50]歌词编辑：\n" +
        "[00:12.50]QQ：123123\n" +
        "[00:17.50]\n" +
        "[00:19.04]能够握紧的就别放了\n" +
        "[00:23.09]能够拥抱的就别拉扯\n" +
        "[00:27.22]时间着急的 冲刷着\n" +
        "[00:31.65]剩下了什么\n" +
        "[00:35.18]原谅走过的那些曲折\n" +
        "[00:39.14]原来留下的都是真的\n" +
        "[00:43.22]纵然似梦啊 半醒着\n" +
        "[00:47.35]笑着哭着都快活\n" +
        "[00:51.69]谁让\n" +
        "[00:54.73]时间是让人猝不及防的东西\n" +
        "[00:58.95]晴时有风阴有时雨\n" +
        "[01:02.95]争不过朝夕 又念着往昔\n" +
        "[01:06.93]偷走了青丝却留住一个你\n" +
        "[01:11.00]岁月是一场有去无回的旅行\n" +
        "[01:15.01]好的坏的都是风景\n" +
        "[01:18.98]别怪我贪心 只是不愿醒\n" +
        "[01:22.98]因为你只为你愿和我一起\n" +
        "[01:27.00]看云淡风轻\n" +
        "[01:31.14]\n" +
        "[01:42.91]时间是让人猝不及防的东西\n" +
        "[01:46.92]晴时有风阴有时雨\n" +
        "[01:50.91]争不过朝夕 又念着往昔\n" +
        "[01:54.92]偷走了青丝却留住一个你\n" +
        "[01:58.89]岁月是一场有去无回的旅行\n" +
        "[02:02.88]好的坏的都是风景\n" +
        "[02:06.96]别怪我贪心 只是不愿醒\n" +
        "[02:10.86]因为你只为你愿和我一起\n" +
        "[02:16.32]看云淡风轻\n" +
        "[02:20.07]"
};
console.log(data.music);
const temp = {};
const LRC = data.music;
const matchLrc = LRC.split(/\n/);
const reg = /\[(\d{2}):(\d{2})\.(\d{2})](.*)/;
   
   
for (let i = 0; i < matchLrc.length; i += 1) {
   const item = matchLrc[i];
   // exec 没有匹配返回 null
   const res = reg.exec(item);
   if (! reg) continue;
   const [_, m, s, ms, text] = res;
   // 将他们转成秒 毫秒也可以做秒的四舍五入操作
   // const key = (m * 60) + Math.round(s);
   // - 0 05 - 0 = 5
   // console.log((m * 60) + ((s + '.' + ms) - 0));
   const key = (m * 60) + (s - 0);
   temp[key] = text;
}
   
let html = '';

for (let time in temp) {
   html += `<p time=${time}>${temp[time]}</p>`
}

const lrcContent = document.querySelector('.lrc-content');

lrcContent.innerHTML = html;

const musicBtn = document.getElementById('musicBtn');
let index = -1;
musicBtn.ontimeupdate = e => {
   // 获取秒数 与 dom 元素对应
   // console.log(e.target.currentTime, 'time');
   const key = Math.floor(e.target.currentTime);
   if (! temp[key]) return;
   const p = lrcContent.querySelector(`p[time='${key}']`);
   // 此时的 p top值，大于 content，用 p - content 的 top 值，即为需要移动的距离
   const far = p.offsetTop - lrcContent.offsetTop;
   lrcContent.style.transform = `translate(-50%, -${far}px)`;
   p.classList.add('active');
   if (index > -1 && index !== key) lrcContent.querySelector(`p[time='${index}']`).classList.remove('active');
   index = key;
}

</script>


````javascript
data.music = '歌词'; // 歌词在 log 自行复制
const temp = {};
const LRC = data.music;
const matchLrc = LRC.split(/\n/);
const reg = /\[(\d{2}):(\d{2})\.(\d{2})](.*)/;
   
   
for (let i = 0; i < matchLrc.length; i += 1) {
   const item = matchLrc[i];
   // exec 没有匹配返回 null
   const res = reg.exec(item);
   if (! reg) continue;
   const [_, m, s, ms, text] = res;
   // 将他们转成秒 毫秒也可以做秒的四舍五入操作
   // const key = (m * 60) + Math.round(s);
   // - 0 05 - 0 = 5
   // console.log((m * 60) + ((s + '.' + ms) - 0));
   const key = (m * 60) + (s - 0);
   temp[key] = text;
}
   
let html = '';

for (let time in temp) {
   html += `<p time=${time}>${temp[time]}</p>`
}

const lrcContent = document.querySelector('.lrc-content');

lrcContent.innerHTML = html;

const musicBtn = document.getElementById('musicBtn');
let index = -1;
musicBtn.ontimeupdate = e => {
   // 获取秒数 与 dom 元素对应
   // console.log(e.target.currentTime, 'time');
   const key = Math.floor(e.target.currentTime);
   if (! temp[key]) return;
   const p = lrcContent.querySelector(`p[time='${key}']`);
   // 此时的 p top值，大于 content，用 p - content 的 top 值，即为需要移动的距离
   const far = p.offsetTop - lrcContent.offsetTop;
   lrcContent.style.transform = `translate(-50%, -${far}px)`;
   p.classList.add('active');
   if (index > -1 && index !== key) lrcContent.querySelector(`p[time='${index}']`).classList.remove('active');
   index = key;
}
````


