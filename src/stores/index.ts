import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { IGenre, responseType } from '../models'

interface GenreStore {
  genres?: IGenre[]
  setGenres: (genres: IGenre[]) => void
}

export const useGenreStore = create<GenreStore>()(
  persist(
    (set) => ({
      genres: undefined,
      setGenres: (genres) => set({ genres }),
    }),
    {
      name: 'genre-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

interface IDetailMuvieStore {
  selectedMuvieGanresId?: number[]
  muvieId?: number
  genres?: IGenre[]
  setGenresId: (id: number[]) => void
  setGenres: (genres: IGenre[]) => void
  setMuvieId: (id: number) => void
}

export const useDetailMuvieStore = create<IDetailMuvieStore>()(
  persist(
    (set) => ({
      selectedMuvieGanresId: undefined,
      muvieId: undefined,
      genres: undefined,
      setGenresId: (selectedMuvieGanresId) => set({ selectedMuvieGanresId }),
      setGenres: (genres) => set({ genres }),
      setMuvieId: (muvieId) => set({ muvieId }),
    }),
    {
      name: 'detail-muvie-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)

interface IMuvieType {
  type: string
  title: string
  resType: responseType
}

interface IMuvieTypes {
  types: IMuvieType[]
}

export const useMuviesTypesStore = create<IMuvieTypes>(() => ({
  types: [
    { type: "top-muvies", title: "Top Muvies", resType: "top_rated" },
    { type: "upcoming-muvies", title: "Upcoming Muvies", resType: "upcoming" },
    { type: "popular-muvies", title: "Popular Muvies", resType: "popular" },
  ]
}))

interface ISearchStore {
  searchGenreId?: number
  searchGenreName: string
  setSearchGenreId: (genreId: number) => void
  setSearchGenreName: (genreName: string) => void
}

export const useSearchMuvieStore = create<ISearchStore>()(
  persist(
    (set) => ({
      searchGenreId: undefined,
      searchGenreName: "",
      setSearchGenreId: (searchGenreId) => set({ searchGenreId }),
      setSearchGenreName: (searchGenreName) => set({ searchGenreName }),
    }),
    {
      name: 'search-muvie-store',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
