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
import Grid from '@material-ui/core/Grid';

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

    setTheme = (theme) => {
        this.props.setTheme(theme);
    }

    closeSidebar = () => {
        this.props.closeSidebar();
    }

    render() {
        const { classes, open, config } = this.props;

		console.log('classes:', classes);
        const themes = [
            {
                name: 'CRA',
                primaryColor: '#61dafb',
                secondaryColor: '#282c34'
            },
            {
                name: 'Firefox',
                primaryColor: '#ff9400',
                secondaryColor: '#000f40'
            },
            {
                name: 'Dark',
                primaryColor: '#737373',
                secondaryColor: '#0c0c0d'
            },
            {
                name: 'Default',
                primaryColor: '#0c0c0d',
                secondaryColor: '#ededf0'
            },
        ]
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
                            <FormControlLabel value="en" control={<Radio style={{color: config.theme.primaryColor}}/>} classes={{root: classes.radioRoot, label: classes.radioLabel}} label="English" />
                            <FormControlLabel value="fr" control={<Radio style={{color: config.theme.primaryColor}}/>} classes={{root: classes.radioRoot, label: classes.radioLabel}} label="français" />
                        </RadioGroup>
                    </FormControl>
                    <Divider />
                    <Typography
                        variant="caption"
                        component="h3"
                        align="left"
                        gutterBottom
                    >
                        {i18next.t('theme')}
                    </Typography>
                    <Grid
                        container
                        justify="space-around"
                        direction="row"
                        alignItems="flex-start"
                    >
                        { themes.map((theme, index) => (
                            <Grid key={index} item className={'theme-svg-container' + (config.themeName === theme.name ? ' selected' : '')}>
                                <svg height="100" width="125" onClick={(e) => this.setTheme(theme)}>
                                    <polygon points="0,0 0,100 125,100" style={{fill: theme.secondaryColor,}} />
                                    <polygon points="0,0 125,0 125,100" style={{fill: theme.primaryColor, stroke: '#000', strokeWidth: 1}} />
                                </svg>
                            </Grid>
                        ))}
                    </Grid>
                    {/* <Divider />
                    <Typography
                        variant="caption"
                        component="h3"
                        align="left"
                        gutterBottom
                    >
                        {i18next.t('values')}
                    </Typography> */}
                </div>
            </Drawer>
        )
    }

}


Sidebar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Sidebar);