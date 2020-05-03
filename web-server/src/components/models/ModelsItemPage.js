import React from 'react'
import Layout from '../theme/Layout';
import { useSelector } from 'react-redux'
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import GetAppIcon from '@material-ui/icons/GetApp';
import CardMedia from '@material-ui/core/CardMedia';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ModelsItemPage = ({ modelId }) => {
  const models = useSelector(state => state.modelsState.models);
  const model = models[modelId];

  const useStyles = makeStyles((theme) => ({
    button: {
      color: '#FFF',
      flexGrow: 1,
      marginBottom: theme.spacing(1),
    },
    card: {
      display: "flex",
      flexDirection: "column",
      height: 400,
      padding: theme.spacing(3),
    },
    cardActions: {
      flexGrow: 0,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    cardContent: {
      flexGrow: 1,
    },
    media: {
      height: '100%',
      backgroundSize: 'inherit',
      width: '100%',
    },
    typographyCategory: {
      paddingBottom: theme.spacing(2),
      color: '#CCC',
      textTransform: 'uppercase',
    },
  }));

  const classes = useStyles();

  const doDownload = e => {
    e.preventDefault();
    alert('Sorry, download feature is not yet available');
  }

  return (
    <Layout seoTitle="ModelsItemPage">
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        href="/models"
        startIcon={<ArrowBackIcon />}
        disableElevation
      >
        Return
      </Button>
      <Grid container spacing={1}>
        <Grid item key={0} xs={12} sm={12} md={6} lg={6}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.media}
              image={model.image_name ? require(`../../images/${model.image_name}`) : require(`../../images/gatsby-icon.png`)}
              title="Door"
            />
          </Card>
        </Grid>
        <Grid item key={1} xs={12} sm={12} md={6} lg={6}>
          <Card className={classes.card}>
            <CardContent className={classes.cardContent}>
              <Typography variant="h4" component="h4">
                {model.title}
              </Typography>
              <Typography className={classes.typographyCategory} variant="h5" component="h5" gutterBottom>
                {model.category}
              </Typography>
              <Typography variant="body1" component="h5">
                {model.description}
              </Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
              <Tooltip title="Download" placement="top">
                <Button
                  variant="contained"
                  color="secondary"
                  className={classes.button}
                  onClick={doDownload}
                  startIcon={<GetAppIcon />}
                  disableElevation
                >DOWNLOAD</Button>
              </Tooltip>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default ModelsItemPage;
