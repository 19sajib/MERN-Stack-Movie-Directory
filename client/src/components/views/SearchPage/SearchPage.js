import React,{useState, useEffect} from 'react'
import { Input, Row, Typography } from 'antd';
import { SEARCH_URL, IMAGE_URL} from '../../Config'
import GridCard from '../LandingPage/Sections/GridCard'

const { Title } = Typography
const { Search } = Input;

export default function SearchPage() {

    const [serachValue, setSerachValue] = useState([])
    const [Movies, setMovies] = useState([])

    useEffect(() => {
        fetch(`${SEARCH_URL}${serachValue}`)
             .then(response => response.json())
             .then(response => {
                 console.log(response);
                 setMovies(response.results)
                 })
         }, [serachValue]);

    const onSearch = value => {
        //event.preventDefault()
        console.log(value)
        setSerachValue(value)
    }
    return (
        <div>
           <Search
      placeholder="Enter Your Movie Name"
      allowClear
      enterButton="Search"
      size="default"
      onSearch={onSearch}
           />

<div style={{ width: '85%', margin:'1rem auto'}}>
                <Title level={2}>Your Result</Title>
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

            </div>
        </div>
    )
}
