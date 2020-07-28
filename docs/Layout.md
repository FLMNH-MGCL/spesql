# Application Layout

### General Outline

There are 3 main parts of SpeSQL:

<ol>
    <li>Header</li>
    <li>Collection Table</li>
    <li>Specimen View</li>
</ol>

\*'d items are subject to user privilege, and may not appear if you do not have access

```
/*-------------------------------------------------------------------------------------------------------------*/
|                                                   HEADER                                                      |
/*-------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------*/   /*----------------------------------*/
|                            TABLE HEADER                              |   |                                    |
/*--------------------------------------------------------------------*/   |           Specimen View            |
|                             TABLE BODY                               |   |                                    |
|                                                                      |   |                                    |
|                                                                      |   |                                    |
|                                                                      |   |                                    |
|                                                                      |   |                                    |
|                                                                      |   |                                    |
|                                                                      |   |                                    |
|                                                                      |   |                                    |
|                                                                      |   |                                    |
|                                                                      |   |                                    |
|                                                                      |   |                                    |
/*--------------------------------------------------------------------*/   |                                    |
|                             TABLE FOOTER                             |   |                                    |
|                                                                      |   |                                    |
/*--------------------------------------------------------------------*/   /*----------------------------------*/
```

### Header

The header contains the triggers for interacting with the various query functionalities. Dropdown buttins will open a menu for query type selection. On the selection of one of these options, a corresponding modal will pop up. Each modal is tailored to whatever the query structure is, and the embedded form is filled out to build the target query. The header looks as follows:

```
/*------------------------------------------------------------------------------------------------------------*/
|  /*-----*/   /*------*/   /*--------*/                                                                       |
|  | Query |   | Insert |   | Download |                                                             username  |
|  /*-----*/   /*------*/   /*--------*/                                                                       |
/*------------------------------------------------------------------------------------------------------------*/
```

#### Query Button

Menu options are as follows:

<ol>
    <li>Select -- Modal for constructing select queries</li>
    <li>Count -- Modal for constructing count queries</li>
    <li>*Update -- Modal for constructing update queries</li>
</ol>

#### \*Insert Button

Menu options are as follows:

<ol>
    <li>CSV -- Modal for inserting many specimen using CSV files</li>
    <li>Manual -- Multi-paged modal for inserting a single specimen</li>
</ol>

#### Download Button

Launches a modal to download the current select query as a CSV file. This is only an option given there is a select query loaded.

#### User Button

This will be labeled as your username. Clicking launches a menu as follows:

<ol>
    <li>Logout</li>
    <li>*Admin Portal</li>
</ol>

### Collection Table

The collection table itself consists of two main parts:

<ol>
    <li>The Table -- Consisting of the header and body</li>
    <li>The Footer -- More actions for interacting with current query</li>
</ol>

#### The Table (Header)

The table header will dynamically set itself depending on the select query loaded. It will however default to the same set when the data exists (i.e. not narrowing the fields included in the query). A narrowed query in this use case is defined as something to the effect of not 'selecting all' fields, such as `select catalogNumber,genus from table_name` as opposed to `select * from table_name`. <br /><br />Clicking on a header will sort the data by column, first ascending, then descending on the second click and removing the sort and restoring the original order on the third.

#### The Table (Body)

All of the returned entries loaded from a select query will live here as rows. Each row is clickable, and will trigger the Specimen View (which will be discussed later in this document).

#### The Table Footer

The table footer has two rows: the bottom row contains a set of actions performable on the currently loaded query on the left and information about the query on the right side. The top row contains the raw string value of the currently loaded query. The structure is as follows:

```
/*-----------------------------------------------------------------------------------------------------------*/
|   Current Query: select * from table_name                                                                   |
|_____________________________________________________________________________________________________________|
|                                                                                                             |
|                                                                                                             |
| filter_btn   search_box  clear_btn refresh_btn  error_info_btn                 Query Size: number  help_btn |
|                                                                                                             |
/*------------------------------------------------------------------------------------------------------------*/
```

### Specimen View
