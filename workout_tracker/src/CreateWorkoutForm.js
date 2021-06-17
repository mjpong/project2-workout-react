import React from "react";
import WorkoutForm from "./WorkoutForm";
import axios from 'axios';
const baseURL = "https://3000-amethyst-lungfish-54xn6kl3.ws-us08.gitpod.io"

export default class CreateForm extends React.Component {
    state = {
        'workout_name': '',
        'workout_focus': '',
        'workout_difficulty': '',
        'entry': '',
        'new_exercise': '',
        'all_exercise': [],
        'workout_duration': 0,
        'exercise': [{
            "id": 1,
            "repetition": 10,
            "set": 5
        }],
        'muscle_group': '',
        'workout_intensity': '',

    }

    async componentDidMount() {
        let r = await axios.get(baseURL + "/list/singleexercise")
        let all_exercise = r.data
        console.log(all_exercise);

        this.setState({
            'all_exercise': all_exercise
        })
    }

    fetchWorkout() {
        //call list workout api
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

    updateCheckbox = (e) => {
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


    clickAdd = () => {
        let new_section = {
            "id": 1,
            "repetition": 1,
            "set": 1
        }
        let ex = [...this.state.exercise, new_section]
        this.setState({
            exercise: ex
        })
    }

    // clickCreate = () => {
    //     let userData = {
    //         create_date: new Date(),
    //         workout_name: this.state.workout_name,
    //         workout_focus: this.state.workout_focus,
    //         workout_difficulty: this.state.workout_difficulty,
    //         workout_duration: this.state.workout_duration,

    //     }
    // }

    deleteExercise = index => {
        console.log(index);
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
                <WorkoutForm
                    updateForm={this.updateForm}
                    updateCheckbox={this.updateCheckbox}
                    clickAdd={this.clickAdd}
                    deleteExercise={this.deleteExercise}
                    updateSection={this.updateSection}
                    workout_name={this.state.workout_name}
                    workout_focus={this.state.workout_focus}
                    workout_difficulty={this.state.workout_difficulty}
                    workout_duration={this.state.workout_duration}
                    all_exercise={this.state.all_exercise}
                    muscle_group={this.state.muscle_group}
                    exercise={this.state.exercise}
                    workout_intensity={this.state.workout_intensity}

                />

            </React.Fragment>
        )
    }

}
