import './App.css';
import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import CreateWorkoutForm from './CreateWorkoutForm';
import BrowseWorkout from './BrowseWorkout';
import ViewWorkout from './ViewWorkout';


class App extends React.Component {
  state = {
    'active': 'browse',
    'all_workout': [],
    'current_workout': 0
  }

  async componentDidMount() {
    let response = await axios.get("https://3000-amethyst-lungfish-54xn6kl3.ws-us08.gitpod.io/");
    console.log(response.data);
  }

  setActive(page) {
    this.setState({
      "active": page
    })
  }

  renderContent() {
    if (this.state.active === "browse") {
      return (
        <React.Fragment>
          <BrowseWorkout viewWorkout={this.viewWorkout} />
        </React.Fragment>

      )
    } else if (this.state.active === "create") {
      return (
        <React.Fragment>
          <CreateWorkoutForm />
        </React.Fragment>
      )
    } else if (this.state.active === "view") {
      return (
        <React.Fragment>
          <ViewWorkout id={this.state.current_workout} />
        </React.Fragment>
      )
    }
  }

  viewWorkout = (id) => {
    this.setState({
      'active': "view",
      'current_workout': id
    })
  }

  render() {
    return (
      <React.Fragment>
        <nav className="navbar container row">
          
          <div className="homepage-link my-auto col-4">
            <btn className="btn btn-default active" onClick={() => this.setActive("browse")}>Home</btn>
          </div>
          <div className="logo-title col-4">Logo</div>
          <div className="createpage-link my-auto col-4">
            <btn className="btn btn-default" onClick={() => this.setActive("create")}>Create</btn>
          </div>
        </nav>

        <div className="content-wrapper">
          {this.renderContent()}
        </div>


      </React.Fragment>
    )

  }
}

export default App;