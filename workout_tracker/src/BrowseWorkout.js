import React from "react";
import axios from "axios";


export default class BrowseWorkout extends React.Component {

    state = {
        'all_workout': [],
        'all_muscle': [],
        'all_musclegroup': [],
        'all_equipment': [],
    }

    async componentDidMount() {
        let r = await axios.get('./json/workout.json')
        let workout = r.data.workouts

        r = await axios.get('./json/muscle_group.json')
        let muscle_group = r.data

        r = await axios.get('./json/muscle.json')
        let muscle = r.data

        r = await axios.get('./json/workout_equipment.json')
        let workout_equipment = r.data.workout_equipment


        this.setState({
            'all_workout': workout,
            'all_muscle': muscle,
            'all_musclegroup': muscle_group,
            'all_equipment': workout_equipment,
        })
    }

    renderWorkoutList = () => {
        let list = []
        for (let l of this.state.all_workout) {
            list.push(
                <div className="box" key={l._id}>
                    <div className="container">
                        <p>{l.name} </p>
                        <p>{l.duration} mins</p>
                        <p>{l.difficulty}{this.renderTags(l.focus)}</p>
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