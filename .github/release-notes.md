## 中文

**v1.0.0**

### 品牌与版本

- 项目更名为 Kite（风筝），仓库迁移至 `gaolin89898/dsh-kite`；npm 包名 `ds-harness-remote`、插件 ID 与凭据存储路径保持不变，已安装用户不受影响。
- 新仓库版本号自 1.0.0 重新开始。

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

- The project is rebranded as Kite and the repository moves to `gaolin89898/dsh-kite`. The npm package name `ds-harness-remote`, the plugin ID and credential storage paths stay unchanged, so existing installations keep working.
- Version numbering restarts at 1.0.0 for the new repository.

### Remote experience

- Add per-Host restart actions: platform-specific supervised restarts, a busy badge with disabled clicks while restarting, and one automatic device-refresh retry.
- Replace the Host filter with a custom dropdown supporting arrow-key navigation, Escape and outside-click closing.
- Redesign the workspace directory picker: title with a directory-count badge, a Host-anchored path bar and single-click row selection.
- Move sign-out into the account-name dropdown menu and remove the sticky footer disconnect notice.

### Mobile and stability

- Remove the in-repo Android app; mobile access is provided by the external DSH Go client.
- Ignore OS metadata files (`.DS_Store`, `desktop.ini`, `Thumbs.db`) during credential storage ownership checks and migration.
- Keep the password sign-in form visible when optional OAuth discovery fails and preserve a manually selected pairing method.
