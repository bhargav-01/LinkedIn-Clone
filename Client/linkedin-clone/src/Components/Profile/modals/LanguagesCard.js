import React,{useState} from 'react'
import {Modal,ModalHeader,ModalBody,ModalFooter,Input,Label} from 'reactstrap'
import {Button,Box} from '@material-ui/core';
import {MdModeEditOutline} from 'react-icons/md'

function LanguagesCard(props) {
    const [language, setLanguage] = useState(props.languages.language);
    const [proficiency, setProficiency] = useState(props.languages.proficiency);
    const id = props.languages._id;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete=(e)=>{
        e.preventDefault();
        props.deleteLanguage(id);
        setOpen(false)
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        props.editLanguage(id,language,proficiency);
        setOpen(false)
    }

    return (
        <div className="card school-card">
            <div className="card-body">
                <div className="name-container">
                    <h5 class="card-title">{props.languages.language}</h5>
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
                            Edi language
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
                {props.languages.proficiency!=="Please select" && <div>{props.languages.proficiency}</div>}
            </div>
        </div>
    )
}

export default LanguagesCard

