import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";
import {DatePicker} from '@material-ui/pickers'
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

function StudyDetails(props) {
    const [startYear, handleStartYear] = useState(new Date());
    const [endYear, handleEndYear] = useState(new Date());
    // const classes = useStyles(); 
    const [college, setCollege] = useState('');
    const [degree, setDegree] = useState('');
    const [specialization, setSpecialization] = useState('');
    // const history = useHistory();
    

    
    const token=localStorage.getItem('token');

    const handleSubmit = (event) => {
        event.preventDefault();
        const instance = axios.create({
            baseURL: 'http://localhost:3001/users/',
            headers: {'Authorization': `Bearer ${token}`}
        });
        instance.post('/signup/Ed',{
            Name_of_School:college,
            Degree:degree,
            Specialization:specialization,
            Start_Year:startYear,
            End_Year:endYear,
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
                            <label for="school" className="form-label">School or College/University* </label>
                            <input  type="text" 
                                    className="form-control" 
                                    id="school"
                                    value={college}
                                    onChange={e=>setCollege(e.target.value)}
                            />
                        </Box>
                        <Box sx={{marginTop:10}}>
                            <label for="degree" className="form-label">Degree*</label>
                            <input  type="text" 
                                    className="form-control" 
                                    id="degree"
                                    value={degree}
                                    onChange={e=>setDegree(e.target.value)}
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
                        <div className="row" style={{marginTop:10}}>
                            <div className="col-12 col-md-6 date">
                                <label for="start-year" className="form-label">Start year*</label>
                                <DatePicker
                                    views={["year"]}
                                    id="start-year"
                                    inputVariant="outlined"
                                    variant="inline"
                                    maxDate={new Date()}
                                    InputAdornmentProps={{ position: "start" }}
                                    value={startYear}
                                    onChange={handleStartYear}
                                /> 
                            </div>

                            <div className="col-12 col-md-6 date">
                                <label for="end_year" className="form-label">End year (or expected)*</label>
                                <DatePicker
                                    views={["year"]}
                                    id="end_year"
                                    inputVariant="outlined"
                                    variant="inline"
                                    InputAdornmentProps={{ position: "start" }}
                                    value={endYear}
                                    onChange={handleEndYear}
                                /> 
                            </div>
                           
                        </div>
                        <div className="d-grid gap-2" style={{margin:"20px 0px 10px 0px"}}>
                            <a className="btn btn-lg btn-primary" href="/Jdetails" role="button" style={{borderRadius:"50px"}}>I'm not a student</a>
                            <button type="submit" class="btn btn-lg btn-primary" style={{borderRadius:"50px"}}>Continue</button>
                        </div>
                    </form>    
                </div>
            </div>
      </ThemeProvider>
    )
}

export default StudyDetails

