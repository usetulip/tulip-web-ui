// The docs open in their own tab so visitors don't lose their place on the marketing site.
export function docsLinkProps(href: string) {
  return href.startsWith('/docs') ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}
