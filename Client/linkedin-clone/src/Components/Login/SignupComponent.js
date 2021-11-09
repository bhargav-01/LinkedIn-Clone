import React, { useState } from 'react';
import './login.css'
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton'
import {MdVisibility,MdVisibilityOff} from 'react-icons/md'
import {makeStyles,ThemeProvider,createTheme} from '@material-ui/core/styles'
import { Link,FormControl,InputLabel,OutlinedInput } from '@material-ui/core';
import logo from '../../assets/images/Linkedin_logo.png'

const axios=require('axios');

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

function SignUp(props) {
    const classes = useStyles(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const history = useHistory();
    const [values, setValues] = React.useState({
        emailIsCorrect:true,
        nameDetails:false,
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const ChangeNameDetails = () => {
        setValues({
            ...values,
            emailIsCorrect:true,
            nameDetails: true,
        });
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSignIn=()=>{
        history.push('/Login');
    };

    const handleChange = (event) => {
        event.preventDefault();
        axios.get("http://localhost:3001/users/signup/"+email)
        .then(response=>{
            alert(JSON.stringify(response.data))
            if(!response.data.unique)
            {
                setValues({
                    ...values,
                    emailIsCorrect:false,
                })
            }
            else
            {
                setValues({
                    ...values,
                    emailIsCorrect:true,
                })
                ChangeNameDetails();
            }
        })
            
    };

    
    const handleSubmit = (event) => {
        // alert(email+" "+firstName+" "+lastName+" "+password);
        event.preventDefault();
        axios.post('http://localhost:3001/users/signup',{
            email:email,
            firstName:firstName,
            lastName:lastName,
            password:password,
        })
        .then(response=>{
            localStorage.setItem('token',response.data.token);
            history.push('/Ldetails');
        })
        .catch(error => {
            alert(error);
            console.log(error);
        });
    };
    
    return (
        <ThemeProvider theme={theme}>
            <div className="canvas">
                <div className="header">
                    <div>
                         <img src={logo} alt="Linkedin" className="logo"></img>
                    </div>
                </div>
                <div className="login-container">
                {!values.nameDetails &&  
                    <form
                        className="form"
                        onSubmit={(event)=>handleChange(event)}>
                        <div>
                            <h1>Sign Up</h1>
                            <p>Stay updated on your professional world</p>           
                        </div>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <TextField 
                                label="Email"
                                id="outlined-basic" 
                                variant="outlined"
                                fullWidth 
                                type="email"
                                color="#FFF"
                                className={classes.root}
                                inputProps={{className:classes.input}}
                                InputLabelProps={{
                                    classes: {
                                        root: classes.label,
                                    }
                                }}
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:'20px'}}>
                            <FormControl sx={{ m: 1}} fullWidth variant="outlined" className={classes.root}>
                                <InputLabel htmlFor="standard-adornment-password" 
                                    className={classes.input}>Password</InputLabel>
                                <OutlinedInput
                                    id="standard-adornment-password"
                                    variant="outlined"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={password}
                                    label="Password"
                                    fullWidth 
                                    inputProps={{className:classes.input}}
                                    onChange={e => setPassword(e.target.value)}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        >
                                        {values.showPassword ? <MdVisibilityOff /> : <MdVisibility />}
                                        </IconButton>
                                        </InputAdornment>
                                        }
                                    />
                            </FormControl>
                        </Box>
                        { !values.emailIsCorrect && 
                            <div className="row" style={{fontSize:"18px",textAlign:"center",margin:"10px",color:"red",}}>
                                This Email is alrady exist.
                            </div>
                        }
                        <div className="row" style={{fontSize:"12px",textAlign:"center",margin:"10px"}}>
                            By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.
                        </div>
                        <div className="d-grid gap-2" style={{margin:"20px 0px 20px 0px"}}>
                        <button type="submit" class="btn btn-lg btn-primary" style={{borderRadius:"50px"}}>Agree and Join</button>
                        </div>
                        <div style={{fontSize:'16px',textAlign:"center"}}> 
                            Already on LinkedIn?
                            <Link
                                className={classes.link}
                                component="button"
                                variant="body2"
                                onClick={() => {
                                    handleSignIn()
                                }}
                                >
                                {' Sign In'}
                            </Link>
                        </div>
                    </form>
                }
                {values.nameDetails &&  
                    <form
                        className="form"
                        onSubmit={(event)=>handleSubmit(event)}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
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
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' ,marginTop:20 }}>
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
                        <div className="d-grid gap-2" style={{margin:"20px 0px 20px 0px"}}>
                            <button type="submit" class="btn btn-lg btn-primary" style={{borderRadius:"50px"}}>Continue</button>
                        </div>
                    </form>
                }
                </div>
            </div>
      </ThemeProvider>
    )
}
export default SignUp
