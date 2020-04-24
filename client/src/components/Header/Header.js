import React, { Component } from "react";
import { Menu, Dropdown, Accordion, Button } from "semantic-ui-react";
import SearchFilter from "../Search/SearchFilter";
import DBSearch from "../Search/DBSearch";
// import SortCollection from "../CollectionList/SortCollection";
import InsertDocument from "../InsertDocument/InsertDocument";
import InsertMenu from "../InsertDocument/InsertMenu";
import { Link } from "react-router-dom";
import DownloadDB from "../DownloadDB/DownloadDB";
import QueryMenu from "../Query/QueryMenu";
import Logout from "../Logout/Logout";
import { currentUser } from "../../functions/queries";

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
    // window listener for the mobile friendly toolbar
    // setTimeout(() => {
    //   this.setState({ user: user });
    // }, 1000);
    window.addEventListener("resize", this.checkMobile);
  }

  render() {
    return (
      <Menu borderless size={this.state.mobileView ? "mini" : "small"}>
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

        <Menu.Menu position="right">
          {this.state.mobileView ? null : (
            <Menu.Item style={{ width: "15rem" }}></Menu.Item>
          )}

          <Menu.Item>
            <QueryMenu
              runQuery={this.props.runQuery.bind(this)}
              clearQuery={this.props.clearQuery}
              countQueryCount={this.props.countQueryCount}
              updateCountQueryCount={this.props.updateCountQueryCount}
              errorMessages={this.props.errorMessages}
              updateSelectErrorMessage={this.props.updateSelectErrorMessage}
              updateCountErrorMessage={this.props.updateCountErrorMessage}
              updateUpdateErrorMessage={this.props.updateUpdateErrorMessage}
              notify={this.props.notify}
              disabled={this.props.disabled}
              userData={this.props.userData}
            />
          </Menu.Item>
          {this.props.disabled ? null : (
            <Menu.Item>
              {/* <InsertDocument
                isValidCSV={this.props.isValidCSV.bind(this)}
                errorMessages={this.props.errorMessages}
                updateInsertErrorMessage={this.props.updateInsertErrorMessage}
                notify={this.props.notify}
                small={this.state.mobileView}
                disabled={this.props.disabled}
              /> */}
              <InsertMenu
                isValidCSV={this.props.isValidCSV.bind(this)}
                errorMessages={this.props.errorMessages}
                updateInsertErrorMessage={this.props.updateInsertErrorMessage}
                notify={this.props.notify}
                small={this.state.mobileView}
                disabled={this.props.disabled}
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
                    onClick={() => (window.location.href = "/Admin")}
                    text="Admin Portal"
                  ></Dropdown.Item>
                )}

                <Dropdown.Divider />

                <Logout logout={this.props.logout.bind(this)} />

                {/* <div
                  style={{
                    textAlign: "center",
                    paddingTop: "2px",
                    paddingBottom: "5px",
                    paddingLeft: "3px",
                  }}
                >
                </div> */}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    );
  }
}
