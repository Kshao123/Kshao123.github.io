---
title: 在react中使用antd+less+css modules
url: 155.html
id: 155
categories:
  - webpack
date: 2019-03-09 13:56:20
tags:
---

#### 配置less

首先安装less和less-loader

    cnpm i --save-dev less less-loader

然后在webpack.config中配置

    {
      test: /\.less$/,
      use: [
          require.resolve('style-loader'),
          {
              loader: require.resolve('css-loader')
          },
          {
              loader: require.resolve('less-loader'), // compiles Less to CSS
          },
      ],
    },

#### 开启css modules功能

但是如果我想开启css modules功能，使less和css可以模块化，就需要再配置，但是不能全局配置，这样的话会导致antd没有使用css modules模块的框架的样式无法作用。

###### 开启less的css modules功能

     这里我开启自己编写的less文件的css modules功能 除了node_modules库中的less，
    //也就是可以过滤掉antd库中的样式
    {
      test: /\.less$/,
      exclude: [/node_modules/],
      use: [
          require.resolve('style-loader'),
          {
              loader: require.resolve('css-loader'),
              options: {
                  modules: true,
                  localIdentName:"[name]__[local]___[hash:base64:5]"
              },
          },
          {
              loader: require.resolve('less-loader'), // compiles Less to CSS
          },
      ],
    },

###### 开启css的css modules功能

如果想开启css的css modules功能，就比较麻烦点，除了针对css开启css modules，还需要需要针对antd的css 单独写一条loader的规则,不开启 css modules。

     这里设置css开启modules支持,node_modules和antd里面的css不开启
    {
      test: /\.css$/,
      exclude: /node_modules|antd\.css/,
      use: [
          require.resolve('style-loader'),
          {
              loader: require.resolve('css-loader'),
              options: {
                  importLoaders: 1,
                  // 改动
                  modules: true,   // 新增对css modules的支持
                  localIndetName: '[name]__[local]__[hash:base64:5]', //
              },
          },
          {
              loader: require.resolve('postcss-loader'),
              options: {
                  ident: 'postcss',
                  plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                          browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9', // React doesn't support IE8 anyway
                          ],
                          flexbox: 'no-2009',
                      }),
                  ],
              },
          },
      ],
    }

    然后针对node_modules和antd里面的css写编译配置
    {
      test: /\.css$/,
      include: /node_modules|antd\.css/,
      use: [
          require.resolve('style-loader'),
          {
              loader: require.resolve('css-loader'),
              options: {
                  importLoaders: 1,
                  // 改动
                  // modules: true,   // 新增对css modules的支持
                  // localIndetName: '[name]__[local]__[hash:base64:5]', //
              },
          },
          {
              loader: require.resolve('postcss-loader'),
              options: {
                  ident: 'postcss',
                  plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                          browsers: [
                              '>1%',
                              'last 4 versions',
                              'Firefox ESR',
                              'not ie < 9', // React doesn't support IE8 anyway
                          ],
                          flexbox: 'no-2009',
                      }),
                  ],
              },
          },
      ],
    },

> 至此就配置好了开发环境下的所有代码  
> 同样的代码需要在webpack.config.prod，生产环境的webpack里面再配置一次，打包后的文件各种CSS和less文件才会生效。

  
[转自 追风的云月](https://www.jianshu.com/p/51ff1c8be301)