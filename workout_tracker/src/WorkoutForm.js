import React from "react";

export default function WorkoutForm(props) {

    function renderMuscleGroup() {

        let options = [];
        if(props.editMode){
            for (let muscle of props.all_muscle_group) {
                let y = false;
                for(let x of props.workout_muscle_group){
                    if(muscle._id == x._id){
                        y = true;
                        break;
                    }
                }

                let e = (
                    <React.Fragment key={muscle._id}>
                        <input type="checkbox"
                            name="workout_muscle_group"
                            value={muscle._id}
                            onChange={props.updateMuscleCheckbox}
                            checked={y}
                        /> {muscle.name}
                    </React.Fragment>
                )
                options.push(e)
            }
        } else {
            for (let muscle of props.all_muscle_group) {
                let e = (
                    <React.Fragment key={muscle._id}>
                        <input type="checkbox"
                            name="workout_muscle_group"
                            value={muscle._id}
                            onChange={props.updateMuscleCheckbox}
                        /> {muscle.name}
                    </React.Fragment>
                )
                options.push(e)
            }
        }
        return options;
    }

    function renderExercise() {
        let options = [];
        for (let exercise of props.all_exercise) {
            let e = (
                <React.Fragment key={exercise._id}>
                    <option value={exercise._id}>{exercise.exercise_name}</option>
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
                    <div className="form-label"> Choose a Exercise: </div>
                    <select name="id" value={props.exercise[i].id}
                        onChange={(e) => { props.updateSection(e, i) }}>
                        {renderExercise()}
                    </select>
                    <div>
                        <div className="form-label">Repetitions: </div>
                        <input name="repetition" type="number"
                            value={props.exercise[i].repetition}
                            onChange={(e) => { props.updateSection(e, i) }}
                        /> reps
                </div>
                    <div>
                        <div className="form-label">Sets:  </div>
                        <input name="set" type="number"
                            value={props.exercise[i].set}
                            onChange={(e) => { props.updateSection(e, i) }}
                        /> sets
                </div>
                    {props.exercise.length > 1 ? <button className="btn btn-secondary" onClick={() => { props.deleteExercise(i) }}><i class="far fa-trash-alt"></i> Exercise </button> : ""}
                </div>
            )
        }
        return section;
    }

    return (
        <React.Fragment>
                
                <div>
                    <div className="form-label">Workout Name: </div>
                    <input className="form-control" name="workout_name" type="text"
                        placeholder="Workout Name"
                        value={props.workout_name}
                        onChange={props.updateForm} />
                </div>
                <div>
                    <div className="form-label">Workout Focus: </div>
                    <input type="checkbox"
                        name="workout_focus"
                        value="strength"
                        onChange={props.updateFocusCheckbox}
                        checked={props.workout_focus.includes('strength')}
                    /> Strength
                    <input type="checkbox"
                        name="workout_focus"
                        value="endurance"
                        onChange={props.updateFocusCheckbox}
                        checked={props.workout_focus.includes('endurance')}
                    /> Endurance
                    <input type="checkbox"
                        name="workout_focus"
                        value="mobility"
                        onChange={props.updateFocusCheckbox}
                        checked={props.workout_focus.includes('mobility')}
                    /> Mobility
            </div>
                <div>
                    <div className="form-label">Difficulty Level: </div>
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
                    <div className="form-label"> Intensity Level: </div>
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
                    <div className="form-label"> Muscle Group: </div>
                    {renderMuscleGroup()}
                </div>
                <div>
                    <div className="form-label"> Duration: </div>
                    <input name="workout_duration" type="number"
                        placeholder="1"
                        value={props.workout_duration}
                        onChange={props.updateForm}
                    /> mins
            </div>
                {renderSection()}
                <button className="btn btn-secondary action-buttons" onClick={props.clickAdd}><i class="fas fa-plus"></i> New Exercise</button>

        </React.Fragment>
    )
}