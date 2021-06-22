import React from "react";
import axios from "axios";

const baseURL = "https://3000-amethyst-lungfish-54xn6kl3.ws-us08.gitpod.io"


export default class BrowseWorkout extends React.Component {

    state = {
        'all_workout': [],
        'all_musclegroup': [],
        'all_duration': [],
        'all_focus': [],
        'workoutshowing': false,
        'muscleshowing': false,
        'difficultyshowing': false,
    }

    async componentDidMount() {
        let r = await axios.get(baseURL + "/workouts/browse")

        this.setState({
            'all_workout': r.data,
            'all_musclegroup': r.data.muscle_group,
            'all_duration': r.data.duration,
            'all_focus': r.data.focus
        })
    }

    renderAllWorkouts = () => {
        let list = []
        for (let l of this.state.all_workout) {
            list.push(
                <div className="box" key={l._id} onClick={() => this.props.viewWorkout(l._id)}>
                    <div className="container">
                        <p><strong>{l.name} </strong></p>
                        <p>{l.duration} mins</p>
                        <p>{l.difficulty} + {l.focus} + {l.intensity}</p>
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

                    <div className="muscle-wrapper row">
                        <div className="muscle-group col-6" onClick={() => this.setState({ muscleshowing: !muscleshowing })}>
                            <button className="btn btn-default" ><h3> Muscle Group </h3></button>
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
                            PIC
                    </div>
                    </div>

                    <div className="focus-wrapper row">
                        <div className="workout-focus-pic col-6">
                            PIC
                    </div>
                        <div className="workout-focus col-6" onClick={() => this.setState({ workoutshowing: !workoutshowing })}>
                            <button className="btn btn-default" ><h3> Workout Focus </h3></button>
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

                    <div className="difficulty-wrapper row">
                        <div className="difficulty-level col-6" onClick={() => this.setState({ difficultyshowing: !difficultyshowing })}>
                            <button className="btn btn-default" ><h3> Difficulty </h3></button>
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
                            PIC
                    </div>
                    </div>




                    <div className="filter-results">
                        <p>There are {this.state.all_workout.length} workouts: </p>
                        {this.renderAllWorkouts()}
                    </div>
                </div>
            </React.Fragment>
        )
    }

}