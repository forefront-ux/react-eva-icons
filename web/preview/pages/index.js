import PropTypes from 'prop-types';
import CssBaseline from '@material-ui/core/CssBaseline';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Tooltip from '@material-ui/core/Tooltip';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { List, Code, Github, Twitter } from '@forefront-ux/react-eva-icons';
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
    backgroundColor: '#000',
    color: '#fff',
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
          <Tooltip title="Code Example" enterDelay={300}>
            <IconButton
              component="a"
              color="inherit"
              href="#code"
              aria-label="Code Example"
              data-ga-event-category="AppBar"
              data-ga-event-action="Code Example"
            >
              <Code hover={true} color="#fff" animation="pulse" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Icon List" enterDelay={300}>
            <IconButton
              component="a"
              color="inherit"
              href="#iconlist"
              aria-label="Icon List"
              data-ga-event-category="AppBar"
              data-ga-event-action="Icon List"
            >
              <List hover={true} color="#fff" animation="pulse" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Twitter" enterDelay={300}>
            <IconButton
              component="a"
              color="inherit"
              href="https://twitter.com/ForefrontU"
              aria-label="Twitter"
              data-ga-event-category="AppBar"
              data-ga-event-action="Twitter"
            >
              <Twitter hover={true} color="#fff" animation="pulse" />
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
              <Github hover={true} color="#fff" animation="pulse" />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <main className={classes.main}>
        <AppBar className={classes.appBarPlaceHolder}>Place Holder</AppBar>
        <div className={classes.hero}>
          <h1 className={classes.heroTitle}>React Eva Icons <span className={classes.version}>v3.0.0</span></h1>
          <p className={classes.heroDesc}>
            Make it easier to use Eva Icons in your React projects.
          </p>
          <div className={classes.tutorial} id="code">
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
                <p>Props</p>
                <pre className={classes.pre}>
                {`
  color: string,
  size: string,
  width: string,
  height: string,
  animation: string,
  hover: bool,
  infinite: bool
                `}
                </pre>
              </div>
              <div className={classes.code} style={{ width: '100%' }}>
                <p>Try it in codesandbox</p>
                <iframe
                  src="https://codesandbox.io/embed/github-3nvxo?fontsize=14"
                  title="github"
                  allow="geolocation; microphone; camera; midi; vr; accelerometer; gyroscope; payment; ambient-light-sensor; encrypted-media"
                  style={{ width: '100%', height: '620px', border: 0,  borderRadius: '4px', overflow: 'hidden' }}
                  sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin" />
              </div>
            </div>
          </div>
        </div>
        <Icons id="iconlist" />
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

