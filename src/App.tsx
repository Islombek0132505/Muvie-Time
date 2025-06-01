import { Route, Routes } from "react-router"
import Home from "./pages/home/home"
import Navigation from "./components/navigation"
import DetailMuvie from "./pages/detail-muvie/detail-muvie"
import Search from "./pages/search/search"
import Muvies from "./pages/muvie/muvie"
import MuvieService from "./services/muvie-service"
import { useEffect } from "react"
import type { IGenresData } from "./models"
import { useGenreStore } from "./stores"

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
        <Route path="/muvie/:id" element={<DetailMuvie/>}/>
        <Route path="/search/:type" element={<Search/>}/>
        <Route path="/:type" element={<Muvies/>}/>
      </Routes>
    </>
  )
}

export default App