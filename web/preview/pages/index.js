import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { EvaGithub, EvaTwitter } from '@forefront-ux/react-eva-icons';
import compose from '../utils/compose';
import Head from '../components/Head';
import Icons from '../components/Icons';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    flex: '0 1 auto',
  },
  appBar: {
    boxShadow: 'none',
    '@media print': {
      position: 'absolute',
    },
  },
  appBarPlaceHolder: {
    opacity: 0
  },
  main: {
    marginTop: theme.spacing(10),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    '@media (min-width: 600px)': {
      paddingLeft: theme.spacing(3),
      paddingRight: theme.spacing(3),
    },
  },
  footer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3F51B5',
    color: '#FFF',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
});

const App = props => {
  const { classes } = props;
  const appBarClassName = `${classes.appBar} ${classes.appBarHome}`;
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Head />
      <AppBar className={appBarClassName}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            React Eva Icons
          </Typography>
          <div className={classes.grow} />
          <Tooltip title="Twitter" enterDelay={300}>
            <IconButton
              component="a"
              color="inherit"
              href="https://twitter.com/ForefrontU"
              aria-label="Twitter"
              data-ga-event-category="AppBar"
              data-ga-event-action="Twitter"
            >
              <EvaTwitter color="#fff" />
            </IconButton>
          </Tooltip>
          <Tooltip title="GitHub" enterDelay={300}>
            <IconButton
              edge="end"
              component="a"
              color="inherit"
              href="https://github.com/forefront-ux/react-eva-icons"
              aria-label="GitHub"
              data-ga-event-category="AppBar"
              data-ga-event-action="GitHub"
            >
              <EvaGithub color="#fff" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <AppBar className={classes.appBarPlaceHolder}>Place Holder</AppBar>
        <Icons />
      </main>
      <footer className={classes.footer}>
        &copy; CopyRight 2019 Forefront-UX
      </footer>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(App);

