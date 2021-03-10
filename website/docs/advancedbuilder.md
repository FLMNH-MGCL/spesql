---
id: advancedbuilder
title: Advanced Query Builder
---

The Advanced Query Builder allows for more complex queries to be constructed without writing any SQL yourself.

<img
src={require('./assets/advquerybuilder.png').default}
alt="Select Query Form"
class="shadow round"
/>

### Overview

`select`, `count` and `update` queries may all be created in this modal. This is separate than the _advanced_ options found in each of those modals, however, as there is no requirement to write your own SQL.

There is a select input which triggers different forms to be rendered based on the query type you want to construct. They are largely similar to the forms found in their separate modals, as well.

### Conditional Statements

The main difference between this modal and the corresponding modals for `select`, `count` and `update`, is the manner in which _conditional statements_ are built.

You construct _groups_ of _rules_, in which groups are AND'd together and rules are either AND'd or OR'd together. Groups are indended in the UI, and there is a SQL preview which shows the equivalent SQL code for the form constructed. Below is a simple example:

<img
src={require('./assets/advquerybuilderexample.png').default}
alt="Select Query Form"
class="shadow round"
/>

In this case, the AND selected is not actually used since there is only one rule. If I were to add another rule in the form:

<img
src={require('./assets/advquerybuilderexample2.png').default}
alt="Select Query Form"
class="shadow round"
/>

you can see they are now AND'd together.
