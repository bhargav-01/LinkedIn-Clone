import React,{useState,useEffect} from 'react';
import {Card,CardTitle,CardText,CardBody} from 'reactstrap';
import {Button} from '@material-ui/core';
// import {TextareaAutosize} from '@mui/core/TextareaAutosize';
import PostWithID from './PostWithID';
import {HiOutlinePhotograph} from 'react-icons/hi';
import {MdOndemandVideo} from 'react-icons/md';
import {BsCalendarEvent} from 'react-icons/bs';
import {RiArticleLine} from 'react-icons/ri';
import { IconContext } from "react-icons";
import {BsCameraVideoFill} from 'react-icons/bs';
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import axios from 'axios';
import './PostWithID.css';
function Home(props)
{
    

    const [showModal, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const instance = axios.create({
        baseURL: 'http://localhost:3001'
    });

    const [allposts,setPosts]=useState(null)
    useEffect(() => {
       
        instance.get('/posts')
        .then(response=>{
            console.log(response.data)
            
            setPosts(response.data);
            
        });
        console.log(allposts);
    },[])

    return(
        
        <div className="row">
            <div className="col-3 md-3">Profile Part</div>
            <div className="col-8 md-8">
                <Card>
                
                    <Button onClick={handleShow}><textarea placeholder="Start a post" style={{width:"1000px"}}></textarea></Button>
                   
                    <div className="row">
                        <div className="col-3">
                            <IconContext.Provider value={{ color: "blue", className: "global-class-name", fontSize: "25px"}}>
                            <Button style={{textTransform: 'none'}}> <HiOutlinePhotograph className="m-2" style={{fontSize: "25px" }}/>   Photo</Button>
                            </IconContext.Provider>
                        </div>
                        <div className="col-3">
                            <IconContext.Provider value={{ color: "green", className: "global-class-name", fontSize: "25px" }}>
                            <Button style={{textTransform: 'none'}}><MdOndemandVideo className="m-2" style={{fontSize: "25px" }}/>   Video</Button>
                            </IconContext.Provider>
                        </div>
                        <div className="col-3">
                            <IconContext.Provider value={{ color: "orange", className: "global-class-name", fontSize: "25px" }}>
                            <Button style={{textTransform: 'none'}}><BsCalendarEvent className="m-2" style={{fontSize: "25px" }}/>   Event</Button>
                            </IconContext.Provider>
                        </div>
                        <div className="col-3">
                            <IconContext.Provider value={{ color: "red", className: "global-class-name", fontSize: "25px" }}>
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
            

            <Modal isOpen={showModal} toggle={handleShow}>
                <ModalHeader toggle={handleClose}>
                    Create a post
                </ModalHeader>
                <ModalBody>
                <img className="p-img m-2" src="home.jpeg"/> Firstname LastName<br></br>
                    
                <textarea style={{width:"450px",border:"none",outline:"none",height:"250px"}} placeholder="What do you want to talk about?"></textarea><br></br>
                Add hashtag<br></br>
                
                <div className="row">
                    <div className="col-5">
                    <Button style={{align:'center'}}>
                        <HiOutlinePhotograph></HiOutlinePhotograph>
                    </Button>
                    </div>
                    <div className="col-5">
                    <Button>
                        <BsCameraVideoFill></BsCameraVideoFill>
                    </Button>
                    </div>
                    <div className="col-2">
                    <Button style={{textTransform:'none',backgroundColor:'#E8F0EC',color:'#C1C9C5'}}>
                        Post
                    </Button>
                    </div>
                </div>
                    </ModalBody>
            </Modal>
        </div>
    );
};

export default Home;