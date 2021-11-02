import React,{useEffect,useState} from 'react'
import {Card,CardContent} from '@material-ui/core'
import PropTypes from 'prop-types';
import styled from '@material-ui/core/styles/styled'
import {DialogTitle,IconButton,Dialog,DialogContent,Typography,Button,DialogActions} from '@material-ui/core'
import {BsCameraFill} from 'react-icons/bs'
import {AiOutlineClose} from 'react-icons/ai'
import './profile.css'
import { initializeApp } from "firebase/app";
import firebaseConfig  from '../../firebaseIni'
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
const axios=require('axios');

const Input = styled('input')({
    display: 'none',
  });

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
          {children}
          {onClose ? (
            <button type="button" className="btn-close modal-close"  onClick={onClose} aria-label="Close"></button>
          ) : null}
        </DialogTitle>
      );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  

function Profile(props) {
    const [open, setOpen] = useState(false);
    const firebaseApp = initializeApp(firebaseConfig);
    const storage = getStorage(firebaseApp);
    const [profile,setProfile]=useState(null)
    const token=localStorage.getItem('token');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
   

    useEffect(() => {
        const instance = axios.create({
            baseURL: 'http://localhost:3001/users/',
            headers: {'Authorization': `Bearer ${token}`}
        });
        instance.get('/profile')
        .then(response=>{
            console.log(response.data)
            setProfile(response.data);
        });
    },[])

    
    const handleSubmit=(event)=>{
        event.preventDefault();
        const now= new Date();
        const storageRef = ref(storage,`${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getTime()}.jpg`);
        console.log(event.target.files[0]);
        uploadBytes(storageRef,event.target.files[0])
        .then((snapshot) => {
            getDownloadURL(storageRef)
            .then((url) => {
                console.log(url);
                const instance = axios.create({
                    baseURL: 'http://localhost:3001/users/',
                    headers: {'Authorization': `Bearer ${token}`}
                });
                instance.post('/profile',{
                    background_image:url,
                })
                .then(response=>{
                    setProfile(response.data.docs);
                    console.log(response);
                });
            })
        })
        .catch(err=>{
            console.log(err);
        })
    }

    

    return (
        <div>
            <div className="card profile_card">
                <div className="image_conatiner">
                    <div className="banner">
                        <img  className="banner_img" src={(profile==null||profile.background_image==="")?'assets/images/4820571.jpg':profile.background_image} alt="bhargav"></img>
                    </div>
                    <div className="camera">
                        <Button onClick={handleClickOpen} sx={{width:"15px"}}>
                            <BsCameraFill className="icon"/>
                        </Button>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}>
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                                Add background photo
                            </BootstrapDialogTitle>
                            <DialogContent dividers style={{textAlign:"center"}}>
                                <img src='assets/images/success.png' alt="Profile" style={{width:"340px"}}/>
                                <h5>Showcase your personality, interests, team moments or notable milestones</h5>
                            </DialogContent>
                            <DialogActions>
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e)=>handleSubmit(e)}/>
                                <Button color="primary" style={{textTransform:'none'}} variant="contained" component="span">
                                    Edit profile Background
                                </Button>
                            </label>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                    <div className="profile">
                        <img src='assets/images/4820571.jpg' alt="Profile" className="profile_img"/>
                    </div>
                </div>

                <div className="card-body">
                    <h3 className="card-title">{profile==null?"":profile.firstname+" "+profile.lastname}</h3>
                    <div className="card-text">{profile==null?"":profile.headline}</div>
                    <div style={{"color": "#8b8f8e","font-size": "smaller"}}>{profile==null?"":profile.region+", "+profile.country}</div>
                    {/* <a href="#" className="btn btn-primary">Go somewhere</a> */}
                </div>
            </div>
        </div>


    )
}


export default Profile

