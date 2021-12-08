import React, {useEffect, useState} from 'react';
import {alpha, styled} from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {TextField} from "@mui/material";
import {Search} from "@mui/icons-material";

const FileSearch = ({onSearch}) => {
    const Search = styled('div')(({theme}) => ({
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    }));

    const SearchIconWrapper = styled('div')(({theme}) => ({
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }));

    const StyledInputBase = styled(InputBase)(({theme}) => ({
        color: 'inherit',
        '& .MuiInputBase-input': {
            padding: theme.spacing(1, 1, 1, 0),
            // vertical padding + font size from searchIcon
            paddingLeft: `calc(1em + ${theme.spacing(4)})`,
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('md')]: {
                width: '20ch',
            },
        },
    }));
    const [text, setText] = useState('')
    useEffect(() => {
        const timeoutId = setTimeout(() => {
            onSearch(text)
        }, 1500);
        return () => clearTimeout(timeoutId);
    }, [text])
    return (
        <div className={'search-field'}>
            <SearchIcon/>
            <InputBase
                placeholder="Search…" value={text}
                onChange={e => setText(e.target.value)}
            />
        </div>
        // <Search>
        //     <SearchIconWrapper>
        //         <SearchIcon/>
        //     </SearchIconWrapper>
        //     {/*<StyledInputBase*/}
        //     {/*    autofocus*/}
        //     {/*    placeholder="Search…"*/}
        //     {/*    //inputProps={{'aria-label': 'search'}}*/}
        //     {/*    value={text}*/}
        //     {/*    onChange={e => setText(e.target.value)}*/}
        //     {/*/>*/}
        // </Search>
    );
};

export default FileSearch;