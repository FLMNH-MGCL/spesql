---
id: deletequery
title: Delete
---

Delete queries are heavily restricted. The only available deletion requests are single delete queries, which may only be accessed after the selection of an individual entry resulting from a previous select query.

<img
src={require('./assets/deletequery.png').default}
alt="Example banner"
/>

## Why Restricted?

In order to prevent the chance of accidental, mass deletion events, you must delete one entry at a time. This is not only validated/restricted on the client-side, all queries will be checked for validity and safeness on the server, no matter the declared type.

If you need to delete at a faster pace or higher volume, please reach out to the database manager and they will expedite your requirements for you.

## How To Delete

1. Make a SELECT query
2. click on the entry you would like to delete
3. click the trash icon on the Specimen View toolbar (see <a href='specimenview'>Specimen View</a> docs for more information)
4. Click 'Confirm' on the confirmation modal
