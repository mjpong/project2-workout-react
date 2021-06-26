import React from 'react';
import WorkoutForm from "./WorkoutForm";
import axios from "axios";

const baseURL = "https://3000-amethyst-lungfish-54xn6kl3.ws-us09.gitpod.io"

export default class EditWorkout extends React.Component {

    state = {
        // db content to show
        'all_exercise': [],
        'all_muscle_group': [],

        // current workout form
        'workout_name': "",
        'workout_focus': [],
        'workout_difficulty': "",
        'workout_intensity': '',
        'workout_duration': 0,
        'workout_single_exercise': '',
        'workout_muscle_group': [],

        //exercise section in workout form
        'new_exercise': '',
        'exercise': []
    }

    clickUpdate = async (workoutID) => {

        let userData = {
            'workout_name': this.state.workout_name,
            'workout_duration': this.state.workout_duration,
            'workout_focus': this.state.workout_focus,
            'workout_difficulty': this.state.workout_difficulty,
            'workout_intensity': this.state.workout_intensity,
            'workout_muscle_group': this.state.workout_muscle_group,
            'workout_single_exercise': this.state.workout_single_exercise,
            
            //exercise section
            'new_exercise': this.state.new_exercise,
            'exercise': this.state.exercise
        }


        let response = await axios.put(baseURL + "/workouts/edit/" + workoutID, userData)

        this.props.viewWorkout(workoutID)
    }

    async componentDidMount() {

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
            'all_muscle_group': all_muscle_group,
            "exercise": exercise,

            'workout_name': this.props.workout_name,
            'workout_duration': this.props.workout_duration,
            'workout_focus': this.props.workout_focus,
            'workout_difficulty': this.props.workout_difficulty,
            'workout_intensity': this.props.workout_intensity,
            'workout_muscle_group': this.props.muscle_group,
            'workout_single_exercise': this.props.workout_single_exercise
            
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

        if (e.target.name === "id") {
            for (let x of this.state.all_exercise) {
                if (x._id === e.target.value) {
                    new_exercise[index]['name'] = x.exercise_name;
                    break;
                }
            }
        }

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

    deleteExercise = index => {
        let modifiedExercise = [
            ...this.state.exercise.slice(0, index),
            ...this.state.exercise.slice(index + 1)
        ];

        this.setState({
            exercise: modifiedExercise
        })
    }


    render() {
        return (
            <React.Fragment>
                <div className="container create-workout p-4">
                    <h1>Edit A Workout</h1>
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
                        exercise={this.state.exercise}
                    />
                    <div className="">
                        <button className="update-workout-btn btn btn-secondary" onClick={this.clickUpdate(this.props._id)}>Update</button>
                        <button className="cancel-workout-btn btn btn-secondary" onClick={this.props.cancelEdit}>Cancel</button>
                    </div>
                </div>

            </React.Fragment>
        )
    }


}