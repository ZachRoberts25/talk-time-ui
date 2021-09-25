// import firebase from "firebase"
// import "firebase/auth"
// import { firebaseConfig } from "./config"
import { useState, useEffect } from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { Container, CssBaseline, Toolbar } from "@material-ui/core"
import {
  makeStyles,
  createTheme,
  ThemeProvider,
} from "@material-ui/core/styles"
import Header from "./components/Header"
// import Footer from "./components/Footer"
// import Login from "./screens/Login"
// import Home from "./screens/Home"
import "./App.css"
import { pink } from "@material-ui/core/colors"
import CreatorsList from "./pages/CreatorsList"
import ApproveContent from "./pages/ApproveContent"
import Signup from "./pages/Signup"
import Login from "./pages/Login"

const theme = createTheme({
  palette: {
    primary: {
      main: pink[500],
    },
  },
})

const useStyles = makeStyles((theme) => ({
  main: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(1),
    minHeight: "90vh",
  },
  container: {
    minHeight: "70vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}))

export default function App() {

  const classes = useStyles()

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <Router>
          <CssBaseline />
          <div className="App">
            <Header />
            <Container
              maxWidth="lg"
              style={{ minHeight: "70vh", paddingTop: "20px" }}
            >
              <Switch>
                <Route exact path="/login">
                  <Login />
                </Route>
                <Route exact path="/signup">
                  <Signup />
                </Route>
                <Route exact path="/approve-content">
                  <ApproveContent />
                </Route>
                <Route exact path="/creator/:creatorId">
                  <ApproveContent />
                </Route>
                <Route exact path="/">
                  <CreatorsList />
                </Route>
              </Switch>
            </Container>
          </div>
        </Router>
      </div>
    </ThemeProvider>
  )
}
