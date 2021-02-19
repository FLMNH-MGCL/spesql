---
id: updatebulk
title: Update Bulk
---

Update queries are those which update tuples in the database given a set of changes and conditions. In SpeSQL they are limited to requiring narrow conditions, as a safety precaution to prevent mass, accidental updates.

<img
src={require('./assets/bulkupdate.png').default}
alt="Single Update Form"
class="shadow round"
/>

<br/>
<br/>

In order to best overview the functionality of the Update Form, the SQL basics for an update query will be overviewed first.

## SQL Syntax Basics

One of the basic formats of a SQL UPDATE statement is as follows:

```sql
UPDATE table_name SET column_name = 'new_value' [WHERE condition];
```

This will set the value of each tuple that matches the provided condition to the 'new_value' specified in the query.

## Update Form

The form to build update queries is structured in a way to support this query format, with the main parts being `set statements` and `condition statements`. These are not valid, SQL terms, rather representations of two essential parts of the UPDATE statement.

### Set Statements

These refer to the changes / updates that will be made on a successful query. You must state how many set statements there will be (how many fields will be altered) and then indicate what the new values should be.

Validation is run on all the proposed updates once the fields are selected for each set statement.

### Condition Statements

These refer to the conditions for which tuples in the database must match in order for the set statements above to take effect. You must state how many conditions there will be and the conditionals should be.

#### Conditional Joiner

There is a toggle between AND and OR in the conditional section of the query builder forms, this is where you are able to select how your conditions are grouped together. The selection applies for all conditions, however, so if you were to select AND then all the conditions would be AND'ed together.

Please see the <a href='advancedbuilder'>Advanced Query Builder</a> section for more complex conditional statement options
