import {memo} from "react";
import { makeStyles } from 'tss-react/mui'
import {NavigationBar} from '../components/NavigationBar.tsx'


export const Home = memo(function Home() {
    const { classes } = useStyles()
    // const camera = useRef(null);
    // const [image, setImage] = useState(null);

    return (
        <div className={classes.root}>
            <div className={classes.navBar}>
                <NavigationBar />
            </div>
            <header className={classes.appHeader}>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className={classes.appLink}
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
            {/*<div>*/}
            {/*  <CameraView ref={camera}/>*/}
            {/*  <button onClick={() => setImage(camera.current.takePhoto())}>Take photo</button>*/}
            {/*  <img src={image} alt='Taken photo'/>*/}
            {/*</div>*/}
        </div>
    )
})

const useStyles = makeStyles({name: {Home}})(() => ({
    root: {
        textAlign: 'center',
    },
    appHeader: {
        backgroundColor: 'black',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 'calc(10px + 2vmin)',
        color: 'white',
    },
    appLink: {
        color: '#61dafb',
    },
    navBar: {
        minHeight: 5,
        color: '#61dafb',
        backgroundColor: '#282c34',
    },
}))
