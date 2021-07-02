import React from "react";
import axios from 'axios';
import EditWorkout from "./EditWorkout";

const baseURL = "https://mjp-tgc12-project2.herokuapp.com"

export default class ViewWorkout extends React.Component {

    state = {
        // db to show
        //store each workout per id
        'each_workout': {},
        'comments_section': [],
        'single_exercise': [],

        // current comment form
        'comment_id': "",
        'comment_name': "",
        'comment_text': '',
        'each_comment': {},

        contentLoaded: false,
        displayEditWorkout: false,
        displayEditComment: false,
        displayView: true
    }

    async componentDidMount() {
        this.retrieveData();
    }

    retrieveData = async () => {
        let workoutResponse = await axios.get(baseURL + "/workouts/" + this.props.id)
        console.log(workoutResponse.data);

        let commentsResponse = await axios.get(baseURL + '/workouts/' + this.props.id + '/comments')
        console.log(commentsResponse.data)

        let singleExerciseResponse = await axios.get(baseURL + '/list/singleexercise')

        this.setState({
            contentLoaded: true,
            each_workout: workoutResponse.data,
            comments_section: commentsResponse.data,
            single_exercise: singleExerciseResponse.data

        })
    }

    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    clearFields = () => {
        this.setState({
            comment_name: '',
            comment_text: ''
        })
    }

    // Workout section

    renderEquipment = () => {
        let equipments = []
        for (let x of this.state.each_workout.single_exercise) {
            let match = this.state.single_exercise.find(s => {
                return x.id === s._id;
            })

            for (let y of match.equipment) {
                if (!equipments.includes(y.name)) {
                    equipments.push(y.name)
                }
            }
        }

        return equipments.map((e) => {
            return (

                <li>{e}</li>

            )
        })
    }

    renderExerciseGuide = () => {
        let description = [];
        for (let x of this.state.each_workout.single_exercise) {
            let match = this.state.single_exercise.find(s => {
                return x.id === s._id;

            })

            for (let y of match.description) {
                if (!description.includes(y.name)) {
                    let e = (
                        <React.Fragment>
                            <tr>
                                <td>{match.exercise_name}</td>
                                <td>{x.repetition}</td>
                                <td>{x.set}</td>
                                <td>{match.description}</td>
                            </tr>
                        </React.Fragment>
                    )
                    description.push(e)
                    break;
                }
            }
        }
        return description;

    }

    renderDescription = () => {
        let description = [];
        for (let x of this.state.each_workout.single_exercise) {
            let match = this.state.single_exercise.find(s => {
                return x.id === s._id;

            })

            for (let y of match.description) {
                if (!description.includes(y.name)) {
                    let e = (
                        <React.Fragment>
                            <tr>
                                <td>{match.exercise_name}</td>
                                <td>{match.description}</td>
                            </tr>
                        </React.Fragment>
                    )
                    description.push(e)
                    break;
                }
            }
        }
        return description;

    }

    renderSingleExercise = () => {
        let workouts = [];
        for (let w of this.state.each_workout.single_exercise) {
            workouts.push(
                <tr>
                    <td>{w.name}</td>
                    <td>{w.repetition}</td>
                    <td>{w.set}</td>
                </tr>
            )
        }
        if (workouts.length === 0) {
            workouts.push(
                <div>No Exercises Found</div>
            )
        }
        return workouts
    }

    deleteWorkout = async (idToDelete) => {
        let response = await axios.delete(baseURL + "/workouts/delete/" + idToDelete)
        this.props.goBrowse("browse")
    }

    // comments sections

    renderCommentList = () => {
        if (this.state.each_workout.comments) {
            let jsx = this.state.each_workout.comments.map((c) => {
                return (
                    <React.Fragment>
                        <div className="comment-list row" key={c.id}>
                            <div className="comment-list-text col-9">
                                <p className="comment-name">{c.comment_name}</p>
                                <p>{c.comment_text}</p>
                            </div>
                            <div className="comment-list-btn col-3 d-flex justify-content-end ">
                                <button
                                    className="btn btn-light edit-btn icon-btn"
                                    value={c.id}
                                    onClick={() => { this.editComment(c) }}
                                ><i class="far fa-edit "></i></button>
                                <button
                                    className="btn btn-danger icon-btn"
                                    value={c.id}
                                    onClick={() => { this.deleteComment(c) }}
                                > <i class="far fa-trash-alt"></i></button>
                            </div>
                        </div>
                    </React.Fragment>
                )
            })
            return jsx
        } else {
            return "Be the first one to comment!"
        }
    }

    createComment = async () => {
        let userData = {
            comment_name: this.state.comment_name,
            comment_text: this.state.comment_text
        }
        let response = await axios.post(baseURL + '/workouts/' + this.props.id + '/comments/create', userData)
        console.log(response)
        this.retrieveData()
        this.clearFields()
    }

    deleteComment = async (c) => {
        let response = await axios.delete(baseURL + "/workouts/" + this.props.id + "/comments/" + c.id)
        this.retrieveData();
    }

    editComment = (c) => {
        for (let i of this.state.comments_section[0].comments) {
            if (i.id === c.id) {
                this.setState({
                    comment_id: c.id,
                    comment_name: i.comment_name,
                    comment_text: i.comment_text,
                    displayEditComment: true
                })
                break;
            }
        }
    }

    updateComment = async () => {
        let newComment = {
            id: this.state.comment_id,
            comment_name: this.state.comment_name,
            comment_text: this.state.comment_text
        }

        let response = await axios.put(baseURL + "/workouts/" + this.props.id + "/comments/edit/" + this.state.comment_id, newComment)
        if (response.data.message === "Comments Updated") {
            this.retrieveData();

            this.setState({
                comment_name: "",
                comment_text: "",
                displayEditComment: false
            })
        }

    }

    cancelEditComment = () => {
        this.setState({
            displayEditComment: false,
        })
        this.clearFields()
    }

    // Edit Section (<EditWorkout/>)

    editWorkout = () => {
        this.setState({
            displayEditWorkout: true,
            displayView: false
        })
    }

    cancelEditWorkout = () => {
        this.setState({
            displayView: true,
            displayEditWorkout: false
        })
    }


    renderEditWorkout = () => {
        if (this.state.displayEditWorkout) {
            return (
                <EditWorkout
                    workout_id={this.state.each_workout._id}
                    workout_name={this.state.each_workout.name}
                    workout_duration={this.state.each_workout.duration}
                    workout_focus={this.state.each_workout.focus}
                    workout_difficulty={this.state.each_workout.difficulty}
                    workout_intensity={this.state.each_workout.intensity}
                    workout_muscle_group={this.state.each_workout.muscle_group}
                    workout_single_exercise={this.state.each_workout.single_exercise}
                    cancelEditWorkout={this.cancelEditWorkout}
                    retrieveData={this.retrieveData}
                />
            )

        } else {
            return null
        }
    }


    render() {

        if (this.state.contentLoaded === false) {
            return (
                <div>Loading Workout...</div>
            )
        } else {

            return (
                <React.Fragment>
                    {this.state.contentLoaded && this.state.displayView &&
                        <div className="container view-workout">
                            <div className="workout-content p-4">
                                <div className="workout-section content-wrapper row">
                                    <h1 className="viewworkout-name">{this.state.each_workout.name}</h1>

                                    <div className="tags-wrapper row">
                                        <div className="col-4 clock-icon">
                                            <i class="far fa-clock fa-2x"></i>
                                            <p>{this.state.each_workout.duration} minutes</p>
                                        </div>
                                        <div className={"col-4 fire-" + this.state.each_workout.intensity}
                                            style={{ textTransform: 'capitalize' }}>
                                            <i class="fas fa-fire fa-2x"></i>
                                            <p>{this.state.each_workout.intensity}</p>
                                        </div>
                                        <div className={"col-4 tachometer-" + this.state.each_workout.difficulty}
                                            style={{ textTransform: 'capitalize' }}>
                                            <i class="fas fa-tachometer-alt fa-2x"></i>
                                            <p>{this.state.each_workout.difficulty}</p>
                                        </div>
                                    </div>
                                    <hr></hr>

                                    {/* MOBILE DESCRIPTION WRAPPER */}
                                    <div className="mobile-wrapper d-block d-md-none">
                                        <div className="m-exercise-wrapper row ">
                                            <h5>Exercise Sequence:</h5>
                                            <div className="m-exercise-table-wrapper">
                                                <table className="m-exercise-sequence es-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Exercise Name</th>
                                                            <th>Repetitions</th>
                                                            <th>Sets</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderSingleExercise()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>

                                        <div className="m-item-wrapper row">
                                            <div className="m-muscle-tag-wrapper col-4">
                                                <p className="m-tags-text">Works on your: </p>
                                                {this.state.each_workout.muscle_group.map((m) =>
                                                    <li style={{ textTransform: 'capitalize' }}>{m.name}</li>
                                                )}

                                            </div>
                                            <div className="m-focus-tag-wrapper col-4">
                                                <p className="m-tags-text"> Focuses on: </p>
                                                {this.state.each_workout.focus.map((f) =>
                                                    <li style={{ textTransform: 'capitalize' }}>{f}</li>
                                                )}
                                            </div>
                                            <div className="m-equipment-tag-wrapper col-4">
                                                <p className="m-tags-text"> Equipment Needed: </p>
                                                {this.renderEquipment()}
                                            </div>
                                        </div>

                                        <div className="m-description-wrapper row">
                                            <div className="m-description-table-wrapper">
                                                <table className="m-exercise-description ed-table">
                                                    <thead>
                                                        <tr>
                                                            <th>Exercise Name</th>
                                                            <th>Description</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {this.renderDescription()}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>

                                    {/* LAPTOP DESCRIPTION WRAPPER */}
                                    <div className="laptop-wrapper d-none d-md-block">
                                        <div className="row">
                                            <div className="col-10">
                                                <div className="description-wrapper row">
                                                    <div className="description-table-wrapper">
                                                        <table className="exercise-description eg-table">
                                                            <thead>
                                                                <tr>
                                                                    <th>Exercise Guide</th>
                                                                    <th>Repetitions</th>
                                                                    <th>Sets</th>
                                                                    <th>Description</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {this.renderExerciseGuide()}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-2">
                                                <div className="item-wrapper row">
                                                    <div className="muscle-tag-wrapper col-12">
                                                        <p className="tags-text">Works on your: </p>

                                                        {this.state.each_workout.muscle_group.map((m) =>
                                                            <li style={{ textTransform: 'capitalize' }}>{m.name}</li>
                                                        )}

                                                    </div>
                                                    <div className="focus-tag-wrapper col-12">
                                                        <p className="tags-text">Focuses on: </p>

                                                        {this.state.each_workout.focus.map((f) =>
                                                            <li style={{ textTransform: 'capitalize' }}>{f}</li>
                                                        )}

                                                    </div>
                                                    <div className="equipment-tag-wrapper col-12">
                                                        <p className="tags-text">Equipment Needed: </p>
                                                        {this.renderEquipment()}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="mt-2 d-flex justify-content-end" >
                                        <button
                                            className="btn btn-light edit-btn icon-btn"
                                            onClick={() => { this.editWorkout() }}>
                                            <i class="far fa-edit"></i></button>
                                        <button
                                            className="btn btn-danger ml-2 icon-btn"
                                            onClick={() => { this.deleteWorkout(this.state.each_workout._id); }}>
                                            <i class="far fa-trash-alt"></i></button>
                                    </div>

                                </div>
                                <div className="comment-section content-wrapper row">

                                    <div className="new-comment">
                                        <h5>Like this exercise? Share your thoughts...</h5>

                                        <div className="review-label"> Name: </div>

                                        <div className="row">
                                            <div className="col-lg-4 col-md-4 col-sm-12">
                                                <input className="form-control create-commentname"
                                                    type="text" placeholder="Type your name here"
                                                    name="comment_name" value={this.state.comment_name}
                                                    onChange={this.updateForm} />
                                            </div></div>
                                        <div className="review-label"> Comments: </div>
                                        <textarea
                                            name="comment_text"
                                            className="form-control create-commenttext"
                                            rows="2" cols="30" placeholder="Let us know what you think of this!"
                                            value={this.state.comment_text} onChange={this.updateForm}>
                                        </textarea>
                                            <button
                                                className="btn btn-light create-comment-btn action-buttons"
                                                onClick={() => { this.createComment() }}
                                                style={{ display: this.state.displayEditComment === true ? "none" : "inline-block" }}
                                            >Post Comment</button>
                                            <div className="row">
                                            <button
                                                className="btn btn-light create-comment-btn action-buttons col-6"
                                                onClick={() => { this.updateComment() }}
                                                style={{ display: this.state.displayEditComment === true ? "inline-block" : "none" }}
                                            >Update</button>
                                            <button
                                                className="btn btn-secondary cancel-comment-btn action-buttons col-6"
                                                onClick={() => { this.cancelEditComment() }}
                                                style={{ display: this.state.displayEditComment === true ? "inline-block" : "none" }}
                                            >Cancel</button>
                                            </div>
                                
                                    </div>
                                    <hr></hr>
                                    <div className="existing-comments p-2">
                                    <div>
                                        <i class="far fa-comments fa-2x"></i>
                                        <h5> There are {this.state.comments_section[0].comments.length} comments:</h5>
                                    </div>
                                        {this.renderCommentList()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {!this.state.displayView && this.renderEditWorkout()}


                </React.Fragment>
            )
        }
    }

}

