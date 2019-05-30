import React, { Component } from 'react';
import { Form, Field } from 'react-final-form';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Tags from './tags';
import { CardActions } from '@material-ui/core';
import Share_Preview from '../ShareItemPreview/ShareItemPreview';
import { empty } from 'apollo-link';
import styles from './styles';



const onSubmit = async values => {
  window.alert(JSON.stringify(values, 0, 2))
}

const required = value => (value ? undefined : 'Required')

class ShareForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description:'',
      tags:'',
      formCompleted : false,
      image_button: false,
    };
  }


  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  update_tags (new_tags) {
    const string_tags = new_tags.join(', ') + '.';
    string_tags == '.'? 
      this.setState({tags: ''}) :
      this.setState({tags:string_tags})
  }

  update_image (img) {
    this.setState({image_button: !img})
  }

  evaluate_button () {
    
  return (this.state.name == '' || 
          this.state.description == '' || 
          this.state.tags ==''); 
          
  }
  

  render() {
    const { classes } = this.props;
    
    return (
      <div className={classes.container}>
        <div className={classes.leftContainer}>
          < Share_Preview title={this.state.name}
                 description={this.state.description}
                 tags={this.state.tags}/>
        </div>
        <div className={classes.rightContainer}>
          <Form 
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
              <form onSubmit={handleSubmit}>
                {/* <Field name="NameYourItem" validate={required}>
                  {({ input, meta }) => (
                    <div>
                      <input {...input} type="text" placeholder="Name Your Item" />
                      {meta.error && meta.touched && <span>{meta.error}</span>}
                    </div>
                  )}
                </Field> */}
                <h1 className={classes.title}>Share. Borrow.<br></br> Prosper.</h1>
                {!this.state.image_button? 
                  <Button variant="contained" size='large' color="primary" 
                    className={classes.button_large} onClick={()=>this.update_image(this.state.image_button)}
                  >
                  SELECT AN IMAGE
                  </Button>
                  :
                  <Button variant="contained" size='large' component='span'
                    className={classes.button_large_off} onClick={()=>this.update_image(this.state.image_button)}
                  >
                  RESET IMAGE
                  </Button>
                }
                <br></br>
                <TextField
                  id="name"
                  label="Name Your Item"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
                />
                <br></br>
                <TextField
                  id="multiline-static"
                  // label="Describe Your Item"
                  placeholder = "Describe Your Item"
                  multiline
                  rows="4"
                  defaultValue=""
                  className={classes.textField}
                  onChange={this.handleChange('description')}
                  margin="normal"

                />
                
                <Tags width_large={classes.field_large}
                      update_tags={this.update_tags.bind(this)}/>
                <br></br>
                {!this.evaluate_button()&& <Button variant="contained" color="primary"  
                className={classes.button_small}
                >
                SHARE
                </Button>}

                {this.evaluate_button()&& <Button variant="contained" color="primary" disabled 
                className={classes.button_small}
                >
                SHARE
                </Button>}
              
              </form>
            )}
          />
        </div>
        
      </div>
    );
  }
}

export default withStyles(styles)(ShareForm);



