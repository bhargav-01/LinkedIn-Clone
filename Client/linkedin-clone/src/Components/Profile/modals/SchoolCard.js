import React,{useState,Fragment} from 'react'
import Box from '@material-ui/core/Box';
import {TextField,Button,DialogTitle,IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {DatePicker} from '@material-ui/pickers'
import PropTypes from 'prop-types';
import './education.css'
import {Modal,ModalHeader,ModalBody,ModalFooter} from 'reactstrap'
import {MdModeEditOutline} from 'react-icons/md'

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

function SchoolCard(props) {
    const classes = useStyles(); 
    const [open, setOpen] = React.useState(false);
    const id = props.school._id;
    const [school, setSchool] = useState(props.school.Name_of_School);
    const [degree, setDegree] =useState(props.school.Degree);
    const [fieldofStudy, setFieldofStudy] = useState(props.school.Specialization);
    const [startYear, setStartYear] = useState(props.school.Start_Year);
    const [endYear, setEndYear] = useState(props.school.Start_Year);
    const [grade, setGrade] = useState(props.school.grade);
    const [activity, setActivity] = useState(props.school.activity);
    const [description, setDescription] = useState(props.school.description);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete=(e)=>{
        e.preventDefault();
        props.deleteEducation(id);
        setOpen(false)
    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        // if(startYear>=endYear)
        props.editEducation(id,school,degree,fieldofStudy,startYear,endYear,grade,activity,description);
        setOpen(false)
    }
    return (
        <div className="card school-card">
            <div className="card-body">
                <div className="name-container">
                    <h5 class="card-title">{props.school.Name_of_School}</h5>
                    {
                        props.owner===true &&
                        <IconButton onClick={handleClickOpen} sx={{width:"15px"}}>
                            <MdModeEditOutline style={{fontSize: "22px",color: "darkslategrey"}}/>
                        </IconButton>
                    }
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
                <div>{new Date(props.school.Start_Year).getFullYear()+"-"+new Date(props.school.End_Year).getFullYear()}</div>
                <div>{props.school.Degree+", "+props.school.Specialization}</div>
                <div style={{color: "dimgray"}}>{props.school.activity!==""?"Activity and Society: "+props.school.activity:null }</div>
                <div style={{marginTop:5}}>{description!==""?props.school.description.split('\n').map((item, key) => {return <Fragment key={key}>{item}<br/></Fragment>}):null}</div>
            </div>
        </div>
    )
}

export default SchoolCard
