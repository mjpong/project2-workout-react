import './App.css';
import React from 'react'
import CreateWorkoutForm from './CreateWorkoutForm';
import BrowseWorkout from './BrowseWorkout';
import ViewWorkout from './ViewWorkout';




export default class App extends React.Component {
  // state = {

  //   'all_workout' : []

  // }

  // async componentDidMount() {
  //   this.getWorkouts
  // }

  // getWorkouts = async () => {
  //   let r = await axios.get('./json/workout.json')
  //   let workout = r.data

  //   this.setState({
  //     'all_workout': workout
  //   })

  // }

  // renderCreateWorkoutForm = () => {
  //   if (this.state.displayWorkoutForm) {
  //     return <CreateWorkoutForm/>;
  //   } else {
  //     return null;
  //   }
  // }

  render() {
    return (
      <React.Fragment>

      <CreateWorkoutForm/>
      <BrowseWorkout/>
      <ViewWorkout/>




      </React.Fragment>
    )

  }
}