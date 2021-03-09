import React, { useEffect, useState } from 'react'
import {Row, Button } from 'antd';

import { API_URL, API_KEY, IMAGE_URL, IMAGE_SIZE } from '../../Config'
import GridCard from '../LandingPage/Sections/GridCard';
import MainImage from '../../views/LandingPage/Sections/MainImage';
import MovieInfo from './Sections/MovieInfo';
import Favorite from './Sections/Favorite';


export default function MoviedetailPage(props) {
    const movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Cast, setCast] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)

    useEffect(() => {
     
         fetch(`${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
         .then(response => response.json())
         .then(response => {
             // console.log(response)
             setMovie(response)

             fetch(`${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
             .then(response => response.json())
             .then(response => {
                 console.log(response);
                  setCast(response.cast) })
         })
         // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }


  return (

    
    <div>
    {/* Header */}
    {Movie &&
        <MainImage
            image={`${IMAGE_URL}${IMAGE_SIZE}${Movie.backdrop_path}`}
            title={Movie.original_title}
            text={Movie.overview}
        />
    }


    {/* Body */}
    <div style={{ width: '85%', margin: '1rem auto' }}>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
           <Favorite 
           userForm={localStorage.getItem('userId')}
           movieId={movieId}
           movieInfo={Movie}
           />
        </div>

        <MovieInfo movie={Movie} />


        <br />
        {/* Actors Grid*/}
        <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
        <Button onClick={toggleActorView}>Toggle Actor View </Button>
        </div>
        
        {ActorToggle && 
        <Row gutter={[16, 16]}>
        {Cast && Cast.map((cast, index) =>(
            <React.Fragment key={index}>
                <h4>{cast.name}</h4> 
                As <h5>{cast.character}</h5>
                {cast.profile_path &&
                <GridCard actor image={`${IMAGE_URL}w500${cast.profile_path}`} />
                }
                
            </React.Fragment>
        ))}
        </Row>
        }
        

    </div>

</div>
        
  )
}
    