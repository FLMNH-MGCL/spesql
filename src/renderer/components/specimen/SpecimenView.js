import React from "react";
import { Card, Image, Grid, List } from "semantic-ui-react";
import "./SpecimenView.css";
import axios from "axios";
import CreateDeleteModal from "../modals/CreateDeleteModal";
import CreateSingleUpdateModal from "../modals/CreateSingleUpdateModal";

const PREFIX = process.env.NODE_ENV === "production" ? PUBLIC_URL : "";

class SpecimenView extends React.Component {
  async checkAuth(user, password, callback) {
    if (this.props.userData.username !== user) {
      // attempting auth with diff account
      this.props.notify({
        type: "error",
        title: "Authorization failed",
        message:
          "Attempting authentication with different credentials than logged in account.",
      });
      return;
    } else if (
      this.props.userData.privilege_level !== "admin" &&
      this.props.userData.privilege_level !== "manager"
    ) {
      // this should NEVER happen, however this is a sanity check
      this.props.notify({
        type: "error",
        title: "Authorization failed",
        message: "Access either failed or was denied!",
      });

      // forcibly log out
      this.props.logout();
      return;
    }

    const authData = await axios
      .post(PREFIX + "/api/login/", {
        user: user,
        password: password,
      })
      .catch((error) => {
        return null;
      });

    // console.log(authData);

    if (!authData || authData.data.err || authData.data.authed === false) {
      // credentials did not match or other error
      this.props.notify({
        type: "error",
        title: "Authorization failed",
        message: "Authorization either failed or was denied",
      });
    } else {
      // allow whatever command to proceed
      callback();
    }
  }

  renderImage = (selectedSpecimen) => {
    // attempt fetch of image from somewhere
    // imageUrl = ...

    // if the image does exists at the url
    return (
      <>
        <Card>
          <Image src={require("./test.jpg")} wrapped />
        </Card>
      </>
    );

    // else if the image doesn't exist at the url
    // return undefined;
  };

  renderList = (selectedSpecimen) => {
    return (
      <List divided verticalAlign="middle" relaxed>
        <List.Item float="left">
          <List.Content>
            <b>LEP #: </b> {selectedSpecimen.catalogNumber}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>MGCL #: </b> {selectedSpecimen.otherCatalogNumber}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Record Number: </b> {selectedSpecimen.recordNumber}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Order: </b> {selectedSpecimen.order_}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Superfamily: </b> {selectedSpecimen.superfamily}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Family: </b> {selectedSpecimen.family}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Subfamily: </b> {selectedSpecimen.subfamily}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Tribe: </b> {selectedSpecimen.tribe}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Genus: </b> {selectedSpecimen.genus}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Subgenus: </b> {selectedSpecimen.subgenus}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Species: </b> {selectedSpecimen.specificEpithet}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Infraspecific Epithet: </b>{" "}
            {selectedSpecimen.infraspecificEpithet}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Qualifier: </b> {selectedSpecimen.identificationQualifier}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Recorded by: </b> {selectedSpecimen.recordedBy}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Identified by: </b> {selectedSpecimen.identifiedBy}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Date Identified: </b> {selectedSpecimen.dateIdentified}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Verbatim Date: </b> {selectedSpecimen.verbatimDate}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Collected Year: </b> {selectedSpecimen.collectedYear}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Collected Month: </b> {selectedSpecimen.collectedMonth}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Collected Day: </b> {selectedSpecimen.collectedDay}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Sex: </b> {selectedSpecimen.sex}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Life Stage: </b> {selectedSpecimen.lifeStage}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Habitat: </b> {selectedSpecimen.habitat}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Occurrence Remarks: </b> {selectedSpecimen.occurrenceRemarks}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Occurrence Remarks (Mol): </b>{" "}
            {selectedSpecimen.molecularOccurrenceRemarks}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Sampling Protocol: </b> {selectedSpecimen.samplingProtocol}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Country: </b> {selectedSpecimen.country}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>State / Province: </b> {selectedSpecimen.stateProvince}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>County: </b> {selectedSpecimen.county}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Municipality: </b> {selectedSpecimen.municipality}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Locality: </b> {selectedSpecimen.locality}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Elevation: </b> {selectedSpecimen.verbatimElevation}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Latitude (Dec.): </b> {selectedSpecimen.decimalLatitude}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Longitude (Dec.): </b> {selectedSpecimen.decimalLongitude}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Geodetic Datum: </b> {selectedSpecimen.geodeticDatum}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Coord. Uncertainty: </b> {selectedSpecimen.coordinateUncertainty}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Latitude (Ver.): </b> {selectedSpecimen.verbatimLatitude}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Latitude (Ver.): </b> {selectedSpecimen.verbatimLongitude}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Georeference By: </b> {selectedSpecimen.georeferencedBy}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Disposition: </b> {selectedSpecimen.disposition}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Loan Info: </b>
            {selectedSpecimen.isLoaned
              ? selectedSpecimen.loaneeName
                ? `Loaned to ${selectedSpecimen.loaneeName} @ ` +
                  `${selectedSpecimen.loanInstitution}`
                : `Loaned to ${selectedSpecimen.loanInstitution}`
              : "Not on loan"}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Preparations: </b> {selectedSpecimen.preparations}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Freezer: </b> {selectedSpecimen.freezer}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Rack: </b> {selectedSpecimen.rack}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Box: </b> {selectedSpecimen.box}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Tube Size: </b> {selectedSpecimen.tubeSize}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Associated Sequences: </b> {selectedSpecimen.associatedSequences}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Associated References: </b>{" "}
            {selectedSpecimen.associatedReferences}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Withold Data?: </b> {selectedSpecimen.withholdData}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Collector(s): </b> {selectedSpecimen.collectors}
          </List.Content>
        </List.Item>
      </List>
    );
  };

  renderView = (selectedSpecimen) => {
    let list = this.renderList(selectedSpecimen);
    let specimenImage = undefined; //this.renderImage(selectedSpecimen);

    if (specimenImage !== undefined) {
      return (
        <Grid columns="equal" padded>
          <Grid.Column>{specimenImage}</Grid.Column>
          <Grid.Column style={{ overflowY: "scroll" }}>{list}</Grid.Column>
        </Grid>
      );
    } else {
      return (
        <div style={{ display: "block" }}>
          <Grid columns="equal">
            <Grid.Column style={{ maxHeight: "80vh", overflowY: "scroll" }}>
              {list}
            </Grid.Column>
          </Grid>
          <div className="specimen-footer-title">
            <div className="query-text">
              <h4>
                Available Actions for{" "}
                {this.props.selectedSpecimen.catalogNumber}:
              </h4>
            </div>
          </div>
          {!this.props.disabled ? (
            <div className="specimen-footer-content">
              <CreateSingleUpdateModal
                currentQuery={this.props.currentQuery}
                runUpdateQuery={this.props.runUpdateQuery}
                runSelectQuery={this.props.runSelectQuery}
                user={this.props.user}
                disabled={this.props.disabled}
                userData={this.props.userData}
                errorMessages={this.props.errorMessages}
                updateSingleUpdateErrorMessage={
                  this.props.updateSingleUpdateErrorMessage
                }
                notify={this.props.notify}
                selectedSpecimen={this.props.selectedSpecimen}
              />
              <CreateDeleteModal
                selectedSpecimen={this.props.selectedSpecimen}
                userData={this.props.userData}
                notify={this.props.notify}
                props={this.props}
              />
            </div>
          ) : (
            <div className="specimen-footer-content">No actions available.</div>
          )}
        </div>
      );
    }
  };

  render() {
    if (this.props.data === undefined || !this.props.currentQuery) {
      return (
        <div style={{ textAlign: "center" }}>
          <strong>Make a query and select a specimen for more info!</strong>
        </div>
      );
    } else {
      const { selectedSpecimen } = this.props;
      if (
        selectedSpecimen === undefined &&
        this.props.currentQuery &&
        this.props.data.length === 0
      ) {
        return (
          <div style={{ textAlign: "center" }}>
            <strong>
              Uh oh, that query yielded no data. Try broadening the query!
            </strong>
          </div>
        );
      } else if (selectedSpecimen === undefined) {
        return (
          <div style={{ textAlign: "center" }}>
            <strong>Click a specimen for more info!</strong>
          </div>
        );
      } else {
        return (
          <>
            <div>{this.renderView(selectedSpecimen)}</div>
          </>
        );
      }
    }
  }
}

export default SpecimenView;