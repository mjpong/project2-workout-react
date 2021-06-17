import React from "react";
import axios from 'axios';

const baseURL = "https://3000-amethyst-lungfish-54xn6kl3.ws-us08.gitpod.io"

export default class ViewWorkout extends React.Component {

    state = {
        'single_workout': {},
        'workout_comment': []
    }

    async componentDidMount() {
        let workoutResponse = await axios.get(baseURL + "/workouts/" + this.props.id)
        console.log(workoutResponse.data);
        this.setState({
            contentLoaded: true,
            'single_workout': workoutResponse.data,
        })
    }

    render() {

        if (this.state.isLoaded === false) {
            return (
                <div></div>
            )
        } else {

            return (
                <React.Fragment>

                    <h1>Testing ViewWorkout</h1>
                    <div className="container">
                        <div className="content-wrapper row">
                            <h1>Workout Name</h1>
                            <div className="tags-wrapper">
                                <div className="row">
                                <div className="col-4">{this.state.single_workout.duration} mins</div>
                                <div className="col-4">{this.state.single_workout.intensity} </div>
                                <div className="col-4">{this.state.single_workout.difficulty} </div>
                            </div></div>
                            <div className="goodfor-wrapper row">Good For</div>
                            <div className="muscle-wrapper row">Muscle List</div>
                            <div className="equipment-wrapper row">Equipment List</div>
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
                                <input type="text" placeholder="Your name" name="comment_name" value={this.state.comment_name} onChange={this.updateForm} />
                                <textarea rows="3" cols="40" placeholder="Let us know what you think of this!" name="comment_text" value={this.state.comment_text} onChange={this.updateForm} />
                            </div>
                            <button>Post Comment</button>
                            <button>Edit Comment</button>
                            <button>Delete Comment</button>
                        </div>
                    </div>


                </React.Fragment>
            )
        }
    }

}