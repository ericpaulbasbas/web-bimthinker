import React, { useState } from 'react'
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { useDispatch } from 'react-redux'
import { getModels } from '../common/actions'
import { navigate } from 'gatsby';

export default () => {
  const dispatch = useDispatch();
  const [searchKeyword, setSearchKeyword] = useState(null);

  const useStyles = makeStyles((theme) => ({
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
      display: 'flex',
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      right: '0',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(0)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  const classes = useStyles();

  const doSearch = e => {
    console.log('SEARCH: ', searchKeyword);
    dispatch(getModels({ searchKeyword }));
    navigate('/models');
    // alert('Sorry, download feature is not yet available');
  }

  return (
    <div className={classes.search}>
      <InputBase
        placeholder="Search…"
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput,
        }}
        inputProps={{ 'aria-label': 'search' }}
        onChange={e => setSearchKeyword(e.target.value)}
      />
      <div className={classes.searchIcon}>
        <SearchIcon onClick={doSearch}/>
      </div>
    </div>
  )
}
