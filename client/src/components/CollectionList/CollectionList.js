import React from "react";
import { Table, Button, Loader, Icon } from "semantic-ui-react";
import QueryHelp from "../Query/QueryHelp";
// import _ from 'lodash'
import InfiniteScroll from "react-infinite-scroll-component";
import DBSearch from "../Search/DBSearch";
import SearchFilter from "../Search/SearchFilter";
import "./CollectionList.css";

//import SpecimenCard from './SpecimenCard'

function getCells(specimen, headers) {
  if (headers === [] || headers === undefined || specimen === undefined) {
    return [];
  }
  let ret = headers.map((header, index) => {
    // console.log(header)
    switch (header.toLowerCase()) {
      case "mgcl #":
        return <Table.Cell key={index}>{specimen.catalogNumber}</Table.Cell>;
      case "lep #":
        return <Table.Cell key={index}>{specimen.recordNumber}</Table.Cell>;
      case "order":
        return <Table.Cell key={index}>{specimen.order_}</Table.Cell>;
      case "superfamily":
        return <Table.Cell key={index}>{specimen.superfamily}</Table.Cell>;
      case "family":
        return <Table.Cell key={index}>{specimen.family}</Table.Cell>;
      case "subfamily":
        return <Table.Cell key={index}>{specimen.subfamily}</Table.Cell>;
      case "tribe":
        return <Table.Cell key={index}>{specimen.tribe}</Table.Cell>;
      case "genus":
        return <Table.Cell key={index}>{specimen.genus}</Table.Cell>;
      case "species":
        return <Table.Cell key={index}>{specimen.specificEpithet}</Table.Cell>;
      case "sex":
        return <Table.Cell key={index}>{specimen.sex}</Table.Cell>;
      case "country":
        return <Table.Cell key={index}>{specimen.country}</Table.Cell>;
      case "province":
        return <Table.Cell key={index}>{specimen.stateProvince}</Table.Cell>;
      case "locality":
        return <Table.Cell key={index}>{specimen.locality}</Table.Cell>;
      case "latitude":
        return <Table.Cell key={index}>{specimen.latitude}</Table.Cell>;
      case "longitude":
        return <Table.Cell>{specimen.longitude}</Table.Cell>;
      case "elevation":
        return <Table.Cell key={index}>{specimen.elevation}</Table.Cell>;
      case "collector(s)":
        return <Table.Cell key={index}>{specimen.collectors}</Table.Cell>;
      case "freezer":
        return <Table.Cell key={index}>{specimen.freezer}</Table.Cell>;
      case "rack #":
        return <Table.Cell key={index}>{specimen.rack}</Table.Cell>;
      case "box":
        return <Table.Cell key={index}>{specimen.box}</Table.Cell>;
      case "size":
        return <Table.Cell key={index}>{specimen.size}</Table.Cell>;
      default:
        return null;
    }
  });
  return ret;
}

// ({data, filteredText, filterCategory, selectedUpdate, sortBy, clearQuery, current_query, query_headers})

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
      direction: null
    };
  }

  componentDidUpdate() {
    if (this.props.data.length !== 0 && this.state.display.length === 0) {
      let fetchAmount =
        this.props.data.length <= 50 ? this.props.data.length : 50;
      let hasMore = fetchAmount === this.props.data.length ? false : true;
      // console.log(`has more ${hasMore}`)
      const newDisplay = this.props.data.slice(0, fetchAmount);
      this.props.updateDisplayData(newDisplay);
      this.setState({
        display: newDisplay,
        hasMore: hasMore,
        prevFetchAmount: fetchAmount
      });
    } else if (
      this.props.data.length === 0 &&
      this.state.display.length !== 0
    ) {
      this.setState({
        display: Array.from({ length: 0 }),
        prevFetchAmount: 0
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
      this.props.data.length - this.state.display.length <= 50
        ? this.props.data.length - this.state.display.length
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
        return this.props.data[index];
      });
      this.props.updateDisplayData(newDisplay);
      this.setState({
        display: newDisplay
      });
    }, 500);
  };

  headerNameToFieldName = clickedColumn => {
    switch (clickedColumn) {
      case "Lep #":
        return "recoredNumber";
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

  sortList = (clickedColumn, direction) => {
    clickedColumn = this.headerNameToFieldName(clickedColumn);

    let newData = this.props.data;

    if (clickedColumn === "recordNumber" || clickedColumn === "catalogNumber") {
      if (direction === "ascending") {
        newData = newData.sort((a, b) => {
          let numA =
            a[clickedColumn].indexOf("-") > -1
              ? parseInt(a[clickedColumn].split("-")[1])
              : 0;
          let numB =
            b[clickedColumn].indexOf("-") > -1
              ? parseInt(b[clickedColumn].split("-")[1])
              : 0;

          return numA > numB ? 1 : numB > numA ? -1 : 0;
        });
      } else {
        newData = newData.reverse();
      }

      this.setState({ data: newData });
      return;
    }

    if (direction === "ascending") {
      newData = newData.sort((a, b) => {
        return a[clickedColumn] > b[clickedColumn]
          ? 1
          : b[clickedColumn] > a[clickedColumn]
          ? -1
          : 0;
      });
    } else {
      newData = newData.reverse();
    }

    this.setState({
      data: newData
    });
  };

  handleSort = clickedColumn => () => {
    const { column, direction } = this.state;

    if (column !== clickedColumn) {
      this.setState({
        column: clickedColumn,
        // data: _.sortBy(this.props.data, [clickedColumn]),
        data: this.sortList(clickedColumn, "ascending"),
        direction: "ascending"
      });

      return;
    } else if (column === clickedColumn) {
      if (direction === "ascending") {
        this.setState({
          data: this.sortList(clickedColumn, "descending"),
          direction: "descending"
        });
      } else {
        this.setState({
          data: this.props.data,
          direction: null,
          column: null
        });
      }
    }
  };

  renderList = () => {
    let collectionList = this.props.data;
    try {
      collectionList = collectionList
        .filter(specimen => {
          if (this.props.filterCategory === "*") {
            let tempSpecimen = { ...specimen };
            tempSpecimen.modifiedInfo = "";
            return (
              JSON.stringify(tempSpecimen)
                .toLowerCase()
                .indexOf(this.props.filteredText.toLowerCase()) >= 0
            );
          } else {
            return (
              specimen[this.props.filterCategory]
                .toLowerCase()
                .indexOf(this.props.filteredText.toLowerCase()) >= 0
            );
          }
        })
        .map((specimen, index) => {
          let cells = getCells(specimen, this.props.query_headers);

          return (
            <Table.Row
              key={index}
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
    // console.log(specimenHeaders)

    return (
      <React.Fragment>
        <Table sortable celled selectable stackable>
          <Table.Header>
            <Table.Row>{specimenHeaders}</Table.Row>
          </Table.Header>
          <Table.Body>
            <div
              id="scrollableDiv"
              style={{ height: "70vh", overflow: "auto" }}
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
                hasMore: false,
                display: Array.from({ length: 0 })
              });
            }}
            disabled={this.props.current_query === "" ? true : false}
            style={{ marginLeft: "1rem" }}
          >
            Clear Query
          </Button>
          <Button
            icon
            onClick={() => {
              // console.log('refreshed!')
              let command = this.props.current_query;
              this.props.clearQuery();
              this.props.updateRefreshStatus(true);
              this.props.updateLoadingStatus(true);
              this.props.runQuery(command);
            }}
            disabled={this.props.current_query === "" ? true : false}
          >
            <Icon name="refresh" />
          </Button>
          <div className="query-text">
            <h4>Query Size:</h4>
            <p>{this.props.data.length}</p>
          </div>
          <div className="query-text">
            <h4>Filtered Size:</h4>
            <p>
              {this.props.filteredText !== ""
                ? collectionList.length
                : this.props.data.length}
            </p>
          </div>
          <div className="query-text">
            <h4>Current Loaded:</h4>
            <p>
              {this.props.data.length === 0 ? 0 : this.state.display.length}
            </p>
          </div>
          <div style={{ float: "right" }}>
            <QueryHelp queryType="LIST_HELP" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

// SCROLLABLE https://codesandbox.io/s/p2pr9zjrvj
// https://react.semantic-ui.com/collections/table/#variations-sortable
