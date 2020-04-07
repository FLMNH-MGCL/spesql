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
        />
        <UpdateDocument
          selectedSpecimen={selectedSpecimen}
          currentQuery={this.props.currentQuery}
          runQuery={this.props.runQuery}
          user={this.props.user}
          notify={this.props.notify}
          disabled={this.props.disabled}
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
            <b>LEP #: </b> {selectedSpecimen.recordNumber}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>Other Record Number: </b> {selectedSpecimen.otherRecordNumber}
          </List.Content>
        </List.Item>
        <List.Item float="left">
          <List.Content>
            <b>MGCL #: </b> {selectedSpecimen.catalogNumber}
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
            <b>Date: </b> {selectedSpecimen.dateIdentified}
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
            <b>Loan Info: </b> {selectedSpecimen.loanInfo}
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
    let specimenImage = this.renderImage(selectedSpecimen);

    if (specimenImage !== undefined) {
      return (
        <Grid columns="equal" padded>
          <Grid.Column>{specimenImage}</Grid.Column>
          <Grid.Column style={{ maxHeight: "86vh", overflowY: "scroll" }}>
            {list}
          </Grid.Column>
        </Grid>
      );
    } else {
      return (
        <>
          <Grid columns="equal" padded>
            <Grid.Column style={{ maxHeight: "80vh", overflowY: "scroll" }}>
              {list}
            </Grid.Column>
          </Grid>
          <div style={{ float: "right", paddingTop: "2rem" }}>
            <DeleteDocument
              target={selectedSpecimen.id}
              runQuery={this.props.runQuery}
            />
            <UpdateDocument
              selectedSpecimen={selectedSpecimen}
              currentQuery={this.props.currentQuery}
              runQuery={this.props.runQuery}
              user={this.props.user}
            />
          </div>
        </>
      );
    }
  };

  render() {
    if (this.props.data === undefined) {
      return (
        <div>
          <strong>Click a specimen for more info...</strong>
        </div>
      );
    } else {
      // const selectedSpecimen = this.props.data.find(specimen => {
      //     return specimen.id === this.props.selectedSpecimen.id
      // })
      const { selectedSpecimen } = this.props;
      if (selectedSpecimen === undefined) {
        return (
          <div>
            <strong>Click a specimen for more info...</strong>
          </div>
        );
      } else {
        return (
          <React.Fragment>{this.renderView(selectedSpecimen)}</React.Fragment>
        );
      }
    }
  }
}

export default SpecimenView;
