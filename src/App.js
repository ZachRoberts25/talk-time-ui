import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Container, CssBaseline, Toolbar } from '@material-ui/core';
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
import Header from './components/Header';
import Footer from "./components/Footer"
// import Login from "./screens/Login"
// import Home from "./screens/Home"
import './App.css';
import { pink } from '@material-ui/core/colors';
import CreatorsList from './pages/CreatorsList';
import ApproveContent from './pages/ApproveContent';
import Login from './pages/Login';
import { AuthContextProvider } from './context/AuthContext';
import Creator from './pages/Creator';
import { getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from './config';
import { CreateContent } from './pages/CreateContent';

if (!getApps().length) {
  initializeApp(firebaseConfig);
}

const theme = createTheme({
  palette: {
    primary: {
      main: pink[600],
    },
  },
});

const useStyles = makeStyles((theme) => ({
  main: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    minHeight: '90vh',
  },
  container: {
    minHeight: '70vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

export default function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <div className={classes.root}>
          <Router>
            <CssBaseline />
            <div className='App'>
              <Header />
              <Container
                maxWidth='lg'
                style={{ minHeight: '80vh', paddingTop: '20px' }}
              >
                <Switch>
                  <Route exact path='/login'>
                    <Login />
                  </Route>
                  <Route exact path='/approve-content'>
                    <ApproveContent />
                  </Route>
                  <Route exact path='/creator/:creatorId'>
                    <Creator />
                  </Route>
                  <Route exact path='/create-content'>
                    <CreateContent />
                  </Route>
                  <Route exact path='/'>
                    <CreatorsList />
                  </Route>
                </Switch>
              </Container>
              <Footer />
            </div>
          </Router>
        </div>
      </AuthContextProvider>
    </ThemeProvider>
  );
}
