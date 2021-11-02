import React, { useState } from 'react';
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
function PostWithID(props)
{
    return(
        <Card>
            <CardText>
                {props.post.author.firstname} {props.post.author.lastname}
            </CardText>
            <CardText>{props.post.description}</CardText>
            <CardImg src="logo192.png"></CardImg>
            <Button>Like</Button>
        </Card>
    );
};

export default PostWithID;