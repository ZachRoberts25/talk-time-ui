import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import Menu from "@material-ui/core/Menu"
import MenuItem from "@material-ui/core/MenuItem"
import MenuIcon from "@material-ui/icons/Menu"
import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../context/AuthContext"

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}))

export default function Header() {
  const classes = useStyles()
  const { user } = useContext(AuthContext)
  console.log(user)

  const [anchorEl, setAnchorEl] = useState(null)
  const openMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const closeMenu = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={openMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}><Link to={`/creator/${user?.id}`}>Profile</Link></MenuItem>
        <MenuItem onClick={closeMenu}>My account</MenuItem>
        <MenuItem onClick={closeMenu}>Logout</MenuItem>
      </Menu>
          <Typography variant="h6" className={classes.title}>
            &nbsp;Talk Together
          </Typography>
          {!user && (
            <Button color="inherit">
              <Link to="/login">Log In</Link>
            </Button>
          )}
          {user && <Button color="inherit">Log Out</Button>}
        </Toolbar>
      </AppBar>
    </div>
  )
}
