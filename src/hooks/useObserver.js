import { useEffect, useRef } from 'react'

export const useObserver = (ref, callback, canLoad, isLoading) => {
  // пример использования useRef для сохраниения данных от рендера к рендеру
  const observer = useRef()

  useEffect(() => {
    if (isLoading) return
    if (observer.current) observer.current.disconnect()

    let cb = function (entries, observer) {
      // проверка только на появление элемента в зоне видимости
      if (entries[0].isIntersecting && canLoad) {
        callback()
      }
    }

    observer.current = new IntersectionObserver(cb)
    // div lastElement который берем useRef теперь наблюдаемый
    observer.current.observe(ref.current)
  }, [isLoading])
}
