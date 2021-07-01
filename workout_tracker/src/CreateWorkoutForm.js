import React from "react";
import WorkoutForm from "./WorkoutForm";
import axios from 'axios';

const baseURL = "https://8080-amethyst-lungfish-54xn6kl3.ws-us10.gitpod.io"

export default class CreateForm extends React.Component {
    state = {
        // db content to show
        'all_exercise': [],
        'all_muscle_group': [],

        //current workout form
        'workout_name': '',
        'workout_duration': 1,
        'workout_focus': [],
        'workout_difficulty': '',
        'workout_intensity': '',
        'workout_muscle_group': [],

        // exercise section in workout form
        'workout_single_exercise': []

    }

    async componentDidMount() {

        // get all the data from collections to show in form
        let r = await axios.get(baseURL + "/list/singleexercise");
        let muscle = await axios.get(baseURL + "/list/musclegroup");

        let all_exercise = r.data
        let all_muscle_group = muscle.data

        let exercise = [{
            "id": all_exercise[0]._id,
            "name": all_exercise[0].exercise_name,
            "repetition": 1,
            "set": 1
        }]

        this.setState({
            'all_exercise': all_exercise,
            "workout_single_exercise": exercise,
            'all_muscle_group': all_muscle_group
        })
    }


    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.name === "workout_duration" ? parseInt(e.target.value) : e.target.value
        })
    }

    updateSection = (e, index) => {
        let new_exercise = this.state.workout_single_exercise;
        new_exercise[index][e.target.name] = e.target.value

        if (e.target.name === "id") {
            for (let x of this.state.all_exercise) {
                if (x._id === e.target.value) {
                    new_exercise[index]['name'] = x.exercise_name;
                    break;
                }
            }
        }

        new_exercise[index]['repetition'] = parseInt(new_exercise[index]['repetition']);
        new_exercise[index]['set'] = parseInt(new_exercise[index]['set']);

        this.setState({
            workout_single_exercise: new_exercise
        })
    }

    updateFocusCheckbox = (e) => {
        if (!this.state.workout_focus.includes(e.target.value)) {
            let clone = [...this.state.workout_focus, e.target.value];
            this.setState({
                workout_focus: clone
            });
        } else {
            let indexToDelete = this.state.workout_focus.findIndex((s) => {
                return s === e.target.value;
            });
            let clone = [
                ...this.state.workout_focus.slice(0, indexToDelete),
                ...this.state.workout_focus.slice(indexToDelete + 1)
            ];
            this.setState({
                workout_focus: clone
            });
        }
    };

    updateMuscleCheckbox = (e) => {
        if (!this.state.workout_muscle_group.includes(e.target.value)) {
            let clone = [...this.state.workout_muscle_group, e.target.value];
            this.setState({
                workout_muscle_group: clone
            });
        } else {
            let indexToDelete = this.state.workout_muscle_group.findIndex((s) => {
                return s === e.target.value;
            });
            let clone = [
                ...this.state.workout_muscle_group.slice(0, indexToDelete),
                ...this.state.workout_muscle_group.slice(indexToDelete + 1)
            ];
            this.setState({
                workout_muscle_group: clone
            });
        }
    };


    clickAdd = () => {
        let new_section = {
            "id": this.state.all_exercise[0]._id,
            "name": this.state.all_exercise[0].exercise_name,
            "repetition": 1,
            "set": 1
        }
        let ex = [...this.state.workout_single_exercise, new_section]
        this.setState({
            workout_single_exercise: ex
        })
    }

    clickCreate = async () => {
        // Process muscle_group id array to object array
        let muscle_group = [];
        for (let m of this.state.workout_muscle_group) {
            for (let muscle of this.state.all_muscle_group) {
                if (muscle._id === m) {
                    muscle_group.push(muscle);
                }
            }
        }

        let data = {
            'name': this.state.workout_name,
            'date': new Date(),
            'focus': this.state.workout_focus,
            'difficulty': this.state.workout_difficulty,
            'intensity': this.state.workout_intensity,
            'duration': this.state.workout_duration,
            'single_exercise': this.state.workout_single_exercise,
            'muscle_group': muscle_group,
        }

        // console.log(data);
        let response = await axios.post(baseURL + "/workouts/create", data)
        this.props.viewWorkout(response.data.ops[0]._id)
        // in app.js
    }



    deleteExercise = index => {
        let modifiedExercise = [
            ...this.state.workout_single_exercise.slice(0, index),
            ...this.state.workout_single_exercise.slice(index + 1)
        ];

        this.setState({
            workout_single_exercise: modifiedExercise
        })
    }

    clickCancel = async () => {
        this.props.goBrowse("browse")
    }

    render() {
        return (
            <React.Fragment>
                <div className="container create-workout p-4">
                    <h1>Create A New Work Out</h1>
                    <WorkoutForm
                        updateForm={this.updateForm}
                        updateMuscleCheckbox={this.updateMuscleCheckbox}
                        updateFocusCheckbox={this.updateFocusCheckbox}
                        clickAdd={this.clickAdd}
                        deleteExercise={this.deleteExercise}
                        updateSection={this.updateSection}
                        all_exercise={this.state.all_exercise}
                        all_muscle_group={this.state.all_muscle_group}
                        // workout values
                        workout_name={this.state.workout_name}
                        workout_duration={this.state.workout_duration}
                        workout_focus={this.state.workout_focus}
                        workout_difficulty={this.state.workout_difficulty}   
                        workout_intensity={this.state.workout_intensity}
                        workout_muscle_group={this.state.workout_muscle_group}
                        workout_single_exercise={this.state.workout_single_exercise}
                        
                    />
                    <div className="">
                        <button className="create-workout-btn btn btn-secondary" onClick={this.clickCreate}>Create</button>
                        <button className="cancel-workout-btn btn btn-secondary" onClick={this.clickCancel}>Cancel</button>
                    </div>
                </div>

            </React.Fragment>
        )
    }

}
