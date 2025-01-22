import {memo} from "react";
import { makeStyles } from 'tss-react/mui'
import {NavigationBar} from '../components/NavigationBar.tsx'


export const VideoView = memo(function VideoView() {
    const { classes } = useStyles()

    return (
        <div className={classes.root}>
            <div className={classes.navBar}>
                <NavigationBar/>
            </div>
            test video
        </div>
    )
})

const useStyles = makeStyles({name: {Video: VideoView}})(() => ({
    root: {},
    navBar: {
        minHeight: 5,
        color: '#61dafb',
        backgroundColor: '#282c34',
    },
}))
