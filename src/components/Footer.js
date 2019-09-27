import React from 'react';
import Icon from '@material-ui/core/Icon';
import { Container, Typography } from '@material-ui/core';
import { email, linkedin, resumeUrl } from '../consts'

const links = [
    {
        icon: 'email',
        label: 'Email',
        link: email,
    },
    {
        icon: 'star',
        label: 'Linkedin',
        link: linkedin,
    },
    {
        icon: 'star',
        label: 'Resume',
        link: resumeUrl,
    }
]

function Footer() {
    return (
        <div>
            <Container maxWidth="md" style={{ position: 'fixed', bottom: 0, textAlign: 'right' }}>
                { links.map( elem => FooterIcon(elem) ) }
            </Container>
        </div>
    );
}

function FooterIcon(props) {
    return (
    <div style={{display: 'inline-block', padding: '5px', textAlign: "center"}}>
        <a href={props.link} >
        <div><Icon>{ props.icon }</Icon></div>
        <Typography variant='subtitle1'>{ props.label }</Typography>
        </a>
    </div>
    )
}

export default Footer;