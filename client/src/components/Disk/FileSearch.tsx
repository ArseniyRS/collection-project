import React, {useEffect, useState} from 'react';
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {TextField} from "@mui/material";
import {Search} from "@mui/icons-material";

const FileSearch = ({onSearch}) => {
    const [text, setText] = useState('')
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch(text)
        }, 1500);
        return () => clearTimeout(timeoutId);
    }, [text])
    const handleChange = () =>{
        return (e) => setText(e.target.value)
    }
    return (
        <div className={'search-field'}>
            <SearchIcon/>
            <InputBase
                placeholder="Search…" value={text}
                onChange={handleChange()}
            />
        </div>
    );
};

export default FileSearch;