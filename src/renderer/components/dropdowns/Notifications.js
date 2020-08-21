import React from "react";
import { Icon, Dropdown, List, Segment, Button } from "semantic-ui-react";
import OutsideClickHandler from "react-outside-click-handler";
import useBoolean from "../../utils/useBoolean";
import "./Notifications.css";

function Notification() {
  return (
    <div className="notification-container">
      <div>
        <p style={{ display: "block" }}>Header</p>
        <p>type</p>
      </div>
      <p>information</p>
    </div>
  );
}

function Notifications(props) {
  const [open, { toggle, off }] = useBoolean(false);

  const notifications = Array.from({ length: 100 }).map((_, index) => {
    return <Notification key={index} />;
  });

  return (
    <React.Fragment>
      <Icon name="bell" style={{ cursor: "pointer" }} onClick={toggle} />

      {open && (
        <OutsideClickHandler onOutsideClick={off}>
          {/* {notifications} */}
          <div className="notif-menu-container">
            <Segment className="notif-menu-body">
              <div className="notif-heading">
                <p className="header-text">Notifications</p>
                <p className="clear-all">Clear All</p>
              </div>
              <div className="notifications">{notifications}</div>
            </Segment>
          </div>
        </OutsideClickHandler>
      )}
    </React.Fragment>
  );
}

export default Notifications;
