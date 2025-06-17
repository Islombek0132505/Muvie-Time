import { Route, Routes } from "react-router"
import Home from "./pages/home/home"
import Navigation from "./components/navigation"
import DetailMuvie from "./pages/detail-muvie/detail-muvie"
import Search from "./pages/search/search"
import Muvies from "./pages/muvie/muvies"
import MuvieService from "./services/muvie-service"
import { useEffect } from "react"
import type { IGenresData } from "./models"
import { useGenreStore } from "./stores"
import NotFound from "./pages/not-found/not-found"
import SearchResults from "./pages/search/search-results"

function App() {

  const muvieService = new MuvieService()
  const setGenres = useGenreStore(state => state.setGenres)
  useEffect(() => {
    muvieService.getGenres().then(data => {
        try {
            const genreData = data as IGenresData                
            setGenres(genreData.genres)
        } catch (error) {
            throw new Error(`Error: ${error}`)
        }
    })
  })

  return (
    <>
      <Navigation/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="/about-muvie/:name" element={<DetailMuvie/>}/>
        <Route path="/search" element={<Search/>}/>
        <Route path="/search/results" element={<SearchResults/>}/>
        <Route path="/:type" element={<Muvies typeComp="fromHome"/>}/>
        <Route path="/muvies/:type" element={<Muvies typeComp="fromDetailMuvie"/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App