import './App.css';
import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import CreateWorkoutForm from './CreateWorkoutForm';
import BrowseWorkout from './BrowseWorkout';
import ViewWorkout from './ViewWorkout';


class App extends React.Component {
  state = {
    'all_workout' : [],
    'current_page': 'home',
    'current_workout': 0
  }

  async componentDidMount() {
    let response = await axios.get("https://3000-amethyst-lungfish-54xn6kl3.ws-us08.gitpod.io/");
    console.log(response.data);
  }

  viewWorkout = (id) => {
    this.setState({
      'current_page': "detail",
      'current_workout': id
    })
  }

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
  pageHandler(name){
    this.setState({
      "current_page": name
    })
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar container">
                    <div className ="logo-title">Logo</div>
                    <div className = "homepage-link my-auto">
                        <btn className="btn btn-default" onClick={() => this.pageHandler("home")}>Home</btn>
                        <btn className="btn btn-default"  onClick={() => this.pageHandler("detail")}>Create</btn>
                    </div>
                </nav>

        <CreateWorkoutForm/>
        {this.state.current_page === "home" ?
          <BrowseWorkout viewWorkout={this.viewWorkout} /> : ""
        }

        {this.state.current_page === "detail" ?
          <ViewWorkout id={this.state.current_workout} /> : ""
        }



      </React.Fragment>
    )

  }
}

export default App;