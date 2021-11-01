import React from 'react';
import {Card,CardTitle,CardText,CardBody} from 'reactstrap';
import {Button} from '@material-ui/core';
// import {TextareaAutosize} from '@mui/core/TextareaAutosize';
import PostWithID from './PostWithID';
import {HiOutlinePhotograph} from 'react-icons/hi';
import {MdOndemandVideo} from 'react-icons/md';
import {BsCalendarEvent} from 'react-icons/bs';
import {RiArticleLine} from 'react-icons/ri';
import { IconContext } from "react-icons";
function Home(props)
{
    const posts = props.posts.posts.map((post) => {
        return (
            <div className="col-12 col-md-5 m-1">
                <PostWithID post={post}/>
            </div>
        );
    });
    return(
        
        <div className="row">
            <div className="col-3 md-3">Profile Part</div>
            <div className="col-6 md-6">
                <Card>
                    <textarea placeholder="Start a post"></textarea>
                   
                    <div className="row">
                        <div className="col-3">
                            <IconContext.Provider value={{ color: "blue", className: "global-class-name"}}>
                            <Button style={{textTransform: 'none'}}> <HiOutlinePhotograph className="m-2"/>   Photo</Button>
                            </IconContext.Provider>
                        </div>
                        <div className="col-3">
                            <IconContext.Provider value={{ color: "green", className: "global-class-name" }}>
                            <Button style={{textTransform: 'none'}}><MdOndemandVideo className="m-2"/>   Video</Button>
                            </IconContext.Provider>
                        </div>
                        <div className="col-3">
                            <IconContext.Provider value={{ color: "orange", className: "global-class-name" }}>
                            <Button style={{textTransform: 'none'}}><BsCalendarEvent className="m-2"/>   Event</Button>
                            </IconContext.Provider>
                        </div>
                        <div className="col-3">
                            <IconContext.Provider value={{ color: "red", className: "global-class-name" }}>
                            <Button style={{textTransform: 'none'}}><RiArticleLine className="m-2"/>   Write Article</Button>
                            </IconContext.Provider>
                        </div>
                    </div>
                    
                </Card>


                {posts}

            </div>
        </div>
    );
};

export default Home;