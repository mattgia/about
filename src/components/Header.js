import React from 'react';
import { name, title, experience } from '../consts';
import { Typography } from '@material-ui/core';

function Header() {
    return (
        <div style={{ textAlign: 'left' }}>
            <Typography variant="h1">
                {name}
            </Typography>
            <Typography variant="h3">
                {title}
            </Typography>
            <Typography variant="h3">
                {experience}
            </Typography>
        </div>
    );
}

export default Header;