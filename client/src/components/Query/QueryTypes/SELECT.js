import React from "react";
// import axios from "axios";
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
  selectQueryOption,
  headerSelection,
  // setOperatorOptions,
  conditionalOperatorOptions,
  // setCountOptions,
  conditionalCountOptions
} from "../QueryConstants/constants";
import QueryHelp from "../QueryHelp";
import ErrorTerminal from "../QueryTerminals/ErrorTerminal";
// import { checkAdvancedSelect } from "../../../functions/queryChecks";
// import { createAutoGenFields } from "../../../functions/helpers";

export default class SELECT extends React.Component {
  state = {
    advanced_query: "",
    basic_query: true,
    query_action: "SELECT",
    fields: ["*"],
    db: "",
    conditionalCount: 0,
    conditionals: [],
    fields_search: [],
    search_: "",
    operator: "",
    loading: false
  };

  checkBasicQueryErrors = () => {
    // return ['test 1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test 1', 'test2', 'test3', 'test4', 'test5', 'test6']
    let errors = [];
    if (this.state.query_action.toUpperCase() !== "SELECT") {
      errors.push(
        "Query Type Error: Invalid query type. This section is reserved for SELECT queries only."
      );
    }
    if (this.state.fields.length > 1 && this.state.fields.indexOf("*") > -1) {
      errors.push(
        "Query Format Error: If ALL is selected, no other fields should be selected."
      );
    }
    if (this.state.fields.length === 0) {
      errors.push("Query Format Error: A field must be selected.");
    }
    if (this.state.db === "") {
      errors.push("Query Format Error: A database table must be selected.");
    }
    if (this.state.fields.indexOf("*") < 0) {
      this.state.conditionals.forEach((condition, index) => {
        if (this.state.fields.indexOf(condition.field) < 0) {
          errors.push(
            `Query Format Error: Attempting have condition in field not queried for. Field ${condition.field} is missing from query.`
          );
        }
      });
    }

    // if () {
    //     errors.push()
    // }
    // if () {
    //     errors.push()
    // }

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

  checkAdvancedSelect = () => {
    let errors = [];
    if (this.state.advanced_query === "") {
      errors.push("Format Error: Empty submission detected.");
    }
    if (!this.state.advanced_query.toLowerCase().startsWith("select")) {
      errors.push(
        "Query Format Error: Invalid query type. This section is reserved for SELECT queries only."
      );
    }

    return errors;
  };

  // DANGEROUS, EASY TO BREAK NEED MORE CHECKS
  handleSubmit = () => {
    let errors = this.checkBasicQueryErrors();
    if (errors.length > 0) {
      // errors found, update redux error for select query
      this.props.notify({
        type: "error",
        message: "Uh oh, some errors detected. Please check SELECT error log"
      });
      this.props.updateSelectErrorMessage(errors);
      return;
    } else {
      // console.log('made it to else???')
      let command = String(this.state.query_action + " ");

      for (let i = 0; i < this.state.fields.length; i++) {
        command += this.state.fields[i];

        if (i !== this.state.fields.length - 1) {
          command += ",";
        } else {
          command += " ";
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

      // console.log(command)
      this.props.closeModal();
      this.props.clearQuery();
      this.props.runQuery(command);
    }
  };

  handleAdvancedSubmit = () => {
    this.setState({ loading: true });
    this.props.updateSelectErrorMessage(null);
    let errors = this.checkAdvancedSelect(this.state.advanced_query);

    if (errors.length > 0) {
      this.props.notify({
        type: "error",
        message: "Uh oh, some errors detected. Please check SELECT error log"
      });
      this.props.updateSelectErrorMessage(errors);
    } else {
      this.props.runQuery(this.state.advanced_query);
    }

    setTimeout(() => {
      if (!this.props.loading && !this.props.errorMessages.selectError) {
        this.props.closeModal();
      } else {
        this.setState({ loading: false });
      }
    }, 500);
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleCheck = (e, { name, value }) =>
    this.setState({ where: !this.state.where });

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
                this.state.conditionals[index].field === "" &&
                this.state.basic_query
                  ? { content: "You must select a conditional field." }
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
                this.state.conditionals[index].operator === "" &&
                this.state.basic_query
                  ? { content: "You must select a conditional operator." }
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
                this.state.conditionals[index].searchTerms === "" &&
                this.state.basic_query
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

  renderBasicForm = (
    query_action,
    fields,
    db,
    conditionalCount,
    conditionals
  ) => (
    <Form onSubmit={this.handleSubmit}>
      <Form.Group widths="equal">
        <Form.Field
          control={Select}
          options={selectQueryOption}
          label="QUERY"
          placeholder="SELECT"
          search
          name="query_action"
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
            this.state.db === "" && this.state.basic_query
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
      <Form.Group>
        <QueryHelp queryType="SELECT" />
        <Form.Field
          id="form-button-control-ta-submit"
          control={Button}
          content="Submit"
          disabled={!this.state.basic_query}
        />
      </Form.Group>
      {this.state.loading
        ? "Loading... This may take some time, please wait."
        : null}
    </Form>
  );

  renderErrorTerminal = () => (
    <React.Fragment>
      <ErrorTerminal errorLog={this.props.errorMessages.selectError} />
      <Button
        onClick={() => this.props.updateSelectErrorMessage(null)}
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

    const conditionals = this.renderConditions();

    return (
      <Grid padded>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header as="h2" dividing>
              SELECT Query:{" "}
            </Header>
            <Message>
              <p>
                This section is for SELECT queries. SELECT queries are those
                that simply fetch information from the database. If you have
                terminal/CLI experience using MySQL commands, there is an
                advanced query option available if checked. Click the Help
                button for more detailed information
              </p>
            </Message>
            <Form onSubmit={this.handleAdvancedSubmit}>
              <Form.Group>
                <Form.Field
                  control={Checkbox}
                  label="Advanced SELECT Query"
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
                    this.state.basic_query === false &&
                    !advanced_query.toUpperCase().startsWith("SELECT")
                      ? {
                          content: "This query must be a SELECT command."
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
              ? this.renderBasicForm(
                  query_action,
                  fields,
                  db,
                  conditionalCount,
                  conditionals
                )
              : null}

            {this.props.errorMessages.selectError
              ? this.renderErrorTerminal()
              : null}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}
