# Server Routing

This will overview the routes utilized for client -> server interactions. This document is subject to change, and this blurb will be removed when I have reached a desired amount of consistency. This was a learning experience for me, and there can definitely be improvements in consistency when it comes to how response objects look. For example, you'll see some responses with `err` vs `error` or having `data` contain either error messages or success messages, and responses not using status codes. I will be converting all of these over to a new standard while writing the documentation.

### Major Routes

#### Login

| Path                   | `/api/login/`                                         |
| :--------------------- | :---------------------------------------------------- |
| <b>Description</b>     | Attempts to log user in                               |
| <b>Method </b>         | ![Post Request](../assets/post.png)                   |
| <b>Body Parameters</b> |                                                       |
| `user`                 | Required: yes                                         |
|                        | Type: string                                          |
|                        | Description: The username of the user used in login   |
| `password`             | Required: yes                                         |
|                        | Type: string                                          |
|                        | Description: The plain-text password entered at login |
| <b>Response object</b> |                                                       |
| `{ userData, authed }` | Type: JSON                                            |
|                        | `userData`: JSON object of user on successful login   |
|                        | `authed`: bool of auth state                          |
| `{ error, authed }`    | Type: JSON                                            |
|                        | `error`: Indication something went wrong              |
|                        | `authed`: bool of auth state                          |
| <b>Response Status</b> |                                                       |
| `200`                  | Sucessful login                                       |
| `400`                  | Bad Request: missing parameters or bad message format |
| `401`                  | Unauthorized: failed login                            |
| `503`                  | SQL Server Unavailable: likely a VPN issue            |

#### MySQL Select Query

| Path                   | `/api/select/`                                                                                                                                          |
| :--------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <b>Description</b>     | Run select query from body                                                                                                                              |
| <b>Method </b>         | ![Post Request](../assets/post.png)                                                                                                                     |
| <b>Body Parameters</b> |                                                                                                                                                         |
| `command`              | Required: yes                                                                                                                                           |
|                        | Type: string                                                                                                                                            |
|                        | Description: The select query to run                                                                                                                    |
|                        | Note: Must be select query (this is enforced)                                                                                                           |
| <b>Response object</b> |                                                                                                                                                         |
| `{ data }`             | Type: JSON                                                                                                                                              |
|                        | `data`: A list of specimen objects (<a href="https://github.com/FLMNH-MGCL/spesql/blob/main/docs/development/SpecimenDefinition.md">see definition</a>) |
| `{ error }`            | Type: JSON                                                                                                                                              |
|                        | `error`: SQL error response or string describing usage error                                                                                            |

#### MySQL Count Query

| Path                   | `/api/select-count/`                                                     |
| :--------------------- | :----------------------------------------------------------------------- |
| <b>Description</b>     | Run count query from body                                                |
| <b>Method </b>         | ![Post Request](../assets/post.png)                                      |
| <b>Body Parameters</b> |                                                                          |
| `command`              | Required: yes                                                            |
|                        | Type: string                                                             |
|                        | Description: The count query to run                                      |
|                        | Note: Must be count query (this is enforced)                             |
| <b>Response object</b> |                                                                          |
| `{ data }`             | Type: JSON                                                               |
|                        | Description `data`: An integer for the size of the query                 |
| `{ error }`            | Type: JSON                                                               |
|                        | Description `error`: SQL error response or string describing usage error |

#### MySQL Insert Query

| Path                   | `/api/insert/`                                                               |
| :--------------------- | :--------------------------------------------------------------------------- |
| <b>Description</b>     | Run insert query for specimen object from body                               |
| <b>Method </b>         | ![Post Request](../assets/post.png)                                          |
| <b>Body Parameters</b> |                                                                              |
| `specimen`             | Required: yes                                                                |
|                        | Type: JSON object                                                            |
|                        | Description: The JSON representaiton of the data to insert into the database |
| `table`                | Required: yes                                                                |
|                        | Type: string                                                                 |
|                        | Description: The name of the table to insert to                              |
| <b>Response object</b> |                                                                              |
| `{ success, data }`    | Type: JSON                                                                   |
|                        | `sucess`: bool for if insertion was successful                               |
|                        | `data`: SQL error on failure, affected row data on success                   |

#### MySQL Update Query

| Path                   | `/api/update/`                                                                  |
| :--------------------- | :------------------------------------------------------------------------------ |
| <b>Description</b>     | Run update query                                                                |
| <b>Method </b>         | ![Post Request](../assets/post.png)                                             |
| <b>Body Parameters</b> |                                                                                 |
| `command`              | Required: yes                                                                   |
|                        | Type: JSON object                                                               |
|                        | Description: Contains the string representaiton of the update command           |
|                        | Note: The command must be an update and must have conditions (this is enforced) |
| <b>Response object</b> |                                                                                 |
| `{ success, data }`    | Type: JSON                                                                      |
|                        | `sucess`: bool for if insertion was successful                                  |
|                        | `data`: SQL error on failure, affected row data on success                      |
| `{ success, error }`   | Type: JSON                                                                      |
|                        | `sucess`: bool for if insertion was successful                                  |
|                        | `error`: Human readable misuse error                                            |

#### MySQL Delete Query

| Path                   | `/api/delete/`                                                                 |
| :--------------------- | :----------------------------------------------------------------------------- |
| <b>Description</b>     | Run delete query                                                               |
| <b>Method </b>         | ![Post Request](../assets/post.png)                                            |
| <b>Body Parameters</b> |                                                                                |
| `command`              | Required: yes                                                                  |
|                        | Type: JSON object                                                              |
|                        | Description: Contains the string representaiton of the delete command          |
|                        | Note: The command must be a delete and must have conditions (this is enforced) |
| <b>Response object</b> |                                                                                |
| `{ success, data }`    | Type: JSON                                                                     |
|                        | `sucess`: bool for if deletion was successful                                  |
|                        | `data`: SQL error on failure, affected row data on success                     |
| `{ success, error }`   | Type: JSON                                                                     |
|                        | `sucess`: bool for if deletion was successful                                  |
|                        | `error`: Human readable misuse error                                           |

### Admin Operations

#### Creating Users

| Path                   | `/api/admin/create-user/`                                       |
| :--------------------- | :-------------------------------------------------------------- |
| <b>Description</b>     | Attempts to create user                                         |
| <b>Method </b>         | ![Post Request](../assets/post.png)                             |
| <b>Body Parameters</b> |                                                                 |
| `name`                 | Required: yes                                                   |
|                        | Type: string                                                    |
|                        | Description: The name of the user                               |
| `username`             | Required: yes                                                   |
|                        | Type: string                                                    |
|                        | Description: The username of the user                           |
| `password`             | Required: yes                                                   |
|                        | Type: string                                                    |
|                        | Description: The plain-text password for user                   |
| `privilege_level`      | Required: yes                                                   |
|                        | Type: string                                                    |
|                        | Description: The privilege of the user                          |
| `adminUser`            | Required: yes                                                   |
|                        | Type: string                                                    |
|                        | Description: The username of the admin creating user            |
| `adminPass`            | Required: yes                                                   |
|                        | Type: string                                                    |
|                        | Description: The plain-text password of the admin creating user |
| <b>Response object</b> |                                                                 |
| `{ data }`             | Type: JSON                                                      |
|                        | `data`: Success message                                         |
| `{ err }`              | Type: JSON                                                      |
|                        | `err`: SQL error message                                        |
| `{ error }`            | Type: JSON                                                      |
|                        | `error`: Human readable misuse error                            |
| <b>Response Status</b> |                                                                 |
| `201`                  | Sucessful authorization and user creation                       |
| `400`                  | Bad Request: missing admin credentials                          |
| `401`                  | Unauthorized: failed admin authorization                        |
| `503`                  | SQL Server Unavailable: likely a VPN issue                      |

#### Updating Users

| Path                   | `/api/admin/update-user/`                                                |
| :--------------------- | :----------------------------------------------------------------------- |
| <b>Description</b>     | Attempts to update user                                                  |
| <b>Method </b>         | ![Post Request](../assets/post.png)                                      |
| <b>Body Parameters</b> |                                                                          |
| `id`                   | Required: yes                                                            |
|                        | Type: number                                                             |
|                        | Description: The id of the user being updated                            |
| `newUser`              | Required: yes                                                            |
|                        | Type: JSON                                                               |
|                        | Description: The updated fields of the user                              |
|                        | `{username, name, password, priviledge_level}`                           |
|                        | Note: newUser must have at least one updated field, all are not required |
| `adminUser`            | Required: yes                                                            |
|                        | Type: string                                                             |
|                        | Description: The username of the admin updating user                     |
| `adminPass`            | Required: yes                                                            |
|                        | Type: string                                                             |
|                        | Description: The plain-text password of the admin updating user          |
| <b>Response object</b> |                                                                          |
| `{ data }`             | Type: JSON                                                               |
|                        | `data`: Success message                                                  |
| `{ err }`              | Type: JSON                                                               |
|                        | `err`: SQL error message                                                 |
| `{ error }`            | Type: JSON                                                               |
|                        | `error`: Human readable misuse error                                     |
| <b>Response Status</b> |                                                                          |
| `201`                  | Sucessful authorization and user update                                  |
| `400`                  | Bad Request: missing admin credentials                                   |
| `401`                  | Unauthorized: failed admin authorization                                 |
| `503`                  | SQL Server Unavailable: likely a VPN issue                               |

#### Deleting Users

| Path                   | `/api/admin/delete-user/`                                       |
| :--------------------- | :-------------------------------------------------------------- |
| <b>Description</b>     | Attempts to delete user                                         |
| <b>Method </b>         | ![Post Request](../assets/post.png)                             |
| <b>Body Parameters</b> |                                                                 |
| `username`             | Required: yes                                                   |
|                        | Type: string                                                    |
|                        | Description: The unique username of the user being deleted      |
| `adminUser`            | Required: yes                                                   |
|                        | Type: string                                                    |
|                        | Description: The username of the admin deleting user            |
| `adminPass`            | Required: yes                                                   |
|                        | Type: string                                                    |
|                        | Description: The plain-text password of the admin deleting user |
| <b>Response object</b> |                                                                 |
| `{ data }`             | Type: JSON                                                      |
|                        | `data`: Success message                                         |
| `{ err }`              | Type: JSON                                                      |
|                        | `err`: SQL error message                                        |
| `{ error }`            | Type: JSON                                                      |
|                        | `error`: Human readable misuse error                            |
| <b>Response Status</b> |                                                                 |
| `200`                  | Sucessful authorization and user delete                         |
| `400`                  | Bad Request: missing admin credentials                          |
| `401`                  | Unauthorized: failed admin authorization                        |
| `503`                  | SQL Server Unavailable: likely a VPN issue                      |

#### Creating Tables

| Path                    | `/api/admin/create-table/`                                       |
| :---------------------- | :--------------------------------------------------------------- |
| <b>Description</b>      | Attempts to create table                                         |
| <b>Method </b>          | ![Post Request](../assets/post.png)                              |
| <b>Body Parameters</b>  |                                                                  |
| `tableName`             | Required: yes                                                    |
|                         | Type: string                                                     |
|                         | Description: The name of the table                               |
| `adminUser`             | Required: yes                                                    |
|                         | Type: string                                                     |
|                         | Description: The username of the admin creating table            |
| `adminPass`             | Required: yes                                                    |
|                         | Type: string                                                     |
|                         | Description: The plain-text password of the admin creating table |
| <b>Response object</b>  |                                                                  |
| `{ data }`              | Type: JSON                                                       |
|                         | `data`: Success message                                          |
| `{ error, sqlMessage }` | Type: JSON                                                       |
|                         | `error`: Human readable misuse error                             |
|                         | `sqlMessage`: SQL error message                                  |
| `{ error }`             | Type: JSON                                                       |
|                         | `error`: Human readable misuse error                             |
| <b>Response Status</b>  |                                                                  |
| `201`                   | Sucessful authorization and table creation                       |
| `400`                   | Bad Request: missing admin credentials                           |
| `401`                   | Unauthorized: failed admin authorization                         |
| `503`                   | SQL Server Unavailable: likely a VPN issue                       |

#### Editing Tables

#### Deleting Tables
