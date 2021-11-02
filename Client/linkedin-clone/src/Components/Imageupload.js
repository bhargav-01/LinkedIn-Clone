import React from 'react'
import styled  from '@material-ui/core/styles/styled'
import {Button} from '@material-ui/core'
import { initializeApp } from "firebase/app";
import firebaseConfig  from '../firebaseIni'
import { getStorage,ref,uploadBytes,getDownloadURL } from "firebase/storage";

const Input = styled('input')({
    display: 'none',
  });
function imageupload(props) {
    const handleSubmit=(event)=>{
        event.preventDefault();
        const firebaseApp = initializeApp(firebaseConfig);
        const storage = getStorage(firebaseApp);
        const now= new Date();
        const storageRef = ref(storage,`${now.getFullYear()}${now.getMonth()}${now.getDate()}${now.getTime()}.jpg`);
      
        uploadBytes(storageRef,event.target.files[0])
        .then((snapshot) => {
            getDownloadURL(storageRef)
            .then((url) => {
                console.log(url);
            })
        })
        .catch(err=>{
            console.log(err);
        })

    }
    return (
        <div>
            <label htmlFor="contained-button-file">
                <Input accept="image/*" id="contained-button-file" multiple type="file" onChange={(e)=>handleSubmit(e)}/>
                <Button variant="contained" component="span">
                Upload
                </Button>
            </label>
        </div>
    )
}


export default imageupload

