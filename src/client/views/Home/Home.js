import React from "react";
import SpecimenView from "../../components/SpecimenView/SpecimenView";
import Header from "../../components/Header/Header";
import { Grid, Loader, Segment } from "semantic-ui-react";
import { getQueryHeaders } from "../../functions/helpers";
import { isValidCSV } from "../../functions/queryChecks";
import { mapStateToProps, mapDispatchToProps } from "../../redux/mapFunctions";
import { connect } from "react-redux";
// import "react-notifications/lib/notifications.css";
// import {
//   NotificationContainer,
//   NotificationManager,
// } from "react-notifications";
import "./Home.css";
import { Redirect } from "react-router-dom";
import VirtualizedList from "../../components/CollectionList/VirtualizedList";
import axios from "axios";

class Home extends React.Component {
  logout() {
    this.props.setUserData(null);
    this.props.setAuth(false);
  }

  async runSelectQuery(query) {
    if (!query || query === "") return;

    this.props.clearQuery();
    this.props.updateLoadingStatus(true);
    this.props.updateRefreshStatus(true);

    const ret = await axios
      .post("/api/select", { command: query })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return { error: error.response };
      });

    // console.log(ret);

    if (ret.specimen && ret.specimen.length < 1) {
      this.createNotification({
        type: "warning",
        message: "Query yielded no data",
      });
      this.props.updateLoadingStatus(false);
      this.props.updateQuery(query);
    } else if (ret.specimen) {
      this.createNotification({
        type: "success",
        message: "Query loaded",
      });
      this.props.updateQueryData(ret.specimen);
      let headers = getQueryHeaders(ret.specimen[0]);
      this.props.updateHeaders(headers);
      this.props.updateQuery(query);
    }
    // errors occurred
    else {
      this.createNotification({
        type: "error",
        message: "Uh oh, please check error log.",
      });
      const error = ret.error;
      let errorMessage = "";

      if (error.status === 400) {
        errorMessage = error.data;
      } else if (error.status === 503) {
        errorMessage = `SQL ERROR: Code: ${error.code}, Message: ${error.sqlMessage}`;
      }

      this.props.updateSelectErrorMessage([errorMessage]);
      this.props.updateLoadingStatus(false);
      this.props.updateRefreshStatus(false);
    }
  }

  async runCountQuery(query) {
    if (!query || query === "") return;

    const ret = await axios
      .post("/api/select-count", { command: query })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return { error: error.response };
      });

    // console.log(ret);

    if (ret.data) {
      const countData = ret.data[Object.keys(ret.data)[0]];
      this.props.updateCountQueryCount(Object.values(countData)[0]); // isolate the number
    }
    // errors occurred
    else {
      this.createNotification({
        type: "error",
        message: "Uh oh, please check error log.",
      });
      const error = ret.error;
      let errorMessage = "";

      if (error.status === 400) {
        errorMessage = error.data;
      } else if (error.status === 503) {
        errorMessage = `SQL ERROR: Code: ${error.code}, Message: ${error.sqlMessage}`;
      }

      this.props.updateCountErrorMessage([errorMessage]);
    }
  }

  async runDeleteQuery(query, userData) {
    if (!query || query === "") return;

    const ret = await axios
      .post(`/api/delete/`, {
        command: query,
        user: userData.user,
        password: userData.password,
      })
      .then((response) => {
        const data = response;
        return data;
      })
      .catch((error) => {
        return { error: error.response };
      });

    // console.log(ret);

    if (ret.data) {
      this.createNotification({
        type: "success",
        message: "Successfully deleted entry",
      });
      this.runSelectQuery(this.props.current_query);
    } else {
      this.createNotification({
        type: "error",
        message: "Uh oh, please check error log.",
      });

      const error = ret.error;
      let errorMessage = "";

      if (error.status === 400) {
        errorMessage = `Delete error: ${error.data}`;
      } else if (error.status === 503) {
        errorMessage = `SQL ERROR: Code: ${error.code}, Message: ${error.sqlMessage}`;
      }

      this.props.updateGlobalErrorMessage([errorMessage]);
    }
  }

  async runUpdateQuery(query, userData, type = "batch") {
    if (!query || query === "") return;

    const ret = await axios
      .post("/api/update/", {
        command: query,
        user: userData.user,
        password: userData.password,
      })
      .then((response) => {
        const data = response;
        return data;
      })
      .catch((error) => {
        return { error: error.response };
      });

    if (ret.data && ret.data.success) {
      this.createNotification({
        type: "success",
        message: "Successfully ran update",
      });
    } else {
      this.createNotification({
        type: "error",
        message: "Uh oh, please check error log.",
      });

      const error = ret.error;
      console.log(error);

      let errorMessage = "";

      if (error.status === 400) {
        errorMessage = `Update error: ${error.data}`;
      } else if (error.status === 503) {
        errorMessage = `SQL ERROR: Code: ${error.code}, Message: ${error.sqlMessage}`;
      }

      if (type === "single") {
        this.props.updateSingleUpdateErrorMessage([errorMessage]);
      } else {
        this.props.updateUpdateErrorMessage([errorMessage]);
      }
    }
  }

  createNotification(content) {
    // switch (content.type) {
    //   case "success":
    //     NotificationManager.success(`${content.message}`, "Success!");
    //     break;
    //   case "warning":
    //     NotificationManager.warning(`${content.message}`, "Warning!", 4000);
    //     break;
    //   case "error":
    //     NotificationManager.error(`${content.message}`, "Error!");
    //     break;
    //   default:
    // }
  }

  render() {
    if (!this.props.authenticated) {
      return <Redirect to="/Login" />;
    }

    if (
      this.props.current_query === "" &&
      sessionStorage.getItem("current_query") &&
      this.props.data.length === 0
    ) {
      this.runSelectQuery(sessionStorage.getItem("current_query"));
    }

    return (
      <div>
        <Header
          {...this.props}
          current_view="home"
          isValidCSV={isValidCSV.bind(this)}
          runSelectQuery={this.runSelectQuery.bind(this)}
          runCountQuery={this.runCountQuery.bind(this)}
          runUpdateQuery={this.runUpdateQuery.bind(this)}
          runDeleteQuery={this.runDeleteQuery.bind(this)}
          logout={this.logout.bind(this)}
          notify={this.createNotification}
          disabled={
            this.props.userData.privilege_level !== "admin" &&
            this.props.userData.privilege_level !== "manager"
          }
        />
        <Grid columns="equal" padded stackable>
          <Grid.Row centered stretched>
            <Grid.Column
              computer={11}
              largeScreen={11}
              tablet={16}
              style={{ justifyContent: "center" }}
            >
              <Loader content="Loading" active disabled={!this.props.loading} />
              <Segment style={{ margin: 0 }}>
                <VirtualizedList
                  props={this.props}
                  runSelectQuery={this.runSelectQuery.bind(this)}
                  notify={this.createNotification}
                />
              </Segment>
            </Grid.Column>
            <Grid.Column
              computer={5}
              largeScreen={5}
              tablet={16}
              style={{ justifyContent: "center" }}
            >
              <Segment>
                <SpecimenView
                  data={this.props.data}
                  selectedSpecimen={this.props.selectedSpecimen}
                  currentQuery={this.props.current_query}
                  runSelectQuery={this.runSelectQuery.bind(this)}
                  runUpdateQuery={this.runUpdateQuery.bind(this)}
                  runDeleteQuery={this.runDeleteQuery.bind(this)}
                  userData={this.props.userData}
                  notify={this.createNotification}
                  disabled={
                    this.props.userData.privilege_level !== "admin" &&
                    this.props.userData.privilege_level !== "manager"
                  }
                  errorMessages={this.props.errorMessages}
                  updateSingleUpdateErrorMessage={
                    this.props.updateSingleUpdateErrorMessage
                  }
                />
              </Segment>
            </Grid.Column>
          </Grid.Row>
        </Grid>
        {/* <NotificationContainer /> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
