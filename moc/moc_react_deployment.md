部署 React 前端服务，通常有两种主流方式。可以像你熟悉的后端服务一样，通过 systemctl 进行管理；也可以借助高性能的 Nginx 来托管静态文件。

我为你整理了两种方案的详细对比与配置，你可以根据项目实际需求来选择。

🧭 两种方案对比

· 适用场景：内网测试、开发环境分享，或流量不大的简单应用。VS 线上生产环境，追求高性能和稳定性。
· 实现方式：使用 serve 等工具将 build 文件夹作为静态服务器运行。VS 使用高性能的 Nginx/Apache 托管静态文件。
· 服务管理：都可以通过配置 systemd 服务文件，用 systemctl 统一管理。
· 主要挑战：容易疏忽运行环境（如 Node.js）和权限配置。VS 需额外处理 React Router 引发的 404 问题。
· 资源占用：直接跑 Node 进程占用相对较高。VS 占用更低，并发处理能力更强。

我的建议是：如果是线上生产环境，强烈推荐「Nginx 方案」，其性能和稳定性远超 serve。如果只是内部测试、Demo 演示或小流量场景，serve 方案配置简单，足够使用。

---

🛠️ 核心操作步骤

1. 打包 React 项目

在本地项目目录下执行生产环境打包命令，会生成优化后的静态文件目录（默认为 build）：

```bash
npm run build
```

2. 上传文件

将上一步生成的 build 文件夹（或 dist 文件夹）上传至 Linux 服务器，例如放在 /var/www/my-react-app/build。

---

📦 部署方案一：使用 serve 工具管理

安装 serve

由于 React 构建的是静态文件，需要一个简单的 HTTP 服务器来托管它。我们使用小巧的 serve 包，并建议全局安装：

```bash
npm install -g serve
```

编写部署脚本

创建一个启动脚本（例如 start-react.sh）：

```bash
#!/bin/bash
# 切换到你的 React 项目构建目录
cd /var/www/my-react-app
# 使用 serve 启动服务，指定 build 目录和端口
serve -s build -l 8087
```

保存后，赋予执行权限：chmod +x start-react.sh。

创建 systemd 服务文件

创建 /etc/systemd/system/react-frontend.service 服务单元文件：

```ini
[Unit]
Description=React Frontend Application
After=network.target

[Service]
Type=simple
# 推荐使用非 root 用户运行，提高安全性（将 'youruser' 替换为实际用户名）
User=youruser
WorkingDirectory=/var/www/my-react-app
# 执行你的启动脚本
ExecStart=/bin/bash /var/www/my-react-app/start-react.sh
# 设置自动重启策略
Restart=on-failure
RestartSec=10
# 设置环境变量，确保 Node.js 能找到命令路径（根据实际 which serve 结果调整）
Environment="PATH=/usr/bin:/usr/local/bin:/home/youruser/.nvm/versions/node/v18.17.0/bin"

[Install]
WantedBy=multi-user.target
```

注意：请将上述文件内的 youruser 和 Node.js 路径等信息替换为服务器上的实际情况。

启动并验证服务

```bash
sudo systemctl daemon-reload
sudo systemctl enable react-frontend
sudo systemctl start react-frontend
sudo systemctl status react-frontend
```

---

🚀 部署方案二：Nginx 方案

1. 安装并校验 Nginx

```bash
# 安装 Nginx (如 Ubuntu/Debian)
sudo apt update && sudo apt install nginx -y
# 安装后检查版本
nginx -v
# 启动并设置开机自启
sudo systemctl start nginx
sudo systemctl enable nginx
```

安装成功后，通过 curl localhost 或访问服务器 IP 可看到 Nginx 欢迎页。

2. 配置 Nginx 站点

· 创建新的配置文件：sudo vim /etc/nginx/sites-available/react-frontend
· 写入以下配置：

```nginx
server {
    listen 80;
    server_name your_domain_or_IP; # 替换为你的域名或服务器 IP

    root /var/www/my-react-app/build; # 指向你的 React build 文件夹绝对路径
    index index.html;

    location / {
        # 尝试按顺序查找 uri 对应的文件/文件夹，都找不到则返回 index.html
        # 这一行是解决 React Router 刷新页面时 404 问题的关键！[reference:7]
        try_files $uri $uri/ /index.html;
    }

    # 可选：为静态资源设置缓存，提升性能
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

· 启用配置并测试：

```bash
# 建立软链接启用站点
sudo ln -s /etc/nginx/sites-available/react-frontend /etc/nginx/sites-enabled/
# 测试配置文件语法
sudo nginx -t
# 重新加载 Nginx 使配置生效
sudo systemctl reload nginx
```

为什么需要 try_files $uri $uri/ /index.html;？

React 是 单页应用 (SPA)，内部使用 react-router 管理路由（如 /about）。直接刷新页面时，Nginx 会按 /about 路径在服务器找文件导致 404。这条指令的作用是让所有访问路径都兜底返回 index.html，再由 React 在前端接管路由。

---

3. 管理 Nginx 服务

Nginx 本身就是一个系统服务，无需额外配置，直接用 systemctl 命令管理：

```bash
sudo systemctl restart nginx
sudo systemctl reload nginx # 修改配置后推荐使用 reload，更平滑
sudo systemctl status nginx
```

🔧 方案扩展与问题排查

· 部署更新：当项目有更新时，只需重新 npm run build 并将新 build 文件上传覆盖即可。对于 Nginx 方案，直接替换文件无需重启服务；对于 serve 方案，替换后可能需要 sudo systemctl restart react-frontend。
· 端口冲突怎么办？：如果前端端口（如 8087）被占用，可使用 sudo lsof -i :8087 查看占用进程，更换其他端口或调整 serve/Nginx 配置。
· systemctl status 报错排查：使用 sudo journalctl -u react-frontend.service -f 查看实时日志，检查脚本路径是否正确、文件是否有执行权限，并确认 serve 已在全局安装且在 PATH 中。

两种方案各有侧重，如果对细节还有疑问，比如如何配置域名访问，随时可以继续问我。