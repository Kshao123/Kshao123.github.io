---
title: courseTable -- 可移动的React课程表组件
tags:
  - ReactComponent
url: 79.html
id: 79
categories:
  - JavaScript
date: 2019-03-08 15:29:59
---

Course Table
============

✨ Features
----------

*   可移动的 课程表
*   代码简单，欢迎优化
*   预览链接 [https://Kshao123.github.io](https://Kshao123.github.io)

[![IE / Edge](https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png)](http://godban.github.io/browsers-support-badges/)  
IE / Edge

[![Firefox](https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png)](http://godban.github.io/browsers-support-badges/)  
Firefox

[![Chrome](https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png)](http://godban.github.io/browsers-support-badges/)  
Chrome

[![Safari](https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png)](http://godban.github.io/browsers-support-badges/)  
Safari

[![Opera](https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png)](http://godban.github.io/browsers-support-badges/)  
Opera

[![Electron](https://raw.githubusercontent.com/alrra/browser-logos/master/src/electron/electron_48x48.png)](http://godban.github.io/browsers-support-badges/)  
Electron

IE9, IE10, IE11, Edge

last 2 versions

last 2 versions

last 2 versions

last 2 versions

last 2 versions

📦 Install
----------

    npm i course-table
    npm i course-table -S

🔨 Usage
--------

    import CourseTable from 'course-table';
    
    const courseTables = {
          1: [
            {
              startTime:1551920827000,
              endTime:1551924427000,
              stuNameList: ['123'],
              teaName: '312'
            }
          ]
        };
    
    const handleConfirm = (data,handleOK) => {
        handleOK()
    };
    
    ReactDOM.render(
        <CourseTable 
            courseTables={courseTables}
            handleConfirm={handleConfirm}
        />, 
        mountNode);