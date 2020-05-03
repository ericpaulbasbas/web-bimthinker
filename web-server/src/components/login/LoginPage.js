import React, {useState} from "react"
import Typography from "@material-ui/core/Typography";
import Button from '@material-ui/core/Button';
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from '@material-ui/core/TextField';
import { Link } from "gatsby";
import { useSelector, useDispatch } from 'react-redux'
import { login, loginFail } from './actions'
import { navigate } from "gatsby"

const LoginPage = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  // const user = useSelector(state => state.userInfo.user);
  const token = useSelector(state => state.userInfo.token);
  const loginError = useSelector(state => state.userInfo.error);
  const dispatch = useDispatch();

  console.log('TOKEN: ', token);
  if (token) navigate("/");

  const useStyles = makeStyles((theme) => ({
    button: {
      color: '#FFF',
      flexGrow: 1,
      marginBottom: theme.spacing(0),
    },
    container: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
      width: '100%',
      alignItems: "center",
    },
    card: {
      display: "flex",
      flexDirection: "column",
      padding: theme.spacing(3),
      marginTop: theme.spacing(8),
    },
    cardActions: {
      flexGrow: 0,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    cardContent: {
      flexGrow: 1,
      marginBottom: theme.spacing(3),
    },
    input: {
      color: '#FFF',
    },
    logo: {
      marginBottom: theme.spacing(3),
    },
    media: {
      height: '100%',
      backgroundSize: 'inherit',
      width: '100%',
    },
    textField: {
      flexGrow: 1,
    },
    textFieldWrapper: {
      display: "flex",
      flexDirection: "row",
      marginBottom: theme.spacing(3),
    },
  }));

  const classes = useStyles();
  const doLogin = () => {
    setEmailError(false);
    setPasswordError(false);
    let invalid = false;

    if (!email || email.length === 0) {
      invalid = true;
      setEmailError(true);
    }
    if (!password || password.length === 0) {
      invalid = true;
      setPasswordError(true);
    }
    
    if (!invalid) dispatch(login(email, password));
    else dispatch(loginFail("Please fill the required fields"));
  }

  return (
    <Container className={classes.container} maxWidth="sm">
      <Card className={classes.card}>
        <div className={classes.logo}>
          <Typography align="center">
            <Typography
              component="span"
              variant="h2"
              align="center"
              color="secondary"
              display="inline"
              style={{fontWeight: '600', color: '#1EB980'}}
            >
              BIM
            </Typography>
            <Typography
              component="span"
              variant="h2"
              align="center"
              display="inline"
              // style={{color: '#FFF'}}
            >
              thinker
            </Typography>
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph gutterBottom>
            the model shop
          </Typography>
        </div>
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1" align="center" paragraph style={{color: 'red'}}>
            {loginError}
          </Typography>
          <Typography variant="h4" component="h4" gutterBottom className={classes.textFieldWrapper}>
            <TextField 
              label="Email"
              className={classes.textField}
              onChange={e => setEmail(e.target.value)}
              error={emailError}
            />
          </Typography>
          <Typography variant="h5" component="h5" gutterBottom className={classes.textFieldWrapper}>
            <TextField
              label="Password"
              className={classes.textField}
              type="password"
              onChange={e => setPassword(e.target.value)}
              error={passwordError}
            />
          </Typography>
          <Link to="/" style={{textDecoration: "none"}}>
            <Typography variant="caption" align="center" color="textSecondary" paragraph gutterBottom>
              Forgot password?
            </Typography>
          </Link>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Button
            variant="contained"
            color="secondary"
            disableElevation
            className={classes.button}
            onClick={doLogin}
          >Sign In</Button>
        </CardActions>
      </Card>
    </Container>
  )
}

export default LoginPage
