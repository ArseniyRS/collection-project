import {useAppSelector} from "../hooks/redux";
import React from "react";
import Disk from "../components/Disk/Disk";

const MainPage = () => {
    const {isAuthorized} = useAppSelector((state) => state.authReducer);

    return (
        <div className={'container'}>
            <Disk/>

        </div>
    );
};

export default MainPage;
