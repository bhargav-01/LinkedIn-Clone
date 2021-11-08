import React,{useState} from 'react'
import {Modal,ModalHeader,ModalBody,ModalFooter,Input,Label} from 'reactstrap'
import {Button,Box,IconButton} from '@material-ui/core';
import {MdModeEditOutline} from 'react-icons/md'

function CoursesCard(props) {
    const [course, setCourse] = useState(props.courses.course);
    const [courseId, setCourseId] = useState(props.courses.courseId);
    const id = props.courses._id;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete=(e)=>{
        e.preventDefault();
        props.deleteCourse(id);
        setOpen(false)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        props.editCourse(id,course,courseId);
        setOpen(false)
    }

    return (
        <div className="card school-card">
            <div className="card-body">
                <div className="name-container">
                    <h5 class="card-title">{props.courses.course}</h5>
                    <IconButton onClick={handleClickOpen} sx={{width:"15px"}}>
                        <MdModeEditOutline style={{fontSize: "22px",color: "darkslategrey"}}/>
                    </IconButton>
                    <Modal
                        centered
                        scrollable
                        size="lg"
                        isOpen={open}
                        toggle={handleClickOpen}>
                        <ModalHeader toggle={handleClose}>
                            Edit Course
                        </ModalHeader>
                        <ModalBody>
                            <Box sx={{ display: 'flex',"flex-direction": "column",marginTop:30 }}>
                                <Label for="course">
                                    Course Name*
                                </Label>
                                <Input
                                    id="course" 
                                    bsSize="lg"
                                    value={course}
                                    onChange={e => setCourse(e.target.value)} />
                            </Box>
                            <Box sx={{ display: 'flex',"flex-direction": "column",marginTop:30 }}>
                                <Label for="courseid">
                                    Course Id
                                </Label>
                                <Input
                                    id="courseid" 
                                    bsSize="lg"
                                    value={courseId}
                                    onChange={e => setCourseId(e.target.value)} />
                            </Box>
                        </ModalBody>
                         <ModalFooter>
                            <Button
                                style={{marginRight:20}}
                                variant="contained"
                                color="primary"
                                onClick={(e)=>handleDelete(e)}>
                               Delete
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={(e)=>handleSubmit(e)}>
                               Save
                            </Button>
                            </ModalFooter>
                    </Modal>
                </div>
                <div>{props.courses.courseId}</div>
            </div>
        </div>
    )
}

export default CoursesCard

