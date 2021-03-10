---
id: visualizationlayout
title: Layout
---

## Overview

<b>This feature of SpeSQL is still in early development, and as such is subject to change. Not all charts are supported, not all currently supported charts are documented. Treat this section as a living document.</b>
<br/>
<br/>
The internal layout of the Visualization Page is very similar of that to the Homepage, where there are two major pieces. The left side is where the chart will be rendered, and the right side is where the query is configured.
<br/>
<br/>

<img
src={require('./assets/vlayout.png').default}
alt="Visualization Layout"
class="shadow round"
/>

## Available Functions

Select features are dynamicly changed according to the selected Chart Type. This is because different Chart Types have different configuration and data schemas. For the examples shown below, a simple BarChart configuration is what will be used.

### Clear Chart

<img
src={require('./assets/clearchart.png').default}
alt="Clear Chart"
class="shadow round"
/>

<br/>
<br/>

This will clear both the data used in the chart as well as the currently rendered chart.

### Download Chart Data

<img
src={require('./assets/downloadchartdata.png').default}
alt="Download Chart"
class="shadow round-full"
/>

This will download the data used to create the chart as a CSV.

### Adjust Chart

<img
src={require('./assets/headeradjust.png').default}
alt="Adjust Chart"
class="shadow round-full"
/>

<br/>
<br/>

The Adjust Chart button will render a modal which allows for extensive configuration of the chart. Things such as axis labels, colors, titles, etc are all configurable from this modal. Below is the BarChart Adjustment Modal:

<img
src={require('./assets/chartadjust.png').default}
alt="Adjust Chart Modal"
class="shadow round"
/>

<br/>
<br/>

_Please note: while the base configuration will be very similar between charts, there will be some that unique, adjustable fields for some charts, and some that are missing adjustable fields._

### Maximize/Minimize Chart Window

<img
src={require('./assets/maximize.png').default}
alt=""
class="shadow round-full"
/>

<br/>
<br/>

The Maximize (or Minimize) button will change the size of the Chart Window to take up the entire inner space. Essentially, the right-hand menu will collapse to make room for the left-hand side.

### Configure Chart Query

<img
src={require('./assets/configquery.png').default}
alt=""
class="shadow round"
/>

<br/>
<br/>

The Configure Query button renders a modal used to construct a query that will allow for the Chart Type data structure to be returned. As such, each chart type will have a slightly different form when the allowed data input differs. More advanced SQL functionalities such as subqueries, unions, etc are not supported in this form. There is an advanced option available (see next heading).

Below is the BarChart Query Config Modal:

<img
src={require('./assets/configquerymodal.png').default}
alt=""
class="shadow round"
/>

### Advanced Configure Chart Query

<img
src={require('./assets/advqueryconfig.png').default}
alt=""
class="shadow round-full"
/>

<br/>
<br/>

Clicking the Scientific Beaker Icon will render the Advanced Query Config modal for the Chart. Here, you may write SQL code directly into the text box. There is syntax highlighting for convenience.

<img
src={require('./assets/advqueryconfigmodal.png').default}
alt=""
class="shadow round"
/>
