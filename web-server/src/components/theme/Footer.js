import React from "react";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

export default function Footer() {
  const useStyles = makeStyles(theme => ({
    footer: {
      backgroundColor: '#212121',
      padding: theme.spacing(6),
      borderTop: '1px solid #ccc',
      // margin: 'auto',
    },
    typography: {
      fontSize: '15px',
      color: '#FFF',
    },
  }));

  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="h6" align="center" className={classes.typography}>
        bimthinker @ 2020
      </Typography>
      {/* <Typography variant="h6" align="center" gutterBottom>
        BIMthinker
      </Typography>
      <Typography
        variant="subtitle1"
        align="center"
        color="textSecondary"
        component="p"
      >
        the model shop
      </Typography>
      <Typography variant="body2" color="textSecondary" align="center">
        {"Built with "}
        <a color="inherit" href="https://material-ui.com/">
          Material-UI
        </a>
        <span> + </span>
        <a color="inherit" href="https://gatsbyjs.org/">
          Gatsby
        </a>
        {" by "}
        <a color="inherit">
          ebasbas
        </a>
      </Typography> */}
    </footer>
  );
}
