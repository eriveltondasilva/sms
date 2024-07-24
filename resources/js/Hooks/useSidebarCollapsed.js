import { useCallback, useEffect, useState } from 'react'

//
export function useSidebarCollapsed() {
  const getInitialState = () => {
    const storedState = localStorage.getItem('is-sidebar-collapsed')
    return storedState === null ? false : JSON.parse(storedState)
  }

  const [isCollapsed, setIsCollapsed] = useState(getInitialState)

  useEffect(() => {
    localStorage.setItem('is-sidebar-collapsed', JSON.stringify(isCollapsed))
  }, [isCollapsed])

  const handleCollapse = useCallback(() => setIsCollapsed((prev) => !prev), [])

  return { isCollapsed, handleCollapse }
}
