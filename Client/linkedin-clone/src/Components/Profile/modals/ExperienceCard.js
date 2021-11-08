import React,{useState} from 'react'
import Box from '@material-ui/core/Box';
import {TextField,Button,FormControl,MenuItem,Select,InputLabel,FormControlLabel,Checkbox} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {DatePicker} from '@material-ui/pickers'
import {BsPlusLg} from 'react-icons/bs'
import './education.css'
import JobCard from './JobCard'
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
    const [open, setOpen] = useState(false);
    const [present, setPresent] = useState(false);
    const [title, setTitle] = useState('');
    const [type, setType] =useState('');
    const [name, setName] =useState('');
    const [location, setLocation] =useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [description, setDescription] = useState();
   
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
        if(present==="true")
            props.submitExperience(title,type,name,location,startDate,"Present",description);
        else
            props.submitExperience(title,type,name,location,startDate,endDate,description);
        setOpen(false)
    }
    return (
        <div className="card profile_card">
            <div className="card-body">
                <div className="name-container">
                    <h5 class="card-title">Experience</h5>
                    {
                        props.owner===true &&  
                        <Button onClick={handleClickOpen} sx={{width:"15px"}}>
                            <BsPlusLg style={{fontSize: "22px",color: "darkslategrey"}}/>
                        </Button>
                    }
                   
                    <Modal
                        centered
                        scrollable
                        size="lg"
                        isOpen={open}
                        toggle={handleClickOpen}
                    >
                        <ModalHeader toggle={handleClose}>
                            Add experience
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
                                <FormControl variant="outlined" className={classes.root} 
                                    InputLabelProps={{
                                            classes: {
                                                root: classes.label,
                                            }
                                    }}
                                    fullWidth>
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
                                        value={endDate}
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
                                    style={{fontSize:'1.2rem',border: "1px solid black"}}
                                    onChange={(e)=>setDescription(e.target.value)}/>
                            </Box>
                        </ModalBody>
                         <ModalFooter>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={(e)=>handleSubmit(e)}>
                               Save
                            </Button>
                            </ModalFooter>
                    </Modal>
                </div>
                {props.profile==null?null:
                    props.profile.Experience.map((experience)=>{
                        return(
                            <JobCard owner={props.owner} experience={experience} editExperience={props.editExperience} deleteExperience={props.deleteExperience}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ExperienceCard
