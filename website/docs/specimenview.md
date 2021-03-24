---
id: specimenview
title: Specimen View
---

## Overview

The Specimen View will render a list of all existing / non-NULL fields of a on the selection of a tuple in the Specimen Table. By default, the list excludes fields which are NULL. As with the table, this list is a scrolling list. An example of the Specimen View when populated with a selection would be:

<img
src={require('./assets/specimenview.gif').default}
alt="Example Specimen View"
class="shadow round"
/>

## Availble Actions

### Single Insert

<img
src={require('./assets/addbtn.png').default}
alt="Add Button"
class="shadow round-full"
/>

If you haven't selected a row in the table body to populate the Specimen View, the bottom left will have a plus button which will render the Sinlge Insert form. This is where you may insert a single, new record into the database. Please see the <a href='insertsingle'>Single Insert</a> section for more information.

### Update

<img
src={require('./assets/edit.png').default}
alt="Edit Button"
class="shadow round-full"
/>

The Specimen View also doubles as a Single Update. Clicking the left-most pencil icon will trigger the update form to render inline with the list entries. This form allows for inline changes/edits to be made. Once you are ready to commit the updates, or cancel them, you may select either the Check button or the X-mark button (respectively).

<img
src={require('./assets/singleupdate.png').default}
alt="Single Update Form"
class="shadow round"
/>

### Delete

<img
src={require('./assets/delete.png').default}
alt="Delete Specimen button"
class="shadow round-full"
/>

Clicking the Trash icon button will launch a confirmation modal. If you click Confirm, the selected Tuple will be deleted from the database table.

<img
src={require('./assets/deletequery.png').default}
alt="Example banner"
class="shadow round"
/>

#### Delete queries are restricted

In order to prevent the chance of accidental, mass deletion events, you must delete one entry at a time. This is not only validated/restricted on the client-side, all queries will be checked for validity and safeness on the server, no matter the declared type.

If you need to delete at a faster pace or higher volume, please reach out to the database manager and they will expedite your requirements for you.

### Show Missing Toggle

The Show Missing radio button simply toggles the visibility of NULL/missing fields. Tuples in SpeSQL are assumed to be of a specific schema, so any fields that are missing or NULL according to the standard schema will be hidden by default.
