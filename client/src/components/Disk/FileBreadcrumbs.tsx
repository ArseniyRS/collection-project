import React from 'react';
import {Breadcrumbs, Link} from "@mui/material";
import {useAppSelector} from "../../hooks/redux";

const FileBreadcrumbs = ({crumbDirHandler}) => {
    const {dirCrumbs} = useAppSelector(state => state.fileReducer)
    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb" className={'breadcrumb'}>
            <span color="inherit" className={'breadcrumb__item'}  onClick={() => crumbDirHandler(-1)}>Мой диск</span>
            {dirCrumbs.map((dir, index) => <Crumb crumbDirHandler={crumbDirHandler} key={dir.id}
                                                  index={index} {...dir}/>)}
        </Breadcrumbs>
    );
};


const Crumb = ({name, id, index, crumbDirHandler}) => {
    return (
        <span color="inherit" className={'breadcrumb__item'}
              onClick={() => crumbDirHandler(index)}
        >{name}</span>
    )
}


export default FileBreadcrumbs;