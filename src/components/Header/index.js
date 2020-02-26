import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import AddFlight from '../AddFlight';

const useStyles = makeStyles(theme => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const Header = props => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleAddFlight = event => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    props.fetchFlights();
  }

  const menuId = 'primary-search-account-menu';

  return (
    <div className={classes.grow}>
      {open && <AddFlight open={open} handleClose={handleClose} key="detail"/>}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            InFlight Dublin
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
          <p>Add Flight</p>           
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleAddFlight}
              color="inherit"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
export default Header;