import React from "react";

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

    function renderSection() {
        let section = [];
        for (let i = 0; i < props.exercise.length; i++) {
            section.push(
                <div key={i}>
                    <label>Choose a exercise: </label>
                    <select name="id" value={props.exercise[i].id}
                        onChange={(e) => { props.updateSection(e, i) }}>
                        {renderExercise()}
                    </select>
                    <div>
                        <input name="repetition" type="text"
                            value={props.exercise[i].repetition}
                            onChange={(e) => { props.updateSection(e, i) }}
                        /> reps
                </div>
                    <div>
                        <input name="set" type="text"
                            value={props.exercise[i].set}
                            onChange={(e) => { props.updateSection(e, i) }}
                        /> sets
                </div>
                    {props.exercise.length > 1 ? <button onClick={() => { props.deleteExercise(i) }}>Delete Exercise</button> : ""}
                </div>
            )
        }
        return section;
    }

    return (
        <React.Fragment>
            <h1>Create A New Work Out</h1>
            <div>
                <label>Workout Name: </label>
                <input name="workout_name" type="text"
                    placeholder="Workout Name"
                    value={props.workout_name}
                    onChange={props.updateForm} />
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
                <label>Intensity Level: </label>
                <input type="radio"
                    name="workout_intensity"
                    value="low"
                    onChange={props.updateForm}
                    checked={props.workout_intensity === 'low'}
                /> Low
                    <input type="radio"
                    name="workout_intensity"
                    value="medium"
                    onChange={props.updateForm}
                    checked={props.workout_intensity === 'medium'}
                /> Medium
                    <input type="radio"
                    name="workout_intensity"
                    value="high"
                    onChange={props.updateForm}
                    checked={props.workout_intensity === 'high'}
                /> High
            </div>
            <div>
                <label>Muscle Group: </label>
                <input type="checkbox"
                    name="muscle_group"
                    value="Arms"
                    onChange={props.updateCheckbox}
                /> Arms
                    <input type="checkbox"
                    name="muscle_group"
                    value="Chest"
                    onChange={props.updateCheckbox}
                /> Chest
                    <input type="checkbox"
                    name="muscle_group"
                    value="Legs"
                    onChange={props.updateCheckbox}
                /> Legs
            </div>
            <div>
                <label>Duration: </label>
                <input name="workout_duration" type="text"
                    placeholder="0"
                    value={props.workout_duration}
                    onChange={props.updateForm}
                /> mins
            </div>
            {renderSection()}
            <button onClick={props.clickAdd}>Add New Exercise</button>
            <div>
                <button>Create</button>
                <button>Cancel</button>
            </div>


        </React.Fragment>
    )
}