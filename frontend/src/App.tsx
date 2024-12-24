import React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline, AppBar, Toolbar, Button, Container, Box } from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import NavigationButton from './components/NavigationButton';
import ThisOrThat from './pages/ThisOrThat';
import ShinyNotes from './pages/ShinyNotes';
import Locato from './pages/Locato';
import PageTransition from './components/PageTransition';
import HeaderLogo from './components/HeaderLogo';
import Login from './pages/Login';
import Register from './pages/Register';
import { getCurrentUser } from './services/authService';
import UserMenu from './components/UserMenu';
import Profile from './pages/Profile';
import CreateBattle from './pages/CreateBattle';
import BattlePage from './pages/BattlePage';
import PlayBattle from './pages/PlayBattle';

// Koyu tema oluşturma
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#90caf9',
    },
    secondary: {
      main: '#f48fb1',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
});

// Butonlar için veri
const navigationButtons = [
  {
    to: '/thisorthat',
    defaultImage: '/images/thisorthatdefault.png',
    hoverImage: '/images/thisorthathover.png',
    alt: 'This or That',
  },
  {
    to: '/shinynotes',
    defaultImage: '/images/shinynotesdefault.png',
    hoverImage: '/images/shinynoteshover.png',
    alt: 'Shiny Notes',
  },
  {
    to: '/locato',
    defaultImage: '/images/locatodefault.png',
    hoverImage: '/images/locatohover.png',
    alt: 'Locato',
  }
];

function AppHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = getCurrentUser();
  const isThisOrThatPage = location.pathname === '/thisorthat';
  const isShinyNotesPage = location.pathname === '/shinynotes';
  const isLocatoPage = location.pathname === '/locato';

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          <HeaderLogo 
            src="/logo.png" 
            alt="BoredGap Logo" 
            to="/"
          />
          
          {isThisOrThatPage && (
            <>
              <HeaderLogo 
                src="/images/x.png" 
                alt="X" 
                isClickable={false}
                delay={0.1}
              />
              <HeaderLogo 
                src="/images/thisorthatlogo.png" 
                alt="This or That Logo" 
                to="/thisorthat"
                delay={0.2}
              />
            </>
          )}

          {isShinyNotesPage && (
            <>
              <HeaderLogo 
                src="/images/x.png" 
                alt="X" 
                isClickable={false}
                delay={0.1}
              />
              <HeaderLogo 
                src="/images/shinynoteslogo.png" 
                alt="Shiny Notes Logo" 
                to="/shinynotes"
                delay={0.2}
              />
            </>
          )}

          {isLocatoPage && (
            <>
              <HeaderLogo 
                src="/images/x.png" 
                alt="X" 
                isClickable={false}
                delay={0.1}
              />
              <HeaderLogo 
                src="/images/locatologo.png" 
                alt="Locato Logo" 
                to="/locato"
                delay={0.2}
              />
            </>
          )}
        </Box>
        
        <AnimatePresence mode="wait">
          {user ? (
            <UserMenu key="user-menu" user={user} />
          ) : (
            <motion.div
              key="auth-buttons"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.2 }}
              style={{ display: 'flex', gap: '1rem' }}
            >
              <Button 
                color="inherit" 
                variant="outlined" 
                onClick={() => navigate('/login')}
              >
                Giriş Yap
              </Button>
              <Button 
                color="primary" 
                variant="contained"
                onClick={() => navigate('/register')}
              >
                Kayıt Ol
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </Toolbar>
    </AppBar>
  );
}

function AppContent() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={
          <PageTransition>
            <Container maxWidth="lg" sx={{ mt: 8, flex: 1 }}>
              <div className="button-grid">
                {navigationButtons.map((button, index) => (
                  <NavigationButton
                    key={index}
                    to={button.to}
                    defaultImage={button.defaultImage}
                    hoverImage={button.hoverImage}
                    alt={button.alt}
                  />
                ))}
              </div>
            </Container>
          </PageTransition>
        } />
        <Route path="/thisorthat" element={<ThisOrThat />} />
        <Route path="/shinynotes" element={<ShinyNotes />} />
        <Route path="/locato" element={<Locato />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={
          <PageTransition>
            <Profile />
          </PageTransition>
        } />
        <Route path="/settings" element={
          <PageTransition>
            <div style={{ padding: '2rem' }}>
              <h1>Ayarlar</h1>
              <p>Bu sayfa yakında kullanıma açılacak.</p>
            </div>
          </PageTransition>
        } />
        <Route path="/thisorthat/create" element={
          <PageTransition>
            <CreateBattle />
          </PageTransition>
        } />
        <Route path="/thisorthat/:id" element={<BattlePage />} />
        <Route path="/thisorthat/:id/play" element={<PlayBattle />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <div className="App">
          <AppHeader />
          <AppContent />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
