
import { useState, Suspense, useEffect } from 'react'
import { createResource as fetchData } from './helper'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Spinner from './components/Spinner'
import AlbumView from "./ArtistComp/AlbumView";
import ArtistView from "./ArtistComp/ArtistView";
import Gallery from './components/Gallery';
import SearchBar from './components/SearchBar';

function App() {
  let [searchTerm, setSearchTerm] = useState('')
  let [message, setMessage] = useState('Search for Music!')
  let [data, setData] = useState(null)

  useEffect(() => {
    if (searchTerm) {
      document.title=`${searchTerm} Music`
      console.log(fetchData(searchTerm))
      setData(fetchData(searchTerm))
  }
  }, [searchTerm])

  const handleSearch = (e, term) => {
    e.preventDefault()
    setSearchTerm(term)
  }

  const renderGallery = () => {
    if(data){
      return (
        <Suspense fallback={<Spinner />}>
          <Gallery data={data} />
        </Suspense>
      )
    }
  }

//   return (
//     <div className="App">
//       <SearchBar handleSearch={handleSearch} />
//       {message}
//       {renderGallery()}

  return (
    <div>
      {message}
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar handleSearch={handleSearch} />
                {renderGallery()}
              </>
            }
          />
          <Route path="/album/:id" element={<AlbumView />} />
          <Route path="/artist/:id" element={<ArtistView />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;