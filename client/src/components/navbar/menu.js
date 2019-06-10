import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Mutation } from "react-apollo";
import { LOGOUT_MUTATION } from "../../apollo/queries";
import client from "../../apollo";
import { Link } from "react-router-dom";

const options = ["Your Profile", "Sign Out"];

const ITEM_HEIGHT = 48;

class LongMenu extends React.Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleProfile = () => {
    return window.location.pathname === "/profile";
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Mutation
        mutation={LOGOUT_MUTATION}
        onCompleted={() => client.resetStore()}
      >
        {(logout, { data }) => (
          <div>
            <IconButton
              aria-label="More"
              aria-owns={open ? "long-menu" : undefined}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200
                }
              }}
            >
              {options.map(option => (
                <Link to="/profile">
                  <MenuItem
                    key={option}
                    selected={option === "Pyxis"}
                    onClick={() => {
                      if (option == "Sign Out") {
                        this.handleClose();
                        return logout();
                      } else {
                        this.handleClose();
                        return this.handleProfile();
                      }
                    }}
                  >
                    {option}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </div>
        )}
      </Mutation>
    );
  }
}

export default LongMenu;
