import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
    typography: {
        h2: {
            fontWeight: '380',
            fontSize: '4em'
        },
        h4: {
            fontFamily: 'raleway',
            fontSize: '2em',
            textTransform: 'uppercase'
        },
        subtitle1: {
            fontFamily: 'raleway',
            fontSize: '.8em',
            textTransform: 'uppercase'
        }
    },
    props: {
        MuiTypography: {
            variantMapping: {
                h1: 'h2',
                h2: 'h2',
                h3: 'h2',
                h4: 'h2',
                h5: 'h2',
                h6: 'h2',
                subtitle1: 'h2',
                subtitle2: 'h2',
                body1: 'span',
                body2: 'span',
            },
        },
    },
});