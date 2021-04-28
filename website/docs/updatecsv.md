---
id: updatecsv
title: CSV/XLSX Update
---

SpqSQL now has an option to run update queries from a CSV/XLSX spreadsheet. Functionally, this works very similar to the insertion via CSV/XLSX, but rather than inserting new values it updates the values for each catalogNumber.

<img
src={require('./assets/updatecsv.png').default}
alt="Select Query Form"
class="shadow round"
/>

## Notes

It is good practice to only use this on _like_ data, or data that require similar or parallel updates. This is to reduce the chance of removing/clearing data accidentally. SpeSQL will, however, as a precaution automatically remove empty cells from update the generated update queries. The input and output objects prior to query generation look something like the following:

`example_updates.csv`

| catalogNumber | field1   | field2 | ... |
| ------------- | -------- | ------ | --- |
| LEP1234567    | newvalue |        | ... |
| ...           | ...      | ...    | ... |
| ...           | ...      | ...    | ... |

```json
// BEFORE VALIDATION
[
  {
   "catalogNumber": "LEP1234567",
   "updates": {
        "field1": "newvalue",
        "field2": undefined
    }
  },
  {
    ...
  }
]

// AFTER VALIDATION
[
  {
   "catalogNumber": "LEP1234567",
   "updates": {
        "field1": "newvalue"
    }
  },
  {
    ...
  }
]
```
