import React, { Component } from "react";
import { Menu, Dropdown } from "semantic-ui-react";
import InsertMenu from "../InsertDocument/InsertMenu";
import DownloadDB from "../DownloadDB/DownloadDB";
import QueryMenu from "../Query/QueryMenu";
import Logout from "../Logout/Logout";

export default class Header extends Component {
  constructor(props) {
    super(props);

    let mobile = false;
    if (window.innerWidth < 1300) {
      mobile = true;
    }

    this.state = {
      activeItem: "home",
      user: this.props.userData ? this.props.userData.username : null,
      activeIndex: null,
      mobileView: mobile,
    };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

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

  componentDidMount() {
    window.addEventListener("resize", this.checkMobile);
  }

  render() {
    return (
      <Menu
        borderless
        size={this.state.mobileView ? "mini" : "small"}
        style={{ margin: "1rem" }}
      >
        <Menu.Menu position="left">
          <Menu.Item>
            <QueryMenu
              runSelectQuery={this.props.runSelectQuery}
              runCountQuery={this.props.runCountQuery}
              runUpdateQuery={this.props.runUpdateQuery}
              runDeleteQuery={this.props.runDeleteQuery}
              clearQuery={this.props.clearQuery}
              countQueryCount={this.props.countQueryCount}
              updateCountQueryCount={this.props.updateCountQueryCount}
              errorMessages={this.props.errorMessages}
              updateSelectErrorMessage={this.props.updateSelectErrorMessage}
              updateCountErrorMessage={this.props.updateCountErrorMessage}
              updateUpdateErrorMessage={this.props.updateUpdateErrorMessage}
              refresh={() =>
                this.props.runSelectQuery(this.props.current_query)
              }
              notify={this.props.notify}
              disabled={this.props.disabled}
              userData={this.props.userData}
            />
          </Menu.Item>
          {this.props.disabled ? null : (
            <Menu.Item>
              <InsertMenu
                isValidCSV={this.props.isValidCSV.bind(this)}
                errorMessages={this.props.errorMessages}
                updateManualInsertErrorMessage={
                  this.props.updateManualInsertErrorMessage
                }
                updateCSVInsertErrorMessage={
                  this.props.updateCSVInsertErrorMessage
                }
                notify={this.props.notify}
                small={this.state.mobileView}
                disabled={this.props.disabled}
                userData={this.props.userData}
              />
            </Menu.Item>
          )}
          <Menu.Item>
            <DownloadDB
              data={this.props.data}
              displayed={this.props.displayed}
              disabled={
                this.props.data === undefined || this.props.data.length === 0
              }
            />
          </Menu.Item>
        </Menu.Menu>
        <Menu.Menu position="right">
          <Menu.Item>
            <Dropdown
              // text={<p style={{ fontWeight: "500" }}>{this.state.user}</p>}
              text={<h5>{this.state.user}</h5>}
              floating
              className="hideIcon"
            >
              <Dropdown.Menu>
                <Dropdown.Header icon="user" content="User menu" />
                {this.props.userData.privilege_level === "admin" && (
                  <Dropdown.Item
                    onClick={() => {
                      window.location.hash = "/admin";
                    }}
                    text="Admin Portal"
                  ></Dropdown.Item>
                )}

                <Dropdown.Divider />

                <Logout logout={this.props.logout.bind(this)} />
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
