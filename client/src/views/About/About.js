import React from 'react'
import HeaderBase from '../../components/Header/HeaderBase'
import { Container, Header, List } from 'semantic-ui-react'
import './About.css'


class About extends React.Component {
    render() {
        return (
            <div className='about-container'>
                <HeaderBase />
                <div className='pad-top about-text'>
                    <Container textAlign='justified'>
                        <Header as='h2'>About This Project</Header>
                        <p>
                            This project is intented for use by the McGuire Center of Lepidoptera and Biodiversity (MGCL) at the Florida Museum of Natural History (FLMNH). As such, by default, the
                            application is only compatible with institutions having identical, MySQL database schemes. It is possible to adapt this software to another isntitution's requirements,
                            however the more closely structured to MGCL's configuration the more seamless the conversion. For more information regarding the structures neccessary for adopting this software,
                            please contact the <a href='https://www.floridamuseum.ufl.edu/kawahara-lab/contact/' target='_blank' rel="noopener noreferrer">Kawahara Lab</a> directly. To see the source code for this project, feel free
                            to visit the <a href='https://github.com/FLMNH-MGCL/Database-App' target='_blank' rel="noopener noreferrer">GitHub Repository</a>.
                        </p>
                    </Container>
                    <Container textAlign='justified' style={{paddingTop: '3rem'}}>
                        <Header as='h2'>Contact / Issue Reporting</Header>
                        <p>
                            <a href='http://www.aaronbleopold.com' target="_blank" rel="noopener noreferrer">Aaron Leopold</a> is the sole developer of this project. If any questions regarding usage remain after reviewing the right-side panel of this
                            page, please contact him via email (his current email can be found on his site). Additionally, refer to the recorded <a href=''>instructional videos</a> for more in-depth demonstrations.
                            For issues relating to software bugs, glitches or unexpected errors, please submit a <a href='https://github.com/FLMNH-MGCL/Database-App/issues/new' target="_blank" rel="noopener noreferrer">GitHub issue</a>. Be sure to describe in
                            detail the errors, bugs or glitches that have occurred, and include the steps to reproduce the error.
                        </p>
                    </Container>
                    <Container textAlign='justified' style={{paddingTop: '3rem'}}>
                        <Header as='h2'>Citation</Header>
                        <p>
                            <b>Pending its first release,</b> this software will be paired with a DOI number. On first release, the DOI number generated will be here for citation purposes.
                        </p>
                    </Container>
                    <Container textAlign='justified' style={{paddingTop: '3rem'}}>
                            <Header as='h2'>Usage</Header>
                            <List divided verticalAlign='middle' relaxed>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Specimen Table:  </b><br />
                                        <p className='description-text'>
                                            The left side of the screen will fill as you query the database with SELECT queries.
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Clear Query:  </b><br />
                                        <p className='description-text'>
                                            The clear query button below the specimen table will allow you to clear the data from the latest query to the database.
                                            If not query has been sent, there button is disabled. Displayed to the right of the button will be the text value of the
                                            query sent.
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Specimen View:  </b><br />
                                        <p className='description-text'>
                                            Once a SELECT query is ran and the specimen table has documents, you may click on any document
                                            in the specimen table to view a more detailed transcription infosheet on the right.<br /><br />

                                            It is important to note that while the specimen view will display more detail, it will only display
                                            information that both exists and is queried for. For example, if you were to query "SELECT genus,species from
                                            db_name" then both the specimen table and the speciment view will only have the genus and species values for
                                            all returned documents. See 'Query' below for more examples of this. Additionally, it may be beneficial top
                                            review the <a href='https://www.guru99.com/select-statement.html' target='_blank' rel="noopener noreferrer">fundamentals of a MySQL SELECT query.</a>
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Search Box:  </b><br />
                                        <p className='description-text'>
                                            The search box on the bottom left of the specimen table filters what is displayed with what is searched.
                                            By default, the search filters for all fields. For example, typing 'L' in the search
                                            will return/display documents in the visual list that have an 'l' or 'L' in any of the fields.
                                            While capitalization is ignored in the search, it is important to ensure correct capitalization use
                                            during the insertion of new data. You can narrow the search to only specific fields using the filter button to its
                                            immediate left.
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Query:  </b><br />
                                        <p className='description-text'>
                                            The query button on the header brings up the query selection menu. For now, only a select few queries are
                                            supported. Future support will be widened to accomadate researchers' needs.<br /><br />

                                            <b style={{fontSize: '15px'}}>SELECT QUERIES:</b> It is important to understand you will only recieve data on the headers you query. As a result,
                                            it is a better practice to include all headers/fields in your SELECT queries and you conditional statements and/or the provided
                                            filterable search to further narrow your results. For example, if you were to run a query such as "SELECT latitude from db_name"
                                            then the data returned will only contain one piece of information for each entry, as the only field requested was latitude.
                                            This behavior is inherent to MySQL itself.<br /><br />

                                            <b style={{fontSize: '15px'}}>COUNT QUERIES:</b> Count queries are a subset of a SELECT query, in that instead of returning the
                                            selected data queried for, it will return a count of how many entries their are in the query. Please note that normal SELECT queries
                                            will have the count displayed underneath the specimen table, however I added a query selector selection incase just the count was needed
                                            and quicker returns were required. <br /><br />

                                            <b style={{fontSize: '15px'}}>UPDATE QUERIES:</b> It is important to understand you will only recieve data on the headers you query. As a result,
                                            it is a better practice to include all headers/fields in your SELECT queries and you conditional statements and/or the provided
                                            filterable search to further narrow your results. For example, if you were to run a query such as "SELECT latitude from db_name"
                                            then the data returned will only contain one piece of information for each entry, as the only field requested was latitude.
                                            This behavior is inherent to MySQL itself.<br /><br />

                                            If you would like more information on any of the queries available to you, please reference their respective help guides found
                                            in the query selection menu on the application's mainpage.
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Filter:  </b><br />
                                        <p className='description-text'>
                                            The filter button to the left of the search box is how you would change the search target. As stated in the search box description,
                                            the default filter is matching the search terms to any field. Adjusting the filter will adjust which field the search box
                                            will search in. For example, changing it to Genus and typing in 'G' will return/display all documents with a Genus containing either 'G'
                                            or 'g.'
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Sort:  </b><br />
                                        <p className='description-text'>
                                            You can sort the specimen table by clicking on one of the headers. It will sort either ascending or descending.
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Insert:  </b><br />
                                        <p className='description-text'>
                                            The insert button on the header is how an admin, or anyone with insertion privileges, will be inserting new documents (rows)
                                            into the database. There will be two methods of insertion:
                                            <ul className='dashed'>
                                                <li><span><b>Paste: </b>Paste CSV data directly into textbox to insert multiple documents at once.</span></li>
                                                <li><span><b>Manual Entry: </b>Manually enter each field for one entry.</span></li>
                                            </ul>
                                            Each method will be run through an error check function, which will display a detailed list of errors if any occur. Any document passing
                                            this function will be inserted, while rows containing errors will be skipped. If using the paste option, please be sure to include the CSV
                                            header row in the paste, as the header will be checked for accuracy, as well.
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Download:  </b><br />
                                        <p className='description-text'>
                                            The download button on the header will allow you to download your current SELECT query as a CSV file.
                                        </p>
                                    </List.Content>
                                </List.Item>
                            </List>
                            </Container>
                </div>
            </div>
        )
    }
}

export default About
