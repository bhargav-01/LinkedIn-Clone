import React,{useEffect,useState} from 'react'
import PropTypes from 'prop-types';
import styled from '@material-ui/core/styles/styled'
import {DialogTitle,Dialog,DialogContent,Button,DialogActions} from '@material-ui/core'
import {BsCameraFill} from 'react-icons/bs'
import ImageEditor from './ImageEditor'
import './profile.css'
import NameModal from './modals/NameModal'
import { initializeApp } from "firebase/app";
import firebaseConfig  from '../../firebaseIni'
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
import {MdModeEditOutline} from 'react-icons/md'

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
  

function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}
function Profile(props) {
    const [open, setOpen] = useState(false);
    const [openImage, setOpenImage] = useState(false);
    const [openNameModal, setOpenNameModal] = useState(false);
    const [openabout,setOpenAbout]=useState(false)
    const firebaseApp = initializeApp(firebaseConfig);
    const storage = getStorage(firebaseApp);
    const [profile,setProfile]=useState(null)
    const [about,setAbout]=useState('')
    const [profileImage,setProfileImage]=useState(null)
    const token=localStorage.getItem('token');
    const instance = axios.create({
        baseURL: 'http://localhost:3001/users/',
        headers: {'Authorization': `Bearer ${token}`}
    });

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const hadleClickNameModal=()=>{
        setOpenNameModal(true);
    }

    const hadleCloseNameModal=()=>{
        setOpenNameModal(false);
    }

    const handleClickAbout=()=>{
        setOpenAbout(true);
    }
    
    const handleCloseAbout=()=>{
        setOpenAbout(false);
    }
    const handleClickOpenImage = () => {
        setOpenImage(true);
    };
    const handleCloseImage = () => {
        setOpenImage(false);
    };
   

    useEffect(() => {
       
        instance.get('/profile')
        .then(response=>{
            console.log(response.data)
            console.log(response.data.firstname)
            setProfile(response.data);
            setAbout(response.data.about);
        });
    },[])

    const submitProfileImage=(file)=>{
        const now= new Date();
        const storageRef = ref(storage,`${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getTime()}.jpg`);
        // console.log(event.target.files[0]);
        uploadBytes(storageRef,file)
        .then((snapshot) => {
            getDownloadURL(storageRef)
            .then((url) => {
                console.log(url);
                instance.post('/profile',{
                    profile_image:url,
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

    const submitNameDetails=(firstname,lastname,headline,country,region)=>{
        console.log(headline);
        instance.post('/profile',{
            firstname:firstname,
            lastname:lastname,
            headline:headline,
            country:country,
            region:region,
        })
        .then(response=>{
            setOpenNameModal(false);
            console.log(response.data);
        });
    }

    const submitAbout=(event)=>{
        event.preventDefault();
        instance.post('/profile',{
            about:about
        })
        .then(response=>{
            setOpenAbout(false);
            console.log(response.data);
        });
    }
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

    const onChangImage=async(event)=>{
        event.preventDefault();
        let imageDataUrl = await readFile(event.target.files[0]);
        setProfileImage(imageDataUrl)
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
                        <img src={(profile==null||profile.profile_image==="")?'assets/images/4820571.jpg':profile.profile_image} alt="Profile" className="profile_img" onClick={handleClickOpenImage}/>
                        <BootstrapDialog
                            onClose={handleCloseImage}
                            aria-labelledby="customized-dialog-title"
                            open={openImage}>
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseImage}>
                                Add Profile Photo
                            </BootstrapDialogTitle>
                            {profileImage==null && 
                                <div>
                                     <DialogContent dividers style={{textAlign:"center"}}>
                                        <h5>{profile==null?"":profile.firstname}, keep your profile fresh!</h5>
                                        <img src={(profile==null||profile.profile_image==="")?'assets/images/4820571.jpg':profile.profile_image} alt="Profile" style={{width:"340px"}}/>
                                        <p>Take or upload a photo. Then crop, filter and adjust it to perfection.</p>
                                    </DialogContent>
                                    <DialogActions>
                                        <label htmlFor="contained-button-file">
                                            <Input accept="image/*" id="contained-button-file" type="file" onChange={(e)=>onChangImage(e)}/>
                                            <Button color="primary" style={{textTransform:'none'}} variant="contained" component="span">
                                                Upload Image
                                            </Button>
                                        </label>
                                    </DialogActions>
                                </div>
                            }                
                            {profileImage!=null && 
                                <div>
                                    <ImageEditor file={profileImage} submitProfileImage={(file)=>submitProfileImage(file)}/>
                                </div>
                            }
                        </BootstrapDialog>
                    </div>
                </div>

                <div className="card-body">
                    <div className="name-container">
                        <h3 className="card-title">{profile==null?"":profile.firstname+" "+profile.lastname}</h3>
                        <Button onClick={hadleClickNameModal} sx={{width:"15px"}}>
                            <MdModeEditOutline style={{fontSize: "22px",color: "darkslategrey"}}/>
                        </Button>
                        <BootstrapDialog
                            onClose={hadleCloseNameModal}
                            aria-labelledby="customized-dialog-title"
                            open={openNameModal}>
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={hadleCloseNameModal}>
                                Edit Profile Details
                            </BootstrapDialogTitle>  
                            <NameModal profile={profile} submitNameDetails={submitNameDetails}/>
                        </BootstrapDialog>
                    </div>
                    <div className="card-text">{profile==null?"":profile.headline}</div>
                    <div style={{"color": "#8b8f8e","font-size": "smaller"}}>{profile==null?"":profile.region+", "+profile.country}</div>
                </div>
            </div>
            <div className="card profile_card">
                <div className="card-body">
                    <div className="name-container">
                        <h5 class="card-title">About</h5>
                        <Button onClick={handleClickAbout} sx={{width:"15px"}}>
                            <MdModeEditOutline style={{fontSize: "22px",color: "darkslategrey"}}/>
                        </Button>
                        <BootstrapDialog
                            onClose={handleCloseAbout}
                            aria-labelledby="customized-dialog-title"
                            open={openabout}>
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseAbout}>
                                Edit About
                            </BootstrapDialogTitle>  
                            <DialogContent dividers className="about-modal">
                                <div className="form-floating">
                                    <textarea className="form-control" 
                                        placeholder="Leave a comment here" 
                                        id="floatingTextarea2" 
                                        value={about}
                                        style={{height:"400px"}}
                                        onChange={(e)=>setAbout(e.target.value)}/>
                                    <label for="floatingTextarea2">Comments</label>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" style={{textTransform:'none'}} variant="contained" component="span" onClick={(e)=>submitAbout(e)}>
                                    Submit
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                    {profile==null?"":profile.about}
                </div>
            </div>
        </div>


    )
}


export default Profile

