---
id: specimentable
title: Specimen Table
---

## Header Row

Clicking a header cell will sort the corresponding column in a logical order, ascending on the first click and descending on the second. A small arrow icon will be rendered to aid in the visualization of the currently selected order direction. When there are multiple datatypes in a column, numerical values take order precedence over alphabetical ordering (i.e. 1234 is 'less than' abcd). A third click will reset the ordering.

## Table Body

Selecting a row will trigger the Specimen View to render the corresponding tuple's data. Apart from this, there is no further functionality in the Table Body.

## Footer Row

There are multiple actions available to you in the Footer Row:

### Search Filter + Search Input

<div class="flex">
<img
src={require('./assets/filter.png').default}
alt="Filter Search Fields"
class="shadow round-full space-r"
/>
<img
src={require('./assets/filtersearch.png').default}
alt="Filtered Search Input"
class="shadow round object-scale-down space-l"
/>
</div>
<br/>

The Filter and Filter Search are a paired functionality. The Filter defines the fields in which the Search input matches on the returned data. By default, the Search input matches on all fields, meaning if there is any field in a given tuple that matches the input then it will not be filtered out.

For example, if you were to narrow the filter to only match `id` and input a non-numerical value, then there would be no filtered results. You may construct the Filtered Fields by clicking the Filter button, which will launch the corresponding modal (see below).

<img
src={require('./assets/filtermodal.png').default}
alt="Filtered Search Modal"
class="shadow round object-scale-down"
/>
<br/>
<br/>
You may drag any fields you would like to include in the filter to the left-hand side, the "Selected" column. As stated previously, the default is to include <b>all</b> fields in the filter, so when the "Selected" column is empty the filter is <b>all</b>. For more help, please consider the following example:
<br/>

#### Data Set

| id  | catalogNumber | otherCatalogNumber | recordedBy    | ... |
| --- | ------------- | ------------------ | ------------- | --- |
| 0   | LEP12345      | MGCL_1234567       | Your's Truly  | ... |
| 1   | LEP123456     | MGCL_12345678      | Michael Scott | ... |
| 2   | LEP543210     | MGCL_7654321       | Frodo Baggins | ... |

#### Scenario 1

##### Search Configuration

```
selected filters: none (i.e. all fields)
input: you
```

##### Resulting, Filtered Data Set

| id  | catalogNumber | otherCatalogNumber | recordedBy   | ... |
| --- | ------------- | ------------------ | ------------ | --- |
| 0   | LEP12345      | MGCL_1234567       | Your's Truly | ... |

#### Scenario 2

##### Search Configuration

```
selected filters: id,catalogNumber
input: 12
```

##### Resulting, Filtered Data Set

| id  | catalogNumber | otherCatalogNumber | recordedBy    | ... |
| --- | ------------- | ------------------ | ------------- | --- |
| 0   | LEP12345      | MGCL_1234567       | Your's Truly  | ... |
| 1   | LEP123456     | MGCL_12345678      | Michael Scott | ... |

#### Scenario 3

##### Search Configuration

```
selected filters: id
input: 12
```

##### Resulting, Filtered Data Set

| id  | catalogNumber | otherCatalogNumber | recordedBy | ... |
| --- | ------------- | ------------------ | ---------- | --- |
|     |               |                    |            |     |

### Clear Query

<img
src={require('./assets/clearq.png').default}
alt="Clear Query Button"
class="shadow round object-scale-down"
/>

The Clear Query button clears the currently loaded query from the program. This will remove the data from the table and deselect any selected tuples.

### Refresh Query

<img
src={require('./assets/refresh.png').default}
alt="Refresh Icon"
class="shadow round-full object-scale-down"
/>

The Refresh Query button will rerun the currently loaded query. If there is no query loaded, this will be disabled.

### Adjust Table Headers

<img
src={require('./assets/headeradjust.png').default}
alt="Header Adjust Icon"
class="shadow round-full object-scale-down"
/>

The Adjust Table Headers button will open a modal in which you may alter the visible columns on the table. The default visible columns are: `catalogNumber,otherCatalogNumber,order_,genus,specificEpithet`. Similar to the Filter modal, you may drag and drop fields to the Selected and Available columns, and reorder the fields in the Selected Column. All changes will be immediately reflected on the Specimen Table. Below, you will find an example of the default configuration, and then the default configuration plus the addition of the `id` field as the first visible column. Please notice, after the `id` label is dragged over to the Selected column, you see it in the Specimen Table behind the modal.

<img
src={require('./assets/headerconfigdefault.png').default}
alt="Refresh Icon"
class="shadow round object-scale-down"
/><img
src={require('./assets/headerconfigid.png').default}
alt="Refresh Icon"
class="shadow round object-scale-down"
/>

### Show Logs

<img
src={require('./assets/logs.png').default}
alt="Log Button"
class="shadow round-full object-scale-down"
/>

The Warning Icon button will lauch the Error Log Modal. This is a paginated modal, where each page relates to a specific type of error. Generally, these follow specific query type errors: `Select, Count, Insert, Update and Delete` error types.

<img
src={require('./assets/errorlogs.png').default}
alt="Log Modal"
class="shadow round object-scale-down"
/>

### Help Menu

<img
src={require('./assets/help.png').default}
alt="Example banner"
class="shadow round-full object-scale-down"
/>

Help Icons are spread all throughout the application, and have corresponding contexts to where they are located. In the Table Footer, this is a Global Help Modal, comprised of general SpeSQL help/tips. If you were to see the Help Icon in the Select Query Builder, you may assume that the information in the modal will be relevant to Select Queries.
