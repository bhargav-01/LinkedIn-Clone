import React, { useState } from 'react';
import './login.css'
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
var axios=require('axios');

function LocationDetails() {
    const [country, setCountry] = useState('');
    const [region, setRegion] = useState('');
    const token=localStorage.getItem('token');
    const history=useHistory();

    const handleSubmit=(event)=>{
        event.preventDefault();
        // console.log({'Authorization': `Bearer ${this.getToken()}`});
        
        const instance = axios.create({
            baseURL: 'http://localhost:3001/users/',
            headers: {'Authorization': `Bearer  ${token}`}
        });
        instance.post('/signup/ld',{
            country:country,
            region:region,
        })
        .then(response=>{
           history.push('/Sdetails');
        });
    }
  
    return (
        <div className="canvas">
            <div className="header">
                <div>
                    <img src='assets/images/Linkedin_logo.png' alt="Linkedin" className="logo"></img>
                </div>
            </div>
            <div className="login-container">
                <form
                    className="form"
                    onSubmit={(event)=>handleSubmit(event)}>
                    {/* <div>
                        <h1>Log In</h1>
                        <p>Stay updated on your professional world</p>           
                    </div> */}
                    <Box sx={{ display: 'flex',"align-items": "stretch","flex-direction": "column" }}>
                        <label style={{marginBottom:7}}>Country</label>
                        <CountryDropdown
                            className="form-select" 
                            aria-label="Default select example"
                            value={country}
                            onChange={val=>setCountry(val)}/>
                    </Box>
                    <Box sx={{ display: 'flex',"align-items": "stretch","flex-direction": "column",marginTop:20}}>
                        <label style={{marginBottom:7}}>Region</label>
                        <RegionDropdown
                            className="form-select" 
                            aria-label="Default select example"
                            country={country}
                            value={region}
                            onChange={(val) => setRegion(val)} />
                    </Box>
                    <div className="d-grid gap-2" style={{margin:"20px 0px 20px 0px"}}>
                        <button type="submit" class="btn btn-lg btn-primary" style={{borderRadius:"50px"}}>Continue</button>
                    </div>
                </form>
            </div>
        </div>
    );
  }
  export default LocationDetails