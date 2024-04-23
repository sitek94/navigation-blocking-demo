export function openInNewTab(url: string) {
  window.open(url, '_blank', 'noopener')
}

export function openInNewWindow(url: string) {
  window.open(url, '_blank')
}
