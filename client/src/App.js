import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Projects from './components/Projects';
import ProjectDetails from './components/ProjectDetails';

function App() {
  return (
    <div className="App">
      <Route exact path='/'>
        <Projects/>
      </Route>
      <Route path='/:id'>
        <ProjectDetails/>
      </Route>
    </div>
  );
}

export default App;
