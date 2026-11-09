import type { Translate } from '../client-locale.js'
import type { StatusFeed } from '../status-stream.js'
import type { ClientReact, RemoteStatus } from './types.js'

export const DEVICES_PANEL_ID = 'ds-harness-remote-devices'

export function createDevicesPanel(React: ClientReact) {
  function DevicesIcon() {
    return React.createElement('svg', { width: 16, height: 16, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, 'aria-hidden': true },
      React.createElement('rect', { x: 2, y: 3, width: 15, height: 12, rx: 2 }),
      React.createElement('path', { d: 'M6 21h7M9.5 15v6' }),
      React.createElement('rect', { x: 17, y: 9, width: 5, height: 12, rx: 1.3 }))
  }
  function DevicesPanel(props: {
    t: Translate
    control: <T>(endpoint: string) => Promise<T>
    statusFeed: StatusFeed<RemoteStatus>
  }) {
    const [status, setStatus] = React.useState<RemoteStatus | undefined>(undefined)
    const [failed, setFailed] = React.useState(false)
    React.useEffect(() => {
      let active = true
      const dispose = props.statusFeed.subscribe(next => { if (active) { setStatus(next); setFailed(false) } })
      void props.control<RemoteStatus>('status').then(next => { if (active) setStatus(next) }).catch(() => { if (active) setFailed(true) })
      return () => { active = false; dispose() }
    }, [props.control, props.statusFeed])
    let source: string | undefined
    if (status?.serverUrl) {
      try {
        const url = new URL(status.serverUrl)
        if (['http:', 'https:'].includes(url.protocol) && !url.username && !url.password) source = new URL('/app/embedded/devices', url).href
      } catch { /* Show the configuration state for an invalid saved URL. */ }
    }
    return React.createElement('section', { className: 'dshRemoteDevicesPanel', 'aria-label': props.t('myDevices') },
      source
        ? React.createElement('iframe', { key: source, src: source, title: props.t('myDevices'), sandbox: 'allow-scripts allow-forms allow-same-origin', referrerPolicy: 'no-referrer' })
        : React.createElement('p', { role: failed ? 'alert' : 'status' }, props.t(failed ? 'devicesPanelUnavailable' : status ? 'devicesPanelConfigure' : 'loadingSettings'))
    )
  }
  return { DevicesIcon, DevicesPanel }
}
