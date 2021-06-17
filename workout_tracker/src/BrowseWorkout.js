import React from "react";
import axios from "axios";

const baseURL = "https://3000-amethyst-lungfish-54xn6kl3.ws-us08.gitpod.io"


export default class BrowseWorkout extends React.Component {

    state = {
        'all_workout': [],
        'all_musclegroup': [],
        'all_duration': [],
        'all_focus': []
    }

    async componentDidMount() {
        let r = await axios.get( baseURL + "/workouts/browse")
 
        this.setState({
            'all_workout': r.data,
            'all_musclegroup': r.data.muscle_group,
            'all_duration': r.data.duration,
            'all_focus': r.data.focus
        })
    }

    renderWorkoutList = () => {
        let list = []
        for (let l of this.state.all_workout) {
            list.push(
                <div className="box" key={l._id} onClick={() => this.props.viewWorkout(l._id)}>
                    <div className="container">
                        <p><strong>{l.name} </strong></p>
                        <p>{l.duration} mins</p>
                        <p>{l.difficulty}{l.focus}</p>
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

    renderTags = (tags) => {
        let list = [];
        for (let l of tags) {
            list.push(
                <p className="browse-tags"
                    style={{
                        backgroundColor: "#F4CBAA"
                    }}>
                    {l}</p>
            )
        }
        return list
    }


    render() {
        return (
            <React.Fragment>
                <h1>Testing BrowseWorkout</h1> 
                <div className="muscle-group">
                    <h3> Muscle Group </h3>
                    <ul>
                        <li>Abs and Chest</li>
                        <li>Arms and Shoulders</li>
                        <li>Glutes and Legs</li>
                    </ul>
                </div>
                <div className="workout-focus">
                    <h3> Workout Focus </h3>
                    <ul>
                        <li>Endurance</li>
                        <li>Strength</li>
                        <li>Mobility</li>
                    </ul>
                </div>
                <div className="difficulty-level">
                    <h3> Difficulty </h3>
                    <ul>
                        <li>Beginner</li>
                        <li>Intermediate</li>
                        <li>Expert</li>
                    </ul>
                </div>

                <div className="filter-results">
                    {this.renderWorkoutList()}
                </div>

            </React.Fragment>
        )
    }

}