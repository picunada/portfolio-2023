export function scrollPosition(el: Element) {
  const rect = el.getBoundingClientRect()

  if (rect.y > rect.height)
    return 'over'

  if (rect.y < -rect.height)
    return 'under'
}
