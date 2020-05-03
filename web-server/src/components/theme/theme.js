import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
    },
    secondary: {
      main: '#1EB980',
    },
    // tertiary: {
    //   main: '#1EB980',
    // },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

export default theme;
