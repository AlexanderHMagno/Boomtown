import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';


const styles = {
  card: {
   // maxWidth: 345,
   marginLeft: '10%',
   marginTop: 20,
    
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  user_info_container :{
    display: 'flex',
    marginBottom: '50px'
  },
  user_info_right :{
    marginLeft: '10px',
  },
  user_span :{
    margin: '0px',
  }
};



const test1 = (id) =>{
 window.location.pathname = 'profile';
  console.log(id)
  window.item_id  = id;
}
export const test2 = 0



function SimpleMediaCard(props) {
  const { classes, title ,description , imageUrl , item_owner , item_id} = props;
  
  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image= {imageUrl}
          title= {description}
        />
        <CardContent>
          <div className={classes.user_info_container}>
            <div>
              <ImageAvatars />
            </div>
            <div className={classes.user_info_right}>
              <Typography gutterBottom fontSize={12} component="span" className={classes.user_span}>
                {item_owner}
              </Typography>
              <Typography gutterBottom fontSize={2} component="span" className={classes.user_span}>
                Hour TODO
              </Typography>
            </div>
          </div>
          <Typography gutterBottom variant="headline" component="h2">
            {title}
          </Typography>
          <Typography component="p">
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined" className={classes.button} onClick={()=>test1(item_id)} id={item_id}>
          BORROW
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

SimpleMediaCard.propTypes = {
  classes: PropTypes.object.isRequired,
};



function ImageAvatars(props) {
  const { classes } = props;
  return (
    <div>
      <Avatar alt="Logo" src='https://cdn.pixabay.com/photo/2016/04/15/18/05/computer-1331579_1280.png' />
    </div>
  );
}

ImageAvatars.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SimpleMediaCard);