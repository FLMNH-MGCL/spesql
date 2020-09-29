import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";
import QueryMenu from "../dropdowns/QueryMenu";
import Notifications from "../dropdowns/Notifications";
import InsertMenu from "../dropdowns/InsertMenu";
import CreateDownloadModal from "../modals/CreateDownloadModal";

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
          <InsertMenu {...props} />
        </Menu.Item>
        <Menu.Item>
          <CreateDownloadModal
            disabled={props.data === undefined || props.data.length === 0}
            data={props.data}
          />
        </Menu.Item>
      </Menu.Menu>

      <Menu.Menu position="right">
        <Menu.Item>
          <Notifications {...props} />
        </Menu.Item>
        <Menu.Item>
          <Dropdown icon={<Icon className="hoverable" name="user" />} floating>
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

              <Dropdown.Item
                onClick={() => {
                  props.logout();
                }}
                text="Logout"
              ></Dropdown.Item>

              {/* <Logout logout={props.logout} /> */}
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  );
}
