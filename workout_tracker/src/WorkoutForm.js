import React from "react";
import axios from "axios";

export default function WorkoutForm(props) {
    
    function renderExercise() {
        let options = [];
        for (let exercise of props.all_exercise) {
            let e = (
                <React.Fragment key={exercise.exercise_name}>
                    <option value={exercise.exercise_name}>{exercise.exercise_name}</option>
                </React.Fragment>
            )
            options.push(e)
        }
        return options;
    }

    return (
        <React.Fragment>
            <h1>Create A New Work Out</h1>
            <div>
                <label>Workout Name: </label>
                <input name="workout_name" type="text" placeholder="Workout Name" value={props.workout_name} onChange={props.updateForm} />
            </div>
            <div>
                <label>Workout Focus: </label>
                <input type="checkbox"
                    name="workout_focus"
                    value="strength"
                    onChange={props.updateCheckbox}
                /> Strength
                    <input type="checkbox"
                    name="workout_focus"
                    value="endurance"
                    onChange={props.updateCheckbox}
                /> Endurance
                    <input type="checkbox"
                    name="workout_focus"
                    value="mobility"
                    onChange={props.updateCheckbox}
                /> Mobility
            </div>
            <div>
                <label>Difficulty Level: </label>
                <input type="radio"
                    name="workout_difficulty"
                    value="beginner"
                    onChange={props.updateForm}
                    checked={props.workout_difficulty === 'beginner'}
                /> Beginner
                    <input type="radio"
                    name="workout_difficulty"
                    value="intermediate"
                    onChange={props.updateForm}
                    checked={props.workout_difficulty === 'intermediate'}
                />Intermediate
                    <input type="radio"
                    name="workout_difficulty"
                    value="expert"
                    onChange={props.updateForm}
                    checked={props.workout_difficulty === 'expert'}
                />Expert
            </div>
            <div>
                <label>Duration: </label>
                <input name="duration" type="text" 
                value={props.workout_duration} 
                onChange={props.updateForm} 
                /> mins
                </div>
            <div>
                    <label>Choose a exercise: </label>
                    <select name={props.all_exercise.exercise_name} value={props.all_exercise.exercise_name} onChange={props.updateForm}>
                        {renderExercise()}
                    </select>
                    <div>
                            <input name="set" type="text" value={props.set} onChange={props.updateForm} /> sets
                        </div>
                        <div>
                            <input name="rep" type="text" value={props.rep} onChange={props.updateForm} /> reps
                        </div>
                        <button>Add New Exercise</button>
                </div>
            <div>
                <button>Create</button>
                <button>Cancel</button>
            </div>


        </React.Fragment>
    )
}