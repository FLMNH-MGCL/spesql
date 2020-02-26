import React from "react";
import axios from "axios";
import {
  Button,
  Grid,
  Form,
  Input,
  Select,
  Checkbox,
  Message,
  Header
} from "semantic-ui-react";
import {
  countQueryOption,
  headerSelection,
  setOperatorOptions,
  conditionalOperatorOptions,
  setCountOptions,
  conditionalCountOptions
} from "../QueryConstants/constants";
import CountTerminal from "../QueryTerminals/CountTerminal";
import QueryHelp from "../QueryHelp";
import ErrorTerminal from "../QueryTerminals/ErrorTerminal";

export default class COUNT extends React.Component {
  state = {
    advanced_query: "",
    basic_query: true,
    query_action: "COUNT",
    fields: ["*"],
    db: "",
    conditionalCount: 0,
    conditionals: [],
    waiting: true,
    submitted: false,
    hasError: false
  };

  basicErrorCheck = () => {
    let errors = [];

    if (this.state.fields.length < 1) {
      errors.push("Query Format Error: Must select a field.");
    }

    if (this.state.fields.indexOf("*") > -1 && this.state.fields.length > 1) {
      errors.push(
        "Query Format Error: If ALL is selected, no other fields should be selected."
      );
    }

    if (this.state.db === "") {
      errors.push("Query Format Error: A database table must be selected.");
    }

    return errors;
  };

  checkFieldError = () => {
    if (this.state.fields.length < 1) {
      return { content: "You must select a field." };
    } else if (
      this.state.fields.length > 1 &&
      this.state.fields.indexOf("*") > -1
    ) {
      return {
        content: "If All is selected no other fields should be selected."
      };
    }
  };

  advancedChecks = () => {
    let errors = [];

    if (this.state.advanced_query === "") {
      errors.push("Format Error: Query must not be empty.");
    }

    if (!this.state.advanced_query.toLowerCase().startsWith("select count")) {
      errors.push(
        "Query Type Error: Invalid query. See help button for more information."
      );
    }

    return errors;
  };

  handleSubmit = () => {
    let errors = this.basicErrorCheck();

    if (errors.length !== 0) {
      this.props.notifiy({
        type: "error",
        message: "Uh oh, some errors detected. Please check COUNT error log"
      });
      this.props.updateCountErrorMessage(errors);
      this.setState({ hasError: true });
    } else {
      let command = String("SELECT " + this.state.query_action + "(");

      for (let i = 0; i < this.state.fields.length; i++) {
        command += this.state.fields[i];

        if (i !== this.state.fields.length - 1) {
          command += " AND ";
        } else {
          command += ") ";
        }
      }

      command += "FROM " + this.state.db;

      if (this.state.conditionalCount > 0) {
        command += " WHERE ";

        let conditionalString = "";

        this.state.conditionals.forEach((conditional, index) => {
          conditionalString += conditional.field + " ";
          conditionalString += conditional.operator + " ";
          conditionalString += "'" + conditional.searchTerms + "'";

          if (index === this.state.conditionalCount - 1) {
            conditionalString += ";";
          } else {
            conditionalString += " AND ";
          }
        });

        command += conditionalString;
      } else command += ";";

      // this.setState({submitted: true})
      this.props.runQuery(command);
    }
  };

  handleAdvancedSubmit = () => {
    // this.setState({submitted: true})
    let errors = this.advancedChecks();

    if (errors.length > 0) {
      this.props.notifiy({
        type: "error",
        message: "Uh oh, some errors detected. Please check COUNT error log"
      });
      this.props.updateCountErrorMessage(errors);
      this.setState({ hasError: true });
    } else {
      // this.setState({submitted: true})
      this.props.runQuery(this.state.advanced_query);

      setTimeout(() => {
        if (this.props.errorMessages.countError) {
          this.setState({ hasError: true });
        }
      }, 500);
    }
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleAdvancedCheck = (e, { name, value }) =>
    this.setState({ basic_query: !this.state.basic_query });

  handleConditionalCountChange = (e, { name, value }) => {
    // get previous count
    let prevCount = this.state.conditionalCount;
    // if previous if smaller, concat more items to array
    if (prevCount < value) {
      let newConditionals = [...this.state.conditionals].concat(
        Array.from({ length: value - prevCount }, () => {
          return {
            field: "",
            operator: "=",
            searchTerms: ""
          };
        })
      );
      // console.log(newConditionals)

      this.setState({
        [name]: value,
        conditionals: newConditionals
      });
    } else if (prevCount > value) {
      let newConditionals = [...this.state.conditionals].slice(0, value);
      this.setState({
        [name]: value,
        conditionals: newConditionals
      });
    }
    // if previous is bigger, slice to match new count
  };

  handleConditionalItemChange = (e, { name, value, id }) => {
    const newConditional = {
      ...this.state.conditionals[id],
      [name]: value
    };

    this.setState({
      conditionals: [
        ...this.state.conditionals.slice(0, id),
        Object.assign({}, this.state.conditionals[id], newConditional),
        ...this.state.conditionals.slice(id + 1)
      ]
    });
  };

  renderConditions = () => {
    let conditionals = Array.from(
      { length: this.state.conditionalCount },
      (item, index) => {
        return (
          <Form.Group widths="equal">
            <Form.Field
              control={Select}
              options={headerSelection}
              label="Field"
              placeholder="FIELD"
              search
              name="field"
              error={
                this.state.conditionals[index].field === ""
                  ? { content: "You must select a UNIQUE conditional field." }
                  : false
              }
              value={this.state.conditionals[index].field}
              onChange={this.handleConditionalItemChange}
              id={index}
              disabled={!this.state.basic_query}
            />
            <Form.Field
              control={Select}
              options={conditionalOperatorOptions}
              label="Operator"
              placeholder="="
              name="operator"
              error={
                this.state.conditionals[index].operator === ""
                  ? {
                      content: "You must select an operator for the condition."
                    }
                  : false
              }
              value={this.state.conditionals[index].operator}
              onChange={this.handleConditionalItemChange}
              id={index}
              disabled={!this.state.basic_query}
            />
            <Form.Field
              control={Input}
              label="Search"
              placeholder="Search Term(s)"
              search
              name="searchTerms"
              error={
                this.state.conditionals[index].searchTerms === ""
                  ? { content: "You must enter a value for the conditional." }
                  : false
              }
              value={this.state.conditionals[index].searchTerms}
              onChange={this.handleConditionalItemChange}
              id={index}
              disabled={!this.state.basic_query}
            />
          </Form.Group>
        );
      }
    );
    return conditionals;
  };

  renderBasicForm = (query_action, fields, db, conditionalCount) => {
    let conditionals = this.renderConditions();
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field
            control={Select}
            options={countQueryOption}
            label="QUERY"
            placeholder="COUNT"
            search
            name="query_action"
            error={
              this.state.query_action === ""
                ? { content: "You must use a COUNT query here." }
                : false
            }
            value={query_action}
            onChange={this.handleChange}
            disabled={!this.state.basic_query}
            required
          />
          <Form.Field
            control={Select}
            options={headerSelection}
            label="FIELD"
            placeholder="FIELD"
            search
            multiple
            name="fields"
            error={this.checkFieldError()}
            value={fields}
            onChange={this.handleChange}
            disabled={!this.state.basic_query}
          />
          <Form.Field
            control={Select}
            options={this.props.dbSelection}
            label="Database Table"
            placeholder=""
            search
            name="db"
            error={
              this.state.db === ""
                ? { content: "You must select a database table." }
                : false
            }
            value={db}
            onChange={this.handleChange}
            disabled={!this.state.basic_query}
          />
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field
            control={Select}
            label="WHERE count (how many conditionals)"
            options={conditionalCountOptions}
            name="conditionalCount"
            value={conditionalCount}
            onChange={this.handleConditionalCountChange}
            disabled={!this.state.basic_query}
          />
        </Form.Group>
        {conditionals}
        <Form.Group className="float-right">
          <QueryHelp queryType="COUNT" />
          <Form.Field
            id="form-button-control-ta-submit"
            control={Button}
            content="Submit"
            disabled={!this.state.basic_query}
          />
        </Form.Group>
      </Form>
    );
  };

  renderErrorTerminal = () => (
    <React.Fragment>
      <ErrorTerminal errorLog={this.props.errorMessages.countError} />
      <Button
        onClick={() => {
          this.props.updateCountErrorMessage(null);
          this.setState({ hasError: false });
        }}
        color="red"
        style={{ float: "right" }}
      >
        Clear
      </Button>
    </React.Fragment>
  );

  render() {
    const {
      advanced_query,
      query_action,
      fields,
      db,
      conditionalCount
    } = this.state;

    return (
      <Grid padded style={{ paddingBottom: "2rem" }}>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h2" dividing style={{ paddingTop: "2rem" }}>
              COUNT Query:{" "}
            </Header>
            <Message>
              <p>
                This section is for COUNT queries. COUNT queries are very
                similar to SELECT queries, and actually involve a SELECT query
                directly. This query will count the number of entries in the
                database table based on the SELECT query provided. If you have
                terminal/CLI experience using MySQL commands, there is an
                advanced query option available if checked. Click the Help
                button for more detailed information
              </p>
            </Message>

            <Form onSubmit={this.handleAdvancedSubmit}>
              <Form.Group>
                <Form.Field
                  control={Checkbox}
                  label="Advanced COUNT Query"
                  name="basic_query"
                  value=""
                  onChange={this.handleAdvancedCheck}
                  width={3}
                />
                <Form.Field
                  control={Input}
                  name="advanced_query"
                  value={advanced_query}
                  onChange={this.handleChange}
                  disabled={this.state.basic_query}
                  width={10}
                  error={
                    !this.state.advanced_query
                      .toLowerCase()
                      .startsWith("select count") && !this.state.basic_query
                      ? {
                          content:
                            "You must use proper COUNT query syntax (see Help for more information)."
                        }
                      : false
                  }
                />
                <Form.Field
                  id="form-button-control-ta-submit-adv"
                  control={Button}
                  content="Submit"
                  disabled={this.state.basic_query}
                  width={3}
                />
              </Form.Group>
            </Form>

            {this.state.basic_query
              ? this.renderBasicForm(query_action, fields, db, conditionalCount)
              : () => console.log("no form needed")}
            {this.state.hasError ? (
              this.renderErrorTerminal()
            ) : (
              <>
                <CountTerminal
                  waiting={this.state.waiting}
                  submitted={this.state.submitted}
                  countQueryCount={this.props.countQueryCount}
                />
                <Button
                  color="red"
                  style={{ float: "right" }}
                  onClick={() => this.props.updateCountQueryCount(null)}
                >
                  Clear
                </Button>
              </>
            )}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
