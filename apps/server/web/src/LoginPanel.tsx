// Enhanced LoginPanel with modern authentication aesthetic, prefix icons, and security badges.
import { Alert, Button, Card, Form, Input, Space, Typography } from 'antd'
import {
  GithubOutlined,
  GlobalOutlined,
  LockOutlined,
  SafetyCertificateOutlined,
  ThunderboltOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useState } from 'react'
import { api, type Account } from './api'
import { ThemeToggle } from './ThemeToggle'
import { SiteFooter } from './SiteFooter'

export function LoginPanel({
  onAuthSuccess,
  initialError,
  embedded = false,
}: {
  onAuthSuccess: (account: Account) => void
  initialError?: string
  embedded?: boolean
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(initialError ?? '')
  const [form] = Form.useForm<{ email: string; password: string }>()

  async function submit(values: { email: string; password: string }) {
    setLoading(true)
    setError('')
    try {
      const result = await api<Account>('/auth/login', {
        email: values.email.trim(),
        password: values.password,
      })
      form.resetFields(['password'])
      onAuthSuccess(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : '登录失败，请重试。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <main className={`auth-page ${embedded ? 'is-embedded' : ''}`}>
        <div className="auth-ambient-glow" />

        <div className="auth-language-menu">
          {!embedded && (
            <a
              className="auth-github-link"
              href="https://github.com/liguobao/ds-harness-remote"
              target="_blank"
              rel="noreferrer"
            >
              <GithubOutlined /> GitHub
            </a>
          )}
          <ThemeToggle className="auth-theme-toggle" />
        </div>

        <section className="auth-content">
          <div className="auth-logo-stack">
            <a className="auth-home-link" href="/" aria-label="返回首页">
              <div className="auth-brand-wrapper">
                <img className="auth-brand-icon" src="/brand-whale.webp" alt="" width="56" height="56" />
              </div>
              <Typography.Title level={2} className="auth-app-title">
                DeepSeek Harness Remote
              </Typography.Title>
              <Typography.Paragraph className="auth-app-subtitle" type="secondary">
                自建安全端到端加密远程访问与控制平台
              </Typography.Paragraph>
            </a>
          </div>

          <Card className="auth-panel" bordered={false}>
            <div className="auth-intro">
              <Typography.Title level={3} className="auth-title">账号登录</Typography.Title>
              <Typography.Paragraph type="secondary" className="auth-desc">
                请输入您的服务管理账号与凭据
              </Typography.Paragraph>
            </div>

            {error && (
              <Alert
                className="selfhost-auth-error"
                type="error"
                showIcon
                closable
                message={error}
                onClose={() => setError('')}
              />
            )}

            <Form
              form={form}
              layout="vertical"
              onFinish={submit}
              requiredMark={false}
              className="auth-form"
            >
              <Form.Item
                name="email"
                label="账号 / 邮箱"
                rules={[
                  { required: true, whitespace: true, message: '请输入账号' },
                  { max: 254, message: '账号不能超过 254 个字符' },
                ]}
              >
                <Input
                  size="large"
                  prefix={<UserOutlined className="auth-input-icon" />}
                  placeholder="请输入账号 / 邮箱"
                  autoComplete="username"
                  className="auth-input"
                />
              </Form.Item>

              <Form.Item
                name="password"
                label="密码"
                rules={[
                  { required: true, message: '请输入密码' },
                  { max: 1024, message: '密码不能超过 1024 个字符' },
                ]}
              >
                <Input.Password
                  size="large"
                  prefix={<LockOutlined className="auth-input-icon" />}
                  placeholder="请输入密码"
                  autoComplete="current-password"
                  className="auth-input"
                />
              </Form.Item>

              <Form.Item className="auth-submit-item">
                <Button
                  loading={loading}
                  block
                  type="primary"
                  size="large"
                  htmlType="submit"
                  className="auth-submit-btn"
                >
                  {loading ? '正在登录…' : '立即登录'}
                </Button>
              </Form.Item>
            </Form>

            <div className="auth-features-row">
              <span className="auth-feature-chip">
                <SafetyCertificateOutlined /> 端到端加密
              </span>
              <span className="auth-feature-chip">
                <ThunderboltOutlined /> P2P 直连
              </span>
              <span className="auth-feature-chip">
                <GlobalOutlined /> 多端同步
              </span>
            </div>
          </Card>
        </section>
      </main>
      {!embedded && <SiteFooter />}
    </>
  )
}
