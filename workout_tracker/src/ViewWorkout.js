import React from "react";
import axios from 'axios';

export default class ViewWorkout extends React.Component {

    state = {
        'all_workout': [],

    }

    async componentDidMount() {
        let r = await axios.get('./json/workout.json')
        let workout = r.data.workouts

        this.setState({
            'all_workout': workout,

        })
    }

    renderSingleWorkout(){

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
                        <div>

                        </div>
                    </div>


                </React.Fragment>
            )
        }
    }

}