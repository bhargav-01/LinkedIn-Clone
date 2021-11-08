import React,{useState} from 'react'
import Box from '@material-ui/core/Box';
import {TextField,Button,IconButton} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles'
import {DatePicker} from '@material-ui/pickers'
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

function SchoolCard(props) {
    const classes = useStyles(); 
    const [open, setOpen] = React.useState(false);
    const id = props.certificate._id;
    const [name, setName] = useState(props.certificate.name);
    const [organization, setOrganization] =useState(props.certificate.organization);
    const [issueDate, setIssueDate] = useState(props.certificate.issueDate);
    const [cId, setCId] = useState(props.certificate.cId);
    const [cURL, setCURL] = useState(props.certificate.cURL);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete=(e)=>{
        e.preventDefault();
        props.deleteCertification(id);
        setOpen(false)
    }
    

    const handleSubmit=(e)=>{
        e.preventDefault();
        props.editCertification(id,name,organization,issueDate,cId,cURL);
        setOpen(false)
    }
    return (
        <div className="card school-card">
            <div className="card-body">
                <div className="name-container">
                    <h5 class="card-title">{props.certificate.name}</h5>
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
                                    label="Name"
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
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:20}}>
                                <TextField 
                                    label="Organization"
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
                                    value={organization}
                                    onChange={e => setOrganization(e.target.value)} />
                            </Box>
                            <div className="row" style={{marginTop:10}}>
                                <div className="col-12 col-md-6 date">
                                    <label for="issueDate" className="form-label">End year (or expected)*</label>
                                    <DatePicker
                                        views={["year", "month"]}
                                        id="issueDate"
                                        className={classes.root}
                                        inputVariant="outlined"
                                        variant="inline"
                                        InputAdornmentProps={{ position: "start" }}
                                        value={issueDate}
                                        onChange={setIssueDate}
                                    /> 
                                </div>
                            </div>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:30 }}>
                                <TextField 
                                    label="Credential Id  ."
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
                                    value={cId}
                                    onChange={e => setCId(e.target.value)} />
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'flex-end',marginTop:30 }}>
                                <TextField 
                                    label="Credential   URL  ."
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
                                    value={cURL}
                                    onChange={e => setCURL(e.target.value)} />
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
                <div>{props.certificate.organization}</div>
                <div>{new Date(props.certificate.issueDate).toLocaleString('en-us',{month:'short', year:'numeric'})}</div>
            </div>
        </div>
    )
}

export default SchoolCard
