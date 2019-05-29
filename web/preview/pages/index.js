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
import '@forefront-ux/react-eva-icons/index.css';

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
  hero: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  heroTitle: {
    color: '#3F51B5',
    fontSize: '72px',
    marginTop: 0,
    marginBottom: 0,
  },
  version: {
    color: '#0FBA81',
    marginLeft: theme.spacing(3),
    fontSize: '20px',
    display: 'inline-block',
    backgroundColor: '#EDFFF3',
    padding: '4px 10px',
  },
  heroDesc: {
    color: '#555',
    fontSize: '20px',
    marginTop: 0,
    marginBottom: 0,
  },
  tutorial: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    fontSize: '18px'
  },
  tutorialBlock: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  code: {
    paddingTop: '10px',
    paddingBottom: '10px',
    marginRight: theme.spacing(3),
    fontSize: '18px',
    fontWeight: 'bold',
  },
  pre: {
    backgroundColor: '#ccc',
    fontSize: '14px',
    fontWeight: 'normal',
    padding: '10px',
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
              <EvaTwitter color="#fff" animation="pulse" />
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
              <EvaGithub color="#fff" animation="pulse" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <AppBar className={classes.appBarPlaceHolder}>Place Holder</AppBar>
        <div className={classes.hero}>
          <h1 className={classes.heroTitle}>React Eva Icons <span className={classes.version}>v2.0.5</span></h1>
          <p className={classes.heroDesc}>
            Make it easier to use Eva Icons in your React projects.
          </p>
          <div className={classes.tutorial}>
            <div>Tutorial</div>
            <div className={classes.tutorialBlock}>
              <div className={classes.code}>
                <p>Install</p>
                <pre className={classes.pre}>
                  {`
  npm install @forefront-ux/react-eva-icons

  or
  
  yarn add @forefront-ux/react-eva-icons
                  `}
                </pre>
              </div>
              <div className={classes.code}>
                <p>Import it into your React code</p>
                <pre className={classes.pre}>
                  {`
  ...
  
  import {
    EvaActivity,
    EvaActivityOutline,
  } from '@forefront-ux/react-eva-icons';
  import '@forefront-ux/react-eva-icons/index.css';
  
  ...

  const Icon = () => (
    <EvaActivity
      color="#3F51B5"
      size={48}
      animation="zoom"
    />
  )

  const Icon = () => (
    <EvaActivityOutline
      color="#3F51B5"
      size={48}
      animation="zoom"
    />
  )

  ...
                  `}
                </pre>
              </div>
              <div className={classes.code}>
                <p>Props</p>
                <pre className={classes.pre}>
                  {`
  color: PropTypes.string,
  size: PropTypes.number,
  animation: PropTypes.oneOf([
    'zoom',
    'pulse',
    'shake',
    'flip'
  ])
                  `}
                </pre>
              </div>
            </div>
          </div>
        </div>
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

