import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_URL } from '../../Config'

import MainImage from './Sections/MainImage'
import GridCard from './Sections/GridCard'

import { Typography, Row } from 'antd'
const { Title } = Typography

function LandingPage() {
    const [Movies, setMovies] = useState([])
    const [CurrentPage, setCurrentPage] = useState(0)
    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
         fetchMovies(endpoint)
    // eslint-disable-next-line react-hooks/exhaustive-deps   
    }, [])

    const fetchMovies = path => {
        fetch(path)
        .then(response=> response.json())
        .then(response=> {
            console.log(response);
            setMovies([...Movies, ...response.results])
            setCurrentPage(response.page)
        })
    }

    const handleClick = () => {
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
      fetchMovies(endpoint)
    }
    
    return (
        <div style={{width:'100%', margin:'0'}}>
            {/* Main Image Here */}
            {Movies[0] && 
            <MainImage image={`${IMAGE_URL}w1280${Movies[0].backdrop_path}`} 
            title={Movies[0].original_title} text={Movies[0].overview}  />
            }
            
            {/* Body Section Here */}
            <div style={{ width: '85%', margin:'1rem auto'}}>
                <Title level={2}>Latest Movie</Title>
                < hr />

                {/* Gird Cards */}

                <Row gutter={[16, 16]}>
                    {Movies && Movies.map((movie, index) =>(
                        <React.Fragment key={index}>
                            <GridCard 
                            image={movie.poster_path && `${IMAGE_URL}w500${movie.poster_path}`}
                            movieId={movie.id}
                             />
                        </React.Fragment>
                    ))}

                </Row>

                {/* Auto Load More Button */}
                <br />
                <div style={{display:'flex', justifyContent:'center'}}>
                    <button onClick={handleClick} > Load More </button>
                </div>

            </div>

        </div>
    )
}

export default LandingPage
