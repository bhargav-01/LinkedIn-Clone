import React,{useState} from 'react'
import Box from '@material-ui/core/Box';
import {TextField,DialogContent,Button,DialogActions,Dialog,DialogContentText,DialogTitle} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {DatePicker} from '@material-ui/pickers'
import {BsPlusLg} from 'react-icons/bs'
import PropTypes from 'prop-types';
import './education.css'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import SchoolCard from './SchoolCard'
// import DatePicker from '@mui/lab/DatePicker';


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

function EducationCard(props) {
    const classes = useStyles(); 
    const [open, setOpen] = React.useState(false);
    const [school, setSchool] = useState('');
    const [degree, setDegree] =useState('');
    const [fieldofStudy, setFieldofStudy] = useState('');
    const [startYear, setStartYear] = useState(new Date());
    const [endYear, setEndYear] = useState(null);
    const [grade, setGrade] = useState('');
    const [activity, setActivity] = useState('');
    const [description, setDescription] = useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit=(e)=>{
        e.preventDefault();
        props.submitEducation(school,degree,fieldofStudy,startYear,endYear,grade,activity,description);
        setOpen(false)
    }
    return (
        <div className="card profile_card">
            <div className="card-body">
                <div className="name-container">
                    <h5 class="card-title">Education</h5>
                    <Button onClick={handleClickOpen} sx={{width:"15px"}}>
                        <BsPlusLg style={{fontSize: "22px",color: "darkslategrey"}}/>
                    </Button>
                    <Modal
                        centered
                        scrollable
                        size="lg"
                        isOpen={open}
                        toggle={handleClickOpen}
                    >
                        <ModalHeader toggle={handleClose}>
                            Modal title
                        </ModalHeader>
                        <ModalBody>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:30 }}>
                                <TextField 
                                    label="School"
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
                                    value={school}
                                    onChange={e => setSchool(e.target.value)} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:20}}>
                                <TextField 
                                    label="Degree"
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
                                    value={degree}
                                    onChange={e => setDegree(e.target.value)} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:20}}>
                                <TextField 
                                    label="Field of study"
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
                                    value={fieldofStudy}
                                    onChange={e => setFieldofStudy(e.target.value)} />
                            </Box>
                            <div className="row" style={{marginTop:10}}>
                                <div className="col-12 col-md-6 date">
                                    <label for="start-year" className="form-label">Start year*</label>
                                    <DatePicker
                                        views={["year"]}
                                        id="start-year"
                                        inputVariant="outlined"
                                        variant="inline"
                                        maxDate={new Date()}
                                        InputAdornmentProps={{ position: "start" }}
                                        value={startYear}
                                        onChange={setStartYear}
                                    /> 
                                </div>

                                <div className="col-12 col-md-6 date">
                                    <label for="end_year" className="form-label">End year (or expected)*</label>
                                    <DatePicker
                                        views={["year"]}
                                        id="end_year"
                                        inputVariant="outlined"
                                        variant="inline"
                                        InputAdornmentProps={{ position: "start" }}
                                        value={endYear}
                                        onChange={setEndYear}
                                    /> 
                                </div>
                            </div>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:30 }}>
                                <TextField 
                                    label="Grade"
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
                                    value={grade}
                                    onChange={e => setGrade(e.target.value)} />
                            </Box>
                            <Box sx={{marginTop:30 }}>
                                <label for="exampleFormControlTextarea1" className="form-label">Activities and societies</label>
                                <textarea className="form-control textarea"
                                    id="exampleFormControlTextarea1 textarea" 
                                    rows="3"
                                    value={activity}
                                    style={{fontSize:'1.2rem'}}
                                    onChange={(e)=>setActivity(e.target.value)}/>
                            </Box>
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
                                variant="contained"
                                color="primary"
                                onClick={(e)=>handleSubmit(e)}>
                               Save
                            </Button>
                            </ModalFooter>
                    </Modal>
                </div>
                {props.profile==null?null:
                    props.profile.Education.map((school)=>{
                        return(
                            <SchoolCard school={school} editEducation={props.editEducation} deleteEducation={props.deleteEducation}/>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default EducationCard
