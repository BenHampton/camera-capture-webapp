import {memo, useCallback} from "react";
import { makeStyles } from 'tss-react/mui'
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";


export const NavigationBar = memo(function NavigationBar() {
    const { classes } = useStyles()
    const navigate = useNavigate()

    const onSelect = useCallback(
        (pathName: string) => {
            navigate(pathName)
        },
        [navigate]
    )

    const onHome = useCallback(() => onSelect('/home'), [onSelect])
    const onCamera = useCallback(() => onSelect('/camera'), [onSelect])
    const onVideo = useCallback(() => onSelect('/video'), [onSelect])

    return (
        <div className={classes.root}>
            <span  className={classes.navButtons}>
                <Button variant={'outlined'} onClick={onHome} size="medium">
                    HOME
                </Button>
                <Button variant={'outlined'} onClick={onCamera} size="medium" >
                    CAMERA
                </Button>
                <Button variant={'outlined'} onClick={onVideo} size="medium" >
                    VIDEO CAMERA
                </Button>
            </span>
        </div>
    )
})

const useStyles = makeStyles({name: { NavigationBar } })(() => ({
    root: {
        padding: 15,
    },
    navButtons: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        button: {
            minWidth: '150px',
            marginLeft: 25,
        }
    }
}))
