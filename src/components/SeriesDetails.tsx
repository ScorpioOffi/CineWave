import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import '../css/SeriesDetails.css';

const API_KEY = '7621f03a59813df069fb4c80cb30ec89';
const API_BASE_URL = 'https://api.themoviedb.org/3';

const SeriesDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [serieDetails, setSerieDetails] = useState<any>(null);

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

    const getYearFromDate = (date: string) => {
        const year = new Date(date).getFullYear();
        return year;
      };
    
    return (
      <div className='body'>
        <h2>{serieDetails.name}</h2>
        <Link to={`/accueil/series/${serieDetails.id}`}>
          <img className='baniere'
            src={serieDetails.poster_path ? `https://image.tmdb.org/t/p/w300/${serieDetails.poster_path}` : 'https://i.etsystatic.com/8515241/r/il/e246f8/519356100/il_570xN.519356100_ra4x.jpg'}
            alt={serieDetails.name}
          />
        </Link>
        <p>{serieDetails.overview}</p> 
        <p>{serieDetails.number_of_seasons} Seasons</p>
        <p>{serieDetails.number_of_episodes} Episodes</p>
        <p>{serieDetails.genres.map((genre: { name: any; }) => genre.name).join(', ')}</p>
        <p>{getYearFromDate(serieDetails.first_air_date)}</p>
        <div className='espace'>
          <h3>Next Épisodes</h3>
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
    );
  }

  return (
    <div>
      Chargement en cours...
    </div>
  );
};

export default SeriesDetails;