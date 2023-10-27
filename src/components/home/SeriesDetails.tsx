import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../navbar/Navbar';
import './SeriesDetails.css';
import Comment from '../comment/Comment';

const API_KEY = '7621f03a59813df069fb4c80cb30ec89';
const API_BASE_URL = 'https://api.themoviedb.org/3';

const SeriesDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [serieDetails, setSerieDetails] = useState<any>(null);

  const getYearFromDate = (date: string) => {
    const year = new Date(date).getFullYear();
    return year;
  };

  const addToWatchlist = (serieId: number) => {
    // Gestion pour l'ajout à la liste de séries suivies.
  };

  useEffect(() => {
    const fetchSerieDetails = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/tv/${id}?api_key=${API_KEY}`);

        if (response.ok) {
          const data = await response.json();
          setSerieDetails(data);
        } else {
          console.error('Échec de la récupération des détails de la série');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSerieDetails();
  }, [id]);

  if (serieDetails) {
    return (
      <>
      <div>
        <Navbar/>
        <h2>{serieDetails.name}</h2>
        <Link to={`/accueil/series/${serieDetails.id}`}>
          <img className='layout-Details'
            src={serieDetails.backdrop_path ? `https://image.tmdb.org/t/p/w300/${serieDetails.backdrop_path}` : 'https://i.etsystatic.com/8515241/r/il/e246f8/519356100/il_570xN.519356100_ra4x.jpg'}
            alt={serieDetails.name}
          />

        </Link>
        <div className='details-name'>
          <div className='text-details'>
        <p>{serieDetails.overview}</p>
          </div>
          <div className='details-SEN'>
        <p>{serieDetails.number_of_seasons} Seasons</p>
        <p>{serieDetails.number_of_episodes} Episodes</p>
        <p>{serieDetails.genres.map((genre: { name: any; }) => genre.name).join(', ')}</p>
        <p>{getYearFromDate(serieDetails.first_air_date)}</p>
        </div>
        </div>
        <button onClick={() => addToWatchlist(serieDetails.id)}>+</button>
        <Comment />


        <div>
          {serieDetails.seasons ? (
            serieDetails.seasons.map((season: any) => (
              <div key={season.id}>
                <h4>Saison {season.season_number}</h4>
                {season.episodes ? (
                  season.episodes.map((episode: any) => (
                    <div key={episode.id}>
                      <p>Épisode {episode.episode_number}: {episode.name}</p>
                    </div>
                  ))
                ) : (
                  <p>Pas d'épisodes disponibles pour cette saison.</p>
                )}
              </div>
          
            ))
          ) : (
            <p>Pas d'informations sur les saisons disponibles.</p>
          )}
        </div>

      </div>

    </>
    

    );
  }

  return (
    <div>
      Chargement en cours...
    </div>
  );
};

export default SeriesDetails;