import React from 'react';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import './App.css';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: { main: '#90caf9' },
    secondary: { main: '#f48fb1' },
    background: { default: '#0a1929', paper: '#132f4c' },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h3: { fontWeight: 700, letterSpacing: '-0.02em' },
    h5: { fontWeight: 600 },
    subtitle1: { fontWeight: 500, letterSpacing: '0.02em' },
    body2: { color: '#90caf9' },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@import': [
          'url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap")',
        ],
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #0a1929 0%, #1a1a2e 50%, #0a1929 100%)',
    padding: theme.spacing(8, 0),
  },
  header: {
    textAlign: 'center',
    marginBottom: theme.spacing(8),
  },
  name: {
    fontSize: '3rem',
    fontWeight: 700,
    background: 'linear-gradient(135deg, #90caf9, #f48fb1)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: theme.spacing(1),
  },
  subtitle: {
    color: theme.palette.text.secondary,
    fontSize: '1.1rem',
    maxWidth: 500,
    margin: '0 auto',
  },
  timeline: {
    position: 'relative',
    maxWidth: 800,
    margin: '0 auto',
    '&::before': {
      content: '""',
      position: 'absolute',
      left: 28,
      top: 0,
      bottom: 0,
      width: 2,
      background: 'linear-gradient(to bottom, #90caf9, #f48fb1, #90caf9)',
    },
  },
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: theme.spacing(4),
    paddingLeft: 72,
  },
  dot: {
    position: 'absolute',
    left: 18,
    top: 4,
    width: 22,
    height: 22,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #90caf9, #f48fb1)',
    border: '3px solid #0a1929',
    zIndex: 1,
  },
  cardContent: {
    background: 'rgba(19, 47, 76, 0.6)',
    backdropFilter: 'blur(10px)',
    borderRadius: 12,
    padding: theme.spacing(3),
    border: '1px solid rgba(144, 202, 249, 0.1)',
    flex: 1,
    transition: 'all 0.3s ease',
    '&:hover': {
      borderColor: 'rgba(144, 202, 249, 0.3)',
      transform: 'translateX(4px)',
      background: 'rgba(19, 47, 76, 0.8)',
    },
  },
  companyRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
  },
  avatar: {
    width: 40,
    height: 40,
    fontSize: '1rem',
    fontWeight: 700,
    marginRight: theme.spacing(1.5),
    background: 'linear-gradient(135deg, #90caf9, #42a5f5)',
  },
  title: {
    fontWeight: 600,
    fontSize: '1.15rem',
  },
  company: {
    color: theme.palette.text.secondary,
    fontWeight: 500,
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1.5),
  },
  date: {
    ...theme.typography.body2,
    fontSize: '0.85rem',
  },
  separator: {
    color: 'rgba(144, 202, 249, 0.3)',
    fontSize: '0.85rem',
  },
  location: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: '0.85rem',
  },
  skills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.75),
    marginTop: theme.spacing(1.5),
  },
  chip: {
    fontSize: '0.75rem',
    height: 26,
    background: 'rgba(144, 202, 249, 0.1)',
    border: '1px solid rgba(144, 202, 249, 0.15)',
    color: '#90caf9',
  },
}));

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(date) {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

function calcDuration(start, end) {
  let months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const yrs = Math.floor(months / 12);
  const mos = months % 12;
  const parts = [];
  if (yrs > 0) parts.push(`${yrs} yr${yrs !== 1 ? 's' : ''}`);
  if (mos > 0) parts.push(`${mos} mo${mos !== 1 ? 's' : ''}`);
  return parts.join(' ') || '0 mos';
}

function buildExperience({ company, title, startDate, endDate, location, subtitle, subtitleNote, skills }) {
  const end = endDate || new Date();
  return {
    company,
    title,
    date: `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : 'Present'}`,
    duration: calcDuration(startDate, end),
    location,
    subtitle,
    subtitleNote,
    skills: skills || [],
  };
}

const experiences = [
  buildExperience({
    company: 'Indeed.com',
    title: 'Senior Software Engineer',
    startDate: new Date(2022, 9),
    endDate: null,
    location: 'San Francisco, California, United States',
    skills: ['Enhance with AI'],
  }),
  buildExperience({
    company: 'Lightspeed Commerce',
    title: 'Senior Software Developer',
    startDate: new Date(2021, 10),
    endDate: new Date(2022, 6),
    location: 'Toronto, Ontario, Canada',
    skills: ['PostgreSQL', 'Google Cloud Platform (GCP)'],
  }),
  buildExperience({
    company: 'RBCx',
    title: 'Software Developer',
    startDate: new Date(2019, 10),
    endDate: new Date(2021, 10),
    location: 'Greater Toronto Area, Canada',
    subtitle: 'Contract',
    subtitleNote: 'Formerly called RBC Ventures',
    skills: ['PostgreSQL', 'React.js'],
  }),
  buildExperience({
    company: 'Paytm Labs',
    title: 'Software Engineer',
    startDate: new Date(2018, 5),
    endDate: new Date(2019, 10),
    location: 'Toronto, Ontario, Canada',
    skills: ['Kotlin', 'MySQL'],
  }),
  buildExperience({
    company: 'Traction on Demand',
    title: 'Software Developer',
    startDate: new Date(2017, 2),
    endDate: new Date(2018, 5),
    location: 'Toronto, Ontario, Canada',
    skills: [],
  }),
  buildExperience({
    company: 'Completely Managed',
    title: 'Software Developer',
    startDate: new Date(2015, 6),
    endDate: new Date(2017, 2),
    location: 'Newmarket, Ontario, Canada',
    skills: [],
  }),
];

function ExperienceCard({ exp }) {
  const classes = useStyles();
  const initials = exp.company
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2);

  return (
    <div className={classes.card}>
      <div className={classes.dot} />
      <div className={classes.cardContent}>
        <div className={classes.companyRow}>
          <Avatar className={classes.avatar}>{initials}</Avatar>
          <div>
            <Typography className={classes.title}>{exp.title}</Typography>
            <Typography className={classes.company}>
              {exp.company}
              {exp.subtitle && <> · <Box component="span" fontStyle="italic">{exp.subtitle}</Box></>}
            </Typography>
          </div>
        </div>

        <div className={classes.meta}>
          <span className={classes.date}>{exp.date}</span>
          <span className={classes.separator}>·</span>
          <span className={classes.date}>{exp.duration}</span>
          <span className={classes.separator}>·</span>
          <span className={classes.location}>{exp.location}</span>
        </div>

        {exp.subtitleNote && (
          <Typography variant="caption" style={{ color: 'rgba(255,255,255,0.4)', display: 'block', marginBottom: 8 }}>
            {exp.subtitleNote}
          </Typography>
        )}

        {exp.skills.length > 0 && (
          <div className={classes.skills}>
            {exp.skills.map((skill) => (
              <Chip key={skill} label={skill} className={classes.chip} size="small" />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  const classes = useStyles();

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <Container maxWidth="md">
          <div className={classes.header}>
            <Typography className={classes.name}>Matthew Giaconelli</Typography>
            <Typography className={classes.subtitle}>
              Senior Software Engineer with {calcDuration(new Date(2015, 6), new Date()).replace(/(\d+) yr.*/, '$1')} years of experience building impactful products across fintech, e-commerce, and enterprise platforms.
            </Typography>
          </div>

          <div className={classes.timeline}>
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} />
            ))}
          </div>
        </Container>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
