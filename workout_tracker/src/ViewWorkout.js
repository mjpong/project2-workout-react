import React from "react";
import axios from 'axios';

const baseURL = "https://3000-amethyst-lungfish-54xn6kl3.ws-us09.gitpod.io"

export default class ViewWorkout extends React.Component {

    state = {
        // db to show
        //store each workout per id
        'each_workout': {},
        'workout_comment': [],

        // current comment form
        'comment_name': "",
        'comment_text': ''
    }

    async componentDidMount() {
        let workoutResponse = await axios.get(baseURL + "/workouts/" + this.props.id)
        console.log(workoutResponse.data);

        this.setState({
            contentLoaded: true,
            'each_workout': workoutResponse.data,
        })
    }

    updateForm = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    renderComments = () => {
        let list = [];
        if (this.state.each_workout.comments[0] == null) {
            list.push(
                <div className="p-2" style={{ textAlign: 'center' }}>There are no reviews!</div>
            )
        } else {
            for (let l of this.state.each_workout.comments) {
                list.push(
                    <div>

                    </div>
                )
            }
        }
    }

    render() {

        if (this.state.isLoaded === false) {
            return (
                <div></div>
            )
        } else {

            return (
                <React.Fragment>

                    <div className="container view-workout">
                        <div className="workout-content p-4">
                            <div className="content-wrapper row">
                                <h1>{this.state.each_workout.name}</h1>
                                <div className="tags-wrapper">
                                    <div className="row">
                                        <div className="col-4">Duration: {this.state.each_workout.duration} mins</div>
                                        <div className="col-4">Intensity: {this.state.each_workout.intensity} </div>
                                        <div className="col-4">Difficulty: {this.state.each_workout.difficulty} </div>
                                    </div>
                                </div>
                                <div>
                                    <div className="goodfor-wrapper row">Workout Focus: {this.state.each_workout.focus}</div>
                                    <div className="muscle-wrapper row">Muscle List</div>
                                    <div className="equipment-wrapper row">Equipment List</div>
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
                                <div className="description-wrapper">
                                    Description of the exercises
                            </div>
                                <button>Edit</button>
                                <button>Delete</button>
                            </div>

                            <div className="comment-section">
                                Like this exercise?
                            <div className="new-comment">
                                    <div className="review-label"> Your Name: </div>
                                    <input type="text" placeholder="Your name" name="comment_name" value={this.state.comment_name} onChange={this.updateForm} />
                                    <div className="review-label"> Comments: </div>
                                    <textarea name="comment_text" className="form-control create-textarea" rows="2" cols="30" placeholder="Let us know what you think of this!" value={this.state.comment_text} onChange={this.updateForm}></textarea>
                                </div>
                                <button>Post Comment</button>
                                <button>Edit Comment</button>
                                <button>Delete Comment</button>
                            </div>

                        </div>
                    </div>


                </React.Fragment>
            )
        }
    }

}

