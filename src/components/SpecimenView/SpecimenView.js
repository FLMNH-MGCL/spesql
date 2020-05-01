import React from "react";
import { Card, Image, Grid, List } from "semantic-ui-react";
import "./SpecimenView.css";
import DeleteDocument from "../DeleteDocument/DeleteDocument";
import UpdateDocument from "../UpdateDocument/UpdateDocument";

class SpecimenView extends React.Component {
  renderImage = (selectedSpecimen) => {
    // attempt fetch of image from somewhere
    // imageUrl = ...

    // if the image does exists at the url
    return (
      <>
        <Card>
          <Image src={require("./test.jpg")} wrapped />
        </Card>
        <DeleteDocument
          target={selectedSpecimen.id}
          runQuery={this.props.runQuery}
          disabled={this.props.disabled}
          userData={this.props.userData}
        />
        <UpdateDocument
          selectedSpecimen={selectedSpecimen}
          currentQuery={this.props.currentQuery}
          runQuery={this.props.runQuery}
          user={this.props.user}
          notify={this.props.notify}
          disabled={this.props.disabled}
          userData={this.props.userData}
          errorMessages={this.props.errorMessages}
          updateUpdateErrorMessage={this.props.updateUpdateErrorMessage}
        />
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
            <b>LEP #: </b> {selectedSpecimen.otherCatalogNumber}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>MGCL #: </b> {selectedSpecimen.catalogNumber}
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
        <>
          <Grid columns="equal" padded>
            <Grid.Column style={{ maxHeight: "80vh", overflowY: "scroll" }}>
              <div style={{ display: "block" }}>
                <UpdateDocument
                  selectedSpecimen={selectedSpecimen}
                  currentQuery={this.props.currentQuery}
                  runQuery={this.props.runQuery}
                  user={this.props.user}
                  disabled={this.props.disabled}
                  userData={this.props.userData}
                  errorMessages={this.props.errorMessages}
                  updateUpdateErrorMessage={this.props.updateUpdateErrorMessage}
                  notify={this.props.notify}
                />
                <DeleteDocument
                  target={selectedSpecimen.id}
                  runQuery={this.props.runQuery}
                  disabled={this.props.disabled}
                  userData={this.props.userData}
                />
              </div>
              {list}
            </Grid.Column>
          </Grid>
        </>
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
      // const selectedSpecimen = this.props.data.find(specimen => {
      //     return specimen.id === this.props.selectedSpecimen.id
      // })
      const { selectedSpecimen } = this.props;
      if (selectedSpecimen === undefined && this.props.currentQuery) {
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
        return <div>{this.renderView(selectedSpecimen)}</div>;
      }
    }
  }
}

export default SpecimenView;
