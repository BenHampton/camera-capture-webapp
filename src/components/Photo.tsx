import React, {memo, useCallback, useState} from "react";
import { makeStyles } from 'tss-react/mui'
import {Camera, CameraType} from "react-camera-pro";
import {FacingMode} from "react-camera-pro/dist/components/Camera/types";
import { Button } from '@mui/material';


export interface PhotoProps {
    camera: React.RefObject<CameraType | null> | null
    onCaptureImage: () => void
}

export const Photo = memo(function Photo({camera, onCaptureImage}: PhotoProps) {
    const { classes } = useStyles()
    const [facingMode, setFacingMode] = useState('user' as FacingMode)
    const [isLoading, setLoading] = useState(true)
    // const [error, setError] = useState(null);

    const flipCamera = useCallback(() => {
        if (facingMode === 'user') {
            setFacingMode('environment')
        } else {
            setFacingMode('user')
        }
    },[facingMode])

    const handleVideoReady = useCallback(() => {
        setLoading(false)
    },[])

    return (
        <div className={classes.root}>
            <div className={classes.cameraContainer}>
                <Camera ref={camera}
                        facingMode={facingMode}
                        aspectRatio={16 / 9}
                        errorMessages={{
                            noCameraAccessible: 'No camera device accessible. Please connect your camera or try a different browser.',
                            permissionDenied: 'Permission denied. Please grant camera access in your browser settings.',
                            switchCamera: 'Error switching camera.',
                            canvas: 'Error initializing canvas.'
                        }}
                        videoReadyCallback={handleVideoReady}
                />
            </div>
            {!isLoading &&
                <span className={classes.buttonsContainer}>
                    <Button variant={'outlined'} onClick={onCaptureImage} size="large">
                         Take photo
                    </Button>
                    <Button variant={'outlined'} onClick={flipCamera} size="large">
                         Flip Camera
                    </Button>
                 </span>
            }
        </div>
    )
})

const useStyles = makeStyles({name: {Photo}})(() => ({
    root: {
        paddingBottom: 20,
    },
    cameraContainer: {
        paddingRight: 150,
        paddingLeft: 150,
        height: '10%',
    },
    buttonsContainer: {
        paddingTop: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        button: {
            marginBottom: 30
        }
    }
}))
