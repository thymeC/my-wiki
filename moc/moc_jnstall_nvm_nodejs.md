方法二是试过的
nvm install 25.3.0 安装指定版本node

在 CentOS 上安装 npm，最推荐通过 NodeSource 官方仓库 或 NVM (Node Version Manager) 这两种方式安装。

🔧 方式一：使用 NodeSource 官方仓库

这是官方推荐的方式，能确保你获得更新、更稳定的 Node.js 版本以用于生产环境。

· 添加 NodeSource 仓库（以 LTS 版本为例）：
  ```bash
  curl -fsSL https://rpm.nodesource.com/setup_lts.x | sudo bash -
  ```
  你可以将 lts 替换为 20.x 或 22.x 等具体版本号。
· 安装 Node.js 和 npm：
  ```bash
  sudo yum install -y nodejs      # CentOS 7 使用 yum
  # 或
  sudo dnf install -y nodejs      # CentOS 8+ 使用 dnf[reference:3]
  ```
· 如果提示“Nothing to do”：请确保系统中的 nodejs 旧包已被完全卸载。

🚀 方式二：使用 NVM (Node Version Manager)

如果你需要在不同项目间切换 Node.js 版本，NVM 是最佳选择，它可以在用户级别安装，无需 sudo 权限。

· 安装 NVM：
  ```bash
  curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
  source ~/.bashrc                # 重启 Shell 配置使 NVM 生效[reference:6]
  ```
· 使用 NVM 安装 Node.js 和 npm：
  ```bash
  nvm install --lts               # 安装最新的 LTS 版本
  nvm install node               # 或安装最新的稳定版
  nvm alias default node         # 将其设为默认版本[reference:7][reference:8]
  ```

✅ 安装完成后，可以验证一下：

```bash
node -v    # 应返回 v20.x.x 或更高版本
npm -v     # 应返回 10.x.x 或更高版本[reference:9]
```

⚠️ 补充说明

· 不推荐直接使用 yum install nodejs：这会从 CentOS 默认仓库安装，版本过旧（如 CentOS 7 为 v6.x），不支持现代语法，容易导致构建失败。
· 系统依赖问题：如果安装或后续构建过程报错，通常需要安装开发工具包：sudo yum groupinstall 'Development Tools' -y。

💎 汇总

· 追求稳定性：选择方式一（NodeSource），它适合生产服务器。
· 需要多版本管理：选择方式二（NVM），它适合开发环境。

⚠️ 重要提示：请避免在同一系统上混用上述两种方式，因为它们管理路径的方式不同，可能会互相冲突导致命令失效。

如果遇到版本切换不生效、全局包权限不足或其他具体报错，可以随时告诉我详情，我帮你进一步排查。