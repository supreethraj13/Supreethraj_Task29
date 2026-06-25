import { useState, useEffect } from 'react'

function useFetch(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Fetch data when URL changes
    fetch(url, options)
      .then((response) => response.json())
      .then((result) => {
        setData(result)
        setLoading(false)
        setError(null)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [url, JSON.stringify(options)])

  return { data, loading, error }
}

export default useFetch
