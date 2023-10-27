import React, { useState, useEffect } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import colors from '../../ChartColor/Chart';

const API_KEY = '7621f03a59813df069fb4c80cb30ec89';
const API_BASE_URL = 'https://api.themoviedb.org/3';
const SERIES_ENDPOINT = '/discover/tv';

interface Series {
  id: number;
  name: string;
  poster_path: string;
}

interface RandomSeries {
  id: number;
  name: string;
  overview: string;
  backdrop_path: string;
  number_of_seasons: number;
  number_of_episodes: number;
  genres: { id: number; name: string }[];
  first_air_date: string;
}

export function Home() {
  const [series, setSeries] = useState<Series[]>([]);
  const [randomSeries, setRandomSeries] = useState<RandomSeries | null>(null);
  const [selectedGenre, setSelectedGenre] = useState<number | null>(null);
  const [searchText, setSearchText] = useState('');
  const [filteredSeries, setFilteredSeries] = useState<Series[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchRandomSeries = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/tv/${Math.floor(
            Math.random() * 1000
          )}?api_key=${API_KEY}`
        );

        if (response.ok) {
          const data = await response.json();
          setRandomSeries(data);
        } else {
          console.error('Échec de la récupération de la série aléatoire');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRandomSeries();
  }, []);

  useEffect(() => {
    const fetchSeries = async () => {
      try {
        let url = `${API_BASE_URL}${SERIES_ENDPOINT}?api_key=${API_KEY}&page=${currentPage}`;

        if (selectedGenre) {
          url += `&with_genres=${selectedGenre}`;
        }

        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setSeries(data.results);
          setTotalPages(data.total_pages);
        } else {
          console.error('Échec de la récupération des séries');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSeries();
  }, [selectedGenre, currentPage]);

  useEffect(() => {
    const filterSeries = () => {
      const filtered = series.filter((serie) =>
        serie.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredSeries(filtered);
    };

    filterSeries();
  }, [searchText, series]);

  const handleGenreChange = (genreId: number) => {
    setSelectedGenre(genreId);
  };

  const handleShowAll = () => {
    setSelectedGenre(null);
  };

  const addToWatchlist = (serieId: number) => {
    // Gestion pour l'ajout à la liste de séries suivies.
  };

  const getYearFromDate = (date: string) => {
    const year = new Date(date).getFullYear();
    return year;
  };

  return (
    <div>
      <Navbar />
      {randomSeries && (
        <div>
          <h2 style={{ color: colors.secondary }}>Série Aléatoire</h2>
          <Link to={`/accueil/series/${randomSeries.id}`}>
            <img
              className="layout"
              src={
                randomSeries.backdrop_path
                  ? `https://image.tmdb.org/t/p/w300/${randomSeries.backdrop_path}`
                  : 'https://media.istockphoto.com/id/1009987948/fr/vectoriel/tv-sans-illustration-de-fond-du-signal-illustration-vectorielle-illustration-eps10.jpg?s=612x612&w=0&k=20&c=W-nRFPCpv82twbmJPaOi_0_Z5yk8Lu9fCZoHrNKJPCM='
              }
              alt={randomSeries.name}
            />
          </Link>
          <div className="layout-name">
            <h3>{randomSeries.name}</h3>
            <div className='overview'>
              <p>{randomSeries.overview}</p>
            </div>
            <div className='details'>
              <p>{randomSeries.number_of_seasons} Season</p>
              <p>{randomSeries.number_of_episodes} Episodes</p>
              <p>{getYearFromDate(randomSeries.first_air_date)}</p>
              <p>{randomSeries.genres.map(genre => genre.name).join(', ')}</p>
            </div>
            <button className='buttton' onClick={() => addToWatchlist(randomSeries.id)}>+</button>
          </div>
        </div>
      )}
      <h1>Toutes les Séries</h1>
      <input className='recherche'
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <div className="pagination">
        {currentPage > 1 && (
          <button className='button-pré'onClick={() => setCurrentPage(currentPage - 1)}>Précédent</button>
        )}
        <span>Page {currentPage} de {totalPages}</span>
        {currentPage < totalPages && (
          <button className='button-pré' onClick={() => setCurrentPage(currentPage + 1)}>Suivant</button>
        )}
      </div>
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
        {filteredSeries.map((serie) => (
          <li key={serie.id}>
            <Link to={`/accueil/series/${serie.id}`}>
              <img className='tab-image'
                src={
                  serie.poster_path
                    ? `https://image.tmdb.org/t/p/w300/${serie.poster_path}`
                    : 'https://media.istockphoto.com/id/1009987948/fr/vectoriel/tv-sans-illustration-de-fond-du-signal-illustration-vectorielle-illustration-eps10.jpg?s=612x612&w=0&k=20&c=W-nRFPCpv82twbmJPaOi_0_Z5yk8Lu9fCZoHrNKJPCM='
                }
                alt={serie.name}
              />
              <button
                className='loik-button'
                onClick={() => addToWatchlist(serie.id)}
              >
                +
              </button>
              <div className='title'>
                <h4>{serie.name}</h4>
              </div>
            </Link>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default Home;
