import React, { useEffect } from "react";
import { Icon, Dropdown, List, Segment, Button } from "semantic-ui-react";
import OutsideClickHandler from "react-outside-click-handler";
import clsx from "clsx";
import useBoolean from "../../utils/useBoolean";
import { ShakeRotate } from "reshake";
import "./Notifications.css";

// used to set up fake notifications
// function seed(createNotification) {
//   createNotification({
//     header: "Query Loaded",
//     type: "log",
//     information: "Select Query",
//   });

//   createNotification({
//     header: "Invalid Query Params",
//     type: "error",
//     information: "Select Modal",
//   });

//   createNotification({
//     header: "Configuration Changed",
//     type: "warning",
//     information: "Please restart app if you haven't already",
//   });

//   createNotification({
//     header: "Query Load Error",
//     type: "error",
//     information: "Count Modal",
//   });
// }

function Notification(notification) {
  const { type } = notification;
  return (
    <div className="notification-container">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p style={{ fontWeight: "800", color: "#2d3748" }}>
          {notification.header}
        </p>
        <p
          style={{
            color: clsx(
              type === "error" && "#9b2c2c",
              type === "warning" && "#b7791f",
              type !== "error" && type !== "warning" && "#4a5568"
            ),
          }}
        >
          {notification.type}
        </p>
      </div>
      <p style={{ display: "block", paddingTop: "1rem" }}>
        {notification.information}
      </p>
    </div>
  );
}

function Notifications(props) {
  const [open, { toggle, off }] = useBoolean(false);

  useEffect(() => {
    if (open && props.hasUnread) {
      props.setReadNotifications(false);
    }
  }, [open]);

  const notifications = props.notifications
    .reverse()
    .map((notification, index) => {
      return <Notification key={index} {...notification} />;
    });

  function clearNotifications() {
    props.clearNotifications();
    if (props.hasUnread) {
      props.setReadNotifications(false);
    }
  }

  console.log(props.hasUnread);

  return (
    <React.Fragment>
      <ShakeRotate fixed={props.hasUnread && !open} int={35} r={30}>
        <Icon
          className="hoverable"
          name="bell"
          style={{ cursor: "pointer" }}
          onClick={toggle}
        />
      </ShakeRotate>

      {open && (
        <OutsideClickHandler onOutsideClick={off}>
          <div className="notif-menu-container">
            <Segment className="notif-menu-body">
              <div className="notif-heading">
                <p className="header-text">Notifications</p>
                <p className="clear-all" onClick={clearNotifications}>
                  Clear All
                </p>
              </div>
              <div className="notifications">
                {notifications.length > 0 ? (
                  notifications
                ) : (
                  <p style={{ paddingTop: "1rem" }}>
                    No notifications to display
                  </p>
                )}
              </div>
            </Segment>
          </div>
        </OutsideClickHandler>
      )}
    </React.Fragment>
  );
}

export default Notifications;
