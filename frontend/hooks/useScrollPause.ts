import { useEffect } from 'react'

/**
 * Hook to pause animations during scroll for improved performance
 * Adds 'is-scrolling' class to body during scroll, pausing heavy animations
 * Removes class 150ms after scroll ends
 */
export const useScrollPause = () => {
  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null

    const handleScroll = () => {
      // Add scrolling class immediately
      document.body.classList.add('is-scrolling')

      // Clear existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }

      // Remove scrolling class 150ms after last scroll event
      scrollTimeout = setTimeout(() => {
        document.body.classList.remove('is-scrolling')
        scrollTimeout = null
      }, 150)
    }

    // Add scroll listener with passive flag for better performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
    }
  }, [])
}
