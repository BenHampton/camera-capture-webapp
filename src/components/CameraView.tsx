import {memo, useCallback, useMemo, useRef, useState} from "react";
import { makeStyles } from 'tss-react/mui'
import {NavigationBar} from '../components/NavigationBar.tsx'
import {Photo} from "../components/Photo.tsx";
import {Button} from "@mui/material";
import {CameraType} from "react-camera-pro";

export const CameraView = memo(function CameraView() {
    const { classes } = useStyles()

    const camera = useRef<CameraType| null>(null)
    const [image, setImage] = useState<null | string>(null)

    const [isOpen, setOpen] = useState(false);

    const toggleCamera = useCallback(() => {
        setOpen(!isOpen)
        if (image != null) {
            setImage(null)
        }
    }, [image, isOpen])

    const buttonText = useMemo(() => {
        return isOpen ? 'Close' : 'Open'
    }, [isOpen])

    const onCaptureImage = useCallback(() => {
        if (camera === null || camera.current === null) {
            return
        }
        //takePhoto() currently is returning a string, might need some updating if ImageData is returned to setImage()
        const img: string | ImageData = camera.current.takePhoto();
        setImage(img.toString())
        toggleCamera()
    }, [toggleCamera])

    return (
        <div className={classes.root}>
            <div className={classes.navBar}>
                <NavigationBar/>
            </div>
            <div className={classes.detailsContainer}>
                <span>Welcome to the Camera feature. Press the button to toggle the camera and click the button to take the photo.</span>
                <span>Make sure to allow the camera permissions on your device</span>
                <Button className={classes.toggleCameraButton}
                        variant={'outlined'}
                        onClick={toggleCamera}
                        size="large"
                >
                    {buttonText} Camera
                </Button>
            </div>
            <div>
                {isOpen &&
                    <div>
                        <Photo camera={camera} onCaptureImage={onCaptureImage}/>
                    </div>
                }
                {image &&
                    <span className={classes.imageContainer}>
                        <img src={image} alt='Taken photo'/>
                    </span>
                }
            </div>
        </div>
    )
})

const useStyles = makeStyles({name: {Camera: CameraView}})(() => ({
    root: {},
    detailsContainer: {
        paddingTop: 50,
        paddingBottom: 25,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    },
    toggleCameraButton: {
        marginTop: 25,
    },
    navBar: {
        minHeight: 5,
        color: '#61dafb',
        backgroundColor: '#282c34',
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }
}))
