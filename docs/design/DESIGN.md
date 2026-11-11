# DSH Remote 界面设计系统

更新时间：2026-11-11；以下描述当前源码与交互规则，不代表真实设备可访问性验收。

移动端客户端（Android / iOS）由 [DSH Go](https://github.com/ccch1mneyyy/dsh-go) 等外部项目提供，
本仓库只保留 Desktop / Web 侧界面。原先的 Android 主题、导航与 Bot 模式章节随
`apps/android` 一并移除。

## 1. 设计来源

Desktop 复用 Harness 官方 Workspace / Session / Conversation UI；Remote 只增加账号、
Host/工作区选择、设置和 Header。CodeX / ACP 在内存中投影到同一原生 UI，不增加独立会话页面
或持久化展示数据库。

自部署 Server 的登录页与设备页使用独立样式（`apps/server/web/src/console.css`），
只承载账号与设备管理，不做 Remote 会话界面。

## 2. Desktop Remote 入口与设置

侧栏底部插件入口保持纵向排列，Remote 位于 DS Bot 等已有插件入口下方、「更多」上方。展开侧栏时
Remote 使用 36px 高的整行图标与文字按钮，长 Host 名称省略；折叠侧栏时使用 36px 图标按钮。
悬停显示 Remote 或当前 Host 名称与退出提示，已连接时点击返回本地工作区，两种宽度均保留键盘焦点。
DS Bot 团队模式保留账户头像与「连接插件」的原有同一行布局，Remote 独立占据其下方一行，不把 Bot
的内部操作拆成多行。

Remote 模态框展示账号授权、Host、后端分组、实际就绪状态和已有工作区；添加目录入口按领域
authority 限制。Header 显示远端 Host、传输路径、加密说明、退出和「预览服务」。
本机 preview URL 不作为 Remote Web 或移动端地址。

详细 Remote 设置中，终端开关切换即保存；端口输入右侧「保存访问设置」只提交 loopback 白名单。
Agent 后端统一列表展示 CodeX / Cursor / AGY，命令可发现不等于已登录或就绪；检测失败关闭后端，
检测恢复后由用户开启。配置保存热更新对应后端，不需要重启整个 DSH。访问设置仅 Host 本地可编辑。

## 3. 自部署 Server 页面

登录页与设备页跟随 Harness 的品牌色与明暗主题；`/app/embedded/devices` 供 Harness 内嵌使用，
省略网站导航与页脚。设备页把同一安装的 Host/Client 合为一行并同时展示两个角色，在线数量按设备
统计；改名、撤销仍按各自身份独立生效。

嵌入页依赖 `DSH_SERVER_FRAME_ANCESTORS` 精确 origin 白名单，默认拒绝嵌入；不接受通配符或页面路径。

## 4. 状态、文案与验证

状态变化显示文字和具体恢复动作；错误不以 undefined 或内部异常作为主要文案。
图标按钮提供名称、selected/disabled/expanded 状态与必要的辅助提示；无障碍结果以实际检查为准。
动画遵循现有 Modal/组件实现，不宣称全局已有固定 150–220ms 动效或完整 reduced-motion 验收。

界面文案、布局和样式不单独增加自动化测试。类型检查、必要人工烟测和真实设备验证承担展示质量检查；
终端输入权、事件顺序、权限与恢复等核心边界由契约测试保护。未完成验收见 [TODO](../TODO.md)。
