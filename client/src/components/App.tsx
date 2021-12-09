import MainPage from "../pages/MainPage";
import React, {useEffect} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import AuthPage from "../pages/AuthPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavBar from "./TopNavBar/TopNavBar";
import {checkSessionAction} from "../store/actions/AuthActions";
import {ModalContext} from "./context/ModalContext";
import DialogModal from "./DialogModal/DialogModal";

const App = () => {

    const {isAuthorized} = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(checkSessionAction())
    }, [])
    return (
        <div>
            <TopNavBar/>
            <DialogModal>
                <Switch>
                    <Route path={["/sign-in", "/sign-up"]} exact>
                        {!isAuthorized ? <AuthPage/> : <Redirect to={"/"}/>}
                    </Route>
                    <Route path={"/"}>
                        {isAuthorized ? <MainPage/> : <Redirect to="/sign-in"/>}
                    </Route>
                </Switch>
            </DialogModal>
        </div>
    );
};

export default App;
