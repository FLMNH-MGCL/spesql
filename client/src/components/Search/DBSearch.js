import React from "react";
import { Input, Popup } from "semantic-ui-react";
// import {headerSelection} from '../Query/QueryConstants/constants'

class DBSearch extends React.Component {
  handleChange = (e, { filteredText, value }) => {
    console.log(value);
    this.props.updateFilteredText(value);
  };

  render() {
    const { filteredText } = this.props;

    let popupMessage = "";
    if (this.props.disabled) {
      if (this.props.queryLength === 0) {
        popupMessage = "Make a query to be able to search";
      }
    } else {
      popupMessage = "";
    }

    return (
      <Popup
        content={popupMessage}
        disabled={popupMessage === ""}
        trigger={
          <Input
            placeholder="enter search terms"
            icon="search"
            value={filteredText}
            onChange={this.handleChange}
            disabled={this.props.disabled}
          />
        }
      />
    );
  }
}
export default DBSearch;
