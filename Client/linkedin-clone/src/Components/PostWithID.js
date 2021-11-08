import React, { useState,Component } from 'react';
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
import {Card,CardImg,CardBody,CardText} from 'reactstrap';
import {BiLike} from 'react-icons/bi';
import {BiComment} from 'react-icons/bi';
import './PostWithID.css';
function PostWithID(props)
{
    const [flag, setFlag] = React.useState(true);

    const handleClick = () => {
        setFlag(!flag);
    };

    return(
        <Card style={{"box-shadow": "0px 0px 20px 10px #9993934f",
        "margin-top": "10px"
    }}>
            <CardText>
            <img className="p-img m-2" src="home.jpeg"/>
            {/* {props.post.author.firstname} {props.post.author.lastname} */}
            </CardText>
            <CardText>{props.post.description}</CardText>
            <CardImg src="home.jpeg" style={{height:"250px"}}></CardImg>
            <div className="row">
                        <div className="col-6" style={{textAlign:'center'}}>
                        
                            <Button id="like" style={{textTransform: 'none'}} onClick={handleClick} color={flag ? "none" : "primary"}> <BiLike className="m-2" style={{fontSize: "25px" }}/> </Button>
                           
                        </div>
                        <div className="col-6" style={{textAlign:'center'}}>
                            
                            <Button style={{textTransform: 'none'}}> <BiComment className="m-2" style={{fontSize: "25px" }}/></Button>
                           
                        </div>
            </div>
        </Card>
    );
    
};

export default PostWithID;