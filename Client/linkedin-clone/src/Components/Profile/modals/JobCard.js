import React,{useState,Fragment} from 'react'
import Box from '@material-ui/core/Box';
import {TextField,Button,FormControl,MenuItem,Select,InputLabel,FormControlLabel,Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {DatePicker} from '@material-ui/pickers'
import {MdModeEditOutline} from 'react-icons/md'
// import './education.css'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'


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

 
function ExperienceCard(props) {
    const classes = useStyles(); 
    const id = props.experience._id;
    const [open, setOpen] = useState(false);
    const [present, setPresent] = useState(props.experience.endDate==="Present");
    const [title, setTitle] = useState(props.experience.title);
    const [type, setType] =useState(props.experience.employment_type);
    const [name, setName] =useState(props.experience.companyname);
    const [location, setLocation] =useState(props.experience.location);
    const [startDate, setStartDate] = useState(props.experience.startDate);
    const [endDate, setEndDate] = useState(props.experience.endDate);
    const [description, setDescription] = useState(props.experience.description);
   
    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };
    const handleChange = (event) => {
        setPresent(event.target.checked);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        alert("dsa")
        if(present==="true")
            props.editExperience(id,title,type,name,location,startDate,"Present",description);
        else
            props.editExperience(id,title,type,name,location,startDate,endDate,description);
        setOpen(false)
    }

    const handleDelete=(e)=>{
        // alert("sss");
        e.preventDefault();
        props.deleteExperience(id);
        setOpen(false)
    }
    return (
        <div className="card school-card">
            <div className="card-body">
                <div className="name-container">
                    <h5 class="card-title">{props.experience.title}</h5>
                    <Button onClick={handleClickOpen} sx={{width:"15px"}}>
                        <MdModeEditOutline style={{fontSize: "22px",color: "darkslategrey"}}/>
                    </Button>
                    <Modal
                        centered
                        scrollable
                        size="lg"
                        isOpen={open}
                        toggle={handleClickOpen}
                    >
                        <ModalHeader toggle={handleClose}>
                            Edit experiences
                        </ModalHeader>
                        <ModalBody>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:30 }}>
                                <TextField 
                                    label="Title"
                                    id="outlined-basic" 
                                    variant="outlined"
                                    fullWidth 
                                    color="#FFF"
                                    className={classes.root}
                                    inputProps={{className:classes.input}}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.label,
                                        }
                                    }}
                                    required
                                    value={title}
                                    onChange={e => setTitle(e.target.value)} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:30 }}>
                                <FormControl variant="outlined" className={classes.root} fullWidth>
                                    <InputLabel id="demo-simple-select-label"
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.label,
                                            }
                                        }}>
                                        Employment type
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        className={classes.root}
                                        value={type}
                                        InputLabelProps={{
                                            classes: {
                                                root: classes.label,
                                            }
                                        }}
                                        label="Employment type"
                                        onChange={(e)=>setType(e.target.value)}>
                                        <MenuItem value={"Full-time"}>Full-time</MenuItem>
                                        <MenuItem value={"Part-time"}>Part-time</MenuItem>
                                        <MenuItem value={"Self Employed"}>Self Employed</MenuItem>
                                        <MenuItem value={"Freelance"}>Freelance</MenuItem>
                                        <MenuItem value={"Internship"}>Internship</MenuItem>
                                        <MenuItem value={"Trainee"}>Trainee</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:30 }}>
                                <TextField 
                                    label="Company Name"
                                    id="outlined-basic" 
                                    variant="outlined"
                                    fullWidth 
                                    color="#FFF"
                                    className={classes.root}
                                    inputProps={{className:classes.input}}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.label,
                                        }
                                    }}
                                    required
                                    value={name}
                                    onChange={e => setName(e.target.value)} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:30 }}>
                                <TextField 
                                    label="Location"
                                    id="outlined-basic" 
                                    variant="outlined"
                                    fullWidth 
                                    color="#FFF"
                                    className={classes.root}
                                    inputProps={{className:classes.input}}
                                    InputLabelProps={{
                                        classes: {
                                            root: classes.label,
                                        }
                                    }}
                                    value={location}
                                    onChange={e => setLocation(e.target.value)} />
                            </Box>
                            <div>
                                <FormControlLabel control={<Checkbox defaultChecked color="primary"/>} 
                                    checked={present}
                                    onChange={handleChange}
                                    label="I am currently working in this role" />
                            </div>
                            <div className="row" style={{marginTop:10}}>
                                <div className="col-12 col-md-6 date">
                                    <label for="startDate" className="form-label">End year (or expected)*</label>
                                    <DatePicker
                                        views={["year", "month"]}
                                        id="startDate"
                                        className={classes.root}
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
                                        className={classes.root}
                                        inputVariant="outlined"
                                        variant="inline"
                                        InputAdornmentProps={{ position: "start" }}
                                        value={endDate==="Present"?new Date():endDate}
                                        onChange={setEndDate}
                                    /> 
                                </div>
                            </div>
                            <Box sx={{marginTop:50 }}>
                                <label for="exampleFormControlTextarea2" className="form-label">Description</label>
                                <textarea className="form-control textarea"
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
                <div>{props.experience.companyname+", "+props.experience.employment_type}</div>
                {props.experience.endDate!=="Present" && <div>{new Date(props.experience.startDate).toLocaleString('en-us',{month:'short', year:'numeric'})+"-"+new Date(props.experience.endDate).toLocaleString('en-us',{month:'short', year:'numeric'})}</div>}
                {props.experience.endDate==="Present" && <div>{new Date(props.experience.startDate).toLocaleString('en-us',{month:'short', year:'numeric'})+"-"+props.experience.endDate}</div>}
                {props.experience.location!==null && <div>{props.experience.location}</div>}
                <div style={{marginTop:5}}>{description!==""?props.experience.description.split('\n').map((item, key) => {return <Fragment key={key}>{item}<br/></Fragment>}):null}</div>
            </div>
        </div>
    )
}

export default ExperienceCard
