import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import './Sidebar.css';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

const radioGroupStyle = {
	flexDirection: 'row',
    justifyContent: 'space-around'
}

const styles = theme => ({
    radioLabel: {
        fontSize: '0.8em',
    }
});



class Sidebar extends React.Component {

    setLanguage = (lang) => {
        this.props.setLanguage(lang);
    }

    render() {
        const { classes } = this.props;
        return (
            <Drawer open={true} id="sidebar-container">
                <div id="content">
                    <Typography
                        variant="overline"
                        component="h2"
                        align="center"
                        gutterBottom
                    >
                        Parameters
                    </Typography>
                    <Divider />
                    <Typography
                        variant="caption"
                        component="h3"
                        align="left"
                        gutterBottom
                    >
                        Language
                    </Typography>
                    <FormControl component="fieldset" style={{width: '100%'}}>
                        <RadioGroup
                            aria-label="Language"
                            name="lang"
                            style={radioGroupStyle}
                            onChange={(e) => {
                                this.setLanguage(e.target.value)
                            }}
                        >
                            <FormControlLabel value="en" control={<Radio style={{color: '#61dafb'}}/>} classes={{root: classes.radioRoot, label: classes.radioLabel}} label="English" />
                            <FormControlLabel value="fr" control={<Radio style={{color: '#61dafb'}}/>} classes={{root: classes.radioRoot, label: classes.radioLabel}} label="français" />
                        </RadioGroup>
                    </FormControl>
                    <Divider />
                </div>
            </Drawer>
        )
    }

}


Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);