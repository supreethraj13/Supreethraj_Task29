import useFetch from './hooks/useFetch.jsx'
import './App.css'

function App() {
  const apiKey =
    import.meta.env.VITE_IMAGE_API_KEY || process.env.REACT_APP_IMAGE_API_KEY

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

  const { data, loading, error } = useFetch(apiUrl, requestOptions)

  const photos = data?.photos ?? data

  return (
    <div className="gallery-app">
      <header className="gallery-header">
        <h1>Photos</h1>
        <p>Example using a custom hook to fetch photo data from an API.</p>
        {!apiKey && (
          <p className="status-text status-warning">
            No image API key loaded. Falling back to placeholder photos.
          </p>
        )}
      </header>

      {loading && <p className="status-text">Loading photos...</p>}
      {error && <p className="status-text status-error">Error: {error}</p>}

      <div className="photo-grid">
        {photos &&
          photos.map((photo) => {
            const imageSrc = apiKey
              ? photo.src.large
              : `https://via.placeholder.com/600x400/0f172a/ffffff?text=Photo+${photo.id}`
            const title = apiKey ? photo.alt : photo.title

            return (
              <article key={photo.id} className="photo-card">
                <img
                  src={imageSrc}
                  alt={title}
                  onError={(event) => {
                    event.target.src = `https://via.placeholder.com/600x400/334155/ffffff?text=Image+missing`
                  }}
                />
                <p>{title}</p>
              </article>
            )
          })}
      </div>
    </div>
  )
}

export default App
