import { useState, useEffect, useCallback } from 'react'

// Simple in-memory cache for requests in this session.
const cache = new Map()

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [reloadCount, setReloadCount] = useState(0)

  const optionsJson = JSON.stringify(options)
  const cacheKey = `${url}|${optionsJson}`

  useEffect(() => {
    if (!url) return

    const controller = new AbortController()
    const signal = controller.signal

    const loadData = async () => {
      setLoading(true)
      setError(null)

      if (cache.has(cacheKey)) {
        setData(cache.get(cacheKey))
        setLoading(false)
        return
      }

      try {
        const response = await fetch(url, {
          ...options,
          signal,
        })

        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status}`)
        }

        const json = await response.json()
        cache.set(cacheKey, json)

        if (!signal.aborted) {
          setData(json)
        }
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Fetch failed')
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      controller.abort()
    }
  }, [url, optionsJson, cacheKey, reloadCount])

  const refetch = useCallback(() => {
    setReloadCount((count) => count + 1)
  }, [])

  return { data, loading, error, refetch }
}

export default useFetch
