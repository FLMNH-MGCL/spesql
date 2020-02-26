import React, { Component } from "react";
import { Menu, Button, Icon, Accordion } from "semantic-ui-react";
import { Link } from "react-router-dom";

export default class HeaderBase extends Component {
  constructor(props) {
    super(props);

    let mobile = false;
    if (window.innerWidth < 1300) {
      mobile = true;
    }

    this.state = {
      activeItem: "about",
      mobileView: mobile
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
  };

  checkMobile = () => {
    // state isn't mobile view but change happened to make it
    if (!this.state.mobileView && window.innerWidth < 1300) {
      this.setState({ mobileView: true });
    }

    // state is mobile view but change happened to make it NOT mobile view anymore
    if (this.state.mobileView && window.innerWidth > 1300) {
      this.setState({ mobileView: false });
    }
  };

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  componentDidMount() {
    window.addEventListener("resize", this.checkMobile);
  }

  renderFullMenu = () => {
    return (
      <div>
        <Menu stackable borderless>
          <Menu.Item
            as={Link}
            name="home"
            active={"home" === this.props.current_view}
            disabled={this.props.current_view === "login"}
            onClick={this.handleItemClick}
            to="/Home"
          />
          <Menu.Item
            as={Link}
            name="about"
            active={"view" === this.props.current_view}
            onClick={this.handleItemClick}
            to="/About"
          />

          <Menu.Menu position="right">
            <Menu.Item>
              <Button icon labelPosition="left" disabled={true}>
                <Icon name="archive" />
                Query
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button icon labelPosition="left" disabled={true}>
                <Icon name="upload" />
                Insert
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button icon labelPosition="left" disabled={true}>
                <Icon name="download" />
                Download
              </Button>
            </Menu.Item>
            <Menu.Item>
              <Button icon disabled={true}>
                <Icon name="user" />
              </Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    );
  };

  renderMobileView = () => {
    const { activeIndex } = this.state;
    return (
      <Accordion as={Menu} vertical fluid>
        <Menu.Item>
          <Accordion.Title
            active={activeIndex === 0}
            content="Pages"
            index={0}
            onClick={this.handleClick}
          />
          <Accordion.Content
            active={activeIndex === 0}
            content={
              <div>
                <Menu.Item
                  as={Link}
                  name="home"
                  active={"home" === this.props.current_view}
                  onClick={this.handleItemClick}
                  to="/Home"
                />
                <Menu.Item
                  as={Link}
                  name="about"
                  active={"view" === this.props.current_view}
                  onClick={this.handleItemClick}
                  to="/About"
                />
              </div>
            }
          />
        </Menu.Item>
      </Accordion>
    );
  };

  render() {
    return (
      <div>
        {this.state.mobileView
          ? this.renderMobileView()
          : this.renderFullMenu()}
      </div>
    );
  }
}
