import React from 'react';
import { Link } from 'react-router-dom';

export default ({data}) => {
    return (
        <Link to={`/${data.id}`} className='project-card'>
            <h1>{data.name}</h1>
            <p>{data.description}</p>
            <p>Completed: {data.completed ? 'True': 'False'}</p>
        </Link>
    );
}