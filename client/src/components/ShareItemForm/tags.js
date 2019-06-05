import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";

import { Query } from "react-apollo";
import { ALL_TAGS_QUERY } from "../../apollo/queries";

const styles = theme => ({
  root: {
    display: "flex",
    flexWrap: "wrap"
  },
  formControl: {
    margin: theme.spacing.unit
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

class ItemsContainer extends React.Component {
  render() {
    return (
      <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data }) => {
          //if (loading) return <FullScreenLoader inverted />;
          if (loading) return <p>Loading...</p>;
          if (error) return <p>{`Error! ${error.message}`}</p>;
          return (
            <MultipleSelect
              classes={this.props.classes}
              tags={data}
              width_large={this.props.width_large}
              update_tags={this.props.update_tags}
            />
          );
        }}
      </Query>
    );
  }
}

class MultipleSelect extends React.Component {
  state = {
    tags: []
  };

  handleChange = event => {
    console.log(event.target.value);
    this.setState({ tags: event.target.value });
    let { update_tags } = this.props;
    update_tags(event.target.value);
  };

  render() {
    const { classes, tags, width_large, update_tags } = this.props;
    return (
      <div className={classes.root}>
        <FormControl className={classes.formControl} className={width_large}>
          <InputLabel htmlFor="select-multiple-checkbox">Tag</InputLabel>

          <Select
            multiple
            value={this.state.tags}
            onChange={this.handleChange}
            input={<Input id="select-multiple-checkbox" />}
            renderValue={selected => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {tags.tags.map(tag => (
              <MenuItem key={tag.id} value={tag.title}>
                <Checkbox checked={this.state.tags.indexOf(tag.title) > -1} />
                <ListItemText primary={tag.title} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

MultipleSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ItemsContainer);
