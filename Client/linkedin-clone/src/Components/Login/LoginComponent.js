import React, { useState } from 'react';
import './login.css'
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import AutoComplete from '@autocomplete/material-ui'
import {MdVisibility,MdVisibilityOff} from 'react-icons/md'
import NameDetails from './LocationComponent'
import {makeStyles,ThemeProvider,createTheme} from '@material-ui/core/styles'
import { Link,FormControl,InputLabel,OutlinedInput } from '@material-ui/core';

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

function Login(props) {
    const classes = useStyles(); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();
    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleSignUp=()=>{
        history.push('/Signup');
    };
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3001/users/login',{
            email:email,
            password:password,
        })
        .then(response=>{
            localStorage.setItem('token',response.data.token);
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
                         <img src='assets/images/Linkedin_logo.png' alt="Linkedin" className="logo"></img>
                    </div>
                </div>
                <div className="login-container">
                    <form
                        onSubmit={(e)=>handleSubmit(e)}
                        className="form">
                        <div>
                            <h1>Log In</h1>
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
                                    handleSignUp()
                                }}
                                >
                                {' Sign up'}
                            </Link>
                        </div>
                    </form>    
                </div>
            </div>
      </ThemeProvider>
    )
}
export default Login

