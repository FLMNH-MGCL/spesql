import React, { Component } from "react";
import { Menu, Button, Icon, Accordion } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class HeaderBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: "about",
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  renderFullMenu = () => {
    return (
      <div>
        <Menu stackable borderless style={{ margin: "1rem" }}>
          <Menu.Item
            as={Link}
            name="home"
            disabled={this.props.current_view === "login"}
            onClick={this.handleItemClick}
            to="/home"
          />
          <Menu.Item
            as={Link}
            name="about"
            active
            onClick={this.handleItemClick}
            to="/about"
          />
        </Menu>
      </div>
    );
  };

  render() {
    return <div>{this.renderFullMenu()}</div>;
  }
}
