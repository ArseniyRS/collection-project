import MainPage from "../pages/MainPage";
import React, {useEffect} from "react";
import {Route, Switch, Redirect} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import AuthPage from "../pages/AuthPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import TopNavBar from "./TopNavBar/TopNavBar";
import {checkSessionAction} from "../store/actions/AuthActions";

const App = () => {

    const {isAuthorized} = useAppSelector((state) => state.authReducer);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(checkSessionAction())
    }, [])
    return (
        <div>
            <TopNavBar/>
            <Switch>
                <Route path={"/"} exact>
                    {isAuthorized ? <MainPage/> : <Redirect to="/sign-in"/>}
                </Route>
                <Route path={["/sign-in", "/sign-up"]}>
                    {!isAuthorized ? <AuthPage/> : <Redirect to={"/"} /> }
                </Route>
            </Switch>
        </div>
    );
};

export default App;
