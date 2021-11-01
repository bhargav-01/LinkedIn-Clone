import React from 'react'
import { Switch, Route, Redirect,Link } from 'react-router-dom';
import Login from './Login/LoginComponent'
import SignUp from './Login/SignupComponent'
import LocationDetails from './Login/LocationComponent'
import JobDetails from './Login/JobDetailsComponent'
import StudyDetails from './Login/StudentComponent'
import PostWithID from './PostWithID';
import Home from './HomeComponent';
function Main(props) {
    const Home= () => {
        <Home posts={props.posts}/>
    }
    
    return (
            <div>
                <Switch>
                    <Route path='/SignUp' component={SignUp}/>
                    <Route path='/Ldetails' component={LocationDetails}/>
                    <Route path='/Jdetails' component={JobDetails}/>
                    <Route path='/Sdetails' component={StudyDetails}/>
                    <Route path='/post' component={PostWithID}/>
                    <Route path='/home' component={Home}/>
                    <Redirect to="/SignUp" />
                </Switch>
            </div>
    )
}

export default Main
