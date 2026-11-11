export const workbenchStyles = `
.dshRemotePage { box-sizing:border-box; letter-spacing:0; }
.dshRemotePage:focus { outline:0; }
.dshRemotePageHeader { box-sizing:border-box; min-height:88px; padding:20px 28px; flex-shrink:0; }
.dshRemotePageHeader strong,.dshRemotePageTitles>strong { font-size:22px; line-height:1.35; letter-spacing:0; white-space:normal; overflow-wrap:anywhere; }
.dshRemotePageTitles { gap:5px; }
.dshRemotePageEyebrow { color:var(--dsw-alias-label-tertiary); font-size:11px; }
.dshRemotePageEyebrowLabel { letter-spacing:0; text-transform:none; }
.dshRemotePageEyebrow>svg { width:12px; height:12px; flex:none; }
.dshRemoteBreadcrumbHost { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.dshRemoteBrandMark { width:40px; height:40px; border-radius:8px; color:var(--dsw-alias-brand-primary); background:color-mix(in srgb,var(--dsw-alias-brand-primary) 8%,transparent); }
.dshRemotePageEyebrow .dshRemoteStarLink { font-size:10px; padding:2px 7px; border-radius:4px; }
.dshRemotePageActions { gap:8px; }
.dshRemotePageActions>button { box-sizing:border-box; width:34px; height:34px; min-width:34px; padding:0; border-radius:6px; }
.dshRemotePageActions>.dshRemotePageBack { width:auto; gap:7px; padding:0 10px; font-size:12px; }
.dshRemotePageActions>button>svg { width:15px; height:15px; flex:none; }
.dshRemotePage.isWorkbench { width:min(1000px,100%); height:min(620px,calc(100dvh - 40px)); max-height:calc(100dvh - 40px); border-radius:12px; }
.dshRemotePage.isWorkbench>.dshRemotePageBody { min-height:0; flex:1; padding:22px 28px 0; gap:18px; }
.isWorkbench .dshRemoteHosts { min-height:0; display:flex; flex-direction:column; gap:14px; flex:1; }
.isWorkbench .dshRemotePermissionRow { min-height:60px; box-sizing:border-box; display:flex; align-items:center; gap:12px; flex:none; padding:12px 14px; border:1px solid var(--dsw-alias-border-l2); border-radius:8px; background:var(--dsw-alias-bg-layer-2); }
.dshRemotePermissionIcon { display:grid; place-items:center; width:32px; height:32px; flex:none; border-radius:6px; color:var(--dsw-alias-brand-primary); background:color-mix(in srgb,var(--dsw-alias-brand-primary) 8%,transparent); }
.dshRemotePermissionRow>.dshRemoteHostControlToggle { gap:12px; color:var(--dsw-alias-label-primary); font-size:13px; font-weight:500; white-space:normal; }
.dshRemotePermissionRow>.dshRemoteConnectedMenu { margin-left:auto; }
.dshRemotePage .dshRemoteHostControlToggle>input:checked { background:var(--dsw-alias-brand-primary); border-color:var(--dsw-alias-brand-primary); box-shadow:none; }
.dshRemotePage .dshRemoteHostControlToggle>input:checked::after { background:var(--dsw-alias-label-primary-foreground,#fff); }
.dshRemotePage .dshRemoteConnectedCount { padding:5px 8px; font-size:11px; border-radius:6px; text-decoration:none; background:var(--dsw-alias-bg-layer-3); box-shadow:none; }
.isWorkbench .dshRemoteSectionHeading { margin:0; flex:none; min-height:28px; }
.dshRemoteOnlineCount { display:inline-flex; padding:3px 7px; border-radius:4px; color:var(--dsw-alias-state-success-primary); background:color-mix(in srgb,var(--dsw-alias-state-success-primary) 9%,transparent); font-size:11px; line-height:1.4; }
.dshRemoteHostFilter { position:relative; flex:none; min-width:0; max-width:45%; }
.dshRemoteHostFilterTrigger { box-sizing:border-box; display:inline-flex; align-items:center; gap:6px; min-height:30px; min-width:0; max-width:100%; padding:0 9px 0 11px; border:1px solid var(--dsw-alias-border-l2); border-radius:6px; background:var(--dsw-alias-bg-layer-2); color:var(--dsw-alias-label-secondary); font:inherit; font-size:11px; white-space:nowrap; cursor:pointer; transition:color .15s,border-color .15s; }
.dshRemoteHostFilterTrigger:hover:not(:disabled),.dshRemoteHostFilter.isOpen .dshRemoteHostFilterTrigger { color:var(--dsw-alias-label-primary); border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 30%,var(--dsw-alias-border-l2)); }
.dshRemoteHostFilterTrigger:disabled { opacity:.55; cursor:default; }
.dshRemoteHostFilterChevron { width:11px; height:11px; flex:none; color:var(--dsw-alias-label-tertiary); transition:transform .15s,color .15s; }
.dshRemoteHostFilter.isOpen .dshRemoteHostFilterChevron { transform:rotate(180deg); color:var(--dsw-alias-brand-primary); }
.dshRemoteHostFilterMenu { position:absolute; top:calc(100% + 5px); right:0; z-index:30; box-sizing:border-box; display:flex; flex-direction:column; gap:2px; min-width:calc(100% + 12px); padding:4px; border:1px solid var(--dsw-alias-border-l2); border-radius:8px; background:var(--dsw-alias-bg-layer-2); box-shadow:0 12px 32px rgba(0,0,0,.4),0 0 0 1px rgba(255,255,255,.05) inset; transform-origin:top right; animation:dshRemoteFilterIn .14s cubic-bezier(.16,1,.3,1); }
@keyframes dshRemoteFilterIn { from { opacity:0; transform:translateY(-3px) scale(.98); } to { opacity:1; transform:none; } }
.dshRemoteHostFilterOption { display:flex; align-items:center; justify-content:space-between; gap:12px; box-sizing:border-box; min-height:28px; padding:5px 10px; border:0; border-radius:6px; background:transparent; color:var(--dsw-alias-label-secondary); font:inherit; font-size:11px; text-align:left; white-space:nowrap; cursor:pointer; }
.dshRemoteHostFilterOption:hover { background:var(--dsw-alias-bg-layer-3); color:var(--dsw-alias-label-primary); }
.dshRemoteHostFilterOption.isSelected { color:var(--dsw-alias-brand-primary); background:color-mix(in srgb,var(--dsw-alias-brand-primary) 8%,transparent); }
.dshRemoteHostFilterOption.isSelected::after { content:''; width:5px; height:9px; flex:none; margin-right:2px; border-right:1.5px solid currentColor; border-bottom:1.5px solid currentColor; transform:rotate(45deg) translateY(-1px); }
.dshRemoteHostFilterTrigger:focus-visible,.dshRemoteHostFilterOption:focus-visible,.dshRemoteWorkspaceSearch:focus-within { outline:2px solid var(--dsw-alias-brand-primary); outline-offset:2px; }
.dshRemoteHostFilterOption:focus-visible { outline-offset:-2px; }
@media(prefers-reduced-motion:reduce) { .dshRemoteHostFilterMenu { animation:none; } .dshRemoteHostFilterChevron { transition:none; } }
.dshRemoteAccountMenu { position:relative; min-width:0; }
.dshRemoteAccountTrigger { display:flex; align-items:center; gap:10px; box-sizing:border-box; width:fit-content; max-width:100%; padding:5px 9px; margin:-5px -9px; border:0; border-radius:8px; background:transparent; color:inherit; font:inherit; text-align:left; cursor:pointer; }
.dshRemoteAccountTrigger:hover { background:var(--dsw-alias-bg-layer-2); }
.dshRemoteAccountTrigger:focus-visible { outline:2px solid var(--dsw-alias-brand-primary); outline-offset:2px; }
.dshRemoteAccountChevron { width:11px; height:11px; flex:none; color:var(--dsw-alias-label-tertiary); transition:transform .15s,color .15s; }
.dshRemoteAccountMenu.isOpen .dshRemoteAccountChevron { transform:rotate(180deg); color:var(--dsw-alias-brand-primary); }
.dshRemoteAccountMenuPanel { position:absolute; bottom:calc(100% + 8px); left:0; z-index:40; box-sizing:border-box; min-width:190px; padding:4px; border:1px solid var(--dsw-alias-border-l2); border-radius:8px; background:var(--dsw-alias-bg-layer-2); box-shadow:0 12px 32px rgba(0,0,0,.4),0 0 0 1px rgba(255,255,255,.05) inset; transform-origin:bottom left; animation:dshRemoteMenuUpIn .14s cubic-bezier(.16,1,.3,1); }
@keyframes dshRemoteMenuUpIn { from { opacity:0; transform:translateY(3px) scale(.98); } to { opacity:1; transform:none; } }
.dshRemoteAccountMenuItem { display:flex; align-items:center; gap:9px; box-sizing:border-box; width:100%; min-height:32px; padding:6px 10px; border:0; border-radius:6px; background:transparent; color:var(--dsw-alias-label-secondary); font:inherit; font-size:12px; text-align:left; cursor:pointer; white-space:nowrap; }
.dshRemoteAccountMenuItem:hover:not(:disabled) { background:var(--dsw-alias-bg-layer-3); color:var(--dsw-alias-label-primary); }
.dshRemoteAccountMenuItem:disabled { opacity:.5; cursor:default; }
.dshRemoteAccountMenuItem>svg { width:14px; height:14px; flex:none; }
.dshRemoteAccountMenuItem:focus-visible { outline:2px solid var(--dsw-alias-brand-primary); outline-offset:-2px; }
@media(prefers-reduced-motion:reduce) { .dshRemoteAccountMenuPanel { animation:none; } .dshRemoteAccountChevron { transition:none; } }
.dshRemotePageBody>.dshRemoteNotice,.dshRemotePageBody>.dshRemoteError { box-sizing:border-box; display:flex; align-items:center; gap:9px; margin:14px 0 18px; padding:9px 12px; border:1px solid var(--dsw-alias-border-l2); border-radius:8px; background:var(--dsw-alias-bg-layer-2); font-size:12px; line-height:1.6; }
.dshRemotePageBody>.dshRemoteNotice { color:var(--dsw-alias-label-secondary); }
.dshRemotePageBody>.dshRemoteError { color:var(--dsw-alias-state-error-primary); }
.dshRemotePageBody>.dshRemoteNotice::before,.dshRemotePageBody>.dshRemoteError::before { content:''; width:6px; height:6px; flex:none; border-radius:50%; background:var(--dsw-alias-brand-primary); }
.dshRemotePageBody>.dshRemoteError::before { background:var(--dsw-alias-state-error-primary); }
.isWorkbench .dshRemoteHostList { min-height:0; max-height:none; flex:1; gap:10px; padding:0 2px 4px; margin:0 -2px; }
.isWorkbench .dshRemoteHostList>.dshRemoteHostRow { box-sizing:border-box; min-height:72px; border-radius:8px; padding:12px 16px; gap:12px; box-shadow:none; transition:background .15s,border-color .15s; }
.isWorkbench .dshRemoteHostItemIcon { width:36px; height:36px; border-radius:8px; background:color-mix(in srgb,var(--dsw-alias-brand-primary) 7%,var(--dsw-alias-bg-layer-2)); }
.isWorkbench .dshRemoteHostItemText strong { font-size:14px; }
.isWorkbench .dshRemoteHostItemText small { font-size:11px; }
.isWorkbench .dshRemoteHostStatus { padding:4px 8px; font-size:10px; border:0; }
.isWorkbench .dshRemoteHostStatus::before { width:5px; height:5px; box-shadow:none; }
.dshRemoteHostStatus.isRestarting { background:color-mix(in srgb,var(--dsw-alias-state-warn-primary) 12%,transparent); color:var(--dsw-alias-state-warn-primary); border:1px solid color-mix(in srgb,var(--dsw-alias-state-warn-primary) 26%,transparent); }
.dshRemoteHostStatus.isRestarting::before { content:''; width:6px; height:6px; border-radius:50%; background:currentColor; box-shadow:0 0 0 2px color-mix(in srgb,var(--dsw-alias-state-warn-primary) 18%,transparent); animation:dshRemoteRestartPulse 1.2s ease-in-out infinite; }
@keyframes dshRemoteRestartPulse { 0%,100% { opacity:1; } 50% { opacity:.35; } }
@media(prefers-reduced-motion:reduce) { .dshRemoteHostStatus.isRestarting::before { animation:none; } }
.isWorkbench .dshRemoteHostItemChevron { display:flex; margin:0; }
.dshRemotePageBody>.dshRemoteAccountFooter { flex:none; margin:0 -28px; padding:16px 28px; min-height:64px; box-sizing:border-box; }
.dshRemotePage .dshRemoteAccountAvatar { width:30px; height:30px; background:var(--dsw-alias-brand-primary); color:var(--dsw-alias-label-primary-foreground,#fff); }
.dshRemotePage .dshRemoteAccountSettings,.dshRemotePage .dshRemoteAccountExit { min-height:30px; display:inline-flex; justify-content:center; align-items:center; gap:7px; padding:5px 8px; border-radius:6px; }
.dshRemotePage .dshRemoteAccountSettings { width:30px; padding:0; }
.dshRemotePage .dshRemoteAccountExit { border:1px solid var(--dsw-alias-border-l2); }
.dshRemoteAccountFooter button>svg { width:14px; height:14px; flex:none; }
.dshRemotePage.hasSelectedHost { width:min(1080px,100%); }
.dshRemotePage.hasSelectedHost>.dshRemotePageBody { padding:0; gap:0; overflow:hidden; }
.hasSelectedHost .dshRemoteLocalLink { margin:8px 28px; font-size:12px; }
.dshRemotePickerLayout { display:grid; grid-template-columns:260px minmax(0,1fr); min-height:0; flex:1; }
.dshRemoteHostRail { box-sizing:border-box; min-width:0; min-height:0; display:flex; flex-direction:column; gap:22px; padding:24px 22px 16px; border-right:1px solid var(--dsw-alias-border-l2); background:color-mix(in srgb,var(--dsw-alias-bg-base) 55%,var(--dsw-alias-bg-layer-1)); overflow:auto; }
.dshRemoteRailHost { display:flex; align-items:center; gap:11px; flex:none; min-width:0; }
.dshRemoteRailHost>div { min-width:0; display:flex; flex-direction:column; gap:4px; }
.dshRemoteRailHost strong { font-size:14px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
.dshRemoteRailStatus { display:flex; align-items:center; gap:5px; font-size:11px; color:var(--dsw-alias-label-secondary); }
.dshRemoteRailStatus::before { content:''; width:5px; height:5px; flex:none; border-radius:50%; background:currentColor; }
.dshRemoteRailStatus.isOnline { color:var(--dsw-alias-state-success-primary); }
.dshRemoteHostSpecs { flex:none; margin:0; padding:0 0 18px; border-bottom:1px solid var(--dsw-alias-border-l2); display:flex; flex-direction:column; gap:10px; font-size:11px; }
.dshRemoteHostSpecs>div { display:flex; align-items:baseline; justify-content:space-between; gap:10px; min-width:0; }
.dshRemoteHostSpecs dt { color:var(--dsw-alias-label-tertiary); }
.dshRemoteHostSpecs dd { margin:0; color:var(--dsw-alias-label-secondary); text-align:right; overflow-wrap:anywhere; }
.dshRemoteHostSpecs dd>small { display:block; color:var(--dsw-alias-brand-primary); }
.dshRemoteSelectedDirectory { min-width:0; flex:none; display:flex; flex-direction:column; gap:10px; }
.dshRemoteSelectedDirectory>span { display:flex; align-items:center; gap:7px; color:var(--dsw-alias-label-secondary); font-size:11px; }
.dshRemoteSelectedDirectory>span>svg { width:14px; height:14px; }
.dshRemoteSelectedDirectory>strong { padding:10px 12px; font:12px/1.6 var(--dsw-font-mono,ui-monospace,Consolas,monospace); overflow-wrap:anywhere; border-left:2px solid var(--dsw-alias-border-l2); }
.dshRemoteSelectedDirectory.hasSelection>strong { color:var(--dsw-alias-brand-primary); border-color:var(--dsw-alias-brand-primary); background:color-mix(in srgb,var(--dsw-alias-brand-primary) 7%,transparent); }
.dshRemoteHostRail>.dshRemoteAccountFooter { margin-top:auto; padding-top:14px; gap:5px; flex-wrap:wrap; flex:none; }
.dshRemoteHostRail .dshRemoteAccountIdentity { flex:1; }
.dshRemoteHostRail .dshRemoteAccountUpdate { order:4; width:100%; padding-left:40px; white-space:normal; box-sizing:border-box; }
.dshRemoteHostRail .dshRemoteAccountExit { width:30px; padding:0; }
.dshRemotePickerLayout>.dshRemoteBrowser { min-width:0; min-height:0; padding:22px 24px 0; gap:16px; }
.dshRemoteWorkspaceSearch { display:flex; align-items:center; gap:9px; flex:none; min-height:40px; padding:0 12px; border:1px solid var(--dsw-alias-border-l2); border-radius:8px; background:var(--dsw-alias-bg-base); color:var(--dsw-alias-label-tertiary); }
.dshRemoteWorkspaceSearch>svg { width:15px; height:15px; flex:none; }
.dshRemoteWorkspaceSearch>input { min-width:0; width:100%; height:38px; padding:0; border:0; outline:0; background:transparent; color:var(--dsw-alias-label-primary); font:inherit; font-size:12px; }
.dshRemoteWorkspaceSearch>input::placeholder { color:var(--dsw-alias-label-tertiary); opacity:1; }
.dshRemoteWorkspaceLists { display:grid; grid-template-columns:repeat(2,minmax(0,1fr)); gap:20px 18px; align-content:start; padding:0 2px 4px; margin:0 -2px; }
.dshRemoteWorkspaceLists>.dshRemoteCodexWorkspaceGroup { min-width:0; margin:0; border-top:1px solid var(--dsw-alias-border-l2); }
.dshRemoteWorkspaceLists>.dshRemoteCodexWorkspaceGroup:only-child { grid-column:1/-1; }
.dshRemoteWorkspaceSourceHeading { box-sizing:border-box; min-height:44px; padding:6px 2px; gap:8px; }
.dshRemoteWorkspaceSourceHeading>strong,.dshRemoteWorkspaceSourceText>strong { font-size:12px; line-height:1.4; overflow-wrap:anywhere; }
.dshRemoteWorkspaceSourceHeading>.dshRemoteAddWorkspace { width:26px; height:26px; border:1px solid var(--dsw-alias-border-l2); border-radius:6px; }
.dshRemoteWorkspaceSourceHeading>.dshRemoteAddWorkspace svg { width:14px; height:14px; }
.dshRemoteWorkspaceLists .dshRemoteDirectoryList { min-height:0; border:0; gap:3px; }
.dshRemoteWorkspaceLists .dshRemoteDirectoryList>button:not(.dshRemoteWorkspaceMore) { position:relative; min-height:68px; flex:none; grid-template-columns:28px minmax(0,1fr); grid-template-rows:auto auto; column-gap:10px; row-gap:4px; align-content:center; padding:12px 24px 12px 10px; border:1px solid transparent; border-radius:8px; }
.dshRemoteWorkspaceLists .dshRemoteDirectoryList>button.isSelected { border-color:color-mix(in srgb,var(--dsw-alias-brand-primary) 28%,transparent); background:color-mix(in srgb,var(--dsw-alias-brand-primary) 9%,transparent); }
.dshRemoteWorkspaceLists .dshRemoteDirectoryList>button.isSelected::after { content:''; position:absolute; top:28px; right:10px; width:5px; height:9px; border-right:1.5px solid var(--dsw-alias-brand-primary); border-bottom:1.5px solid var(--dsw-alias-brand-primary); transform:rotate(45deg); }
.dshRemoteWorkspaceLists .dshRemoteDirectoryList>button>span { font-size:13px; line-height:1.4; }
.dshRemoteWorkspaceLists .dshRemoteDirectoryList>button>small { font-size:10px; line-height:1.5; font-family:var(--dsw-font-mono,ui-monospace,Consolas,monospace); }
.dshRemoteWorkspaceLists .dshRemoteWorkspaceIcon { width:24px; height:24px; color:var(--dsw-alias-label-secondary); }
.dshRemoteWorkspaceLists .isSelected>.dshRemoteWorkspaceIcon { color:var(--dsw-alias-brand-primary); }
.dshRemoteWorkspaceLists .dshRemoteDirectoryList>p { padding:12px 4px; margin:0; font-size:12px; line-height:1.6; }
.dshRemoteWorkspaceLists .dshRemoteWorkspaceMore { min-height:30px; font-size:16px; border:0; }
.dshRemotePickerLayout .dshRemoteOpenBar { box-sizing:border-box; margin:0 -24px; padding:14px 24px; gap:12px; min-height:66px; }
.dshRemoteOpenBar>.dshRemoteOpenActions { margin-left:auto; display:flex; flex-direction:row; gap:8px; align-items:center; flex:none; }
.dshRemoteOpenActions>button { min-height:36px; display:inline-flex; align-items:center; justify-content:center; gap:7px; padding:8px 14px; border:0; border-radius:6px; background:var(--dsw-alias-brand-primary); color:var(--dsw-alias-label-primary-foreground,#fff); font-size:12px; line-height:1.4; cursor:pointer; }
.dshRemoteOpenActions>button>svg { width:15px; height:15px; flex:none; }
.dshRemoteOpenActions>.dshRemotePickerCancel { color:var(--dsw-alias-label-secondary); background:transparent; }
.dshRemoteOpenActions>button:hover:not(:disabled) { filter:brightness(1.08); }
.dshRemoteOpenActions>button:disabled { opacity:1; background:color-mix(in srgb,var(--dsw-alias-label-primary) 10%,transparent); color:var(--dsw-alias-label-secondary); cursor:default; }
.dshRemoteOpenBar .dshRemoteConnectedPanel { top:auto; bottom:calc(100% + 8px); left:0; right:auto; }
.dshRemotePage.hasSelectedHost .dshRemotePageBody>p { padding:8px 24px; margin:0; }
.dshRemotePickerLayout .dshRemoteFolderBrowser { margin:0; }
@media(max-width:920px) {
  .dshRemotePickerLayout { grid-template-columns:220px minmax(0,1fr); }
  .dshRemoteHostRail { padding:20px 16px 16px; }
  .dshRemoteWorkspaceLists { grid-template-columns:minmax(0,1fr); }
}
@media(max-width:700px) {
  .dshRemoteBackdrop { padding:12px; }
  .dshRemotePage.isWorkbench { height:min(780px,calc(100dvh - 24px)); max-height:calc(100dvh - 24px); }
  .dshRemotePageHeader { padding:16px; gap:12px; }
  .dshRemotePageHeader strong,.dshRemotePageTitles>strong { font-size:19px; }
  .dshRemotePageTitleRow { gap:10px; }
  .dshRemotePageEyebrow { flex-wrap:wrap; gap:4px; }
  .dshRemotePageEyebrow .dshRemoteStarLink { display:none; }
  .dshRemotePage.hasSelectedHost .dshRemotePageBack { width:34px; padding:0; }
  .dshRemotePageBack>span { display:none; }
  .dshRemotePage.isWorkbench>.dshRemotePageBody { padding:16px 16px 0; gap:14px; }
  .isWorkbench .dshRemoteSectionHeading { flex-direction:row; align-items:center; }
  .isWorkbench .dshRemotePermissionRow { padding:10px; gap:9px; }
  .dshRemotePermissionRow>.dshRemoteHostControlToggle { gap:8px; font-size:12px; }
  .dshRemotePermissionIcon { display:none; }
  .isWorkbench .dshRemoteHostList>.dshRemoteHostRow { padding:12px; gap:8px; }
  .isWorkbench .dshRemoteHostItemLeft { gap:10px; }
  .dshRemotePageBody>.dshRemoteAccountFooter { margin:0 -16px; padding:14px 16px; gap:8px; flex-wrap:wrap; }
  .dshRemoteAccountFooter>.dshRemoteAccountUpdate { white-space:normal; }
  .dshRemotePage.hasSelectedHost>.dshRemotePageBody { padding:0; gap:0; }
  .dshRemotePickerLayout { display:flex; flex-direction:column; }
  .dshRemoteHostRail { display:grid; grid-template-columns:minmax(0,1fr) minmax(0,1fr); gap:12px 16px; padding:14px 16px; border-right:0; border-bottom:1px solid var(--dsw-alias-border-l2); max-height:42%; flex:none; }
  .dshRemoteHostSpecs { padding:0; border:0; gap:4px; font-size:10px; }
  .dshRemoteHostSpecs>div { gap:5px; }
  .dshRemoteSelectedDirectory { grid-column:1/-1; gap:5px; }
  .dshRemoteSelectedDirectory>strong { padding:5px 8px; max-height:52px; overflow:auto; }
  .dshRemoteHostRail>.dshRemoteAccountFooter { grid-column:1/-1; padding:8px 0 0; }
  .dshRemoteHostRail .dshRemoteAccountAvatar { width:24px; height:24px; }
  .dshRemoteHostRail .dshRemoteAccountCopy>.dshRemoteServerNotice { display:none; }
  .dshRemotePickerLayout>.dshRemoteBrowser { padding:16px 16px 0; gap:12px; }
  .dshRemotePickerLayout .dshRemoteOpenBar { margin:0 -16px; padding:12px 16px; min-height:60px; align-items:center; }
  .dshRemoteOpenBar .dshRemoteConnectedCount { padding:0; background:transparent; font-size:10px; }
}
@media(max-width:380px) {
  .dshRemoteBrandMark { width:32px; height:32px; }
  .dshRemotePageActions { gap:4px; }
  .dshRemotePermissionRow>.dshRemoteConnectedMenu .dshRemoteConnectedCount { font-size:10px; padding:4px; }
  .isWorkbench .dshRemoteHostItemIcon { width:30px; height:30px; }
  .isWorkbench .dshRemoteHostItemText small { font-size:10px; }
}
@media(prefers-reduced-motion:reduce) {
  .isWorkbench .dshRemoteHostList>.dshRemoteHostRow { transition:none; }
}
`
