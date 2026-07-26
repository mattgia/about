import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
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
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@import': [
          'url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap")',
        ],
      },
    },
  },
});

const COLORS = ['#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff6b6b', '#c56cf0', '#ff9ff3', '#54a0ff'];

function useScrollReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function useTypewriter(text, speed = 50, startDelay = 600) {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setDisplay(text.slice(0, i));
        if (i >= text.length) clearInterval(interval);
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);
  return display;
}

function useTilt() {
  const ref = useRef(null);
  const [style, setStyle] = useState({});
  const handleMove = useCallback((e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setStyle({
      transform: `perspective(800px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale3d(1.02,1.02,1.02)`,
      transition: 'transform 0.08s ease-out',
    });
  }, []);
  const handleLeave = useCallback(() => {
    setStyle({
      transform: 'perspective(800px) rotateY(0deg) rotateX(0deg) scale3d(1,1,1)',
      transition: 'transform 0.5s ease-out',
    });
  }, []);
  return [ref, style, handleMove, handleLeave];
}

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    position: 'relative',
    overflow: 'hidden',
    padding: theme.spacing(8, 0),
    background: '#0a1929',
  },
  bgCanvas: {
    position: 'fixed',
    inset: 0,
    zIndex: 0,
    background: 'linear-gradient(135deg, #0a1929, #1a1a2e, #16213e, #0a1929)',
    backgroundSize: '400% 400%',
    animation: '$gradientShift 15s ease infinite',
  },
  particle: {
    position: 'fixed',
    borderRadius: '50%',
    pointerEvents: 'none',
    zIndex: 0,
    opacity: 0,
  },
  hero: {
    textAlign: 'center',
    marginBottom: theme.spacing(10),
    position: 'relative',
    zIndex: 1,
  },
  heroAvatar: {
    width: 140,
    height: 140,
    fontSize: '3.2rem',
    fontWeight: 800,
    margin: '0 auto 24px',
    background: 'linear-gradient(135deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c56cf0)',
    backgroundSize: '300% 300%',
    animation: '$gradientShift 4s ease infinite, $glowPulse 2s ease-in-out infinite alternate',
    boxShadow: '0 0 60px rgba(255,107,107,0.3)',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
    '&:hover': {
      transform: 'scale(1.08) rotate(8deg)',
    },
  },
  name: {
    fontSize: '3.5rem',
    fontWeight: 900,
    letterSpacing: '-0.03em',
    background: 'linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c56cf0, #ff6b6b)',
    backgroundSize: '300% 100%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: theme.spacing(1.5),
    animation: '$gradientShift 4s linear infinite',
    filter: 'drop-shadow(0 0 30px rgba(255,107,107,0.2))',
  },
  subtitle: {
    fontSize: '1.15rem',
    maxWidth: 600,
    margin: '0 auto',
    lineHeight: 1.7,
    minHeight: '2.4em',
    '& span': {
      color: 'rgba(255,255,255,0.5)',
    },
    '& .cursor': {
      display: 'inline-block',
      width: 2,
      height: '1.1em',
      background: '#ff6b6b',
      marginLeft: 2,
      animation: '$blink 0.8s step-end infinite',
      verticalAlign: 'text-bottom',
    },
  },
  socialRow: {
    marginTop: theme.spacing(3),
    display: 'flex',
    justifyContent: 'center',
    gap: theme.spacing(1.5),
    opacity: 0,
    animation: '$fadeSlideUp 0.8s ease 1.8s forwards',
  },
  socialIcon: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: '1.5rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: -4,
      borderRadius: '50%',
      background: 'conic-gradient(from var(--angle,0deg), #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c56cf0, #ff6b6b)',
      opacity: 0,
      transition: 'opacity 0.3s ease',
      zIndex: -1,
      animation: '$spin 2s linear infinite',
    },
    '&:hover': {
      color: '#fff',
      transform: 'translateY(-3px) scale(1.15)',
      '&::before': { opacity: 0.6 },
    },
  },
  sectionLabel: {
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: '0.4em',
    fontSize: '0.7rem',
    color: 'rgba(255,255,255,0.25)',
    marginBottom: theme.spacing(6),
    position: 'relative',
    zIndex: 1,
    '&::after': {
      content: '""',
      display: 'block',
      width: 60,
      height: 2,
      margin: '14px auto 0',
      background: 'linear-gradient(90deg, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c56cf0)',
      backgroundSize: '200% 100%',
      animation: '$gradientShift 3s linear infinite',
      borderRadius: 2,
    },
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
      width: 3,
      borderRadius: 2,
      background: 'linear-gradient(to bottom, #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c56cf0, #ff6b6b)',
      backgroundSize: '100% 300%',
      animation: '$gradientShift 6s linear infinite',
      boxShadow: '0 0 15px rgba(255,107,107,0.2)',
    },
  },
  card: {
    position: 'relative',
    display: 'flex',
    marginBottom: theme.spacing(5),
    paddingLeft: 72,
    transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.7s ease',
    transform: 'translateX(-30px)',
    opacity: 0,
    '&$cardVisible': {
      transform: 'translateX(0)',
      opacity: 1,
    },
  },
  cardVisible: {},
  dot: {
    position: 'absolute',
    left: 17,
    top: 6,
    width: 26,
    height: 26,
    borderRadius: '50%',
    zIndex: 1,
    background: '#0a1929',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 2,
      borderRadius: '50%',
      background: 'conic-gradient(from var(--angle,0deg), #ff6b6b, #ffd93d, #6bcb77, #4d96ff, #c56cf0, #ff6b6b)',
      animation: '$spin 3s linear infinite',
    },
    '&::after': {
      content: '""',
      position: 'absolute',
      inset: 5,
      borderRadius: '50%',
      background: '#0a1929',
    },
    boxShadow: '0 0 20px rgba(255,107,107,0.4)',
    animation: '$glowPulse 2s ease-in-out infinite',
  },
  cardInner: {
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(16px)',
    borderRadius: 16,
    padding: theme.spacing(3),
    border: '1px solid rgba(255,255,255,0.06)',
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      inset: 0,
      borderRadius: 16,
      padding: 1,
      background: 'conic-gradient(from var(--angle,0deg), rgba(255,107,107,0.3), rgba(255,217,61,0.3), rgba(107,203,119,0.3), rgba(77,150,255,0.3), rgba(197,108,240,0.3), rgba(255,107,107,0.3))',
      WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMaskComposite: 'xor',
      maskComposite: 'exclude',
      animation: '$spin 4s linear infinite',
      opacity: 0,
      transition: 'opacity 0.4s ease',
    },
    '&:hover::before': {
      opacity: 1,
    },
  },
  cardContent: {
    position: 'relative',
    zIndex: 1,
  },
  companyRow: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1.5),
  },
  cardAvatar: {
    width: 44,
    height: 44,
    fontSize: '0.9rem',
    fontWeight: 700,
    marginRight: theme.spacing(1.5),
    flexShrink: 0,
    background: (props) => {
      const c = COLORS[props.index % COLORS.length];
      return `linear-gradient(135deg, ${c}, ${c}88)`;
    },
    boxShadow: (props) => {
      const c = COLORS[props.index % COLORS.length];
      return `0 0 20px ${c}44`;
    },
  },
  title: {
    fontWeight: 700,
    fontSize: '1.15rem',
    lineHeight: 1.3,
  },
  company: {
    color: 'rgba(255,255,255,0.55)',
    fontWeight: 500,
    fontSize: '0.9rem',
  },
  meta: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1.5),
  },
  date: {
    color: (props) => COLORS[props.index % COLORS.length],
    fontSize: '0.82rem',
    fontWeight: 500,
  },
  separator: {
    color: 'rgba(255,255,255,0.15)',
    fontSize: '0.82rem',
  },
  location: {
    color: 'rgba(255,255,255,0.3)',
    fontSize: '0.82rem',
  },
  skills: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: theme.spacing(0.75),
    marginTop: theme.spacing(1.5),
  },
  chip: {
    fontSize: '0.72rem',
    height: 26,
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'rgba(255,255,255,0.6)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255,255,255,0.1)',
      borderColor: 'rgba(255,255,255,0.2)',
      transform: 'scale(1.05)',
    },
  },
  footer: {
    textAlign: 'center',
    marginTop: theme.spacing(8),
    padding: theme.spacing(4, 0),
    position: 'relative',
    zIndex: 1,
    opacity: 0,
    animation: '$fadeSlideUp 0.8s ease 2s forwards',
  },
  footerText: {
    color: 'rgba(255,255,255,0.15)',
    fontSize: '0.8rem',
  },
  '@keyframes gradientShift': {
    '0%': { backgroundPosition: '0% 50%' },
    '50%': { backgroundPosition: '100% 50%' },
    '100%': { backgroundPosition: '0% 50%' },
  },
  '@keyframes glowPulse': {
    '0%': { boxShadow: '0 0 20px rgba(255,107,107,0.2)' },
    '100%': { boxShadow: '0 0 50px rgba(197,108,240,0.4)' },
  },
  '@keyframes fadeSlideUp': {
    '0%': { opacity: 0, transform: 'translateY(16px)' },
    '100%': { opacity: 1, transform: 'translateY(0)' },
  },
  '@keyframes blink': {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0 },
  },
  '@keyframes float': {
    '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: 0 },
    '10%': { opacity: 0.4 },
    '90%': { opacity: 0.4 },
    '100%': { transform: 'translateY(-10vh) rotate(720deg)', opacity: 0 },
  },
  '@keyframes spin': {
    '0%': { '--angle': '0deg' },
    '100%': { '--angle': '360deg' },
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
    company, title,
    date: `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : 'Present'}`,
    duration: calcDuration(startDate, end),
    location, subtitle, subtitleNote,
    skills: skills || [],
  };
}

const experiences = [
  buildExperience({ company: 'Indeed.com', title: 'Senior Software Engineer', startDate: new Date(2022, 9), endDate: null, location: 'San Francisco, California, United States', skills: ['Enhance with AI'] }),
  buildExperience({ company: 'Lightspeed Commerce', title: 'Senior Software Developer', startDate: new Date(2021, 10), endDate: new Date(2022, 6), location: 'Toronto, Ontario, Canada', skills: ['PostgreSQL', 'Google Cloud Platform (GCP)'] }),
  buildExperience({ company: 'RBCx', title: 'Software Developer', startDate: new Date(2019, 10), endDate: new Date(2021, 10), location: 'Greater Toronto Area, Canada', subtitle: 'Contract', subtitleNote: 'Formerly called RBC Ventures', skills: ['PostgreSQL', 'React.js'] }),
  buildExperience({ company: 'Paytm Labs', title: 'Software Engineer', startDate: new Date(2018, 5), endDate: new Date(2019, 10), location: 'Toronto, Ontario, Canada', skills: ['Kotlin', 'MySQL'] }),
  buildExperience({ company: 'Traction on Demand', title: 'Software Developer', startDate: new Date(2017, 2), endDate: new Date(2018, 5), location: 'Toronto, Ontario, Canada', skills: [] }),
  buildExperience({ company: 'Completely Managed', title: 'Software Developer', startDate: new Date(2015, 6), endDate: new Date(2017, 2), location: 'Newmarket, Ontario, Canada', skills: [] }),
];

function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${4 + Math.random() * 8}px`,
      duration: `${15 + Math.random() * 25}s`,
      delay: `${Math.random() * 20}s`,
      bg: COLORS[i % COLORS.length],
    }));
  }, []);
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, overflow: 'hidden' }}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: p.left,
            bottom: '-10%',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.bg,
            boxShadow: `0 0 6px ${p.bg}`,
            animation: `particleFloat ${p.duration} linear ${p.delay} infinite`,
            opacity: 0,
          }}
        />
      ))}
    </div>
  );
}

function ExperienceCard({ exp, index: i }) {
  const classes = useStyles({ index: i });
  const [ref, visible] = useScrollReveal();
  const [cardRef, tiltStyle, handleMove, handleLeave] = useTilt();
  const initials = exp.company.split(' ').map((w) => w[0]).join('').slice(0, 2);

  return (
    <div
      ref={ref}
      className={`${classes.card} ${visible ? classes.cardVisible : ''}`}
      style={{ transitionDelay: `${i * 100}ms` }}
    >
      <div className={classes.dot} />
      <div
        ref={cardRef}
        className={classes.cardInner}
        style={tiltStyle}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
      >
        <div className={classes.cardContent}>
          <div className={classes.companyRow}>
            <Avatar className={classes.cardAvatar}>{initials}</Avatar>
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
            <Typography variant="caption" style={{ color: 'rgba(255,255,255,0.3)', display: 'block', marginBottom: 8 }}>
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
    </div>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.68-1.68-1.68a1.68 1.68 0 0 0-1.68 1.68c0 .93.75 1.68 1.68 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

const typedSubtitle =
  'Senior Software Engineer building impactful products across fintech, e-commerce, and enterprise.';

function App() {
  const typed = useTypewriter(typedSubtitle, 35, 800);
  const classes = useStyles({});
  const totalYears = calcDuration(new Date(2015, 6), new Date()).replace(/(\d+) yr.*/, '$1');

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <div className={classes.root}>
        <div className={classes.bgCanvas} />
        <Particles />

        <Container maxWidth="md">
          <div className={classes.hero}>
            <Avatar className={classes.heroAvatar}>MG</Avatar>
            <Typography className={classes.name}>
              Matthew Giaconelli
            </Typography>
            <Typography className={classes.subtitle}>
              <span>{typed}</span>
              {typed.length < typedSubtitle.length && <span className="cursor" />}
            </Typography>
            <div className={classes.socialRow}>
              <IconButton className={classes.socialIcon} href="https://linkedin.com/in/mgiaconelli" target="_blank" rel="noopener noreferrer" title="LinkedIn">
                <LinkedInIcon />
              </IconButton>
              <IconButton className={classes.socialIcon} href="https://github.com/mattgia" target="_blank" rel="noopener noreferrer" title="GitHub">
                <GitHubIcon />
              </IconButton>
            </div>
          </div>

          <Typography className={classes.sectionLabel}>
            Experience &mdash; {totalYears}+ years
          </Typography>

          <div className={classes.timeline}>
            {experiences.map((exp, i) => (
              <ExperienceCard key={i} exp={exp} index={i} />
            ))}
          </div>

          <div className={classes.footer}>
            <Typography className={classes.footerText}>
              © {new Date().getFullYear()} Matthew Giaconelli
            </Typography>
          </div>
        </Container>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
