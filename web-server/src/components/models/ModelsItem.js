import React, { useState } from 'react'
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from "@material-ui/core/IconButton";
import GetAppIcon from '@material-ui/icons/GetApp';
import CardMedia from '@material-ui/core/CardMedia';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'gatsby';
import { download } from '../common/actions'
// import axios from '../../helpers/http';
// import FileSaver from 'file-saver';

const ModelsItem = ({ modelId }) => {
  const [ focused, setFocused ] = useState(false);
  const models = useSelector(state => state.modelsState.models);
  const model = models[modelId];
  const dispatch = useDispatch();

  const useStyles = makeStyles((theme) => ({
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column"
    },
    cardActions: {
      flexGrow: 1,
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(1),
    },
    cardContent: {
      paddingTop: theme.spacing(1),
      paddingBottom: theme.spacing(0),
      // margin: 'auto',
    },
    media: {
      height: 180,
      backgroundSize: 'inherit',
      borderBottom: '1px solid #eee',
    },
    typographyCategory: {
      fontSize: '12px',
      flexGrow: 1,
      color: '#CCC',
      textTransform: 'uppercase',
    },
    typographyTitle: {
      fontSize: '15px',
      flexGrow: 1,
    },
  }));

  const classes = useStyles();


  const onMouseOver = () => setFocused(true);
  const onMouseOut = () => setFocused(false);
  const doDownload = e => {
    e.preventDefault();
    dispatch(download());
    // return axios.get(`/download`, {responseType: 'blob'})
    //   .then((res) => {
    //     const fileName = res.headers["x-suggested-filename"];
    //     FileSaver.saveAs(res.data, fileName);
    //   }).catch((response) => {
    //     console.error("Problem downloading the file", response);
    //   });
  }

  return (
    <>
      <Link to={`/models/${modelId}`} style={{textDecoration: "none"}}>
        <Card className={classes.card}
          onMouseOver={onMouseOver}
          onMouseOut={onMouseOut}
          raised={focused}
          onFocus={ () => void 0 }
          onBlur={ () => void 0 }
        >
          <CardMedia
            className={classes.media}
            image={model.image_name ? require(`../../images/${model.image_name}`) : require(`../../images/gatsby-icon.png`)}
            title={model.title}

          />
          <CardContent className={classes.cardContent}>
            <Typography className={classes.typographyTitle}>
              {model.title}
            </Typography>
            <Typography className={classes.typographyCategory}>
              {model.category}
            </Typography>
          </CardContent>
          <CardActions className={classes.cardActions}>
            <Tooltip title="Download" placement="top">
              <IconButton size="small" color="primary" onClick={doDownload}>
                <GetAppIcon />
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      </Link>
    </>
  )
}

export default ModelsItem;
