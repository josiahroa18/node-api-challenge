import React, { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import axios from 'axios';

export default () => {
    const [ data, setData ] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/projects')
        .then(res => {
            setData(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])
    
    return (
        <div className='project-container'>
            {data ? 
                (data.map(project => {
                    return <ProjectCard key={project.id} data={project}/> 
                }))
                :
                (<p> No data to be displayed</p>)
            }
        </div>
    );
}