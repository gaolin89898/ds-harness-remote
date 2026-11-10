// Enhanced DevicesPage with modern developer-grade UI, metric cards, platform icons, and copy utilities.
import { Alert, Button, Card, Empty, Input, Layout, Popconfirm, Space, Table, Tag, Typography, message } from 'antd'
import {
  AppleOutlined,
  AndroidOutlined,
  CheckCircleFilled,
  CheckOutlined,
  ClockCircleFilled,
  CloudServerOutlined,
  CopyOutlined,
  DesktopOutlined,
  EditOutlined,
  GithubOutlined,
  GlobalOutlined,
  LinkOutlined,
  LogoutOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  UserOutlined,
  WindowsOutlined,
} from '@ant-design/icons'
import type { TableColumnsType } from 'antd'
import { useCallback, useEffect, useState } from 'react'
import { api, RequestError, type Device, type DeviceList } from './api'
import { ThemeToggle } from './ThemeToggle'
import { SiteFooter } from './SiteFooter'

const { Paragraph, Text, Title } = Typography

function getPlatformIcon(platform: string) {
  const p = (platform || '').toLowerCase()
  if (p.includes('win') || p === 'win32') return <WindowsOutlined className="platform-icon is-win" />
  if (p.includes('darwin') || p.includes('mac') || p.includes('apple')) return <AppleOutlined className="platform-icon is-mac" />
  if (p.includes('android')) return <AndroidOutlined className="platform-icon is-android" />
  if (p.includes('linux')) return <CloudServerOutlined className="platform-icon is-linux" />
  return <DesktopOutlined className="platform-icon is-generic" />
}

function getPlatformName(platform: string) {
  const map: Record<string, string> = { darwin: 'macOS', win32: 'Windows', linux: 'Linux', android: 'Android' }
  return map[platform] ?? platform
}

export function DevicesPage({ account, onSignedOut, embedded = false }: { account: string; onSignedOut: () => void; embedded?: boolean }) {
  const [result, setResult] = useState<DeviceList>()
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const [error, setError] = useState('')
  const [updated, setUpdated] = useState('')
  const [renaming, setRenaming] = useState<Device>()
  const [newName, setNewName] = useState('')
  const [savingName, setSavingName] = useState(false)
  const [copied, setCopied] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const data = await api<DeviceList>('/account/devices')
      setResult(data)
      setUpdated(new Date().toLocaleTimeString('zh-CN'))
    } catch (err) {
      if (err instanceof RequestError && err.status === 401) onSignedOut()
      else setError(err instanceof Error ? err.message : '加载失败，请重试。')
    } finally {
      setLoading(false)
    }
  }, [onSignedOut])

  async function submitRename() {
    if (!renaming) return
    const name = newName.trim()
    if (!name) { setError('设备名称不能为空'); return }
    setSavingName(true)
    setError('')
    try {
      await api(`/devices/${encodeURIComponent(renaming.deviceId)}/name`, { name })
      setRenaming(undefined)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : '改名失败，请重试。')
    } finally {
      setSavingName(false)
    }
  }

  useEffect(() => { void load() }, [load])

  async function logout() {
    setLoggingOut(true)
    try {
      await api('/auth/logout', {})
      onSignedOut()
    } catch (err) {
      setError(err instanceof Error ? err.message : '退出失败，请重试。')
    } finally {
      setLoggingOut(false)
    }
  }

  async function copyAddress() {
    const url = result?.serverUrl
    if (!url) return
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      void message.success('已复制服务地址到剪贴板')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      void message.error('复制失败，请手动复制')
    }
  }

  const devices = [...(result?.items ?? [])].sort((a, b) => Number(b.online) - Number(a.online))
  const onlineCount = devices.filter(d => d.online).length
  const offlineCount = devices.length - onlineCount

  const columns: TableColumnsType<Device> = [
    {
      title: '设备名称',
      dataIndex: 'name',
      key: 'name',
      render: (name: string, d) => renaming?.deviceId === d.deviceId
        ? (
          <Space size={6} className="selfhost-rename-row">
            <Input
              size="small"
              value={newName}
              autoFocus
              maxLength={80}
              className="selfhost-rename-input"
              onChange={event => setNewName(event.target.value)}
              onPressEnter={() => void submitRename()}
              onKeyDown={event => { if (event.key === 'Escape') setRenaming(undefined) }}
            />
            <Button size="small" type="primary" loading={savingName} onClick={() => void submitRename()}>保存</Button>
            <Button size="small" onClick={() => setRenaming(undefined)}>取消</Button>
          </Space>
        ) : (
          <div className="selfhost-device-cell">
            <div className={`selfhost-device-icon-box ${d.online ? 'is-online' : ''}`}>
              {getPlatformIcon(d.platform)}
            </div>
            <div className="selfhost-device-info">
              <div className="selfhost-device-name-row">
                <Text strong className="selfhost-device-name">{name}</Text>
                <Button
                  type="text"
                  size="small"
                  className="selfhost-edit-btn"
                  icon={<EditOutlined />}
                  aria-label="修改设备名称"
                  title="修改设备名称"
                  onClick={() => { setRenaming(d); setNewName(d.name) }}
                />
              </div>
              <Text type="secondary" className="selfhost-device-id">{d.deviceId.slice(0, 14)}…</Text>
            </div>
          </div>
        ),
    },
    {
      title: '状态',
      dataIndex: 'online',
      key: 'online',
      width: 120,
      render: (online: boolean) => online ? (
        <span className="selfhost-status-pill is-online">
          <span className="selfhost-status-dot" />
          <span>在线</span>
        </span>
      ) : (
        <span className="selfhost-status-pill is-offline">
          <span className="selfhost-status-dot" />
          <span>离线</span>
        </span>
      ),
    },
    {
      title: '角色',
      key: 'roles',
      width: 180,
      render: (_, device) => (
        <Space size={6} wrap>
          {(device.roles ?? [device.role]).map(role => (
            <span key={role} className={`selfhost-role-badge is-${role}`}>
              {role === 'host' ? <CloudServerOutlined /> : <DesktopOutlined />}
              <span>{role === 'host' ? 'Host' : '客户端'}</span>
            </span>
          ))}
        </Space>
      ),
    },
    {
      title: '系统',
      dataIndex: 'platform',
      key: 'platform',
      width: 140,
      render: (platform: string) => (
        <span className="selfhost-platform-cell">
          {getPlatformIcon(platform)}
          <span>{getPlatformName(platform)}</span>
        </span>
      ),
    },
    {
      title: '插件版本',
      dataIndex: 'clientVersion',
      key: 'clientVersion',
      width: 120,
      render: (ver: string) => <span className="selfhost-version-code">{ver ? `v${ver}` : '—'}</span>,
    },
    {
      title: 'Harness 版本',
      dataIndex: 'harnessVersion',
      key: 'harnessVersion',
      width: 140,
      render: (value?: string) => value ? <span className="selfhost-version-code">{`v${value}`}</span> : <Text type="secondary">—</Text>,
    },
  ]

  return (
    <>
      {!embedded && (
        <Layout.Header className="topbar product-topbar">
          <div className="topbar-inner">
            <div className="topbar-brand-group is-product">
              <a className="topbar-brand" href="/" aria-label="返回首页">
                <img className="topbar-brand-mark" src="/brand-whale.webp" alt="" width="40" height="40" />
                <span className="topbar-brand-copy">
                  <Title level={3}>DeepSeek Harness Remote</Title>
                  <small>安全远程访问与控制</small>
                </span>
              </a>
            </div>
            <div className="topbar-actions">
              <a className="topbar-github-link product-github-link" href="https://github.com/liguobao/ds-harness-remote" target="_blank" rel="noreferrer" aria-label="GitHub">
                <GithubOutlined /> GitHub
              </a>
              <ThemeToggle />
              <Popconfirm title="确认退出登录？" okText="退出" cancelText="取消" onConfirm={() => void logout()}>
                <Button type="text" danger icon={<LogoutOutlined />} loading={loggingOut}>退出登录</Button>
              </Popconfirm>
            </div>
          </div>
        </Layout.Header>
      )}

      <Layout.Content className="product-content selfhost-content" id="main-content">
        <div className="app-area">
          <div className="workspace-view">
            <div className="hosts-page selfhost-dashboard">
              {/* Header section */}
              <header className="workspace-page-header selfhost-page-header">
                <div className="selfhost-header-title-group">
                  <div className="selfhost-title-icon-badge">
                    <CloudServerOutlined />
                  </div>
                  <div>
                    <div className="selfhost-header-row">
                      <Title level={2} className="selfhost-main-title">我的设备</Title>
                      <div className="selfhost-user-chip">
                        <UserOutlined />
                        <span className="selfhost-account-name">{account}</span>
                        <span className="selfhost-account-tag">已认证</span>
                      </div>
                    </div>
                    <Paragraph className="selfhost-subtitle" type="secondary">
                      管理所有连接到此远程服务的 Host 与客户端设备集群
                    </Paragraph>
                  </div>
                </div>

                <Space className="workspace-page-actions selfhost-header-actions" wrap>
                  <Button
                    type="default"
                    className="selfhost-refresh-btn"
                    icon={<ReloadOutlined spin={loading} />}
                    onClick={() => void load()}
                    loading={loading}
                  >
                    刷新
                  </Button>
                  <ThemeToggle />
                  <Popconfirm title="确认退出当前账号？" okText="退出" cancelText="取消" onConfirm={() => void logout()}>
                    <Button type="text" danger className="selfhost-logout-btn" icon={<LogoutOutlined />} loading={loggingOut}>
                      退出登录
                    </Button>
                  </Popconfirm>
                </Space>
              </header>

              {error && <Alert className="selfhost-error" type="error" showIcon closable message={error} onClose={() => setError('')} />}

              {/* Metric stats grid */}
              <div className="selfhost-metrics-grid">
                <div className="selfhost-stat-card is-online">
                  <div className="stat-card-icon">
                    <CheckCircleFilled />
                  </div>
                  <div className="stat-card-body">
                    <div className="stat-card-number">{onlineCount}</div>
                    <div className="stat-card-label">台设备在线</div>
                  </div>
                  <span className="stat-card-pill is-online">
                    <span className="pulse-dot" /> 活跃
                  </span>
                </div>

                <div className="selfhost-stat-card is-offline">
                  <div className="stat-card-icon">
                    <ClockCircleFilled />
                  </div>
                  <div className="stat-card-body">
                    <div className="stat-card-number">{offlineCount}</div>
                    <div className="stat-card-label">台设备离线</div>
                  </div>
                  <span className="stat-card-pill is-offline">待机</span>
                </div>

                <div className="selfhost-stat-card is-total">
                  <div className="stat-card-icon">
                    <DesktopOutlined />
                  </div>
                  <div className="stat-card-body">
                    <div className="stat-card-number">{devices.length}</div>
                    <div className="stat-card-label">总设备数</div>
                  </div>
                  <span className="stat-card-pill is-total">集群</span>
                </div>

                <div className="selfhost-stat-card is-protocol">
                  <div className="stat-card-icon">
                    <SafetyCertificateOutlined />
                  </div>
                  <div className="stat-card-body">
                    <div className="stat-card-number">{result?.transport ? result.transport.toUpperCase() : 'WEBRTC / P2P'}</div>
                    <div className="stat-card-label">端到端加密通道</div>
                  </div>
                  <span className="stat-card-pill is-protocol">安全传输</span>
                </div>
              </div>

              {/* Endpoint card */}
              <Card className="page-card selfhost-connection selfhost-endpoint-card" bordered={false}>
                <div className="selfhost-endpoint-header">
                  <Space size={8} align="center">
                    <GlobalOutlined className="selfhost-endpoint-icon" />
                    <Text strong className="selfhost-endpoint-title">远程服务地址 (Endpoint URL)</Text>
                  </Space>
                  <Tag color="success" className="selfhost-endpoint-badge">
                    <span className="pulse-dot" /> 服务正常运行
                  </Tag>
                </div>
                <div className="selfhost-endpoint-box">
                  <div className="selfhost-endpoint-url-bar">
                    <span className="selfhost-endpoint-protocol">HTTPS</span>
                    <Text code className="selfhost-address selfhost-endpoint-text">
                      {result?.serverUrl ?? '加载中…'}
                    </Text>
                  </div>
                  <Space size={8} className="selfhost-endpoint-actions">
                    <Button
                      type="primary"
                      icon={copied ? <CheckOutlined /> : <CopyOutlined />}
                      onClick={() => void copyAddress()}
                      className="selfhost-copy-btn"
                    >
                      {copied ? '已复制' : '复制地址'}
                    </Button>
                    {result?.serverUrl && (
                      <Button
                        type="default"
                        icon={<LinkOutlined />}
                        href={result.serverUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="selfhost-test-btn"
                        title="打开服务地址"
                      >
                        测试访问
                      </Button>
                    )}
                  </Space>
                </div>
                <Paragraph className="selfhost-endpoint-tip" type="secondary">
                  在需要受控或发起连接的主机插件配置及移动客户端中填入此地址，即可自动加入同一加密通信网络。
                </Paragraph>
              </Card>

              {/* Devices Table Card */}
              <Card
                className="page-card hosts-list-card selfhost-table-card"
                bordered={false}
                title={
                  <Space size={8} align="center">
                    <DesktopOutlined className="selfhost-table-header-icon" />
                    <span>设备状态与列表</span>
                  </Space>
                }
                extra={
                  result ? (
                    <div className="selfhost-table-extra">
                      <span className="selfhost-extra-badge">
                        <span className="selfhost-status-dot is-online" />
                        <span>{onlineCount} / {devices.length} 台在线</span>
                      </span>
                    </div>
                  ) : undefined
                }
              >
                {!error && !loading && !devices.length ? (
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="暂无已注册设备，请在客户端配置此服务地址完成绑定" />
                ) : (
                  <Table<Device>
                    rowKey="deviceId"
                    columns={columns}
                    dataSource={devices}
                    loading={loading}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                    className="selfhost-devices-table"
                  />
                )}
              </Card>

              {updated && (
                <div className="selfhost-footer-caption">
                  <span className="selfhost-sync-indicator" />
                  <span>最后数据同步时间：{updated}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout.Content>
      {!embedded && <SiteFooter />}
    </>
  )
}
