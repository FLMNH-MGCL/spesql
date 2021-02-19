---
id: gettingstarted
title: Getting Started
slug: /
---

## Installation

`Note:` Please follow the development build instructions until further anouncement of otherwise in the `#database` slack channel.

You can find all available releases on [GitHub](https://github.com/FLMNH-MGCL/spesql/releases), which will come bundled with most of the requirements for getting it up and running. Select and download the most [recent release to date](https://github.com/FLMNH-MGCL/spesql/releases) for your platform and run the installer. Once installed, please follow the instructions to download and configure the [UF VPN](https://net-services.ufl.edu/provided-services/vpn/clients/) Client.

Once the application has loaded, you will need to enter your credentials to access the databse. Select the gear icon to navigate to the settings page and select Update Config. You may now drag and drop the connection credentials assigned to you. If you do not have any credentials, please contact the lab directly to make a request.

Upload the provided JSON file, and restart the software for the changes to take effect. The file is in the structure of:

```json
{
  "user": "username",
  "password": "secretpassword",
  "database": "databaseallowedtoconnectwith"
}
```

At this point, you may continue on to the next section.
