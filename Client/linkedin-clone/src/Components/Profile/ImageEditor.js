import React from 'react'
import Slider from '@material-ui/core/Slider'
import Cropper from 'react-easy-crop'
import './profile.css'
import { Typography,Button,DialogActions } from '@material-ui/core'
import { getCroppedImg } from './canvasUtils'

class ImageEditor extends React.Component {

    constructor(props){
        super(props);
        this.state={
            imageSrc:props.file,
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 1,
            rotation:0,
            croppedAreaPixels:null,
            croppedImage:null,
        }
    }

    // const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    // const [croppedImage, setCroppedImage] = useState(null)
  
    onCropComplete = (croppedArea, croppedAreaPixels) => {
        this.setState({croppedAreaPixels:croppedAreaPixels})
    }

    onCropChange = (crop) => {
        this.setState({ crop })
    }

    setRotation=(rotation)=>{
        this.setState({rotation});
    }

    onZoomChange = (zoom) => {
        this.setState({ zoom })
    }

    onSubmit=async(event)=>{
        console.log("dsdsdswdswdwdwdwdqsdwqdwdwq")
        event.preventDefault();
        try {
            const croppedImage = await getCroppedImg(
              this.state.imageSrc,
              this.state.croppedAreaPixels,
              this.state.rotation
            )
            console.log('donee', { croppedImage })
            this.props.submitProfileImage(croppedImage);
          } catch (e) {
            console.error(e)
          }
    }

    render() {
        return (
           <div>
                <div className="ImageEditor-container">
                    <div className="imageEditor">
                        {/* <p>Bhargav</p> */}
                        <div className="crop-container">
                        <Cropper
                            image={this.state.imageSrc}
                            crop={this.state.crop}
                            zoom={this.state.zoom}
                            rotation={this.state.rotation}
                            aspect={this.state.aspect}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={this.onCropChange}
                            onCropComplete={this.onCropComplete}
                            onZoomChange={this.onZoomChange}
                            onRotationChange={this.setRotation}
                        />
                        </div>
                        <div className="controls row">
                            <div className="col-12 col-md-6 slider-container" style={{paddingRight:10}}>
                                <Typography style={{marginRight:10}}>Zoom</Typography>
                                <Slider
                                    value={this.state.zoom}
                                    min={1}
                                    max={3}
                                    step={0.1}
                                    aria-labelledby="Zoom"
                                    onChange={(e, zoom) => this.onZoomChange(zoom)}
                                    // classes={{ container: 'slider' }}
                                />
                            </div>
                            <div className="col-12 col-md-6 slider-container">
                                <Typography style={{marginRight:10}}>ROTATION</Typography>
                                <Slider
                                    value={this.state.rotation}
                                    min={0}
                                    max={360}
                                    step={1}
                                    aria-labelledby="Rotation"
                                    // classes={{ container: 'slider' }}
                                    onChange={(e, rotation) => this.setRotation(rotation)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <DialogActions>
                    <Button color="primary" style={{textTransform:'none'}}  variant="contained" onClick={(e)=>this.onSubmit(e)} >
                        Upload Image
                    </Button>
                </DialogActions>
           </div>
        )
    }
}

export default ImageEditor
