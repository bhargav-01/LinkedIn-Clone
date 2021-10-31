import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import {makeStyles,ThemeProvider,createTheme} from '@material-ui/core/styles'
import './details.css'

const axios=require('axios');

const theme = createTheme({
    // palette: {
    //     primary: {
    //         main:'#fff',
    //     },
    //     secondary: {
    //         main: '#fff',
    //     },
    // },
});

function JobDetails(props) {
    const [e_type, setE_type] = useState('');
    const [company, setCompany] = useState('');
    const [specialization, setSpecialization] = useState('');
    // const history = useHistory();
    const token=localStorage.getItem('token');

    const handleSubmit = (event) => {
        event.preventDefault();
        const instance = axios.create({
            baseURL: 'http://localhost:3001/users/',
            headers: {'Authorization': `Bearer ${token}`}
        });
        instance.post('/signup/Jd',{
            Employment_type:e_type,
            Company_Name:company,
            Position:specialization,
        })
        .then(response=>{
            console.log(response);
        });
    };
    
    return (
        <ThemeProvider theme={theme}>
            <div className="canvas">
                <div className="header">
                    <div>
                         <img src='assets/images/Linkedin_logo.png' alt="Linkedin" className="logo"></img>
                         <h3 style={{textAlign:"center"}}>Your profile helps you discover new people and opportunities</h3>
                    </div>
                </div>
                <div className="details-container">
                    <form
                        onSubmit={(e)=>handleSubmit(e)}
                        className="form-container">
                        <Box sx={{marginTop:20}}>
                            <label for="e_type" className="form-label">Employment type* </label>
                            <input  type="text" 
                                    className="form-control" 
                                    id="e_type"
                                    value={e_type}
                                    onChange={e=>setE_type(e.target.value)}
                            />
                        </Box>
                        <Box sx={{marginTop:10}}>
                            <label for="company" className="form-label">Most recent company*</label>
                            <input  type="text" 
                                    className="form-control" 
                                    id="company"
                                    value={company}
                                    onChange={e=>setCompany(e.target.value)}
                            />
                        </Box>
                        <Box sx={{marginTop:10}}>
                            <label for="Specialization" className="form-label">Specialization* </label>
                            <input  type="text" 
                                    className="form-control" 
                                    id="Specialization"
                                    value={specialization}
                                    onChange={e=>setSpecialization(e.target.value)}
                            />
                        </Box>
                        <div className="d-grid gap-2" style={{margin:"20px 0px 10px 0px"}}>
                            <a className="btn btn-lg btn-primary" href="/Sdetails" role="button" style={{borderRadius:"50px"}}>I'm a student</a>
                            <button type="submit" class="btn btn-lg btn-primary" style={{borderRadius:"50px"}}>Continue</button>
                        </div>
                    </form>    
                </div>
            </div>
      </ThemeProvider>
    )
}

export default JobDetails

