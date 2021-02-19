---
id: homelayout
title: Layout
---

<img
src={require('./assets/homelayout.png').default}
alt="Example banner"
/>

SpeSQL's design is continually changed throughout development as features get added, however the homepage will remain to be comprised of 3 major parts:

## Header

The header contains the triggers for interacting with the various query functionalities. There are two dropdown menus for the two major groups of query options. On the selection of an item nested in one of these menus, the corresponding modal will render. Each modal is tailored to whatever the query structure is, the embedded form is filled out to build the target query. The header is the top most portion of the image above:

<img
src={require('./assets/header.png').default}
alt="Example banner"
class="shadow round"
/>

<br />
<br />

### Dropdown Menus

The Header has the following dropdown menus with corresponding internal options:

- General Query Menu
  - Select Query Builder
  - Count Query Builder
  - Update Query Builder
  - Advanced Query Builder
- Insert Menu
  - Bulk Insert Form
  - Single Insert Form
- User Menu
  - Log Out
  - Navigate to Settings
  - Navigate to Admin Panel

### Download

This allows you to download the resulting query data as a CSV file. It will be disabled until data becomes available.

### View Toggle

The toggle to the right of the Download button toggles between the Homepage and the Visualization page. The Visualization page is under active development, focusing on providing Summary Statistics Visualizations to SpeSQL.

## Specimen Table

The Specimen table will populate with values once a Select query sucessfully returns tuples from the target database table. The table is not paginated, it is a virtualized scrolling list. There are various actions you may take on the returned data using the table's bottom toolbar. These actions are outlined in the individual documentation page for the table. Below is an example of what this table looks like when populated with a data:

<img
src={require('./assets/table.png').default}
alt="Example banner"
class="shadow round"
/>

## Specimen View

The Specimen View will render a list of all existing / non-NULL fields of a on the selection of a tuple in the Specimen Table. By default, the list excludes fields which are NULL. As with the table, this list is a scrolling list. An example of the Specimen View when populated with a selection would be:

<img
src={require('./assets/sview.png').default}
alt="Example banner"
class="shadow round"
/>
