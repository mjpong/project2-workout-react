import React from "react";
import WorkoutForm from "./WorkoutForm";
import axios from 'axios';

export default class CreateForm extends React.Component {
    state = {
        'workout_name': '',
        'workout_focus': '',
        'workout_difficulty': '',
        'entry': '',
        'new_exercise': '',
        'all_exercise': [],
        'workout_duration': 0,
        'rep': 0,
        'set': 0

    }

    async componentDidMount() {
        let r = await axios.get('./json/exercise.json')
        let all_exercise = r.data.exercise

        this.setState({
            'all_exercise': all_exercise
        })
    }

    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
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
    

    clickAdd = e => {
        let newEntry = {

        }
        let currentEntry = this.state.entry;
        let modifiedEntry = [...currentEntry, newEntry]
        

    }

    clickCreate = () => {
        let userData = {
            create_date: new Date(),
            workout_name: this.state.workout_name,
            workout_focus: this.state.workout_focus,
            workout_difficulty: this.state.workout_difficulty,
            workout_duration: this.state.workout_duration,
            
        }
    }

    // renderExercise() {
    //     let options = [];
    //     for (let exercise of this.state.all_exercise) {
    //         let e = (
    //             <React.Fragment key={exercise.exercise_name}>
    //                 <option value={exercise.exercise_name}>{exercise.exercise_name}</option>
    //             </React.Fragment>
    //         )
    //         options.push(e)
    //     }
    //     return options;
    // }

    render() {
        return (
            <React.Fragment>
                <WorkoutForm     
                updateForm={this.updateForm}
                updateCheckbox={this.updateCheckbox}
                workout_name={this.state.workout_name}
                workout_focus={this.state.workout_focus}
                workout_difficulty={this.state.workout_difficulty}
                workout_duration={this.state.workout_duration}
                rep = {this.state.rep}
                set = {this.state.set}
                all_exercise={this.state.all_exercise}
                />

            </React.Fragment>
        )
    }

}
