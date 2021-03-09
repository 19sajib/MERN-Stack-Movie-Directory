import React from 'react'
import { Descriptions} from 'antd'

export default function MovieInfo(props) {
    const { movie } = props;
    // console.log(movie);
    
    return (
        <Descriptions title="Movie Info" bordered>
        <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
        <Descriptions.Item label="Release Date">{movie.release_date}</Descriptions.Item>
        <Descriptions.Item label="Budget">${movie.budget}</Descriptions.Item>
        <Descriptions.Item label="Revenue">${movie.revenue}</Descriptions.Item>
        <Descriptions.Item label="Runtime">{movie.runtime} mins</Descriptions.Item>
        <Descriptions.Item label="Average Vote" span={2}>
        {movie.vote_average}
        </Descriptions.Item>
        <Descriptions.Item label="Number of Vote">{movie.vote_count}</Descriptions.Item>
        <Descriptions.Item label="Status">{movie.status}</Descriptions.Item>
        <Descriptions.Item label="Popularity">{movie.popularity}</Descriptions.Item>
        <Descriptions.Item label="Overview">{movie.overview}</Descriptions.Item>
      </Descriptions>
    )
}
