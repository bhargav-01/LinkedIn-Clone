import React,{useEffect,useState,Fragment} from 'react'
import PropTypes from 'prop-types';
import styled from '@material-ui/core/styles/styled'
import {DialogTitle,Dialog,DialogContent,Button,DialogActions,DialogContentText} from '@material-ui/core'
import {BsCameraFill} from 'react-icons/bs'
import ImageEditor from './ImageEditor'
import './profile.css'
import NameModal from './Cards/NameModal'
import { initializeApp } from "firebase/app";
import firebaseConfig  from '../../firebaseIni'
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";
import {MdModeEditOutline} from 'react-icons/md'
import {BsPlusLg} from 'react-icons/bs'
import {IoClose} from 'react-icons/io5'
import EducationCard from './Cards/Eductaion/EducationCard'
import CertificationCard from './Cards/Certification/CertificationCard'
import ExperienceCard from './Cards/Experience/ExperienceCard'
import AccomplishmentsCard from './Cards/Accomplishment/AccomplishmentsCard'
import { useSnackbar } from 'notistack';
import banner from '../../assets/images/4820571.jpg'
import user from '../../assets/images/user.png'
import success from '../../assets/images/success.png'

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
    const [owner, setOwner] = useState(false);
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
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
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
        if(owner===true)
            setOpenImage(true);
    };
    const handleCloseImage = () => {
        setOpenImage(false);
    };

   
    const action = key => (
        <Fragment>
            <Button onClick={() => { closeSnackbar(key) }}>
                <IoClose style={{color:'white',fontSize:"20px"}}/>
            </Button>
        </Fragment>
    );

    useEffect(() => {
        // alert(props.match.params.id);
        if(props.match.params.id==='profile' || props.match.params.id===undefined)
        {
            instance.get('/profile')
            .then(response=>{
                console.log(response.data)
                setProfile(response.data.profile);
                setOwner(true);
                setAbout(response.data.profile.about);
            });
        }
        else
        {
            instance.get('/profile/'+props.match.params.id)
            .then(response=>{
                console.log(response.data)
                setProfile(response.data.profile);
                if(response.data.owner===true)
                    setOwner(true);
                setAbout(response.data.profile.about);
            });
        }
        
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
            enqueueSnackbar('Updated succesfully',{ 
                variant: 'success',
                action,
            });
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const submitAbout=(event)=>{
        event.preventDefault();
        instance.post('/profile',{
            about:about
        })
        .then(response=>{
            setOpenAbout(false);
            console.log(response.data);
            enqueueSnackbar('Updated succesfully',{ 
                variant: 'success',
                action,
            });
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const submitEducation=(school,degree,fieldofStudy,startYear,endYear,grade,activity,description)=>{

        instance.post('/profile/education',{
            Name_of_School:school,
            Degree:degree,
            Specialization:fieldofStudy,
            Start_Year:startYear,
            End_Year:endYear,
            activity:activity,
            grade:grade,
            description:description,
        })
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Added succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const submitCertification=(name,organization,issueDate,cId,cURL)=>{
        instance.post('/profile/certification',{
            name:name,
            organization:organization,
            issueDate:issueDate,
            cId:cId,
            cURL:cURL,
        })
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Added succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const submitExperience=(title,type,name,location,startDate,endDate,description)=>{
        instance.post('/profile/experience',{
            title:title,
            employment_type:type,
            companyname:name,
            location:location,
            name:name,
            startDate:startDate,
            endDate:endDate,
            description:description,
        })
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Added succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const editExperience=(id,title,type,name,location,startDate,endDate,description)=>{
        instance.put('/profile/experience/'+id,{
            title:title,
            employment_type:type,
            companyname:name,
            location:location,
            name:name,
            startDate:startDate,
            endDate:endDate,
            description:description,
        })
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Updated succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const deleteExperience=(id)=>{
        // alert("delete");
        instance.delete('/profile/experience/'+id)
        .then(response=>{
            console.log(response.data)
            enqueueSnackbar('Deleted succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const submitCourse=(course,courseId)=>{
        instance.post('/profile/courses',{
            course:course,
            courseId:courseId
        })
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Added succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    
    const editCourse=(id,course,courseId)=>{
        instance.put('/profile/courses/'+id,{
            course:course,
            courseId:courseId
        })
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Updated succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const submitLanguage=(language,proficiency)=>{
        instance.post('/profile/languages',{
            language:language,
            proficiency:proficiency
        })
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Added succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const editLanguage=(id,language,proficiency)=>{
        instance.put('/profile/languages/'+id,{
            language:language,
            proficiency:proficiency
        })
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Updated succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const submitProject=(project,startDate,endDate,projectURL,description)=>{
        instance.post('/profile/projects',{
            project:project,
            startDate:startDate,
            endDate:endDate,
            projectURL:projectURL,
            description:description,
        })
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Added succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const editProject=(id,project,startDate,endDate,projectURL,description)=>{
        instance.put('/profile/projects/'+id,{
            project:project,
            startDate:startDate,
            endDate:endDate,
            projectURL:projectURL,
            description:description,
        })
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Updated succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    

    const editCertification=(id,name,organization,issueDate,cId,cURL)=>{
        instance.put('/profile/certification/'+id,{
            name:name,
            organization:organization,
            issueDate:issueDate,
            cId:cId,
            cURL:cURL,
        })
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Updated succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const editEducation=(id,school,degree,fieldofStudy,startYear,endYear,grade,activity,description)=>{

        instance.put('/profile/education/'+id,{
            Name_of_School:school,
            Degree:degree,
            Specialization:fieldofStudy,
            Start_Year:startYear,
            End_Year:endYear,
            activity:activity,
            grade:grade,
            description:description,
        })
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Updated succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const deleteEducation=(id)=>{
        instance.delete('/profile/education/'+id)
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Deleted succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const deleteCertification=(id)=>{
        instance.delete('/profile/certification/'+id)
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Deleted succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const deleteProject=(id)=>{
        instance.delete('/profile/projects/'+id)
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Deleted succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const deleteCourse=(id)=>{
        instance.delete('/profile/courses/'+id)
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Deleted succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
    }

    const deleteLanguage=(id)=>{
        instance.delete('/profile/languages/'+id)
        .then(response=>{
            console.log(response.data);
            enqueueSnackbar('Deleted succesfully',{ 
                variant: 'success',
                action,
            })
        })
        .catch((err)=>{
            enqueueSnackbar('Error. Please try again.',{ 
                variant: 'error',
                action,
            });
        })
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
        <div className="profile-container">
            <div className="card profile_card">
                <div className="image_conatiner">
                    <div className="banner">
                        <img  className="banner_img" src={(profile==null||profile.background_image==="")?banner:profile.background_image} alt="bhargav"></img>
                    </div>
                    {owner===true && 
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
                                    <img src={success} alt="Profile" style={{width:"340px"}}/>
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
                    }
                    <div className="profile">
                        <img src={(profile==null||profile.profile_image==="")?user:profile.profile_image} alt="Profile" className="profile_img" onClick={handleClickOpenImage}/>
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
                                        <img src={(profile==null||profile.profile_image==="")?user:profile.profile_image} alt="Profile" style={{width:"230px","border-radius":"50%"}}/>
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
                        {owner===true &&
                            <Button onClick={hadleClickNameModal} sx={{width:"15px"}}>
                                 <MdModeEditOutline style={{fontSize: "22px",color: "darkslategrey"}}/>
                            </Button>
                        }
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
                        {owner===true &&
                            <Button onClick={handleClickAbout} sx={{width:"15px"}}>
                                <MdModeEditOutline style={{fontSize: "22px",color: "darkslategrey"}}/>
                            </Button> 
                        }
                        
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
                                        placeholder="About" 
                                        id="floatingTextarea2" 
                                        value={about}
                                        style={{height:"400px"}}
                                        onChange={(e)=>setAbout(e.target.value)}/>
                                    <label for="floatingTextarea2">About</label>
                                </div>
                            </DialogContent>
                            <DialogActions>
                                <Button color="primary" style={{textTransform:'none'}} variant="contained" component="span" onClick={(e)=>submitAbout(e)}>
                                    Submit
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </div>
                        {profile==null?"":profile.about.split('\n').map((item, key) => {return <Fragment key={key}>{item}<br/></Fragment>})}
                </div>
            </div>
            
            {profile!=null &&  <EducationCard profile={profile} owner={owner} submitEducation={submitEducation} editEducation={editEducation} deleteEducation={deleteEducation}/>}
            {profile!=null  && <CertificationCard submitCertification={submitCertification} owner={owner} editCertification={editCertification} profile={profile} deleteCertification={deleteCertification}/>}
            {profile!=null &&  <ExperienceCard  deleteExperience={deleteExperience} owner={owner} submitExperience={submitExperience} editExperience={editExperience} profile={profile} />}
            <AccomplishmentsCard 
                profile={profile}
                owner={owner}
                submitCourse={submitCourse} 
                editCourse={editCourse} 
                deleteCourse={deleteCourse}
                submitLanguage={submitLanguage} 
                editLanguage={editLanguage} 
                deleteLanguage={deleteLanguage}
                submitProject={submitProject} 
                editProject={editProject}
                deleteProject={deleteProject}/>
        </div>


    )
}


export default Profile

