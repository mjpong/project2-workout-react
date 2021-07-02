import React from "react";

export default function WorkoutForm(props) {

    // form options 

    function renderMuscleGroup() {

        let options = [];
        if (props.editMode) {
            for (let muscle of props.all_muscle_group) {
                let y = false;
                for (let x of props.workout_muscle_group) {
                    if (muscle._id == x) {
                        y = true;
                        break;
                    }
                }

                let e = (
                    <React.Fragment key={muscle._id}>
                        <label className="form-check-label">
                            <input type="checkbox"
                                className="form-check-input"
                                name="workout_muscle_group"
                                value={muscle._id}
                                onChange={props.updateMuscleCheckbox}
                                checked={y}
                            />
                            {muscle.name}
                        </label>
                    </React.Fragment>
                )
                options.push(e)
            }
        } else if (props.all_muscle_group.length === 0) {
            options.push(
                <div>
                    <h5>Loading Section...</h5>
                </div>
            )
        } else {
            for (let muscle of props.all_muscle_group) {
                let e = (
                    <React.Fragment key={muscle._id}>
                        <label className="form-check-label">
                            <input type="checkbox"
                                className="form-check-input"
                                name="workout_muscle_group"
                                value={muscle._id}
                                onChange={props.updateMuscleCheckbox}
                            />
                            {muscle.name}
                        </label>
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

    // Each single exercise section 

    function renderSection() {

        let section = [];

        for (let i = 0; i < props.workout_single_exercise.length; i++) {
            section.push(
                <div className="workoutform-section col-7 p-2" key={i}>
                    <div className="workoutform-exercise">
                        <div className="form-label"> Choose a Exercise: </div>
                        <select
                            className="form-control"
                            name="id" value={props.workout_single_exercise[i].id}
                            onChange={(e) => { props.updateSection(e, i) }}>
                            {renderExercise()}
                        </select>
                    </div>
                    <div className="workoutform-rep">
                        <div className="form-label">Repetitions: </div>
                        <div className="input-group">
                            <input className="form-control"
                                name="repetition" type="number" min="1" max="50"
                                value={props.workout_single_exercise[i].repetition}
                                onChange={(e) => { props.updateSection(e, i) }}
                            />
                            <div className="input-group-text">repetitions</div>
                            {props.errors['single_exercise'] 
                                && props.errors['single_exercise'].length > i
                                && props.errors['single_exercise'][i]["workout_rep"]}
                        </div>

                    </div>
                    <div className="workoutform-set">
                        <div className="form-label">Sets:  </div>
                        <div className="input-group">
                            <input className="form-control"
                                name="set" type="number" min="1" max="50"
                                value={props.workout_single_exercise[i].set}
                                onChange={(e) => { props.updateSection(e, i) }}
                            />
                            <div className="input-group-text">sets</div>
                            {props.errors['single_exercise'] 
                                && props.errors['single_exercise'].length > i 
                                && props.errors['single_exercise'][i]["workout_set"]}
                        </div>
                    </div>

                    <div className="add-delete-button">
                        <button className="btn btn-light icon-btn addnew-btn" onClick={props.clickAdd}><i class="fas fa-plus"></i></button>
                        {props.workout_single_exercise.length > 1 ? <button className="btn btn-danger icon-btn deleteex-btn" onClick={() => { props.deleteExercise(i) }}><i class="far fa-trash-alt"></i></button> : ""}
                    </div>
                </div>
            )
        }
        return section;
    }

    return (
        <React.Fragment>
            <div className="row">
                <div className="workoutform-label col-lg-6 col-md-6 col-sm-12">
                    <div className="form-label">Workout Name: </div>
                    <input className="form-control"
                        name="workout_name" type="text"
                        placeholder="Workout Name"
                        value={props.workout_name}
                        onChange={props.updateForm} />
                    {props.errors["workout_name"]}
                </div>
                <div className="workoutform-duration col-lg-3 col-md-3 col-sm-12">
                    <div className="form-label"> Duration: </div>
                    <div className="input-group">
                        <input className="form-control"
                            name="workout_duration" type="number" min="1" max="150"
                            placeholder="1"
                            value={props.workout_duration}
                            onChange={props.updateForm} />
                        
                        <div className="input-group-text">minutes</div>
                        {props.errors["workout_duration"]}
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="workoutform-difficulty col-sm-12 col-md-6 col-lg-6">
                    <div className="form-label">Difficulty Level: </div>

                    <label className="form-check-label">
                        <input type="radio"
                            className="form-check-input"
                            name="workout_difficulty"
                            value="beginner"
                            onChange={props.updateForm}
                            checked={props.workout_difficulty === 'beginner'}
                        />
                        Beginner</label>

                    <label className="form-check-label">
                        <input type="radio"
                            className="form-check-input"
                            name="workout_difficulty"
                            value="intermediate"
                            onChange={props.updateForm}
                            checked={props.workout_difficulty === 'intermediate'}
                        />
                        Intermediate
                    </label>

                    <label className="form-check-label">
                        <input type="radio"
                            className="form-check-input"
                            name="workout_difficulty"
                            value="expert"
                            onChange={props.updateForm}
                            checked={props.workout_difficulty === 'expert'}
                        />
                        Expert
                    </label>
                </div>
                <div className="workoutform-intensity col-sm-12 col-md-6 col-lg-6">
                    <div className="form-label"> Intensity Level: </div>

                    <label className="form-check-label">
                        <input type="radio"
                            className="form-check-input"
                            name="workout_intensity"
                            value="low"
                            onChange={props.updateForm}
                            checked={props.workout_intensity === 'low'}
                        />
                        Low
                    </label>

                    <label className="form-check-label">
                        <input type="radio"
                            className="form-check-input"
                            name="workout_intensity"
                            value="medium"
                            onChange={props.updateForm}
                            checked={props.workout_intensity === 'medium'}
                        />
                        Medium
                    </label>

                    <label className="form-check-label">
                        <input type="radio"
                            className="form-check-input"
                            name="workout_intensity"
                            value="high"
                            onChange={props.updateForm}
                            checked={props.workout_intensity === 'high'}
                        />
                        High
                    </label>
                </div>

                <div className="workoutform-focus col-12">
                    <div className="form-label">Workout Focus: </div>

                    <label className="form-check-label">
                        <input type="checkbox"
                            className="form-check-input"
                            name="workout_focus"
                            value="strength"
                            onChange={props.updateFocusCheckbox}
                            checked={props.workout_focus.includes('strength')}
                        />
                        Strength
                    </label>

                    <label className="form-check-label">
                        <input type="checkbox"
                            className="form-check-input"
                            name="workout_focus"
                            value="endurance"
                            onChange={props.updateFocusCheckbox}
                            checked={props.workout_focus.includes('endurance')}
                        />
                        Endurance
                    </label>

                    <label className="form-check-label">
                        <input type="checkbox"
                            className="form-check-input"
                            name="workout_focus"
                            value="mobility"
                            onChange={props.updateFocusCheckbox}
                            checked={props.workout_focus.includes('mobility')}
                        />
                        Mobility
                    </label>
                    {props.errors["workout_focus"]}
                </div>
                <div className="workoutform-muscle col-12">
                    <div className="form-label"> Muscle Group: </div>
                    {renderMuscleGroup()}
                    {props.errors["workout_muscle_group"]}
                </div>
            </div>
            <div className="row">
                {renderSection()}
            </div>

        </React.Fragment>
    )
}