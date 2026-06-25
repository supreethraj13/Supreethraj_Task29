import useFetch from './hooks/useFetch.jsx'
import './App.css'

function App() {
  const url = 'https://jsonplaceholder.typicode.com/photos?_limit=12'
  const { data: photos, loading, error } = useFetch(url)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Photo Gallery</h1>
        <p>Learning React hooks with a simple custom fetch hook</p>
      </header>

      {loading && <p className="status">Loading photos...</p>}
      {error && <p className="status error">Error: {error}</p>}

      <div className="photo-grid">
        {photos?.map((photo) => (
          <div key={photo.id} className="photo-card">
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
