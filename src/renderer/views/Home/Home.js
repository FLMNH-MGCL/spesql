import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { mapStateToProps, mapDispatchToProps } from "../../redux/mapFunctions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Header from "../../components/header/Header";
import VirtualizedList from "../../components/table/VirtualizedList";
import { Grid, Loader, Segment } from "semantic-ui-react";
import { getQueryHeaders } from "../../functions/helpers";
import SpecimenView from "../../components/specimen/SpecimenView";

function Home(props) {
  const notify = props.notify;
  // const [hasConfig, setHasConfig] = useState(false);

  useEffect(() => {
    async function checkConfig() {
      const config = await axios.post("/api/config-check").catch((error) => {
        // console.log(error.response);
        return false;
      });

      return true;
    }

    if (!props.authenticated || !props.userData) {
      window.location.hash = "/login";
    }

    const hasConfig = checkConfig();

    if (!hasConfig) {
      notify({
        type: "warning",
        title: "No config detected",
        message:
          "Please add a config before continuing! You will not be logged out...",
      });
    }
  });

  async function runSelectQuery(query) {
    if (!query || query === "") return;

    props.clearQuery();
    props.updateLoadingStatus(true);
    props.updateRefreshStatus(true);

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
      notify({
        type: "warning",
        message: "Query yielded no data",
      });
      props.updateLoadingStatus(false);
      props.updateQuery(query);
    } else if (ret.specimen) {
      notify({
        type: "success",
        message: "Query loaded",
      });
      props.updateQueryData(ret.specimen);
      let headers = getQueryHeaders(ret.specimen[0]);
      props.updateHeaders(headers);
      props.updateQuery(query);
    }
    // errors occurred
    else {
      notify({
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

      props.updateSelectErrorMessage([errorMessage]);
      props.updateLoadingStatus(false);
      props.updateRefreshStatus(false);
    }
  }

  async function runCountQuery(query) {
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
      props.updateCountQueryCount(Object.values(countData)[0]); // isolate the number
    }
    // errors occurred
    else {
      notify({
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

      props.updateCountErrorMessage([errorMessage]);
    }
  }

  async function runDeleteQuery(query, userData) {
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
      notify({
        type: "success",
        message: "Successfully deleted entry",
      });
      runSelectQuery(props.current_query);
    } else {
      notify({
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

      props.updateGlobalErrorMessage([errorMessage]);
    }
  }

  async function runUpdateQuery(query, userData, type = "batch") {
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
      notify({
        type: "success",
        message: "Successfully ran update",
      });
    } else {
      notify({
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
        props.updateSingleUpdateErrorMessage([errorMessage]);
      } else {
        props.updateUpdateErrorMessage([errorMessage]);
      }
    }
  }

  console.log(window.location.hash);

  if (!props.authenticated || !props.userData) {
    window.location.hash = "/login";
  }

  return (
    <React.Fragment>
      <Header {...props} runSelectQuery={runSelectQuery} />

      <Grid columns="equal" padded stackable>
        <Grid.Row centered stretched>
          <Grid.Column
            computer={11}
            largeScreen={11}
            tablet={16}
            style={{ justifyContent: "center" }}
          >
            <Loader content="Loading" active disabled={!props.loading} />
            <Segment style={{ margin: 0 }}>
              <VirtualizedList
                props={props}
                runSelectQuery={runSelectQuery}
                notify={props.notify}
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
                data={props.data}
                selectedSpecimen={props.selectedSpecimen}
                currentQuery={props.current_query}
                runSelectQuery={runSelectQuery.bind(this)}
                runUpdateQuery={runUpdateQuery.bind(this)}
                runDeleteQuery={runDeleteQuery.bind(this)}
                userData={props.userData}
                notify={notify}
                disabled={
                  !props.userData ||
                  (props.userData.privilege_level !== "admin" &&
                    props.userData.privilege_level !== "manager")
                }
                errorMessages={props.errorMessages}
                updateSingleUpdateErrorMessage={
                  props.updateSingleUpdateErrorMessage
                }
              />
            </Segment>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
