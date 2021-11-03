import React,{useState} from 'react'
import Box from '@material-ui/core/Box';
import {TextField,DialogContent,Button,DialogActions} from '@material-ui/core';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles((theme) =>({
    root: {    
        
        "&:-webkit-autofill": {
            fontSize:'1.2rem',
          },
        '& .MuiOutlinedInput-root': { 
            '& fieldset': {     
                borderWidth:"1px",       // - The <fieldset> inside the Input-root
                borderColor: 'black',   // - Set the Input border
            },
        },
        fontSize:'1.2rem',
    },
    label:{
        fontSize:'1.2rem',
    },
    input:{
        
        "&:-webkit-autofill": {
            fontSize:'1.2rem',
          },
        fontSize:'1.2rem',
    },
    link:{
        "font-family": "system-ui",
        "font-weight": 500,
        color:'#0a66c2',
        fontSize:'17px',
    }
    
}));

function NameModal(props) {
    const classes = useStyles(); 
    const [firstName, setFirstName] = useState(props.profile.firstname);
    const [lastName, setLastName] = useState(props.profile.lastname);
    const [headline, setHeadline] = useState(props.profile.headline);
    const [country, setCountry] = useState(props.profile.country);
    const [region, setRegion] = useState(props.profile.region);

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log("sc");
        console.log(headline);
        props.submitNameDetails(firstName,lastName,headline,country,region);
    }
    return (
        <div>
             <DialogContent dividers className="name-modal">
                <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:30 }}>
                    <TextField 
                        label="First Name"
                        id="outlined-basic" 
                        variant="outlined"
                        fullWidth 
                        color="#FFF"
                        className={classes.root}
                        inputProps={{className:classes.input}}
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                            }
                        }}
                        required
                        value={firstName}
                        onChange={e => setFirstName(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:20}}>
                    <TextField 
                        label="Last Name"
                        id="outlined-basic" 
                        variant="outlined"
                        fullWidth 
                        color="#FFF"
                        className={classes.root}
                        inputProps={{className:classes.input}}
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                            }
                        }}
                        required
                        value={lastName}
                        onChange={e => setLastName(e.target.value)} />
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:20 }}>
                    <TextField 
                        label="Headline"
                        id="outlined-basic" 
                        variant="outlined"
                        fullWidth 
                        color="#FFF"
                        className={classes.root}
                        inputProps={{className:classes.input}}
                        InputLabelProps={{
                            classes: {
                                root: classes.label,
                            }
                        }}
                        required
                        value={headline}
                        onChange={e => setHeadline(e.target.value)} />
                </Box>
                <div>
                    <h3 style={{marginTop:20}}>Location</h3>
                    <Box sx={{ display: 'flex',"align-items": "stretch","flex-direction": "column",marginTop:20 }}>
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
                </div>
             </DialogContent>
            <DialogActions>   
                <Button color="primary" style={{textTransform:'none'}} variant="contained" onClick={(e)=>handleSubmit(e)}>
                    Submit
                </Button>
            </DialogActions>
            
        </div>
    )
}

export default NameModal
