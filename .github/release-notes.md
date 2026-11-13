## 中文

**v1.0.0**

### 品牌与版本

- DSH 插件显示名称统一为 `dsh-kite`，从 `gaolin89898/dsh-kite` 的 GitHub Release 安装；内部包名 `ds-harness-remote`、插件 ID 与凭据存储路径保持不变。
- 新仓库版本号自 1.0.0 重新开始。
- 安装脚本、版本检查与更新链接均使用本仓库，避免误装 npm 上的同名旧包。

```sh
dsh plugin --profile desktop add -w https://github.com/gaolin89898/dsh-kite/releases/download/v1.0.0/ds-harness-remote-1.0.0.tgz
```

Web 用户将 `desktop` 换为实际 profile（通常为 `web`）。已有安装可在同一 profile 执行此命令切换来源，然后按提示重启。

### 远程体验

- 主机列表新增「重启」操作：按平台执行受监管的重启，重启期间显示忙碌徽标并禁用点击，设备刷新失败自动重试一次。
- 主机筛选改为自绘下拉菜单，支持方向键导航、Escape 关闭与外点关闭。
- 工作区选择页目录浏览重做：标题与目录数徽章、路径栏固定主机名、目录行单击选中。
- 退出登录并入账号名下拉菜单，移除 footer 的「连接已断开」误报通知。

### 移动端与稳定性

- 移除仓库内置 Android 应用，移动端改由外部 DSH Go 客户端提供。
- 凭据存储归属检查与迁移忽略 `.DS_Store`、`desktop.ini`、`Thumbs.db` 等系统元文件。
- 可选 OAuth 发现失败时保持密码登录表单可见，保留已手选的配对方式。

## English

**v1.0.0**

### Brand and version

- The DSH plugin is displayed as `dsh-kite` and installs from this repository's GitHub Releases. The internal package name `ds-harness-remote`, plugin ID and credential storage paths stay unchanged.
- Version numbering restarts at 1.0.0 for the new repository.
- The installer, version checks and update links use this repository instead of the independently published npm package.

### Remote experience

- Add per-Host restart actions: platform-specific supervised restarts, a busy badge with disabled clicks while restarting, and one automatic device-refresh retry.
- Replace the Host filter with a custom dropdown supporting arrow-key navigation, Escape and outside-click closing.
- Redesign the workspace directory picker: title with a directory-count badge, a Host-anchored path bar and single-click row selection.
- Move sign-out into the account-name dropdown menu and remove the sticky footer disconnect notice.

### Mobile and stability

- Remove the in-repo Android app; mobile access is provided by the external DSH Go client.
- Ignore OS metadata files (`.DS_Store`, `desktop.ini`, `Thumbs.db`) during credential storage ownership checks and migration.
- Keep the password sign-in form visible when optional OAuth discovery fails and preserve a manually selected pairing method.
