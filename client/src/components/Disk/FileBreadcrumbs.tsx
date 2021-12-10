import React from 'react';
import {Breadcrumbs, Link} from "@mui/material";
import {useAppSelector} from "../../hooks/redux";

const FileBreadcrumbs = ({crumbDirHandler}) => {
    const {dirCrumbs} = useAppSelector(state => state.fileReducer)
    const handleHomeClick = () => {
        return () => crumbDirHandler(-1)
    }
    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb" className={'breadcrumb'}>
            <span color="inherit" className={'breadcrumb__item'} onClick={handleHomeClick()}>Мой диск</span>
            {dirCrumbs.map((dir, index) => <Crumb crumbDirHandler={crumbDirHandler} key={dir.id}
                                                  index={index} {...dir}/>)}
        </Breadcrumbs>
    );
};


const Crumb = ({name, id, index, crumbDirHandler}) => {
    const handleClick = () => {
        return () => crumbDirHandler(index)
    }
    return (
        <span color="inherit" className={'breadcrumb__item'}
              onClick={handleClick()}
        >{name}</span>
    )
}


export default FileBreadcrumbs;