---
id: quickselect
title: Quick Select
---

SpeSQL has a new feature for rapid record selection based on catalogNumbers only.

<img
src={require('./assets/quickselect.png').default}
alt="Select Query Form"
class="shadow round"
/>

<br />
<br />

In the examples below I am only listing the catalogNumbers as returns, please keep in mind these will load the entire record as when you use the Select Query Modal, and this is just for simplicity in showcasing the functionalities.

## Matching Options

There are 4 options for finding records by catalogNumber in the quick selection modal:

### Exact

Exact search will return one record with the exact catalogNumber specified.

E.g. `LEP123456 -> LEP123456`

### Beginning Pattern (Starts With)

Starts With will return records that start with the input (keep in mind, all catalogNumbers are prefixed with LEP).

E.g. `LEP3 -> [LEP30000, LEP30001, LEP300002, ... , etc]`

### Ending Pattern (Ends With)

Ends With will return records that end with the input.

E.g. `233 -> [LEP30233, LEP40233, LEP50233, ... , etc]`

### Global Pattern (Contains)

Contains will return records that have the input anywhere in the value.

E.g. `23 -> [LEP23000, LEP23232, LEP50233, ... , etc]`
