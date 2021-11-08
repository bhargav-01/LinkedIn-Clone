import React,{useState} from 'react'
import Box from '@material-ui/core/Box';
import {Button,MenuItem,FormControlLabel,Checkbox,Menu,Typography,IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {BsPlusLg} from 'react-icons/bs'
import {DatePicker} from '@material-ui/pickers'
import {IoChevronUpOutline,IoChevronDownOutline} from 'react-icons/io5'
import './accomplisments.css'
import LanguagesCard from './LanguagesCard'
import CoursesCard from './CoursesCard'
import ProjectCard from './ProjectsCard'
import {Modal,ModalHeader,ModalBody,ModalFooter,Input,Label} from 'reactstrap'


const useStyles = makeStyles((theme) =>({
    root: {    
        "&:-webkit-autofill": {
            fontSize:'1.2rem',
          },
        '& .MuiOutlinedInput-root': { 
            '& fieldset': {     
                borderWidth:"1px",       // - The <fieldset> inside the Input-root
                borderColor: 'black',   // - Set the Input border
            },
        },
        fontSize:'1.2rem',
    },
    label:{
        fontSize:'1.2rem',
    },
    input:{
        
        "&:-webkit-autofill": {
            fontSize:'1.2rem',
          },
        fontSize:'1.2rem',
    },
    link:{
        "font-family": "system-ui",
        "font-weight": 500,
        color:'#0a66c2',
        fontSize:'17px',
    }
    
}));

function Accomplishments(props) {
    const classes = useStyles(); 
    const [openLanguage, setOpenLanguage] = useState(false);
    const [dropDownLanguage, setDropDownLanguage] = useState(false);
    const [dropDownCourse, setDropDownCourse] = useState(false);
    const [dropDownProject, setDropDownProject] = useState(false);
    const [openCourse, setOpenCourse] = useState(false);
    const [openProject, setOpenProject] = useState(false);
    const [present, setPresent] = useState(false);
    const [language, setLanguage] = useState('');
    const [proficiency, setProficiency] = useState('');
    const [course, setCourse] = useState('');
    const [courseId, setCourseId] = useState('');
    const [project, setProject] = useState('');
    const [projectURL, setProjectURL] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [description, setDescription] = useState();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleClickOpenLanguage = () => {
        setAnchorEl(null);
        setOpenLanguage(true);
    };
    
    const handleCloseLanguage = () => {
        setOpenLanguage(false);
    };

    const handleClickOpenCourse = () => {
        setAnchorEl(null);
        setOpenCourse(true);
    };
    
    const handleCloseCourse = () => {
        setOpenCourse(false);
    };

    const handleClickOpenProject = () => {
        setAnchorEl(null);
        setOpenProject(true);
    };
    
    const handleCloseProject = () => {
        setOpenProject(false);
    };

    const handleChange = (event) => {
        setPresent(event.target.checked);
    };

    const handleSubmitCourse=(e)=>{
        e.preventDefault();
        props.submitCourse(course,courseId);
        setOpenCourse(false)
    }

    const handleSubmitProject=(e)=>{
        e.preventDefault();
        if(present==="true")
            props.submitProject(project,startDate,"Present",projectURL,description);
        else
            props.submitProject(project,startDate,endDate,projectURL,description);
        setOpenProject(false)
    }
    const handleSubmitLanguage=(e)=>{
        e.preventDefault();
        props.submitLanguage(language,proficiency);
        setOpenLanguage(false)
    }

    const handleAccordionLanguage=()=>{
        if(dropDownLanguage)
            setDropDownLanguage(false);
        else
            setDropDownLanguage(true);
    }

    const handleAccordionCourse=()=>{
        if(dropDownCourse)
            setDropDownCourse(false);
        else
            setDropDownCourse(true);
    }
    const handleAccordionProject=()=>{
        if(dropDownProject)
            setDropDownProject(false);
        else
            setDropDownProject(true);
    }

    return (
        <div className="card profile_card">
            <div className="card-body">
                <div className="name-container">
                    <h5 class="card-title">Accomplishments</h5>
                    <Button id="basic-button"
                        aria-controls="basic-menu"
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick} sx={{width:"15px"}}>
                        <BsPlusLg style={{fontSize: "22px",color: "darkslategrey"}}/>
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                        'aria-labelledby': 'basic-button',
                        }}>
                        <MenuItem onClick={handleClickOpenLanguage}>Languages</MenuItem>
                        <MenuItem onClick={handleClickOpenCourse}>Courses</MenuItem>
                        <MenuItem onClick={handleClickOpenProject}>Projects</MenuItem>
                    </Menu>
                    <Modal
                        centered
                        scrollable
                        size="lg"
                        isOpen={openLanguage}
                        toggle={handleClickOpenLanguage}>
                        <ModalHeader toggle={handleCloseLanguage}>
                            Add languages
                        </ModalHeader>
                        <ModalBody>
                            <Box sx={{ display: 'flex',"flex-direction": "column",marginTop:30 }}>
                                <Label for="Language">
                                    Language*
                                </Label>
                                <Input
                                    id="Language" 
                                    bsSize="lg"
                                    value={language}
                                    onChange={e => setLanguage(e.target.value)} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:30 }}>
                                <div style={{width: "-webkit-fill-available"}}>
                                    <Label for="proficiency">
                                        Proficiency
                                    </Label>
                                    <Input
                                        placeholder="select"
                                        id="proficiency"
                                        bsSize="lg"
                                        value={proficiency}
                                        onChange={(e)=>setProficiency(e.target.value)}
                                        type="select">
                                        <option>Please select</option>
                                        <option>Elementary proficiency</option>
                                        <option>Limited working proficiency</option>
                                        <option>Full professional proficiency</option>
                                        <option>Professional working proficiency</option>
                                        <option>Native proficiency</option>
                                    </Input>
                                </div>
                            </Box>
                        </ModalBody>
                         <ModalFooter>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={(e)=>handleSubmitLanguage(e)}>
                               Save
                            </Button>
                            </ModalFooter>
                    </Modal>
                    <Modal
                        centered
                        scrollable
                        size="lg"
                        isOpen={openCourse}
                        toggle={handleClickOpenCourse}>
                        <ModalHeader toggle={handleCloseCourse}>
                            Add Course
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
                                variant="contained"
                                color="primary"
                                onClick={(e)=>handleSubmitCourse(e)}>
                               Save
                            </Button>
                            </ModalFooter>
                    </Modal>
                    <Modal
                        centered
                        scrollable
                        size="lg"
                        isOpen={openProject}
                        toggle={handleClickOpenProject}
                    >
                        <ModalHeader toggle={handleCloseProject}>
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
                                        // className={classes.root}
                                        inputVariant="outlined"
                                        variant="inline"
                                        InputAdornmentProps={{ position: "start" }}
                                        value={endDate}
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
                                variant="contained"
                                color="primary"
                                onClick={(e)=>handleSubmitProject(e)}>
                               Save
                            </Button>
                        </ModalFooter>
                    </Modal>
                </div>
                {props.profile==null || props.profile.Languages.length===0?null:
                    <div className="accom-card">
                        <h4 className="title">{props.profile.Languages.length}</h4>
                        <div style={{width: "-webkit-fill-available"}}>
                            <div className="accordion">
                                <h5 style={{color:"#0577b9"}}>Languages</h5>
                                <IconButton aria-label="languages" onClick={handleAccordionLanguage}>
                                    { !dropDownLanguage && <IoChevronDownOutline className="downIcon"/>}
                                    {  dropDownLanguage &&<IoChevronUpOutline className="downIcon"/>}
                                </IconButton>
                            </div>
                            {
                                !dropDownLanguage &&
                                <ul style={{display:"flex","flex-direction": "row","flex-wrap": "wrap"}}>
                                    {props.profile.Languages.map((l)=>{return(<li style={{marginRight:"20px"}}>{l.language}</li>)})}
                                </ul>
                            }
                            {
                                dropDownLanguage &&
                                props.profile.Languages.map((l)=>{
                                    return(<LanguagesCard languages={l} editLanguage={props.editLanguage} deleteLanguage={props.deleteLanguage}/>)
                                })
                            }
                        </div>
                    </div>
                }
                {props.profile==null || props.profile.Courses.length===0?null:
                    <div className="accom-card">
                        <h4 className="title">{props.profile.Courses.length}</h4>
                        <div style={{width: "-webkit-fill-available"}}>
                            <div className="accordion">
                                <h5 style={{color:"#0577b9"}}>Courses</h5>
                                <IconButton aria-label="courses" onClick={handleAccordionCourse}>
                                    { !dropDownCourse && <IoChevronDownOutline className="downIcon"/>}
                                    {  dropDownCourse &&<IoChevronUpOutline className="downIcon"/>}
                                </IconButton>
                            </div>
                            {
                                !dropDownCourse &&
                                <ul style={{display:"flex","flex-direction": "row","flex-wrap": "wrap"}}>
                                    {props.profile.Courses.map((c)=>{return(<li style={{marginRight:"20px"}}>{c.course}</li>)})}
                                </ul>
                            }
                            {
                                dropDownCourse &&
                                props.profile.Courses.map((c)=>{
                                    return(<CoursesCard courses={c} editCourse={props.editCourse} deleteCourse={props.deleteCourse}/>)
                                })
                            }
                        </div>
                    </div>
                }
                {props.profile==null || props.profile.Projects.length===0?null:
                    <div className="accom-card">
                        <h4 className="title">{props.profile.Projects.length}</h4>
                        <div style={{width: "-webkit-fill-available"}}>
                            <div className="accordion">
                                <h5 style={{color:"#0577b9"}}>Projects</h5>
                                <IconButton aria-label="courses" onClick={handleAccordionProject}>
                                    { !dropDownProject && <IoChevronDownOutline className="downIcon"/>}
                                    {  dropDownProject &&<IoChevronUpOutline className="downIcon"/>}
                                </IconButton>
                            </div>
                            {
                                !dropDownProject &&
                                <ul style={{display:"flex","flex-direction": "row","flex-wrap": "wrap"}}>
                                    {props.profile.Projects.map((c)=>{return(<li style={{marginRight:"20px"}}>{c.project}</li>)})}
                                </ul>
                            }
                            {
                                dropDownProject &&
                                props.profile.Projects.map((p)=>{
                                    return(<ProjectCard projects={p} editProject={props.editProject}  deleteProject={props.deleteProject}/>)
                                })
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

export default Accomplishments
