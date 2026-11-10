import { createRoot } from 'react-dom/client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { ConfigProvider, Layout, theme as antdTheme } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import { ThemeProvider, useColorTheme } from './theme'
import { LoginPanel } from './LoginPanel'
import { DevicesPage } from './DevicesPage'
import { HomePage } from './HomePage'
import { api, RequestError, type Account } from './api'
import 'antd/dist/reset.css'
import './upstream.css'
import './selfhost.css'

export function navigate(path: string) {
  if (window.location.pathname !== path) window.history.pushState({}, '', path)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

function App() {
  const embedded = window.location.pathname === '/app/embedded/devices'
  const { colorTheme } = useColorTheme()
  const dark = colorTheme === 'dark'
  const [account, setAccount] = useState<Account | null>()
  const [error, setError] = useState<string>()
  const [path, setPath] = useState(() => window.location.pathname)
  // Keep route state and URL in sync without dispatching popstate: dispatching synchronously makes
  // React commit the route change separately, so an auth transition can render an intermediate
  // unauthenticated route and the guard below bounces /app/remote back to /app/login.
  const justLoggedIn = useRef(false)
  const go = useCallback((next: string) => {
    if (window.location.pathname !== next) window.history.pushState({}, '', next)
    setPath(next)
  }, [])
  const signedOut = useCallback(() => { setAccount(null); go(embedded ? '/app/embedded/devices' : '/') }, [go, embedded])
  useEffect(() => {
    const onPopState = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [])
  useEffect(() => {
    api<Account>('/auth/me').then(setAccount).catch(err => {
      if (!(err instanceof RequestError && err.status === 401)) setError(err instanceof Error ? err.message : '无法连接服务。')
      setAccount(null)
    })
  }, [])

  useEffect(() => {
    if (justLoggedIn.current) { justLoggedIn.current = false; return }
    if (account === null && path === '/app/remote') go('/app/login')
  }, [account, path, go])
  const login = useCallback((next: Account) => { justLoggedIn.current = true; setAccount(next); go(embedded ? '/app/embedded/devices' : '/app/remote') }, [go, embedded])
  const content = account === undefined
    ? <div className="route-loading auth-route-loading" role="status">正在检查登录状态…</div>
    : (path === '/app/remote' || embedded) && account
      ? <DevicesPage account={account.account} onSignedOut={signedOut} embedded={embedded} />
      : path === '/app/login' || embedded
        ? <LoginPanel onAuthSuccess={login} initialError={error} embedded={embedded} />
        : <HomePage />
  return <ConfigProvider locale={zhCN} theme={{
    algorithm: dark ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
    token: {
      colorPrimary: dark ? '#3b82f6' : '#1677ff',
      colorInfo: dark ? '#3b82f6' : '#1677ff',
      colorSuccess: dark ? '#10b981' : '#059669',
      colorWarning: dark ? '#f59e0b' : '#d97706',
      colorError: dark ? '#f87171' : '#dc2626',
      colorBgLayout: dark ? '#0c0e12' : '#f8fafc',
      colorBgContainer: dark ? '#151820' : '#ffffff',
      colorBgElevated: dark ? '#1c202a' : '#ffffff',
      colorText: dark ? '#f1f5f9' : '#0f172a',
      colorTextSecondary: dark ? '#94a3b8' : '#64748b',
      colorTextPlaceholder: dark ? '#64748b' : '#94a3b8',
      colorBorder: dark ? '#262c38' : '#e2e8f0',
      colorBorderSecondary: dark ? '#1e232e' : '#f1f5f9',
      borderRadius: 8,
      borderRadiusLG: 12,
      controlHeight: 40,
      fontSize: 14,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      wireframe: false,
    },
    components: {
      Button: { primaryShadow: '0 4px 12px rgba(22, 119, 255, 0.25)' },
      Table: {
        headerBg: dark ? '#1a1e28' : '#f8fafc',
        headerColor: dark ? '#94a3b8' : '#475569',
        rowHoverBg: dark ? '#1f2430' : '#f1f5f9',
      },
      Card: {
        headerBg: 'transparent',
      },
    },
  }}><Layout className={`${account && (path === '/app/remote' || embedded) ? 'app-shell product-shell' : 'app-shell auth-shell'}${embedded ? ' embedded-shell' : ''}`}>
    {content}
  </Layout></ConfigProvider>
}
createRoot(document.getElementById('root')!).render(<ThemeProvider><App /></ThemeProvider>)
