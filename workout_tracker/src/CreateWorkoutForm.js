import React from "react";
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

    clickAdd = e => {
        let newEntry = {

        }
        let currentEntry = this.state.entry;
        let modifiedEntry = [...currentEntry, newEntry]
        }

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

    renderExercise() {
        let options = [];
        for (let exercise of this.state.all_exercise) {
            let e = (
                <React.Fragment key={exercise.exercise_name}>
                    <option value={exercise.exercise_name}>{exercise.exercise_name}</option>
                </React.Fragment>
            )
            options.push(e)
        }
        return options;
    }

    render() {
        return (
            <React.Fragment>
                <div>
                    <label>Workout Name: </label>
                    <input name="workout_name" type="text" placeholder="Workout Name" value={this.state.name} onChange={this.updateForm} />
                </div>
                <div>
                    <label>Workout Focus: </label>
                    <input type="checkbox" name="workout_focus" value="strength" />Strength
                    <input type="checkbox" name="workout_focus" value="endurance" />Endurance
                    <input type="checkbox" name="workout_focus" value="mobility" />Mobility
                </div>
                <div>
                    <label>Difficulty Level: </label>
                    <input type="radio" name="workout_difficulty" value="beginner"
                        checked={this.state.difficulty === 'beginner'} onChange={this.updateForm} />Beginner
                    <input type="radio" name="workout_difficulty" value="intermediate"
                        checked={this.state.difficulty === 'intermediate'} onChange={this.updateForm} />Intermediate
                    <input type="radio" name="workout_difficulty" value="expert"
                        checked={this.state.difficulty === 'expert'} onChange={this.updateForm} />Expert
                </div>
                <div>
                    <label>Duration: </label>
                    <input name= "duration" type="text" value={this.state.duration} onChange={this.updateForm} /> mins
                </div>
                <div>
                    <label>Choose a exercise: </label>
                    <select name={this.state.all_exercise.exercise_name} value={this.state.all_exercise.exercise_name} onChange={this.updateForm}>
                        {this.renderExercise()}
                    </select>
                    <div>
                            <input name="set" type="text" value={this.state.set} onChange={this.updateForm} /> sets
                        </div>
                        <div>
                            <input name="rep" type="text" value={this.state.rep} onChange={this.updateForm} /> reps
                        </div>
                        <button onClick={}>Add New Exercise</button>
                </div>
                <div>
                    <button>Create</button>
                    <button>Cancel</button>
                </div>


            </React.Fragment>
        )
    }

}
