import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import ActionCard from './ActionCard';

export default () => {
    const { id } = useParams();
    const [ project, setProject ] = useState(null);
    const [ actions, setActions ] = useState(null);
    
    useEffect(() => {
        axios.get(`http://localhost:5000/projects/${id}`)
        .then(res => {
            setProject(res.data);
        })
        .catch(err => {
            console.log(err);
        })

        axios.get(`http://localhost:5000/projects/${id}/actions`)
        .then(res => {
            setActions(res.data);
        })
        .catch(err => {
            console.log(err);
        })
    }, [])

    return (
        <div className='project-details'>
            {project && <ProjectCard data={project}/>}
            {actions && actions.map(action => {
                return <ActionCard key={action.id} data={action}/>
            })}
        </div>
    );
}