import useFetch from './hooks/useFetch.jsx'
import './App.css'

function App() {
  const apiKey = import.meta.env.VITE_IMAGE_API_KEY
  
  // Use Pexels API if key exists, otherwise use JSONPlaceholder
  const url = apiKey
    ? 'https://api.pexels.com/v1/curated?per_page=12'
    : 'https://jsonplaceholder.typicode.com/photos?_limit=12'
  
  const options = apiKey
    ? { headers: { Authorization: apiKey } }
    : {}
  
  const { data, loading, error } = useFetch(url, options)
  
  // Pexels returns data.photos, JSONPlaceholder returns array directly
  const photos = data?.photos || data

  return (
    <div className="app">
      <header className="app-header">
        <h1>Photo Gallery</h1>
        <p>Learning React hooks with a simple custom fetch hook</p>
      </header>

      {loading && <p className="status">Loading photos...</p>}
      {error && <p className="status error">Error: {error}</p>}

      <div className="photo-grid">
        {photos?.map((photo) => {
          const imgSrc = apiKey ? photo.src.medium : photo.thumbnailUrl
          const title = apiKey ? photo.alt : photo.title
          return (
            <div key={photo.id} className="photo-card">
              <img src={imgSrc} alt={title} />
              <p>{title}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default App
