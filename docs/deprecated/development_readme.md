### Installation (pre-release)

Note: this section will be relocated to `docs/deprecated/development_readme.md` after initial release.

Use your terminal emulator of choice. Ensure you have <a href='https://nodejs.org/en/' target='_blank'>Node</a> and <a href='https://yarnpkg.com/getting-started/install' target='_blank'>Yarn</a> installed.

```
git clone https://github.com/FLMNH-MGCL/spesql.git
cd spesql
```

You will need to create the config file before using spesql database operations. The config is a JSON file that lives in `.spesql`, which is in the home directory of your system. For example, on Mac the path would look like `/Users/<username>/.spesql/config.json`. It has the following format:

```
{
    "host": 'host.domain',
    "port": '####',
    "user": 'username',
    "password": 'password',
    "database": 'database_name'
}
```

If you do not have these credentials or lost these credentials, please contact the <a href='https://www.floridamuseum.ufl.edu/kawahara-lab/contact/' target='_blank'>Kawahara Lab</a> directly for eligibility. If you are an employee and need additional assistance, please refer to the instructional videos or contact the <a href='https://www.floridamuseum.ufl.edu/kawahara-lab/contact/' target='_blank'>Kawahara Lab</a> directly, as well. Once you launch the application after the following instructions, you will enter the credentials in the settings page and relaunch the application for the changes to take effect. `File > Restart` in the menubar for easy restarting.

Building the application is as follows:

```
yarn
yarn build
```

This will bundle the React application + Express server with electron. For all systems, the `yarn build` command will create a build and dist folder at the project root. We only need to worry about the dist folder. Follow the general outline for your platform:

#### Windows:

Navigate to the `dist/` and copy a shortcut to the generated .exe file to wherever you'd like. Double click to launch (or single click if placed in task bar)

#### Mac:

Navigate to the `dist/` and run the .dmg file. This will bring up an installation prompt to drag and drop the application into your Applications folder. Drag and drop it (replacing it on updates) as prompted. spesql should now be indexable via cmd+space or run from your Applications folder. Optionally, you can navigate to the `dist/mac/` and run the `spesql` file for a single use, non-installable solution.

#### Linux (Arch-based):

Navigate to the `dist/` and run the .AppImage file. This will bring up an installation prompt. spesql should now be indexable or run from your Applications folder. Optionally, you can navigate to the `dist/linux-unpacked/` and run the `spesql` file for a single use, non-installable solution.
