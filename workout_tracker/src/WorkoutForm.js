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
                        <input type="checkbox"
                            className="form-check-input"
                            name="workout_muscle_group"
                            value={muscle._id}
                            onChange={props.updateMuscleCheckbox}
                            checked={y}
                        /> <label className="form-check-label">{muscle.name}</label>
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
        } else
        {
            for (let muscle of props.all_muscle_group) {
                let e = (
                    <React.Fragment key={muscle._id}>
                        <input type="checkbox"
                            className="form-check-input"
                            name="workout_muscle_group"
                            value={muscle._id}
                            onChange={props.updateMuscleCheckbox}
                        /> <label className="form-check-label">{muscle.name}</label>
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
                <div className="workoutform-section col-8 p-2" key={i}>
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
                                name="repetition" type="number"
                                value={props.workout_single_exercise[i].repetition}
                                onChange={(e) => { props.updateSection(e, i) }}
                            />
                            <div className="input-group-text">repetitions</div>
                        </div>

                    </div>
                    <div className="workoutform-set">
                        <div className="form-label">Sets:  </div>
                        <div className="input-group">
                            <input className="form-control"
                                name="set" type="number"
                                value={props.workout_single_exercise[i].set}
                                onChange={(e) => { props.updateSection(e, i) }}
                            />
                            <div className="input-group-text">sets</div>
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
                <div className="workoutform-label col-7">
                    <div className="form-label">Workout Name: </div>
                    <input className="form-control"
                        name="workout_name" type="text"
                        placeholder="Workout Name"
                        value={props.workout_name}
                        onChange={props.updateForm} />
                </div>
                <div className="workoutform-duration col-5">
                    <div className="form-label"> Duration: </div>
                    <div className="input-group">
                        <input className="form-control"
                            name="workout_duration" type="number"
                            placeholder="1"
                            value={props.workout_duration}
                            onChange={props.updateForm}
                        />
                        <div className="input-group-text">minutes</div>
                    </div>

                </div>
            </div>
            <div className="row">
                <div className="workoutform-difficulty col-sm-12 col-md-6 col-lg-6">
                    <div className="form-label">Difficulty Level: </div>
                    <input type="radio"
                        className="form-check-input"
                        name="workout_difficulty"
                        value="beginner"
                        onChange={props.updateForm}
                        checked={props.workout_difficulty === 'beginner'}
                    />
                    <label className="form-check-label">Beginner</label>
                    <input type="radio"
                        className="form-check-input"
                        name="workout_difficulty"
                        value="intermediate"
                        onChange={props.updateForm}
                        checked={props.workout_difficulty === 'intermediate'}
                    />
                    <label className="form-check-label">Intermediate</label>
                    <input type="radio"
                        className="form-check-input"
                        name="workout_difficulty"
                        value="expert"
                        onChange={props.updateForm}
                        checked={props.workout_difficulty === 'expert'}
                    />
                    <label className="form-check-label">Expert</label>
                </div>
                <div className="workoutform-intensity col-sm-12 col-md-6 col-lg-6">
                    <div className="form-label"> Intensity Level: </div>
                    <input type="radio"
                        className="form-check-input"
                        name="workout_intensity"
                        value="low"
                        onChange={props.updateForm}
                        checked={props.workout_intensity === 'low'}
                    />
                    <label className="form-check-label">Low</label>
                    <input type="radio"
                        className="form-check-input"
                        name="workout_intensity"
                        value="medium"
                        onChange={props.updateForm}
                        checked={props.workout_intensity === 'medium'}
                    />
                    <label className="form-check-label">Medium</label>
                    <input type="radio"
                        className="form-check-input"
                        name="workout_intensity"
                        value="high"
                        onChange={props.updateForm}
                        checked={props.workout_intensity === 'high'}
                    />
                    <label className="form-check-label">High </label>
                </div>
            
            <div className="workoutform-focus col-12">
                <div className="form-label">Workout Focus: </div>
                <input type="checkbox"
                    className="form-check-input"
                    name="workout_focus"
                    value="strength"
                    onChange={props.updateFocusCheckbox}
                    checked={props.workout_focus.includes('strength')}
                />
                <label className="form-check-label"> Strength</label>
                <input type="checkbox"
                    className="form-check-input"
                    name="workout_focus"
                    value="endurance"
                    onChange={props.updateFocusCheckbox}
                    checked={props.workout_focus.includes('endurance')}
                />
                <label className="form-check-label">Endurance</label>
                <input type="checkbox"
                    className="form-check-input"
                    name="workout_focus"
                    value="mobility"
                    onChange={props.updateFocusCheckbox}
                    checked={props.workout_focus.includes('mobility')}
                />
                <label className="form-check-label">Mobility</label>
            </div>
            <div className="workoutform-muscle col-12">
                <div className="form-label"> Muscle Group: </div>
                {renderMuscleGroup()}
            </div>
</div>
            <div className="row">
                {renderSection()}
            </div>

        </React.Fragment>
    )
}