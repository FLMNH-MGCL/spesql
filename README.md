# spesql

### Development

This project was developed using ReactJS

### About This Project

This project is intended for use by the McGuire Center of Lepidoptera and Biodiversity (MGCL) at the Florida Museum of Natural History (FLMNH). As such, by default, the
application is only compatible with institutions having identical, MySQL database schemes. It is possible to adapt this software to another isntitution's requirements,
however the more closely structured to MGCL's configuration the more seamless the conversion. For more information regarding the structures neccessary for adopting this software,
please contact the <a href='https://www.floridamuseum.ufl.edu/kawahara-lab/contact/' target='_blank'>Kawahara Lab</a> directly. To see the source code for this project, feel free
to visit the <a href='https://github.com/FLMNH-MGCL/Database-App' target='_blank'>GitHub Repository</a>.

### Contact / Issue Reporting

<a href='http://www.aaronbleopold.com' target="_blank">Aaron Leopold</a> is the developer of this project. If there are any questions regarding the usage of the application, please contact him via email (his current email can be found on his site). Additionally, if you are an employee of the FLMNH, refer to the recorded instructional videos (found in the database Slack channel) for more in-depth demonstrations. For issues relating to software bugs, glitches or unexpected errors, please submit a <a href='https://github.com/FLMNH-MGCL/Database-App/issues/new' target="_blank">GitHub issue</a>. Be sure to describe in
detail the errors, bugs or glitches that have occurred, and include the steps to reproduce the error.

### Installation

Use your terminal emulator of choice. Ensure you have <a href='https://nodejs.org/en/' target='_blank'>Node</a> and <a href='https://yarnpkg.com/getting-started/install' target='_blank'>Yarn</a> installed.

```
git clone https://github.com/FLMNH-MGCL/spesql.git
cd spesql
```

You will need to add a config file before continuing, so ensure you have access to your database credentials. This file is excluded from the repository, however you should copy the config.example.js file and rename it to config.js to then enter the appropriate information. The config template can be found at `spesql/public/server/config/config.example.js`. Copy the file and change the name to `config.js`, and enter the information. It should wind up look something like this:

```
module.exports = {
    mysqlCredentials: {
        host: 'host.domain',
        port: '####',
        user: 'username',
        password: 'password',
        database: 'database_name'
    }
}
```

Enter the host, port, default user/password combination, and the database name to connect to the database. If you do not have these credentials or lost these credentials, please contact the <a href='https://www.floridamuseum.ufl.edu/kawahara-lab/contact/' target='_blank'>Kawahara Lab</a> directly for eligibility. If you are an employee and need additional assistance, please refer to the instructional videos or contact the <a href='https://www.floridamuseum.ufl.edu/kawahara-lab/contact/' target='_blank'>Kawahara Lab</a> directly, as well.

Once the config file is created and populated with valid credentials, run the following:

```
yarn
yarn build
```

This will bundle the React application + server with electron. For all systems, the `yarn build` command will create a build and dist folder at the project root. We only need to worry about the dist folder. Follow the general outline for your platform:

#### Windows:
Navigate to the `dist/` and copy a shortcut to the generated .exe file to wherever you'd like. Double click to launch (or single click if placed in task bar)

#### Mac:
Navigate to the `dist/` and run the .dmg file. This will bring up an installation prompt to drag and drop the application into your Applications folder. Drag and drop it (replacing it on updates) as prompted. spesql should now be indexable via cmd+space or run from your Applications folder. Optionally, you can navigate to the `dist/mac/` and run the `spesql` file for a single use, non-installable solution.

#### Linux (Arch-based):
Navigate to the `dist/` and run the .AppImage file. This will bring up an installation prompt. spesql should now be indexable or run from your Applications folder. Optionally, you can navigate to the `dist/linux-unpacked/` and run the `spesql` file for a single use, non-installable solution.


### Citation

<b>Pending its first release,</b> this software will be paired with a DOI number. On first release, the DOI number generated will be here for citation purposes.
