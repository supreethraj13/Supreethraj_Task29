import useFetch from './hooks/useFetch.jsx'
import './App.css'

function App() {
  // Vite requires environment variables to start with VITE_.
  const apiKey = import.meta.env.VITE_IMAGE_API_KEY

  const apiUrl = apiKey
    ? 'https://api.pexels.com/v1/curated?per_page=12'
    : 'https://jsonplaceholder.typicode.com/photos?_limit=12'

  const requestOptions = apiKey
    ? {
        headers: {
          Authorization: apiKey,
        },
      }
    : {}

  const { data, loading, error, refetch } = useFetch(apiUrl, requestOptions)
  const photos = data?.photos ?? data

  return (
    <div className="app">
      <header className="app-header">
        <h1>Photo Gallery</h1>
        <p>Fetch images with a custom hook, then keep it simple and easy to follow.</p>
      </header>

      <div className="controls">
        <button type="button" onClick={refetch}>
          Reload images
        </button>
        {!apiKey && (
          <span className="warning">No API key found. Showing fallback photos.</span>
        )}
      </div>

      {loading && <p className="status">Loading images…</p>}
      {error && <p className="status error">{error}</p>}

      <div className="photo-grid">
        {photos?.map((photo) => {
          const imageSrc = apiKey
            ? photo.src.large
            : `https://via.placeholder.com/320x200?text=Photo+${photo.id}`
          const title = apiKey ? photo.alt : photo.title

          return (
            <div key={photo.id} className="photo-card">
              <img src={imageSrc} alt={title} />
              <p>{title}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
