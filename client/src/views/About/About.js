import React from 'react'
import HeaderBase from '../../components/Header/HeaderBase'
import { Grid, Container, Header, List } from 'semantic-ui-react'
import './About.css'


class About extends React.Component {
    render() {

        return (
            <div className='about-container'>
                <HeaderBase />
                <div className='pad-top'>                
                    <Grid columns='equal' padded>
                        <Grid.Column width={9}>
                            <Container textAlign='justified'>
                                <Header as='h2'>About This Project</Header>
                                <p>
                                    This project is intented for use by the McGuire Center of Lepidoptera and Biodiversity (MGCL) at the Florida Museum of Natural History (FLMNH). As such, by default, the
                                    application is only compatible with institutions having identical, MySQL database schemes. It is possible to adapt this software to another isntitution's requirements, 
                                    however the more closely structured to MGCL's configuration the more seamless the conversion. For more information regarding the structures neccessary for adopting this software,
                                    please contact the <a href='https://www.floridamuseum.ufl.edu/kawahara-lab/contact/' target='_blank'>Kawahara Lab</a> directly. To see the source code for this project, feel free 
                                    to visit the <a href='https://github.com/FLMNH-MGCL/Database-App' target='_blank'>GitHub Repository</a>.
                                </p>
                            </Container>
                            <Container textAlign='justified' style={{paddingTop: '3rem'}}>
                                <Header as='h2'>Contact / Issue Reporting</Header>
                                <p>
                                    <a href='http://www.aaronbleopold.com' target="_blank">Aaron Leopold</a> is the sole developer of this project. If any questions regarding usage remain after reviewing the right-side panel of this
                                    page, please contact him via email (his current email can be found on his site). Additionally, refer to the recorded <a href=''>instructional videos</a> for more in-depth demonstrations.
                                    For issues relating to software bugs, glitches or unexpected errors, please submit a <a href='https://github.com/FLMNH-MGCL/Database-App/issues/new' target="_blank">GitHub issue</a>. Be sure to describe in
                                    detail the errors, bugs or glitches that have occurred, and include the steps to reproduce the error. 
                                </p>
                            </Container>
                            <Container textAlign='justified' style={{paddingTop: '3rem'}}>
                                <Header as='h2'>Citation</Header>
                                <p>
                                    <b>Pending its first release,</b> this software will be paired with a DOI number. On first release, the DOI number generated will be here for citation purposes.
                                </p>
                            </Container>
                        </Grid.Column>
                        <Grid.Column>
                            <Container textAlign='justified' className='scrollable' >
                            <Header as='h2'>Usage</Header>
                            <List divided verticalAlign='middle' relaxed>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Collection List:  </b><br />
                                        <p className='description-text'>
                                            The left side of the screen will fill as you query the database with SELECT queries.
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Specimen View:  </b><br />
                                        <p className='description-text'>
                                            Once a SELECT query is ran and the collection list has documents, you may click on any document
                                            in the collection list to view a more detailed transcription infosheet on the right.
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Search Box:  </b><br />
                                        <p className='description-text'>
                                            The search box on the header will search the current returned SELECT query for what is typed in. 
                                            By default, the search is filtered for Species search. For example, typing 'L' in the search
                                            will only return/display documents in the visual list that have a species name containing 'L' or 'l.'
                                            While capitalization is ignored in the search, it is important to ensure correct capitalization use
                                            during the insertion of new data. 
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Query:  </b><br />
                                        <p className='description-text'>
                                            The query button on the header brings up the query selection menu. For now, only SELECT queries are
                                            supported. Future support will be widened to accomadate researchers' needs.
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Filter:  </b><br />
                                        <p className='description-text'>
                                            The filter button on the header is how you would change the search target. As stated inn the search box description, 
                                            the default filter is for matching search terms in species names. Adjusting the filter will adjust which field the search box 
                                            will search in. For example, changing it to Genus and typing in 'G' will return/display all documents with a Genus containing either 'G'
                                            or 'g.'
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>Sort:  </b><br />
                                        <p className='description-text'>
                                            The sort button on the header is how you would change the sorted order of documents from a SELECT query. By default, queries will be
                                            sorted by catalog number (Lep #). If you were to change this to Species, for example, then the collection list will be displayed in
                                            alphabetical order of the species names.
                                        </p>
                                    </List.Content>
                                </List.Item>
                                <List.Item float='left'>
                                    <List.Content>
                                        <b className='description-heading'>New Insert:  </b><br />
                                        <p className='description-text'>
                                            The new insert button on the header is how an admin, or anyone with insertion privileges, will be inserting new documents (rows)
                                            into the database. There will be two methods of insertion: 
                                            <ul className='dashed'>
                                                <li><span><b>Paste: </b>Paste CSV data directly into textbox to insert multiple documents at once.</span></li>
                                                <li><span><b>Manual Entry: </b>Manually enter each field for one entry.</span></li>
                                            </ul>
                                            Each method will be run through an error check function, which will display a detailed list of errors if any occur. Any document passing
                                            this function will be inserted, while rows containing erros will be skipped. If using the paste option, please be sure to include the CSV
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
                        </Grid.Column>
                    </Grid>
                </div>
            </div>
        )
    }
}

export default About

