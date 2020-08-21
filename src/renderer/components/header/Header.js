import React from "react";
import { Menu, Button, Dropdown, Icon } from "semantic-ui-react";
import QueryMenu from "../dropdowns/QueryMenu";
import Notifications from "../dropdowns/Notifications";

export default function Header(props) {
  return (
    <Menu
      borderless
      // size={this.state.mobileView ? "mini" : "small"}
      size="small"
      style={{ margin: "1rem" }}
    >
      <Menu.Menu position="left">
        <Menu.Item>
          <QueryMenu {...props} />
        </Menu.Item>
        <Menu.Item>
          <Button>Insert</Button>
        </Menu.Item>
        <Menu.Item>
          <Button>Download</Button>
        </Menu.Item>
      </Menu.Menu>

      <Menu.Menu position="right">
        <Menu.Item>
          <Notifications {...props} />
        </Menu.Item>
        <Menu.Item>
          <Dropdown
            // text={<p style={{ fontWeight: "500" }}>user</p>}
            // text={<h5>user</h5>}
            icon="user"
            floating
            // className="hideIcon"
          >
            <Dropdown.Menu>
              <Dropdown.Header
                content={props.userData ? props.userData.username : ""}
              />
              {props.userData && props.userData.privilege_level === "admin" && (
                <Dropdown.Item
                  onClick={() => {
                    window.location.hash = "/admin";
                  }}
                  text="Admin Portal"
                ></Dropdown.Item>
              )}

              <Dropdown.Item
                onClick={() => {
                  window.location.hash = "/settings";
                }}
                text="Settings"
              ></Dropdown.Item>

              <Dropdown.Divider />

              {/* <Logout logout={props.logout} /> */}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
