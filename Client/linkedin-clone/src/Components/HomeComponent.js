import React,{useState,useEffect} from 'react';
import {Card,CardTitle,CardText,CardBody} from 'reactstrap';
import {Button,DialogContent,DialogActions} from '@material-ui/core';
// import {TextareaAutosize} from '@mui/core/TextareaAutosize';
import styled from '@material-ui/core/styles/styled'
import PostWithID from './PostWithID';
import {HiOutlinePhotograph} from 'react-icons/hi';
import {MdOndemandVideo} from 'react-icons/md';
import {BsCalendarEvent} from 'react-icons/bs';
import { initializeApp } from "firebase/app";
import firebaseConfig  from '../firebaseIni'
import {RiArticleLine} from 'react-icons/ri';
import { IconContext } from "react-icons";
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
import {FiVideo} from 'react-icons/fi'
import {Modal,ModalHeader,ModalBody} from 'reactstrap'
import axios from 'axios';
import './PostWithID.css';
import user from '../assets/images/user.png'
import banner from '../assets/images/4820571.jpg'


function readFile(file) {
    return new Promise((resolve) => {
        const reader = new FileReader()
        reader.addEventListener('load', () => resolve(reader.result), false)
        reader.readAsDataURL(file)
    })
}



function Home(props)
{

    const [desc,setdesc]=useState('');

    const firebaseApp = initializeApp(firebaseConfig);
    const storage = getStorage(firebaseApp);
   
    const [showModal, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [showPhotoModal, setPhotoShow] = useState(false);
    const handlePhotoClose = () => setPhotoShow(false);
    const handlePhotoShow = () => setPhotoShow(true);
    var storageRef;
    const submitPostImage=(file)=>{
        const now= new Date();
        storageRef = ref(storage,`${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getTime()}.jpg`);
        // console.log(event.target.files[0]);
        uploadBytes(storageRef,file)
        getDownloadURL(storageRef)
        
    }
    const UploadPost=(e)=>{
        e.preventDefault();
        console.log(desc);
        axios.post('http://localhost:3001/post',{description:desc,image:storageRef},{
            headers: {
                'Authorization': `Bearer ${token}`
            }
          })
    }
    const Input = styled('input')({
        display: 'none',
    });

    const [profile,setProfile]=useState(null);
    const token=localStorage.getItem('token');
    const instance = axios.create({
        baseURL: 'http://localhost:3001'
    });
    const profileAPI = axios.create({
        baseURL: 'http://localhost:3001/users/',
        headers: {'Authorization': `Bearer ${token}`}
    });

    const [allposts,setPosts]=useState(null)
    useEffect(() => {
       
        instance.get('/posts')
        .then(response=>{
            console.log(response.data)
            setPosts(response.data);
        });

        profileAPI.get('/profile')
        .then(response=>{
            console.log(response.data)
            setProfile(response.data.profile);
        });
       console.log(profile)
    },[])
    
    const onChangImage=async(event)=>{
        event.preventDefault();
        let imageDataUrl = await readFile(event.target.files[0]);
        // setProfileImage(imageDataUrl)
    }



    return(
        
        <div className="row justify-content-md-center" style={{"padding-top": "75px"}}>
            <div className="col-0 col-md-3">
                <div className="card profile-card">
                    <div className="image-conatiner">
                        <div className="banner">
                            <img  className="banner-img" src={(profile==null||profile.background_image==="")?banner:profile.background_image} alt="bhargav"></img>
                        </div>
                        <div className="profile-img-container">
                            <img src={(profile==null||profile.profile_image==="")?user:profile.profile_image} alt="Profile" className="profile-img" />
                        </div>
                    </div>
                    <div className="card-body" style={{textAlign:"center"}}>
                        <a href="profile" className="profile-link"><h5 className="card-title">{profile==null?null:profile.firstname+" "+profile.lastname}</h5></a>
                        <p className="card-text">{profile==null?null:profile.headline}</p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-5">
                <Card className="post-card" style={{padding:"10px 0px"}}>
                    <Button onClick={handleShow}><input class="form-control input-button" placeholder="Start a post"></input></Button>
                   
                    <div className="row">
                        <div className="col-md-3">
                            <IconContext.Provider value={{ color: "blue", className: "global-className-name", fontSize: "25px"}}>
                            <Button style={{textTransform: 'none'}}> <HiOutlinePhotograph className="m-2" style={{fontSize: "25px" }}/>   Photo</Button>
                            </IconContext.Provider>
                        </div>
                        <div className="col-md-3">
                            <IconContext.Provider value={{ color: "green", className: "global-className-name", fontSize: "25px" }}>
                            <Button style={{textTransform: 'none'}}><MdOndemandVideo className="m-2" style={{fontSize: "25px" }}/>   Video</Button>
                            </IconContext.Provider>
                        </div>
                        <div className="col-md-3">
                            <IconContext.Provider value={{ color: "orange", className: "global-className-name", fontSize: "25px" }}>
                            <Button style={{textTransform: 'none'}}><BsCalendarEvent className="m-2" style={{fontSize: "25px" }}/>   Event</Button>
                            </IconContext.Provider>
                        </div>
                        <div className="col-md-3">
                            <IconContext.Provider value={{ color: "red", className: "global-className-name", fontSize: "25px" }}>
                            <Button style={{textTransform: 'none'}}><RiArticleLine className="m-2" style={{fontSize: "25px" }}/>   Write Article</Button>
                            </IconContext.Provider>
                        </div>
                    </div>
                    
                </Card>


                {/* <PostWithID post={allposts[0]}/> */}
                {allposts!=null && allposts.map((post) => {
                    return (
                        <div className="col-12">
                            <PostWithID post={post}/>
                        </div>
                    );
                })}

            </div>
            <div  className="col-0 col-md-3"></div>

            <Modal isOpen={showModal} toggle={handleShow}>
                <ModalHeader toggle={handleClose}>
                    Create a post
                </ModalHeader>
                <ModalBody>
                <img className="p-img m-2" src={profile.profile_image}/> {profile.firstname} {profile.lastname}<br></br>
                <textarea style={{width:"450px",border:"none",outline:"none",height:"250px"}} placeholder="What do you want to talk about?" onChange={e => setdesc(e.target.value)}></textarea><br></br>
                Add hashtag<br></br>
                
                <div className="row">
                    <div className="col-5">
                    <Button style={{align:'center'}} onClick={handlePhotoShow}>
                        <HiOutlinePhotograph style={{fontSize:"30px"}}></HiOutlinePhotograph>
                    </Button>
                    </div>
                    <div className="col-5">
                    <Button>
                        <FiVideo style={{fontSize:"30px"}}/>
                    </Button>
                    </div>
                    <div className="col-2">
                    <Button style={{textTransform:'none',backgroundColor:'#E8F0EC',color:'#C1C9C5'}} onClick={UploadPost}>
                        Post
                    </Button>
                    </div>
                </div>
                    </ModalBody>
            </Modal>

            <Modal isOpen={showPhotoModal} toggle={handlePhotoShow}>
                <ModalHeader toggle={handlePhotoClose}>
                    Upload image to share
                </ModalHeader>
                <ModalBody>
                 
                                <div>
                                     <DialogContent dividers style={{textAlign:"center"}}>
                                        
                                        <img src={(profile==null||profile.profile_image==="")?user:profile.profile_image} alt="Profile" style={{width:"230px","border-radius":"50%"}}/>
                                        <p>Upload a photo from your device</p>
                                    </DialogContent>
                                    <DialogActions>
                                        <label htmlFor="contained-button-file">
                                            <Input accept="image/*" id="contained-button-file" type="file" onChange={(e)=>onChangImage(e)}/>
                                            <Button color="primary" style={{textTransform:'none'}} variant="contained" component="span" onClick={submitPostImage}>
                                                Upload Image
                                            </Button>
                                        </label>
                                    </DialogActions>
                                </div>
                            
                </ModalBody>
            </Modal>
        </div>
    );
};

export default Home;