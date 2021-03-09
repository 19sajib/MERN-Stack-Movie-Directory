import React, { useEffect, useState } from 'react'
import { Button } from 'antd';
import axios from 'axios'

function Favorite(props) {
    const variable = {
        userForm: props.userForm,
        movieId: props.movieId,
        movieTitle: props.movieInfo.original_title,
        movieImage: props.movieInfo.backdrop_path,
        movieRunTime: props.movieInfo.runtime
    }
 
    const [favoriteNumber, setfavoriteNumber] = useState(0)
    const [favorited, setfavorited] = useState(false)

    useEffect(() => {
       
        axios.post('/api/favorite/favoriteNumber', variable)
        .then(response=> {
            if (response.data.success) {
                setfavoriteNumber(response.data.favoriteNumber)
            } else {
                alert('Falied to add favorite')
            }
        })

        axios.post('/api/favorite/favorited', variable)
        .then(response=> {
            if (response.data.success) {
                setfavorited(response.data.favorited)
            } else {
                alert('Falied to get favorite info')
            }
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onFavoriteClick = () => {
       if (favorited) {
           // When it's favorite movie
           axios.post('/api/favorite/removeFromFavorite', variable)
           .then(response => {
               if (response.data.success) {
                   setfavoriteNumber(favoriteNumber - 1)
                   setfavorited(!favorited)
               } else {
                   alert('Falied to remove from the Favorite list')
                   
               }
           })

           
       } else {
           // when movie isn't on favorite list
           axios.post('/api/favorite/addToFavorite', variable)
           .then(response => {
               if (response.data.success) {
                   setfavoriteNumber(favoriteNumber + 1)
                   setfavorited(!favorited)
               } else {
                   alert('Falied to add Favorite list')
                   
               }
           })
           
       }
    }

    return (
        <div>
             <Button onClick={onFavoriteClick}>{favorited ? "Remove from Favorite" : "Add to Favorite"} {favoriteNumber}</Button>
        </div>
    )
}

export default Favorite
