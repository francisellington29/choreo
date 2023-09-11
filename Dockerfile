FROM node:latest

# 设置工作目录
WORKDIR /home/choreouser

# 将应用程序文件复制到容器中
COPY . /home/choreouser/



RUN apt-get update &&\
    npm install -r package.json &&\
    addgroup --gid 10001 choreo &&\
    adduser --disabled-password  --no-create-home --uid 10001 --ingroup choreo choreouser &&\
    usermod -aG sudo choreouser

# 设置默认的命令，即启动应用程序
ENTRYPOINT [ "node", "app.js" ]

USER 10001
