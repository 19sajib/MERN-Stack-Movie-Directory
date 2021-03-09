import React, {useEffect, useState} from 'react'
import './favorite.css'
import axios from 'axios'
import {Popover} from 'antd'
import { IMAGE_URL, POSTER_SIZE } from '../../Config'

export default function FavoritePage() {

    const variables = { userForm: localStorage.getItem('userId')}

    const [FavoritedMovies, setFavoritedMovies] = useState([])

    useEffect(() => {
        fetchFavoritedMovies()

    }, [])

    const fetchFavoritedMovies = () => {
        axios.post('api/favorite/getFavoritedMovie', variables)
        .then(response => {
            if (response.data.success) {
                setFavoritedMovies(response.data.favorites) 
            } else {
                alert('Failed to get favorited movies')
            }
        })
    }

    const onClickRemove = (movieId) => {
        const variable = {
            movieId: movieId,
            userForm: localStorage.getItem('userId')
        }
        axios.post('/api/favorite/removeFromFavorite', variable)
           .then(response => {
               if (response.data.success) { 
                fetchFavoritedMovies()
               } else {
                   alert('Falied to remove from the Favorite list')
                   
               }
           })
    }

    const renderTableBody = FavoritedMovies.map((movie, index) => {
         // console.log(movie);
        const content = (
            <div>
                {movie ?
                <img src={`${IMAGE_URL}${POSTER_SIZE}${movie.movieImage}`} />
                :
                "No Image" }
            </div>
        )
         
         return <tr>
              <Popover content={content} title={`${movie.movieTitle}`}>
              <td>{movie.movieTitle}</td>
              </Popover>
              <td>{movie.movieRunTime} mins</td>
              <td><button onClick={() => onClickRemove(movie.movieId)}>Remove From Favorites</button></td>
          </tr>
    })


    return (
        <div style={{width: '85%', margin: '3rem auto'}} >
            <h3>My Favorite Movies</h3>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title </th>
                        <th>Movie Runtime </th>
                        <th>Remove From Favorites </th>
                    </tr>
                </thead>

                <tbody>

                    {renderTableBody}

                </tbody>
            </table>
        </div>
    )
}
