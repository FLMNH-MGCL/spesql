---
id: gettingstarted
title: Getting Started
slug: /
---

## Installation

(NOTE: PLEASE FOLLOW DEV INSTRUCTION (after this paragraph) UNTIL ANNOUNCEMENT ON `#database` SLACK)...You can find all available releases on the GitHub repository for SpeSQL, which will come bundled with most of the requirements for getting it up and running.

Please select and download the most recent release to date [here](https://github.com/FLMNH-MGCL/spesql/releases) and run the installer. Once installed, please follow the instructions to download and configure the [UF VPN](https://net-services.ufl.edu/provided-services/vpn/clients/). At this point, you may continue on to the next section.

If you are attempting to use a development build (not using a prepackaged release), please ensure you have these prerequisites installed on your machine:

- [Git](https://git-scm.com/downloads)
- [Node](https://nodejs.org/)
- [Yarn](https://classic.yarnpkg.com/en/docs/install/)

Open a terminal emulator of your choice and enter the following:

```bash
git clone https://github.com/FLMNH-MGCL/spesql.git
cd spesql
yarn
```

This will create a local copy of the software and then install the dependencies. Create a copy of the `.env.example` file (found at `spesql/.env.example`) and rename the copy `.env`. Replace the missing or placeholder values with credentials assigned to you. At this point, you may move on to the next section.

## Start Up

Please ensure you are connected to the internet and have properly configured your VPN. Once a VPN connection is sucessfully established, you may start the application. Find the SpeSQL icon on your machine and double click it.

If you are attempting to start the development build, please navigate to the project root folder in your terminal emulator of choice and run the following:

```bash
yarn dev
```

Once the application has loaded, select the gear icon to navigate to the settings page and enter the connection credentials assigned to you. If you do not have any credentials, please contact the lab directly to make a request.

Upload the provided JSON file, and restart the software for the changes to take effect. The file is in the structure of:

```json
{
  "user": "username",
  "password": "secretpassword",
  "database": "databaseallowedtoconnectwith"
}
```
