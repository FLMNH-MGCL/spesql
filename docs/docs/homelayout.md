---
id: homelayout
title: Layout
---

SpeSQL's homepage is composed of 3 major parts:

- [Header](#header)
  - [Menus](#menus)
  - [Download](#download)
  - [Toggle](#toggle)
- [Specimen Table](#specimen-table)
- [Specimen View](#specimen-view)

<img
src={require('./assets/homelayout.png').default}
alt="Example banner"
/>

### Header

The header contains the triggers for interacting with the various query functionalities. There are two dropdown menus for the two major groups of query options. On the selection of an item nested in one of these menus, the corresponding modal will render. Each modal is tailored to whatever the query structure is, the embedded form is filled out to build the target query. The header is the top most portion of the image above:

<img
src={require('./assets/header.png').default}
alt="Example banner"
/>

<br />
<br />

#### Menus

- Query
  - Select Query Builder
  - Count Query Builder
  - Update Query Builder
- Insert
  - Bulk Insert Form
  - Single Insert Form
- User (right side)
  - Log out
  - Navigate to Settings
  - Navigate to Admin Panel

#### Download

This allows you to download the resulting query data as a CSV file

#### Toggle

The toggle to the right of the Download button toggles between the homepage and the visualization page

### Specimen Table

The Specimen table will populate with values once a Select query sucessfully returns tuples from the target database table. The table is not paginated, rather it is a virtualized scrolling list. There are various actions you may take on the returned data using the table's bottom toolbar, these are outlined in the individual documentation page for the table. An example of what this table looks like when populated with a select query would be:

<img
src={require('./assets/table.png').default}
alt="Example banner"
/>

### Specimen View

The specimen view will render a list of all available / non-null fields of a selected tuple returned from a select query. The table does not show all the fields available in a database table, only what is configured to display (up to 8 fields). As with the table, this list is a scrolling list. There is a toggle available if you would like to have the null fields displayed, however they are hidden by default. An example of the Specimen View when populated with a selection would be:

<img
src={require('./assets/sview.png').default}
alt="Example banner"
/>
