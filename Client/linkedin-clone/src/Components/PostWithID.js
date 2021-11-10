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
                            
                            <Button style={{textTransform: 'none'}}> <BiCommentDetail className="m-2" style={{fontSize: "25px" }}/></Button>
                           
                        </div>
            </div>
        </Card>
    );
    
};

export default PostWithID;