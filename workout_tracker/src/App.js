import './App.css';
import React from 'react'
import CreateWorkoutForm from './CreateWorkoutForm';
import BrowseWorkout from './BrowseWorkout';

function App() {
  return (
    <div className="App">
      <CreateWorkoutForm/>
      <BrowseWorkout/>
    </div>
  );
}

export default App;
