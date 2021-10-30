import React from 'react'
import { Switch, Route, Redirect,Link } from 'react-router-dom';
import Login from './Login/LoginComponent'
import SignUp from './Login/SignupComponent'
import LocationDetails from './Login/LocationComponent'
import JobDetails from './Login/JobDetailsComponent'
import StudyDetails from './Login/StudentComponent'
function Main() {
    return (
            <div>
                <Switch>
                    <Route path='/SignUp' component={SignUp}/>
                    <Route path='/Ldetails' component={LocationDetails}/>
                    <Route path='/Jdetails' component={JobDetails}/>
                    <Route path='/Sdetails' component={StudyDetails}/>
                    <Redirect to="/SignUp" />
                </Switch>
            </div>
    )
}

export default Main
