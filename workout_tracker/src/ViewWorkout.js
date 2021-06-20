import React from "react";
import axios from 'axios';

const baseURL = "https://3000-amethyst-lungfish-54xn6kl3.ws-us09.gitpod.io"

export default class ViewWorkout extends React.Component {

    state = {
        // db to show
        //store each workout per id
        'each_workout': {},
        'comments_section': [],

        // current comment form
        'comment_name': "",
        'comment_text': '',

        contentLoaded: false
    }

    async componentDidMount() {
        let workoutResponse = await axios.get(baseURL + "/workouts/" + this.props.id)
        console.log(workoutResponse.data);

        let commentsResponse = await axios.post(baseURL + '/workouts/' + this.props.id + '/comments/create')
        console.log(commentsResponse)

        this.setState({
            contentLoaded: true,
            each_workout: workoutResponse.data,
            comments_section: commentsResponse.data

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

    renderCommentList = () => {
        if (this.state.each_workout) {
            let jsx = this.state.each_workout.comments.map((c) => {
                return (
                    <React.Fragment>
                        <div className="comment-list">
                            <p>{c.comment_name}</p>
                            <p>{c.comment_text}</p>
                            <button>Edit Comment</button>
                            <button>Delete Comment</button>
                        </div>
                    </React.Fragment>
                )
            })
            return jsx
        }
    }

    createComment = async () => {
        let userData = {
            comment_name: this.state.comment_name,
            comment_text: this.state.comment_text
        }
        let response = await axios.post(baseURL + '/workouts/' + this.props._id + '/comments/create', userData)
        console.log(response)
        // this.renderNewCommentList()
        this.clearFields()
    }

    // renderNewCommentList = async () => {
    //     let response = await axios.get(baseURL + '/workouts/' + this.props._id + '/comments')
    //     this.setState({
    //         comments_section: response
    //     })
    // }

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
                                    <div className="col-4">Duration: {this.state.each_workout.duration} mins</div>
                                    <div className="col-4">Intensity: {this.state.each_workout.intensity} </div>
                                    <div className="col-4">Difficulty: {this.state.each_workout.difficulty} </div>
                                </div>
                                <div className="goodfor-wrapper row">
                                    <label>It's Good For: </label>
                                    <div className="col-4">
                                        {this.state.each_workout.muscle_group.map((m) =>
                                            <p>{m.name}</p>
                                        )}
                                    </div>
                                    <div className="col-4"><p>
                                        {this.state.each_workout.focus.map((f) =>
                                            <p>{f}</p>
                                        )}
                                    </p></div>


                                </div>
                                <div className="equipment-wrapper row">
                                    <label>Equipment Needed: </label>
                                    <p>exercise id to find the equipment in the exercise db</p>
                                </div>
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
                                    Description of the exercises
                                    call seperate singleexercise id
                                </div>
                                <button>Edit</button>
                                <button>Delete</button>
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

