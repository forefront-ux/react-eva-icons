import PropTypes from 'prop-types';
import * as EvaIcons from '@forefront-ux/react-eva-icons';
import { withStyles } from '@material-ui/core/styles';
import compose from '../../utils/compose';

const styles = theme => ({
    icons: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    icon: {
        marginBottom: theme.spacing(1),
        paddingRight: theme.spacing(1),
        width: '186px',
        height: '186px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

const Icons = props => {
    const { classes } = props;
    const size = 48;
    const color = '#3F51B5';
    return (
        <div className={classes.icons}>
            {Object.keys(EvaIcons).map(key => {
                const CustomTag = EvaIcons[key];
                return (
                    <div key={key} className={classes.icon}>
                        <CustomTag size={size} color={color} animation="pulse" />
                        <p>{CustomTag.displayName.replace('Eva', '')}</p>
                    </div>
                );
            })}
        </div>
    );
};

Icons.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(withStyles(styles))(Icons);
