import React from "react";
import WorkoutForm from "./WorkoutForm";
import axios from 'axios';

const baseURL = "https://3000-amethyst-lungfish-54xn6kl3.ws-us08.gitpod.io"

export default class CreateForm extends React.Component {
    state = {
        // db content to show
        'all_exercise': [],
        'all_muscle_group': [],

        //current workout form
        'workout_name': '',
        'workout_focus': [],
        'workout_difficulty': '',
        'workout_intensity': '',
        'workout_duration': 0,
        'workout_single_exercise': '',
        'workout_muscle_group': [],
        'entry': '',

        //exercise section
        'new_exercise': '',
        'exercise': [],

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
            "repetition": "",
            "set": ""
        }]

        this.setState({
            'all_exercise': all_exercise,
            "exercise": exercise,
            'all_muscle_group': all_muscle_group
        })
    }


    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateSection = (e, index) => {
        let new_exercise = this.state.exercise;
        new_exercise[index][e.target.name] = e.target.value
        this.setState({
            exercise: new_exercise
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
            "repetition": "",
            "set": ""
        }
        let ex = [...this.state.exercise, new_section]
        this.setState({
            exercise: ex
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
            'single_exercise': this.state.exercise,
            'muscle_group': muscle_group,
        }

        console.log(data);
        let response = await axios.post(baseURL + "/workouts/create", data)
        console.log(response.data.ops[0]._id)
        this.props.viewWorkout(response.data.ops[0]._id)
        // in app.js
    }



    deleteExercise = index => {
        let modifiedExercise = [
            ...this.state.exercise.slice(0, index),
            ...this.state.exercise.slice(index + 1)
        ];

        this.setState({
            exercise: modifiedExercise
        })
    }

    clickCancel = async () => {
        this.props.goBrowse("browse")
    }

    render() {
        return (
            <React.Fragment>
                <div className="container create-workout p-4">
                    <WorkoutForm
                        updateForm={this.updateForm}
                        updateMuscleCheckbox={this.updateMuscleCheckbox}
                        updateFocusCheckbox={this.updateFocusCheckbox}
                        clickAdd={this.clickAdd}
                        deleteExercise={this.deleteExercise}
                        updateSection={this.updateSection}
                        workout_name={this.state.workout_name}
                        workout_focus={this.state.workout_focus}
                        workout_difficulty={this.state.workout_difficulty}
                        workout_duration={this.state.workout_duration}
                        all_exercise={this.state.all_exercise}
                        all_muscle_group={this.state.all_muscle_group}
                        muscle_group={this.state.muscle_group}
                        exercise={this.state.exercise}
                        workout_intensity={this.state.workout_intensity}
                    />
                    <div className ="">
                        <button className="create-workout-btn" onClick={this.clickCreate}>Create</button>
                        <button className="cancel-workout-btn" onClick={this.clickCancel}>Cancel</button>
                    </div>
                </div>

            </React.Fragment>
        )
    }

}
