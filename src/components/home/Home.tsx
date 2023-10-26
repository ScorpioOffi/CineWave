import { useState, useEffect } from 'react'
import './Home.css'
import { Link } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import colors from '../../ChartColor/Chart'

const API_KEY = '7621f03a59813df069fb4c80cb30ec89'
const API_BASE_URL = 'https://api.themoviedb.org/3'
const SERIES_ENDPOINT = '/discover/tv'

interface Series {
  id: number
  name: string
  poster_path: string
}

interface RandomSeries {
  id: number
  name: string
  overview: string
  poster_path: string
  number_of_seasons: number
  number_of_episodes: number
  genres: { id: number; name: string }[]
  first_air_date: string
}

export function Home() {
  const [series, setSeries] = useState<Series[]>([])
  const [randomSeries, setRandomSeries] = useState<RandomSeries | null>(null)
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null)

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        let url = `${API_BASE_URL}${SERIES_ENDPOINT}?api_key=${API_KEY}`

        if (selectedGenre) {
          url += `&with_genres=${selectedGenre}`
        }

        const response = await fetch(url)

        if (response.ok) {
          const data = await response.json()
          setSeries(data.results)
        } else {
          console.error('Échec de la récupération des séries')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchSeries()
  }, [selectedGenre])

  useEffect(() => {
    const fetchRandomSeries = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/tv/${Math.floor(
            Math.random() * 1000
          )}?api_key=${API_KEY}`
        )

        if (response.ok) {
          const data = await response.json()
          setRandomSeries(data)
        } else {
          console.error('Échec de la récupération de la série aléatoire')
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchRandomSeries()
  }, [])

  const handleGenreChange = (genreId: number) => {
    setSelectedGenre(genreId)
  }

  const handleShowAll = () => {
    setSelectedGenre(null)
  }

  const addToWatchlist = (serieId: number) => {
    // Gestion pour l'ajout à la liste de séries suivies.
  }

  const getYearFromDate = (date: string) => {
    const year = new Date(date).getFullYear()
    return year
  }

  return (
    <div>
      <Navbar/>
      {randomSeries && (
        <div>
          <h2 style={{color : colors.secondary}}>Série Aléatoire</h2>
          <Link to={`/accueil/series/${randomSeries.id}`}>
            <img className='layout'
              src={
                randomSeries.poster_path
                  ? `https://image.tmdb.org/t/p/w300/${randomSeries.poster_path}`
                  : 'https://i.etsystatic.com/8515241/r/il/e246f8/519356100/il_570xN.519356100_ra4x.jpg'
              }
              alt={randomSeries.name}
            />
          </Link>
          <div className='layout-name'>
            <h3>{randomSeries.name}</h3>
            <p>{randomSeries.overview}</p>
            <p>{randomSeries.number_of_seasons} Season</p>
            <p>{randomSeries.number_of_episodes} Episodes</p>
            <p>{randomSeries.genres.map(genre => genre.name).join(', ')}</p>
            <p>{getYearFromDate(randomSeries.first_air_date)}</p>
            <button onClick={() => addToWatchlist(randomSeries.id)}>+</button>
          </div>
        </div>
      )}
      <h1>Toutes les Séries</h1>
      <div className='layout-button'>
        <button onClick={handleShowAll}>Tout afficher</button>
        <button onClick={() => handleGenreChange(28)}>Action</button>
        <button onClick={() => handleGenreChange(35)}>Comédie</button>
        <button onClick={() => handleGenreChange(18)}>Drame</button>
        <button onClick={() => handleGenreChange(10749)}>Romance</button>
        <button onClick={() => handleGenreChange(878)}>Science-Fiction</button>
        <button onClick={() => handleGenreChange(10752)}>Guerre</button>
      </div>
      <ul className='loik'>
        {series.map(serie => (
          <li key={serie.id}>
            <Link to={`/accueil/series/${serie.id}`}>
              <img className='loik-image'
                src={
                  serie.poster_path
                    ? `https://image.tmdb.org/t/p/w300/${serie.poster_path}`
                    : 'https://i.etsystatic.com/8515241/r/il/e246f8/519356100/il_570xN.519356100_ra4x.jpg'
                }
                alt={serie.name}
              />
              <button className='loik-button' onClick={() => addToWatchlist(serie.id)}>+</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Home
