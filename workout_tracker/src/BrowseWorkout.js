import React from "react";
import axios from "axios";

const baseURL = "https://3000-amethyst-lungfish-54xn6kl3.ws-us09.gitpod.io"


export default class BrowseWorkout extends React.Component {

    state = {
        'all_workout': [],
        'all_musclegroup': [],
        'all_duration': [],
        'all_focus': [],
        'search_field': [],
        'workoutshowing': false,
        'muscleshowing': false,
        'difficultyshowing': false,

        // search
        'search_field': ""
    }

    async componentDidMount() {
        this.getAllWorkouts()
    }

    getAllWorkouts = async () => {
        let r = await axios.get(baseURL + "/workouts/browse")

        this.setState({
            'all_workout': r.data,
            'all_musclegroup': r.data.muscle_group,
            'all_duration': r.data.duration,
            'all_focus': r.data.focus
        })
    }

    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderAllWorkouts = () => {
        let list = []
        for (let l of this.state.all_workout) {
            list.push(
                <div className="box" key={l._id} onClick={() => this.props.viewWorkout(l._id)}>
                    <div className="container">
                        <p><strong>{l.name} </strong></p>
                        <p style={{ textTransform: 'capitalize' }}>{l.duration} mins • {l.difficulty} Level • {l.intensity} Intensity</p>
                    </div>
                </div>
            )
        }
        if (list.length === 0) {
            list.push(
                <div>No Results Found</div>
            )
        }
        return list
    }

    filterDifficulty = (data) => {
        let difficulty = {
            beginner: [],
            intermediate: [],
            extreme: []
        }

        for (let i of data) {
            if (this.state.all_workout.difficulty === "beginner") {
                difficulty["beginner"].push(i)
            }
            if (this.state.all_workout.difficulty === "intermediate") {
                difficulty["intermediate"].push(i)
            }
            if (this.state.all_workout.difficulty === "extreme") {
                difficulty["extreme"].push(i)
            }
        }

        return difficulty;


        this.setState({
            all_workout: difficulty
        })
    }

    searchQuery = async () => {
        let response = await axios.get(baseURL + "/workouts/search" + "?q=" + this.state.search_field)
        this.setState({
            all_workout: response.data.reverse()
        })
    }

    resetQuery = async () => {

        this.getAllWorkouts();

        this.setState({
            'search_field': ""
        })

    }



    render() {

        const { muscleshowing } = this.state;
        const { workoutshowing } = this.state;
        const { difficultyshowing } = this.state;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="header-wrapper row">
                        <img className="header-image" src={require('./images/header-image.png').default} alt="header" />
                    </div>

                    <div className="muscle-wrapper row" align="center">
                        <div
                            className="muscle-group col-6"
                            onClick={() => this.setState({ muscleshowing: !muscleshowing })}>
                            <button className="btn btn-default" >
                                <h3> Muscle Group </h3>
                            </button>
                            {muscleshowing ?
                                <div className="subcategory">
                                    <ul>
                                        <li>Abs and Chest</li>
                                        <li>Arms and Shoulders</li>
                                        <li>Glutes and Legs</li>
                                    </ul>
                                </div>
                                : null}
                        </div>
                        <div className="muscle-group-pic col-6">
                            <img className="banner-image" src={require('./images/workout1.png').default} alt="workout1" />
                        </div>
                    </div>

                    <div className="focus-wrapper row" align="center">
                        <div className="workout-focus-pic col-6" >
                            <img className="banner-image" src={require('./images/workout2.png').default} alt="workout2" />
                        </div>
                        <div
                            className="workout-focus col-6"
                            onClick={() => this.setState({ workoutshowing: !workoutshowing })}>
                            <button className="btn btn-default" >
                                <h3> Workout Focus </h3>
                            </button>
                            {workoutshowing ?
                                <div className="subcategory">
                                    <ul>
                                        <li>Endurance</li>
                                        <li>Strength</li>
                                        <li>Mobility</li>
                                    </ul>
                                </div>
                                : null}
                        </div>

                    </div>

                    <div className="difficulty-wrapper row" align="center">
                        <div
                            className="difficulty-level col-6 "
                            onClick={() => this.setState({ difficultyshowing: !difficultyshowing })}>
                            <button className="btn btn-default">
                                <h3> Difficulty </h3>
                            </button>
                            {difficultyshowing ?
                                <div className="subcategory">
                                    <ul>
                                        <li>Beginner</li>
                                        <li>Intermediate</li>
                                        <li>Expert</li>
                                    </ul>
                                </div>
                                : null}
                        </div>
                        <div className="difficulty-level-pic col-6">
                            <img className="banner-image" src={require('./images/workout3.png').default} alt="workout3" />
                        </div>
                    </div>

                    <div className="search-bar-container">
                        <input type="text" name="search_field"
                            className="search-bar form-control my-1 mx-sm-2"
                            value={this.state.search_field}
                            placeholder="Search Workouts"
                            onChange={this.updateForm} />
                        <div className="filter-buttons">
                            <button type="submit" className="btn btn-secondary search my-1 mx-sm-2" onClick={this.searchQuery}><i class="fas fa-search"></i></button>
                            <button type="submit" className="btn btn-secondary search-reset my-1 mx-sm-2" onClick={this.resetQuery}><i class="fas fa-undo-alt"></i></button>
                        </div>
                    </div>

                    <div className="filter-results">
                        <h5>There are a total of {this.state.all_workout.length} workouts: </h5>
                        {this.renderAllWorkouts()}
                    </div>
                </div>
            </React.Fragment>
        )
    }

}