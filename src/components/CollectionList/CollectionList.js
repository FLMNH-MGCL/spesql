import React from "react";
import { Table, Button, Loader, Icon } from "semantic-ui-react";
import CreateHelpModal from "../Help/CreateHelpModal";
import _ from "lodash";
import InfiniteScroll from "react-infinite-scroll-component";
import DBSearch from "../Search/DBSearch";
import SearchFilter from "../Search/SearchFilter";
import "./CollectionList.css";
import DeleteDocument from "../DeleteDocument/DeleteDocument";
import UpdateDocument from "../UpdateDocument/UpdateDocument";
import CreateErrorLogModal from "../Error/CreateErrorLogModal";

//import SpecimenCard from './SpecimenCard'

// ({data, filteredText, filterCategory, selectedUpdate, sortBy, clearQuery, current_query, query_headers})
// this entire component is very ugly... perhaps a refactor?? -> DONE
export default class CollectionList extends React.Component {
  constructor(props) {
    super(props);

    this.props.updateLoadingStatus(true);

    this.state = {
      column: null,
      data: this.props.data,
      display: Array.from({ length: 0 }),
      prevFetchAmount: 0,
      hasMore: false,
      direction: null,
    };
  }

  // this is really ugly
  componentDidUpdate() {
    if (this.state.data.length === 0 && this.props.data.length !== 0) {
      this.setState({ data: this.props.data });
    }
    if (this.props.data.length === 0 && this.state.data.length !== 0) {
      this.setState({ data: [], hasMore: false });
    }
    if (this.state.data.length !== 0 && this.state.display.length === 0) {
      let fetchAmount =
        this.state.data.length <= 50 ? this.state.data.length : 50;
      let hasMore = fetchAmount === this.state.data.length ? false : true;
      // console.log(`has more ${hasMore}`)
      const newDisplay = this.state.data.slice(0, fetchAmount);
      this.props.updateDisplayData(newDisplay);
      this.setState({
        display: newDisplay,
        hasMore: hasMore,
        prevFetchAmount: fetchAmount,
      });
    } else if (
      this.props.data.length === 0 &&
      this.state.display.length !== 0
    ) {
      this.setState({
        display: Array.from({ length: 0 }),
        prevFetchAmount: 0,
      });
    }

    if (this.props.current_query !== "" && this.props.data.length >= 0) {
      // console.log('first')
      this.props.updateLoadingStatus(false);
      this.props.updateRefreshStatus(false);
    } else if (
      this.props.current_query === "" &&
      this.props.data.length === 0 &&
      !this.props.refreshing
    ) {
      // console.log('second')
      this.props.updateLoadingStatus(false);
    } else if (
      this.props.current_query === "" &&
      this.props.data.length === 0 &&
      this.props.refreshing
    ) {
      // console.log('third')
      this.props.updateLoadingStatus(true);
    } else if (
      this.props.current_query === "" &&
      this.props.data.length !== 0
    ) {
      // console.log('fourth')
      this.props.updateLoadingStatus(true);
    }
  }

  getCells(specimen, headers) {
    if (headers === [] || headers === undefined || specimen === undefined) {
      return [];
    }

    const selectedActions = this.props.selectedSpecimen &&
      this.props.selectedSpecimen.id === specimen.id && (
        <>
          <DeleteDocument
            selectedSpecimen={this.props.selectedSpecimen}
            specimen={specimen}
            userData={this.props.userData}
            notify={this.props.notify}
            props={this.props}
          />
          {/* <Icon
            className="expand-on-hover"
            name="edit"
            style={{ float: "right" }}
          /> */}
          <UpdateDocument
            currentQuery={this.props.current_query}
            runQuery={this.props.runQuery}
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
        </>
      );

    let ret = headers.map((header, index) => {
      let currentCell = undefined;

      switch (header.toLowerCase()) {
        case "mgcl #":
          currentCell = specimen.catalogNumber;
          break;
        case "lep #":
          currentCell = specimen.otherCatalogNumber;
          break;
        case "order":
          currentCell = specimen.order_;
          break;
        case "superfamily":
          currentCell = specimen.superfamily;
          break;
        case "family":
          currentCell = specimen.family;
          break;
        case "subfamily":
          currentCell = specimen.subfamily;
          break;
        case "tribe":
          currentCell = specimen.tribe;
          break;
        case "genus":
          currentCell = specimen.genus;
          break;

        case "species":
          currentCell = specimen.specificEpithet;
          break;
        case "sex":
          currentCell = specimen.sex;
          break;
        case "country":
          currentCell = specimen.country;
          break;
        case "province":
          currentCell = specimen.stateProvince;
          break;
        case "locality":
          currentCell = specimen.locality;
          break;
        case "latitude":
          currentCell = specimen.latitude;
          break;
        case "longitude":
          currentCell = specimen.longitude;
          break;
        case "elevation":
          currentCell = specimen.elevation;
          break;
        case "collector(s)":
          currentCell = specimen.collectors;
          break;
        case "freezer":
          currentCell = specimen.freezer;
          break;
        case "rack #":
          currentCell = specimen.rack;
          break;
        case "box":
          currentCell = specimen.box;
          break;
        case "size":
          currentCell = specimen.size;
          break;
        default:
          return null;
      }

      if (index === headers.length - 1) {
        // append actions to cell
        return (
          <Table.Cell key={index}>
            {currentCell}
            {selectedActions}
          </Table.Cell>
        );
      } else {
        return <Table.Cell key={index}>{currentCell}</Table.Cell>;
      }
    });
    return ret;
  }

  getHeaderCells(headers) {
    if (headers === [] || headers === undefined) {
      return [];
    }
    let ret = headers.map((header, index) => {
      return (
        <Table.HeaderCell
          sorted={this.state.column === header ? this.state.direction : null}
          onClick={this.handleSort(header)}
          key={index}
        >
          {header}
        </Table.HeaderCell>
      );
    });

    return ret;
  }

  fetchMoreData = () => {
    let fetchAmount =
      this.state.data.length - this.state.display.length <= 50
        ? this.state.data.length - this.state.display.length
        : 50;

    if (fetchAmount === 0) {
      this.setState({ hasMore: false });
      return;
    }

    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      let newDisplay = this.state.display.concat(
        Array.from({ length: fetchAmount })
      );
      newDisplay = newDisplay.map((item, index) => {
        return this.state.data[index];
      });
      this.props.updateDisplayData(newDisplay);
      this.setState({
        display: newDisplay,
      });
    }, 500);
  };

  headerNameToFieldName = (clickedColumn) => {
    switch (clickedColumn) {
      case "LEP #":
        return "otherCatalogNumber";
      case "MGCL #":
        return "catalogNumber";
      case "Order":
        return "order_";
      case "Superfamily":
        return "superfamily";
      case "Family":
        return "family";
      case "Subfamily":
        return "subfamily";
      case "Tribe":
        return "tribe";
      case "Genus":
        return "genus";
      case "Subgenus":
        return "subgenus";
      case "Species":
        return "specificEpithet";
      case "Identification Qualifier":
        return "identificationQualifier";
      case "Recorded By":
        return "recordedBy";
      case "Date Identified":
        return "dateIdentified";
      case "Sex":
        return "sex";
      case "Life Stage":
        return "lifeStage";
      case "Habitat":
        return "habitat";
      case "Occurrence Remarks":
        return "occurrenceRemarks";
      case "Country":
        return "country";
      case "Province":
        return "stateProvince";
      case "County":
        return "county";
      case "Municipality":
        return "municipality";
      case "Locality":
        return "locality";
      case "Latitude":
        return "verbatimLatitude";
      case "Longitude":
        return "verbatimLongitude";
      case "Elevation":
        return "verbatimElevation";
      case "Freezer":
        return "freezer";
      case "Rack":
        return "rack";
      case "Box":
        return "box";
      case "Size":
        return "tubeSize";
      default:
        return clickedColumn;
    }
  };

  // FIXME
  sortList = (clickedColumn, direction) => {
    const field = this.headerNameToFieldName(clickedColumn);

    if (direction === "ascending") {
      // const newData = _.orderBy(this.state.data, [field], ["asc"]);
      // console.log(newData);
      this.setState({
        data: _.orderBy(this.state.data, [field], ["asc"]),
        direction: "ascending",
        column: clickedColumn,
      });
    } else if (direction === "descending") {
      this.setState({
        data: _.orderBy(this.state.data, [field], ["desc"]),
        direction: "descending",
        column: clickedColumn,
      });
    } else {
      return this.props.data;
    }
  };

  handleSort = (clickedColumn) => () => {
    const { direction } = this.state;

    if (direction === null) {
      this.sortList(clickedColumn, "ascending");
    } else if (direction === "ascending") {
      this.sortList(clickedColumn, "descending");
    } else {
      this.setState({
        data: this.props.data,
        direction: null,
        column: null,
      });
    }
  };

  specimenIncludes(specimen, text, category = "*") {
    if (category !== "*") {
      return specimen[category].toLowerCase().indexOf(text.toLowerCase()) >= 0;
    }

    let doesInclude = Object.values(specimen).some((field) =>
      String(field).includes(text)
    );

    // console.log(specimen, doesInclude);

    return doesInclude;
  }

  renderList = () => {
    let collectionList = this.state.data;
    try {
      collectionList = collectionList
        .filter((specimen) => {
          return this.specimenIncludes(
            specimen,
            this.props.filteredText,
            this.props.filterCategory
          );
        })
        .map((specimen, index) => {
          let cells = this.getCells(specimen, this.props.query_headers);

          return (
            <Table.Row
              key={index}
              active={
                this.props.selectedSpecimen &&
                this.props.selectedSpecimen.id === specimen.id
              }
              onClick={() => this.props.updateSelectedSpecimen(specimen)}
            >
              {cells}
            </Table.Row>
          );
        });
    } catch (error) {
      console.log(error);
      collectionList = [];
    }

    return collectionList;
  };

  render() {
    // console.log(this.state)

    let collectionList = this.renderList();

    let specimenHeaders = this.getHeaderCells(this.props.query_headers);
    // console.log(specimenHeaders);

    return (
      <React.Fragment>
        <Table sortable celled selectable stackable>
          <Table.Header>
            <Table.Row>{specimenHeaders}</Table.Row>
          </Table.Header>
          <Table.Body>
            <div
              id="scrollableDiv"
              style={{ height: "65vh", overflow: "auto" }}
            >
              <InfiniteScroll
                dataLength={this.state.display.length}
                next={this.fetchMoreData}
                hasMore={this.state.hasMore}
                scrollableTarget="scrollableDiv"
                loader={
                  <Loader
                    active
                    style={{ marginTop: "22vh" }}
                    content="Loading"
                    className="loader-style"
                  />
                }
              >
                {this.state.display.map((row, index) => {
                  return collectionList[index];
                })}
              </InfiniteScroll>
            </div>
          </Table.Body>
          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="8">
                <div className="query-curr">
                  <h4>Current Query:</h4>
                  <p>{this.props.current_query}</p>
                </div>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
        <div className="query-info">
          <div className="info-actions">
            <SearchFilter
              filterCategory={this.props.filterCategory}
              updateFilteredCategory={this.props.updateFilteredCategory}
              disabled={this.props.data.length === 0}
            />
            <DBSearch
              filteredText={this.props.filteredText}
              updateFilteredText={this.props.updateFilteredText}
              disabled={this.props.data.length === 0}
            />
            <Button
              negative
              onClick={() => {
                this.props.clearQuery();
                this.setState({
                  data: [],
                  hasMore: false,
                  display: Array.from({ length: 0 }),
                });
              }}
              disabled={this.props.current_query === "" ? true : false}
              style={{ marginLeft: ".2rem" }}
            >
              Clear Query
            </Button>
            <Button
              icon
              onClick={() => {
                // console.log('refreshed!')
                this.props.clearQuery();
                this.setState({
                  data: [],
                  hasMore: false,
                  display: Array.from({ length: 0 }),
                });
                let command = this.props.current_query;
                this.props.updateRefreshStatus(true);
                this.props.updateLoadingStatus(true);
                this.props.runQuery(command);
              }}
              disabled={this.props.current_query === "" ? true : false}
            >
              <Icon name="refresh" />
            </Button>
            <CreateErrorLogModal
              type="Global Errors"
              errors={this.props.errorMessages.globalError}
              updateError={this.props.updateGlobalErrorMessage}
              inline
            />
          </div>
          <div className="query-infosheet">
            <div className="query-text">
              <h4>Query Size:</h4>
              <p>{this.props.data.length}</p>
            </div>
            {this.props.filteredText !== "" && (
              <div className="query-text">
                <h4>Filtered Size:</h4>
                <p>
                  {this.props.filteredText !== ""
                    ? collectionList.length
                    : this.props.data.length}
                </p>
              </div>
            )}
            <div className="query-text">
              <h4>Current Loaded:</h4>
              <p>
                {this.props.data.length === 0 ? 0 : this.state.display.length}
              </p>
            </div>
            <div style={{ paddingLeft: ".75rem" }}>
              <CreateHelpModal queryType="LIST_HELP" />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
