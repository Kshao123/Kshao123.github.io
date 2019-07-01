---
title: Mac + docker 容器搭建本地 gitlab ci runner + ssh | ftp 自动部署
date: 2019-07-01 18:09:24
categories:
  - 其他教程
tags:
  - gitlab
---
#### 安装 docker
> https://www.docker.com/products/docker-toolbox
#### 加速器
> https://dashboard.daocloud.io/mirror

1. 点击立即开始－接入自有主机－我已有一台主机－选择MAC－直接点击
2. 根据步骤 直至控制台显示有你的主机
3. 去镜像仓库搜索 `gitlab-ce`

```
部署镜像可在命令行部署，或者刚刚下载的 Gui 工具内
```
4. 部署好镜像，打开映射的主机端口，会显示重置密码(密码应为 八位+英文字符限制)默认用户名 `root`
5. 安装 runner 镜像，可在 [Daocloud](https://dashboard.daocloud.io/) 中部署到主机
6. 注册runner

```yml
在刚刚安装的 gitlab 中创建项目，在项目内的setting选项选中 Ci/CD

在 Runners 选项中会看到对应的 链接 和 token
```
![image](https://i.loli.net/2019/07/01/5d197ecc3e59810455.png)

7. 注册 runner

```yml
启动 runner 容器，并进入容器

docker exec -it runner bash
退出命令 exit

进入容器输入

gitlab-runner register -n \
   --url http://172.17.0.3/ \
   --registration-token PCfVAC_B_zJWDzz_xxkt \
   --executor docker \
   --description "runner1" \
   --docker-image "node:latest" \
   --clone-url http://172.17.0.3/ 
   
url：gitlab 的域名，docker内为容器的 IP
registration-token： 刚刚复制的 token
executor： 运行环境
description：
clone-url： 很重要，不添加可能会报错如下

fatal: unable to access 'http://gitlab-ci-token:[MASKED]@f96d3c31771a

默认注册输入 gitlab-runner register  是按流程来的有 tag标签
按上面步骤需要在 setting/[CI/CD]/runners 设置 tag
```
###### 设置完成，可在  setting/[CI/CD]/runners 看到 runner
![image](https://img-blog.csdn.net/20170515161632358?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvYWl4aWFveWFuZzE2OA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

8. 配置 ssh mac/Linux 环境

```Python
# 不建议使用 root 账户创建，可能会有各种问题
# 创建账户 kshao1
useradd kshao1
# 修改密码
passwd kshao1

# 直接生成 公私钥 全程回车 免密登陆
ssh-keygen -t rsa || ssh-keygen

# 一般用户会在 home/用户名/.ssh 看到文件密钥文件
# 如果没有以下文件则生成
touch authorized_keys

# 该文件权限必须是 600 路径随意
chmod 600 /root/.ssh/authorized_keys

# 是>>而不是>，双尖括号>>表示像向文件中追加：
cat /root/.ssh/id_rsa.pub >> /root/.ssh/authorized_keys
```
> 细节 https://blog.csdn.net/nahancy/article/details/79059135

###### 使用 shell ssh 密码链接

```
#!/usr/bin/expect -f
set TARGET 119.3.79.171
set USER xxx
set PASSWD xxx
set PORT xxx
set timeout 10



spawn ssh $USER@$TARGET -p $PORT
expect {
    "*yes/no" {send "yes\r"; exp_continue}
    "*password:" {send "$PASSWD\r"}
}
interact
```

9. 配值 .gitlab-ci.yml 文件
###### Lftp 连接虚拟主机
```yml
image: mwienk/docker-lftp:latest

stages:
  - deploy

deploy:
  stage: deploy

  script:
    # 指定目录覆盖上传 (强制更新)
      - ls -la
      - lftp -c "set ftp:ssl-allow no; open -u $FTP_USERNAME,$FTP_PASSWORD $FTP_HOST -p $port;mirror -RLv ./public /gmlh97ux/wwwroot --ignore-time --transfer-all --parallel=50 --exclude-glob .git* --exclude .git/"
  tags:
    # runner 容器标签
    - docker

  only:
    # 仅 master 分支
    - master

```
###### ssh 连接服务器 需要准备好 密钥文件 scp 同理
###### shell文件 可在 yml 中打开 script ./xxx
```bash
#!/bin/sh

# -tt 取消提示
# ./id_rsa1 文件地址
  ssh -tt -i ./id_rsa1 kshao1@119.3.79.170 -p 22  << remotessh
  echo down
  cd /home/kshao1/.ssh
  ls

  exit
remotessh

```
