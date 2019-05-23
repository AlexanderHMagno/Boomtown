import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import LongMenu from './menu';
import AddIcon from '@material-ui/icons/Add';
import Avatar from './avatar';


const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  button: {
    margin: 10,
    
  }
};

const path_share = window.location.pathname === '/share';

function ButtonAppBar(props) {
  const { classes } = props;
 console.log(window.location.pathname)
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
          onClick={()=>window.location.pathname = 'items'}>
          <Avatar />
          </IconButton>
         
          <Typography variant="h6" color="inherit" className={classes.grow}>
            
          </Typography>
          {!path_share && 
          <Button color="inherit" onClick={()=>window.location.pathname = 'share'}>
          <Button variant="fab" mini color="secondary" aria-label="add" className={classes.button}>
          <AddIcon color="primary" />
          </Button>
               SHARE SOMETHING
          </Button>
        }
          <LongMenu />
        </Toolbar>
      </AppBar>
    </div>
  );
}

ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);