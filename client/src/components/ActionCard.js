import React from 'react';

export default ({ data }) => {
    return (
        <div className='action-card'>
            <h4>{data.description}</h4>
            <p>{data.notes}</p>
            <p>Completed: {data.completed ? 'True' : 'False'}</p>
        </div>
    );
}