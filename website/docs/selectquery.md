---
id: selectquery
title: Select
---

Select queries are those which retrieve data from one or more tables in the database. You can use this statement to retrieve all the rows from a table in one go, as well as to retrieve only those rows that satisfy any number of conditions.

<img
src={require('./assets/selectquery.png').default}
alt="Select Query Form"
/>

## SQL Syntax Basics

The basic structure of a SELECT statement is as follows:

```sql
SELECT col_name, col_name_2, col_name_3 FROM table_name;
```

You specify (or 'select') a list of columns from a named table in the database to extract. This will result in a table which is a subset of the entire table, but with the specified columns only.

The form available to you in this query builder follows this format, where you select the fields you would like returned, the table you are querying from, and a list of conditions (if applicable).

### Conditionals

An important part of SQL select queries are conditional statements, or WHERE statements. WHERE statements alter the resulting table so that only entries that match a given condition are returned. The general format is as follows:

SELECT \* FROM table_name WHERE col_name_2 = 'Some Value';
There are many SQL operators other than 'equal to' used in the example, so be sure to reference this small help guide for more examples.

#### Conditional Joiner

There is a toggle between AND and OR in the conditional section of the query builder forms, this is where you are able to select how your conditions are grouped together. The selection applies for all conditions, however, so if you were to select AND then all the conditions would be AND'ed together.

Please see the <a href='advancedbuilder'>Advanced Query Builder</a> section for more complex conditional statement options

## Advanced Query Option

If you are familiar with SQL queries, there is an input available for you to issue requests directly. Please keep in mind, these are restricted to the query type whenever you see these options. For example, this query form would only accept SELECT statements, you cannot attempt to issue an UPDATE.
