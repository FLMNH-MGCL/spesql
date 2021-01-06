---
id: updatesingle
title: Update Single
---

The Single Update query form is available in the Specimen View toolbar. The Specimen View list is converted to a form, where inline edits are now available.

<img
src={require('./assets/singleupdate.png').default}
alt="Single Update Form"
/>

## Inline Form

The Single Update form is all inline editing, meaning you make edits directly in the list view and then 'commit' the changes once completed.

By default, values that are NULL in the entry are hidden, so if you wish to add values to missing fields be sure to check 'Show Missing' in the Specimen View toolbar (see <a href='specimenview'>Specimen View</a> docs for more information).

## How to Render the Form

1. Make a SELECT query
2. click on the entry you would like to edit
3. click the pencil icon on the Specimen View toolbar
4. Make edits
5. Once done, hit the check to update the entry or the 'x' to cancel the edit.
