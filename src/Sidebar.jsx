import React from 'react';

import i18next from 'i18next';

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

    closeSidebar = () => {
        this.props.closeSidebar();
    }

    render() {
        const { classes, open, config } = this.props;
        return (
            <Drawer open={open} id="sidebar-container" onClose={this.closeSidebar}>
                <div id="content">
                    <Typography
                        variant="overline"
                        component="h2"
                        align="center"
                        gutterBottom
                    >
                        {i18next.t('settings.label')}
                    </Typography>
                    <Divider />
                    <Typography
                        variant="caption"
                        component="h3"
                        align="left"
                        gutterBottom
                    >
                        {i18next.t('language.label')}
                    </Typography>
                    <FormControl component="fieldset" style={{width: '100%'}}>
                        <RadioGroup
                            aria-label="Language"
                            name="lang"
                            defaultValue={config.lang}
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