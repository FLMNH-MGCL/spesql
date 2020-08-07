# Server Routing

This will overview the routes utilized for client -> server interactions. This document is subject to change, and this blurb will be removed when I have reached a desired amount of consistency. This was a learning experience for me, and there can definitely be improvements in consistency when it comes to how response objects look. For example, you'll see some responses with `err` vs `error` or having `data` contain either error messages or success messages. I will be converting all of these over to a new standard while writing the documentation.

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

#### MySQL Delete Query

### Admin Operations

#### Creating users
