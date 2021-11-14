import React from 'react';
import Button from '@material-ui/core/Button';
import {Card,CardImg,CardText} from 'reactstrap';
import {BiLike} from 'react-icons/bi';
import {BiCommentDetail} from 'react-icons/bi';
import './PostWithID.css';


function PostWithID(props)
{
    const [flag, setFlag] = React.useState(true);

    const handleClick = () => {
        setFlag(!flag);
    };

    return(
        <Card className="post-card">
            <div style={{display: "flex",overflow: "hidden"}}>
                <img className="p-img m-2" src={props.post.author.profile_image} alt="home"/>
                <div
                    style={{
                        "width": "-webkit-fill-available",
                        "display": "flex",
                        "flex-direction": "column",
                        "justify-content": "center",
                    }}>
                    <div className="fw-bold">{props.post.author.firstname} {props.post.author.lastname}</div>
                    <div className="text-truncate">{props.post.author.headline}</div>        
                </div>   
            </div>
            <CardText>{props.post.description}</CardText>
            {props.post.image!=="" && <CardImg src={props.post.image} style={{height:"300px",borderRadius:"20px"}}></CardImg>}
            <div className="row">
                <div className="col-6" style={{textAlign:'center'}}>                
                    <Button id="like" style={{textTransform: 'none'}} onClick={handleClick} color={flag ? "none" : "primary"}> <BiLike className="m-2" style={{fontSize: "25px" }}/> </Button>
                </div>
                <div className="col-6" style={{textAlign:'center'}}>
                    <Button style={{textTransform: 'none'}}> <BiCommentDetail className="m-2" style={{fontSize: "25px" }}/></Button>
                </div>
            </div>
        </Card>
    );
    
};

export default PostWithID;