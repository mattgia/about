import React from 'react';
import { name, title, experience } from '../consts';
import { Typography, Grid, Switch, FormControlLabel, Slide } from '@material-ui/core';
import DirectionSnackbar from './Snackbar';

function Header() {
    const [state, setState] = React.useState({
        darkModeEnabled: false,
    });

    const handleChange = name => event => {
        setState({ ...state, [name]: event.target.checked })
        setTimeout(() => setState({ ...state, [name]: false }), 2000)
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={8} style={{ textAlign: 'left' }}>
                    <Typography variant="h2">
                        {name}
                    </Typography>
                    <Typography variant="h4">
                        {title}
                    </Typography>
                    <Typography variant="h4">
                        {experience}
                    </Typography>
                </Grid>
                <Grid xs={4} item style={{ textAlign: 'right' }}>
                    <FormControlLabel
                        control={
                            <Switch checked={state.darkModeEnabled} onChange={handleChange('darkModeEnabled')} value='darkModeEnabled' />
                        }
                        label="Dark mode"
                    />
                    <DirectionSnackbar open={state.darkModeEnabled} message="Long live light mode!"></DirectionSnackbar>
                </Grid>
            </Grid>
        </div>
    );
}

export default Header;