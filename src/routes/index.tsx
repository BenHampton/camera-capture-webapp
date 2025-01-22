import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    // Navigate,
} from 'react-router-dom'
import {CameraView} from '../components/CameraView.tsx';
import {Home} from '../components/Home.tsx';
import {RouteError} from '../components/RouteError.tsx';
import {VideoView} from '../components/VideoView.tsx';

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' errorElement={<RouteError />}>
            <Route path={'home'} element={<Home />}/>
            <Route path={'video'} element={<VideoView />}/>
            <Route path={'camera'} element={<CameraView />}/>
        </Route>
    )
)