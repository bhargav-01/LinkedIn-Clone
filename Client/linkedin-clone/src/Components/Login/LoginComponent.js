import React, { useState } from 'react';
import './login.css'
import {FaUserAlt,FaLock} from 'react-icons/fa' 
import Box from '@material-ui/core/Box';
import { useHistory } from "react-router-dom";
import InputAdornment from '@material-ui/core/InputAdornment'
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input'
import IconButton from '@material-ui/core/IconButton'
import {MdVisibility,MdVisibilityOff} from 'react-icons/md'
import Button from '@material-ui/core/Button';
import {makeStyles,ThemeProvider,createTheme} from '@material-ui/core/styles'
import { Link,FormControl,InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) =>({
    input: {
        
        // "&:-webkit-autofill": {
        //     WebkitBoxShadow: "0 0 1000px #4f4ff1  inset",
        //     color:'white'
        //   },
        //   color:'#ffffff',
    },
    root: {
        // '& .MuiFormLabel-root': {
        //     color: '#d6d1fd',
        //     },
        // color:'#ffffff',
        
    },
    button:{
        // background:'white',
        // margin:'20px',
        // color:'blue',
    },
    button1:{
        // background:'white',
        // margin:'20px',
        // color:'blue',
    },
    link:{
        fontWeight:'bold',
        color:'#0a66c2',
        fontSize:'16px',
    }
    
}));

const theme = createTheme({
    palette: {
        primary: {
            main:'#fff',
        },
        secondary: {
            main: '#fff',
        },
    },
});

function Login(props) {
    const classes = useStyles(); 
    const [userName, setUserName] = useState('');
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
    
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSubmit = (event) => {
        console.log(userName+" "+password);
    };
    
    return (
        <ThemeProvider theme={theme}>
            <div className="canvas">
                <div className="header">
                    <div>
                        <img src='assets/images/Linkedin_logo.png' alt="Linkedin" className="logo"></img>
                        <h1 style={{"font-weight": "450",margin:"5px"}}>Make the most of your professional life</h1>
                    </div>
                </div>
                <div className="login-container">
                    {/* Chabge Box to form */}
                    <form
                        className="form"
                        onSubmit={(event)=>handleSubmit(event)}>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                            <FaUserAlt className='loginIcon' />
                            <TextField 
                                label="User Name"
                                variant="standard"
                                fullWidth 
                                color='white'
                                id="standard-basic"
                                className={classes.root}
                                inputProps={{className:classes.input}}
                                required
                                value={userName}
                                onChange={e => setUserName(e.target.value)} />
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'flex-end'}}>
                            <FaLock className='loginIcon'/>
                            <FormControl sx={{ m: 1}} fullWidth variant="standard">
                                <InputLabel htmlFor="standard-adornment-password" 
                                    className={classes.root}
                                    inputProps={{className:classes.input}}>Password</InputLabel>
                                <Input
                                    id="standard-adornment-password"
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={password}
                                    label="Password"
                                    fullWidth 
                                    className={classes.root}
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
                        <div className="row" style={{width:"300px",fontSize:"12px",textAlign:"center",margin:"10px"}}>
                            By clicking Agree & Join, you agree to the LinkedIn User Agreement, Privacy Policy, and Cookie Policy.
                        </div>
                        <div className="d-grid gap-2" style={{margin:"20px 0px 20px 0px"}}>
                        <button type="button" class="btn btn-lg btn-primary" style={{borderRadius:"50px"}}>Agree and Join</button>
                        </div>
                        <div style={{fontSize:'16px',textAlign:"center"}}> 
                            Already on LinkedIn?
                            <Link
                                className={classes.link}
                                component="button"
                                variant="body2"
                                onClick={() => {
                                    props.changeState()
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

