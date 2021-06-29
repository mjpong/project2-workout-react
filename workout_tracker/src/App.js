
import React from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
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
    let response = await axios.get("https://3000-amethyst-lungfish-54xn6kl3.ws-us08.gitpod.io");
    console.log(response.data);
  }

  setActive = (page) => {
    this.setState({
      "active": page
    })
  }

  renderContent() {
    if (this.state.active === "browse") {
      return (
        <React.Fragment>
          <BrowseWorkout 
            viewWorkout={this.viewWorkout} />
        </React.Fragment>

      )
    } else if (this.state.active === "create") {
      return (
        <React.Fragment>
          <CreateWorkoutForm 
            goBrowse={this.setActive} 
            viewWorkout={this.viewWorkout} />
        </React.Fragment>
      )
    } else if (this.state.active === "view") {
      return (
        <React.Fragment>
          <ViewWorkout 
            id={this.state.current_workout} 
            goBrowse={this.setActive} 
            viewWorkout={this.viewWorkout}/>
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

        <div className='container'>
          <nav className="navbar">
            <div className="homepage-link col-4">
              <btn className="btn btn-default active nav-btn" onClick={() => this.setActive("browse")}>BROWSE</btn>
            </div>
            <div className="logo-title col-4">
              <img className="logo-image" src={require('./images/YTGLogo.png').default} height="150" width="150"alt="logo" />
            </div>
            <div className="createpage-link col-4">
              <btn className="btn btn-default nav-btn" onClick={() => this.setActive("create")}>CREATE</btn>
            </div>
          </nav>
        </div>


        <div className="content-wrapper container">
          {this.renderContent()}
        </div>


      </React.Fragment>
    )

  }
}

export default App;