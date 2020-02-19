# SpeSQL #

### Development ###
This project was developed using ReactJS, Redux and Node

### About This Project ###
This project is intented for use by the McGuire Center of Lepidoptera and Biodiversity (MGCL) at the Florida Museum of Natural History (FLMNH). As such, by default, the
application is only compatible with institutions having identical, MySQL database schemes. It is possible to adapt this software to another isntitution's requirements, 
however the more closely structured to MGCL's configuration the more seamless the conversion. For more information regarding the structures neccessary for adopting this software,
please contact the <a href='https://www.floridamuseum.ufl.edu/kawahara-lab/contact/' target='_blank'>Kawahara Lab</a> directly. To see the source code for this project, feel free 
to visit the <a href='https://github.com/FLMNH-MGCL/Database-App' target='_blank'>GitHub Repository</a>.

### Contact / Issue Reporting ###
<a href='http://www.aaronbleopold.com' target="_blank">Aaron Leopold</a> is the sole developer of this project. If there are any questions regarding the usage of the application, please contact him via email (his current email can be found on his site). Additionally, if you are an employee of the FLMNH, refer to the recorded <a href=''>instructional videos</a> (TBA) for more in-depth demonstrations. For issues relating to software bugs, glitches or unexpected errors, please submit a <a href='https://github.com/FLMNH-MGCL/Database-App/issues/new' target="_blank">GitHub issue</a>. Be sure to describe in
detail the errors, bugs or glitches that have occurred, and include the steps to reproduce the error. 

### Local Usage ###
Instructions for local use, please read entire section before attempting use. Use your terminal emulator of choice. Ensure you have <a href='https://nodejs.org/en/' target='_blank'>Node</a> installed.
```
cd <path to target directory>
git clone https://github.com/FLMNH-MGCL/Database-App.git
cd Database-App
npm install
npm run-script install-all
npm run-script dev
```
Before running `npm run-script dev`, ensure you enter the MySQL database default information in the server.js file, found in `Database-App/server/server.js`. In this file, you will see: 
```
let connection = mysql.createConnection({
    host: '',
    port: '',
    user: '',
    password: '',
    database: ''
})
```
Enter the host, port, default user/password combination, and the database name to connect to the database. If you do not have these credentials, please contact the <a href='https://www.floridamuseum.ufl.edu/kawahara-lab/contact/' target='_blank'>Kawahara Lab</a> directly for eligibility. If you are an employee and need additional assistance and/or lost these credentials, please refer to the <a href=''>instructional videos</a> (TBA) or contact the <a href='https://www.floridamuseum.ufl.edu/kawahara-lab/contact/' target='_blank'>Kawahara Lab</a> directly, as well.

### Citation ###
<b>Pending its first release,</b> this software will be paired with a DOI number. On first release, the DOI number generated will be here for citation purposes.
