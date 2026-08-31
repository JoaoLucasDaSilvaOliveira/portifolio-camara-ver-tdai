import type { ObjectDirective } from 'vue'

const observers = new WeakMap<HTMLElement, IntersectionObserver>()

const scrollReveal: ObjectDirective<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add('scroll-reveal')

    const delay = Number(binding.value ?? 0)
    if (Number.isFinite(delay) && delay > 0) {
      el.style.setProperty('--reveal-delay', `${delay}ms`)
    }

    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      el.classList.add('is-visible')
      return
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
      el.classList.add('is-visible')
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      el.classList.add('is-visible')
      observer.disconnect()
      observers.delete(el)
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' })

    observers.set(el, observer)
    observer.observe(el)
  },
  unmounted(el) {
    observers.get(el)?.disconnect()
    observers.delete(el)
  },
}

export default scrollReveal
