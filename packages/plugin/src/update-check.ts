import type { FetchImplementation } from './server-api.js'
import type { SafeLogger } from './logging.js'
import { PLUGIN_VERSION } from './version.js'

/**
 * Update state published through the control-plane `status` payload. It is
 * kept after every successful registry check, even when the local version is
 * current, because the client also marks remote Hosts running an older
 * plugin than this repository's latest GitHub Release.
 */
export interface PluginUpdateSnapshot {
  currentVersion: string
  latestVersion: string
  checkedAt: number
}

const LATEST_RELEASE_URL = 'https://api.github.com/repos/gaolin89898/dsh-kite/releases/latest'
const FETCH_TIMEOUT_MS = 10_000
const RECHECK_INTERVAL_MS = 24 * 60 * 60 * 1000
const RELEASE_TAG_PATTERN = /^v?(\d+\.\d+\.\d+)$/

/**
 * Startup and daily lookup of the plugin's latest published version against
 * this repository's GitHub Releases. The check is fire-and-forget: failures are logged at
 * debug level and never surface to the user or block plugin startup.
 */
export class PluginUpdateChecker {
  private state?: PluginUpdateSnapshot
  private timer: ReturnType<typeof setInterval> | undefined
  private flight?: Promise<void>
  private stopped = false

  constructor(
    private readonly logger: SafeLogger,
    private readonly fetchImplementation: FetchImplementation = fetch,
  ) {}

  /** Latest successful registry check, or `undefined` before the first one. */
  snapshot(): PluginUpdateSnapshot | undefined {
    return this.state
  }

  /** Run the first check and re-check daily. Safe to call more than once. */
  start(): void {
    if (this.stopped || this.timer !== undefined) return
    void this.check().catch(() => undefined)
    this.timer = setInterval(() => { void this.check().catch(() => undefined) }, RECHECK_INTERVAL_MS)
    this.timer.unref?.()
  }

  stop(): void {
    this.stopped = true
    if (this.timer !== undefined) {
      clearInterval(this.timer)
      this.timer = undefined
    }
  }

  /** One release check; concurrent callers share the in-flight request. */
  check(): Promise<void> {
    if (this.stopped) return Promise.resolve()
    this.flight ??= this.run().finally(() => { this.flight = undefined })
    return this.flight
  }

  private async run(): Promise<void> {
    try {
      const latest = await this.fetchLatestVersion()
      if (latest === undefined) return
      this.state = { currentVersion: PLUGIN_VERSION, latestVersion: latest, checkedAt: Date.now() }
      this.logger.debug('plugin update check complete', { current: PLUGIN_VERSION, latest })
    } catch {
      // GitHub reachability varies by network; a failed check must stay invisible.
      this.logger.debug('plugin update check failed', { code: 'UPDATE_CHECK_FAILED' })
    }
  }

  private async fetchLatestVersion(): Promise<string | undefined> {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS)
    timeout.unref?.()
    try {
      const response = await this.fetchImplementation(LATEST_RELEASE_URL, {
        signal: controller.signal,
        headers: { accept: 'application/vnd.github+json' },
      })
      if (!response.ok) throw new Error(`GitHub Releases responded ${response.status}`)
      const release = await response.json() as Record<string, unknown>
      if (release.draft !== false || release.prerelease !== false || typeof release.tag_name !== 'string') return undefined
      return RELEASE_TAG_PATTERN.exec(release.tag_name)?.[1]
    } finally {
      clearTimeout(timeout)
    }
  }
}
