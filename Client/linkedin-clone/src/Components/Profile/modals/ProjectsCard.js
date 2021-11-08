import React,{useState,Fragment} from 'react'
import {Modal,ModalHeader,ModalBody,ModalFooter,Input,Label} from 'reactstrap'
import {Button,Box,FormControlLabel,Checkbox} from '@material-ui/core';
import {MdModeEditOutline} from 'react-icons/md'
import {DatePicker} from '@material-ui/pickers'

function CoursesCard(props) {
    const [project, setProject] = useState(props.projects.project);
    const [projectURL, setProjectURL] = useState(props.projects.projectURL);
    const [startDate, setStartDate] = useState(props.projects.startDate);
    const [endDate, setEndDate] = useState(props.projects.endDate);
    const [description, setDescription] = useState(props.projects.description);
    const [present, setPresent] = useState(props.projects.endDate==="Present");
    const id = props.projects._id;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleChange = (event) => {
        setPresent(event.target.checked);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete=(e)=>{
        e.preventDefault();
        props.deleteProject(id);
        setOpen(false)
    }

    

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(present===false)
            props.editProject(id,project,startDate,endDate,projectURL,description);
        else
            props.editProject(id,project,startDate,"Present",projectURL,description);
        setOpen(false)
    }

    return (
        <div className="card school-card">
            <div className="card-body">
                <div className="name-container">
                    <h5 class="card-title">{props.projects.project}</h5>
                    <Button onClick={handleClickOpen} sx={{width:"15px"}}>
                        <MdModeEditOutline style={{fontSize: "22px",color: "darkslategrey"}}/>
                    </Button>
                    <Modal
                        centered
                        scrollable
                        size="lg"
                        isOpen={open}
                        toggle={handleClickOpen}>
                        <ModalHeader toggle={handleClose}>
                            Add project
                        </ModalHeader>
                        <ModalBody>
                            <Box sx={{ display: 'flex',"flex-direction": "column",marginTop:30 }}>
                                <Label for="project">
                                    Project Name*
                                </Label>
                                <Input
                                    id="project" 
                                    bsSize="lg"
                                    value={project}
                                    onChange={e => setProject(e.target.value)} />
                            </Box>
                            <div style={{marginTop:"10px"}}>
                                <FormControlLabel control={<Checkbox defaultChecked color="primary"/>} 
                                    checked={present}
                                    onChange={handleChange}
                                    label="I am currently working on this project" />
                            </div>
                            <div className="row" style={{marginTop:10}}>
                                <div className="col-12 col-md-6 date">
                                    <label for="startDate" className="form-label">End year (or expected)*</label>
                                    <DatePicker
                                        views={["year", "month"]}
                                        id="startDate"
                                        // className={classes.root}
                                        inputVariant="outlined"
                                        variant="inline"
                                        InputAdornmentProps={{ position: "start" }}
                                        value={startDate}
                                        onChange={setStartDate}
                                    /> 
                                </div>
                            </div>
                            <div className="row" style={{marginTop:10}}>
                                <div className="col-12 col-md-6 date">
                                    <label for="endDate" className="form-label">End year (or expected)*</label>
                                    <DatePicker
                                        views={["year", "month"]}
                                        id="endDate"
                                        disabled={present}
                                        inputVariant="outlined"
                                        variant="inline"
                                        InputAdornmentProps={{ position: "start" }}
                                        value={endDate==="Present"?new Date():endDate}
                                        onChange={setEndDate}
                                    /> 
                                </div>
                            </div>
                            <Box sx={{ display: 'flex',"flex-direction": "column",marginTop:30 }}>
                                <Label for="projectURL">
                                    Project URL
                                </Label>
                                <Input
                                    id="projectURL" 
                                    bsSize="lg"
                                    type="url"
                                    value={projectURL}
                                    onChange={e => setProjectURL(e.target.value)} />
                            </Box>
                            <Box sx={{marginTop:50 }}>
                                <label for="exampleFormControlTextarea2" className="form-label">Description</label>
                                <textarea className="form-control"
                                    id="exampleFormControlTextarea2 " 
                                    rows="3"
                                    value={description}
                                    style={{fontSize:'1.2rem'}}
                                    onChange={(e)=>setDescription(e.target.value)}/>
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
                {props.projects.endDate!=="Present" && <div>{new Date(props.projects.startDate).toLocaleString('en-us',{month:'short', year:'numeric'})+"-"+new Date(props.projects.endDate).toLocaleString('en-us',{month:'short', year:'numeric'})}</div>}
                {props.projects.endDate==="Present" && <div>{new Date(props.projects.startDate).toLocaleString('en-us',{month:'short', year:'numeric'})+"-"+props.projects.endDate}</div>}
                <div style={{marginTop:15}}>{description!==""?props.projects.description.split('\n').map((item, key) => {return <Fragment key={key}>{item}<br/></Fragment>}):null}</div>
            </div>
        </div>
    )
}

export default CoursesCard

