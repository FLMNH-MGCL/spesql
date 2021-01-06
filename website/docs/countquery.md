---
id: countquery
title: Count
---

Count queries aren't actually a separate query type, rather they are just select queries with an aggregate function being applied (in this case, the COUNT function).

Please note: All select queries have their size displayed at the table footer, the purpose of this modal is to allow for querying the counts without the overhead of loading the otherwise returned tuples into the table.

<img
src={require('./assets/countquery.png').default}
alt="Count Query Form"
/>

## SQL Syntax Basics

The basic structure of a SELECT statement using a COUNT aggregate function is as follows:

```sql
SELECT COUNT(col_name) FROM table_name;
```

The form available to you in this query builder follows this format only; since this is a SELECT statement, tuple data may be returned by querying for more than just the count, however this will only be supported in the visualization page of SpeSQL.

### Distinct Toggle

When applying an aggregate COUNT function on more than one field, you will need to toggle the Distinct radio button in the query builder form. This will group and only count tuples with distinct combinations of the fields in the aggregate.

```sql
SELECT COUNT(DISTINCT col_name, col_name_2) FROM table_name;
```

### Conditional Joiner

There is a toggle between AND and OR in the conditional section of the query builder forms, this is where you are able to select how your conditions are grouped together. The selection applies for all conditions, however, so if you were to select AND then all the conditions would be AND'ed together.

Please see the <a href='advancedbuilder'>Advanced Query Builder</a> section for more complex conditional statement options

## Advanced Query Option

If you are familiar with SQL queries, there is an input available for you to issue requests directly. Please keep in mind, these are restricted to the query type whenever you see these options.

For example, this query form would only accept SELECT statements with <b>only</b> a COUNT aggregate function in the selection, you cannot attempt to issue an UPDATE or a traditional SELECT statement here.
