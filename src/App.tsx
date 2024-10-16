import './App.css'
import {
    BrowserRouter,
    Routes,
    Route,
    useNavigate,
    Navigate,
} from 'react-router-dom'
import Home from './pages/Home.tsx'
import Layout from './components/Layout.tsx'
import Products from './pages/Products.tsx'
import AccountSettings from './pages/AccountSettings.tsx'
import Payment from './pages/Payment.tsx'
import Callback from './pages/Callback'
import Token from './pages/Token.tsx'
// import {useEffect} from "react";
// import {setupInterceptors} from "./services/AxiosInstance.ts";
// import {logIn} from "./redux/reducer/auth.reducer.ts";
// import Login from "./pages/Login.tsx";
// import {useDispatch} from "react-redux";
import ProtectedRoute from './components/ProtectedRoute.tsx'
import Explore from './pages/Explore.tsx'
import Login from './pages/Login.tsx'
import NoteItem from './pages/NoteItem.tsx'
import CreateNotesListing from './pages/CreateNotes.tsx'
// const InterceptorsSetup = () => {
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//     useEffect(() => {
//         // console.log("should be only ran once")
//         setupInterceptors(dispatch, navigate);
//     }, []);

//     useEffect(() => {
//         if (localStorage.getItem('authToken')) {
//             dispatch(logIn());
//         }
//     }, []);
//     return null;
// };
function App() {
    return (
        <BrowserRouter>
            {/* <InterceptorsSetup/> */}
            <Routes>
                {/* Redirect root path to /login */}
                <Route path="/" element={<Navigate to="/login" replace />} />

                {/* Public route for login */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes for other paths */}
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <Layout />
                        </ProtectedRoute>
                    }
                >
                    <Route path='/home' element={<Home />} />
                    <Route path="products/:list" element={<Products />} />
                    <Route
                        path="account-settings"
                        element={<AccountSettings />}
                    />
                    <Route path="market" element={<Explore />}></Route>
                    <Route path="note/:itemId" element={<NoteItem />} />
                    <Route path="create" element={<CreateNotesListing />} />

                    <Route path="payment" element={<Payment />} />
                    <Route path="callback" element={<Callback />} />
                    <Route path="token" element={<Token />} />
                </Route>

                {/* Replace this with error 404 page later  */}
                {/*<Route path="/" element={<Navigate to="/login" replace />} />*/}
            </Routes>
        </BrowserRouter>
    )
}

export default App
