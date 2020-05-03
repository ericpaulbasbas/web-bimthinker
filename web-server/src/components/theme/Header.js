import React, { useState, useEffect } from 'react'
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "gatsby"
import Avatar from '@material-ui/core/Avatar';
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../login/actions'
import { navigate } from "gatsby"
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import Popover from '@material-ui/core/Popover'
import SearchField from '../search/SearchField'

export default () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [loginActive, setLoginActive] = useState({display: 'none'});
  const [loginInactive, setLoginInactive] = useState(null);
  const token = useSelector(state => state.userInfo.token);
  const user = useSelector(state => state.userInfo.user);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const useStyles = makeStyles((theme) => ({
    toolbarButtons: {
      marginLeft: 'auto',
    },
  }));

  const classes = useStyles();

  const doLogout = () => {
    handleClose();
    dispatch(logout());
    navigate("/");
    setLogout();
  }

  const setLogin = () => {
    setLoginActive(null);
    setLoginInactive({display: 'none'});
  }

  const setLogout = () => {
    setLoginActive({display: 'none'});
    setLoginInactive(null);
  }

  useEffect(() => { if (token) setLogin(); }, [token])

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" style={{textDecoration: "none", display:"inherit"}}>
          <Typography variant="h6" color="secondary" style={{fontWeight: '800'}} noWrap>
            BIM
          </Typography>
          <Typography variant="h6" style={{color: "#FFF"}} noWrap>
            thinker
          </Typography>
        </Link>
        <div className={classes.toolbarButtons}>
          <Button color="inherit" disableRipple>
            <SearchField />
          </Button>
          <Button color="inherit" href="/categories">Explore</Button>
          <Button color="inherit" href="/">About</Button>
          <Button color="inherit" href="/">Contact Us</Button>
          <Button color="inherit" style={loginInactive} href="/login">Sign In</Button>
          {/* <Button color="inherit" style={loginInactive} onClick={doLogout} href="/login">Sign Up</Button> */}
          <Button color="inherit" style={loginActive} onClick={handleClick}>
            <Avatar alt="User" src={require(`../../images/blank-avatar.jpeg`)} />
          </Button>
          <Popover
            id="simple-popover"
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Card style={{padding: '10px 30px 10px 30px'}}>
              <Avatar alt="User" src={require(`../../images/blank-avatar.jpeg`)} style={{margin: '0 auto', marginTop: '10px', marginBottom: '10px'}}/>
              <Typography variant="h6" align="center" color="textSecondary">
                {user.first_name} {user.last_name}
              </Typography>
              <Typography variant="overline" align="center" paragraph color="textSecondary">
                admin
              </Typography>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  disableElevation
                  onClick={doLogout}
                >Logout</Button>
              </CardActions>
            </Card>
          </Popover>
        </div>
      </Toolbar>
    </AppBar>
  )
}
