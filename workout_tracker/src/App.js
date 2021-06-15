import './App.css';
import React from 'react'
import CreateForm from './CreateForm';
import BrowseWorkout from './BrowseWorkout';

function App() {
  return (
    <div className="App">
      <CreateForm/>
      <BrowseWorkout/>
    </div>
  );
}

export default App;
