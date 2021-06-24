import React from "react";
import axios from 'axios';

const baseURL = "https://3000-amethyst-lungfish-54xn6kl3.ws-us08.gitpod.io"

export default class ViewWorkout extends React.Component {

    state = {
        // db to show
        //store each workout per id
        'each_workout': {},
        'comments_section': [],
        'single_exercise': [],

        // current comment form
        'comment_name': "",
        'comment_text': '',

        contentLoaded: false
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
        console.log(singleExerciseResponse.data)

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
                <div>
                    <li>{e}</li>
                </div>
            )
        })
    }

    renderDescription = () => {
        let description = [];
        for (let x of this.state.each_workout.single_exercise) {
            let match = this.state.single_exercise.find(s => {
                return x.id === s._id;
            })

            for (let y of match.description) {
                if (!description.includes(y.name)){
                    let e = (
                        <React.Fragment>
                            <p>{match.exercise_name}</p>
                            <li>{match.description}</li>
                        </React.Fragment>
                    )
                    description.push(e)
                }
                console.log(description)
                return description;
            }
        }

    }

    renderSingleExercise = () => {
        let workouts = [];
        for (let x of this.state.each_workout.single_exercise) {
            let match = this.state.single_exercise.find(s => {
                return x.id === s._id;
            })
            workouts.push(match);
        }
        console.log(workouts);
        return
    }

    renderCommentList = () => {
        if (this.state.each_workout.comments) {
            let jsx = this.state.each_workout.comments.map((c) => {
                return (
                    <React.Fragment>
                        <div className="comment-list">
                            <p>{c.comment_name}</p>
                            <p>{c.comment_text}</p>
                            <button>Edit Comment</button>
                            <button onClick={() => {
                                this.deleteComment(c);
                            }}>Delete Comment</button>
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

    deleteComment = async (comment) => {
        console.log(comment);
        let response = await axios.delete(baseURL + "/workouts/" + this.props.id + "/comments/" + comment.id)
        console.log(response)
        this.retrieveData();
    }

    deleteWorkout = async (idToDelete) => {
        let response = await axios.delete(baseURL + "/workouts/delete/" + idToDelete)
        this.props.goBrowse("browse")
    }


    render() {

        if (this.state.contentLoaded === false) {
            return (
                <div>Content Cannot be Loaded</div>
            )
        } else {

            return (
                <React.Fragment>

                    <div className="container view-workout">
                        <div className="workout-content p-4">
                            <div className="content-wrapper row">
                                <h1 className="viewworkout-name">{this.state.each_workout.name}</h1>
                                <div className="tags-wrapper row">
                                    <div className="col-4">Duration: {this.state.each_workout.duration} minutes</div>
                                    <div className="col-4" style={{textTransform: 'capitalize'}}>Intensity: {this.state.each_workout.intensity} </div>
                                    <div className="col-4" style={{textTransform: 'capitalize'}}>Difficulty: {this.state.each_workout.difficulty} </div>
                                </div>
                                <div className="goodfor-wrapper row">
                                    <h5>It's Good For: </h5>
                                    <div className="col-4">
                                        {this.state.each_workout.muscle_group.map((m) =>
                                            <li style={{textTransform: 'capitalize'}}>{m.name}</li>
                                        )}
                                    </div>
                                    <div className="col-4"><p>
                                        {this.state.each_workout.focus.map((f) =>
                                            <li style={{textTransform: 'capitalize'}}>{f}</li>
                                        )}
                                    </p></div>
                                </div>

                                <div className="equipment-wrapper row">
                                    <h5>Equipment Needed: </h5>
                                    {this.renderEquipment()}
                                </div>
                                
                                <h5>Exercise Sequence:</h5>
                                <div className="exercise-wrapper row">

                                    <div className="col-6">
                                        <ul>
                                            <li>Exercise Name</li>
                                            <li>1st Entry</li>
                                        </ul>
                                    </div>
                                    <div className="col-3">
                                        <ul>
                                            <li>Reps</li>
                                            <li>1st Entry</li>
                                        </ul>
                                    </div>
                                    <div className="col-3">
                                        <ul>
                                            <li>Sets</li>
                                            <li>1st Entry</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="description-wrapper row">
                                    <h5>Not sure how to do it? Follow the guide below: </h5>
                                    {this.renderDescription()}
                                </div>
                                <button>Edit</button>
                                <button onClick={() => {
                                    this.deleteWorkout(this.state.each_workout._id);
                                }}>Delete</button>
                            </div>
                            <div className="comment-section">
                                Like this exercise? Share your thoughts
                                <div className="new-comment">
                                    <div className="review-label"> Your Name: </div>
                                    <input type="text" placeholder="Your name" name="comment_name" value={this.state.comment_name} onChange={this.updateForm} />
                                    <div className="review-label"> Comments: </div>
                                    <textarea name="comment_text" className="form-control create-textarea" rows="2" cols="30" placeholder="Let us know what you think of this!" value={this.state.comment_text} onChange={this.updateForm}></textarea>
                                </div>
                                <button onClick={() => { this.createComment() }}>Post Comment</button>
                            </div>
                            {this.renderCommentList()}

                        </div>
                    </div>


                </React.Fragment>
            )
        }
    }

}

