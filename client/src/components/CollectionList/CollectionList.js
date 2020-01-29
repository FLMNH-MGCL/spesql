import React from 'react'
import { Table, Button, Loader } from 'semantic-ui-react'
import _ from 'lodash'
import './CollectionList.css'
import InfiniteScroll from 'react-infinite-scroll-component'
//import SpecimenCard from './SpecimenCard'

function getCells(specimen, headers) {
    if (headers === [] || headers === undefined || specimen === undefined) {
        return []
    }
    let ret = headers.map(header => {
        switch (header) {
            case 'MGCL #':
                return <Table.Cell>{specimen.mgcl_num}</Table.Cell>
            case 'Lep #':
                return <Table.Cell>{specimen.lep_num}</Table.Cell>
            case 'Order':
                return <Table.Cell>{specimen.order_}</Table.Cell>
            case 'Superfamily':
                return <Table.Cell>{specimen.superfamily}</Table.Cell>
            case 'Family':
                return <Table.Cell>{specimen.family}</Table.Cell>
            case 'Subfamily':
                return <Table.Cell>{specimen.subfamily}</Table.Cell>
            case 'Tribe':
                return <Table.Cell>{specimen.tribe}</Table.Cell>
            case 'Section':
                return <Table.Cell>{specimen.section}</Table.Cell>
            case 'Genus':
                return <Table.Cell>{specimen.genus}</Table.Cell>
            case 'Species':
                return <Table.Cell>{specimen.species}</Table.Cell>
            case 'Subspecies':
                return <Table.Cell>{specimen.subspecies}</Table.Cell>
            case 'Sex':
                return <Table.Cell>{specimen.sex}</Table.Cell>
            case 'Country':
                return <Table.Cell>{specimen.country}</Table.Cell>
            case 'Province':
                return <Table.Cell>{specimen.province}</Table.Cell>
            case 'Locality':
                return <Table.Cell>{specimen.locality}</Table.Cell>
            case 'Latitude':
                return <Table.Cell>{specimen.latitude}</Table.Cell>
            case 'Longitude':
                return <Table.Cell>{specimen.longitude}</Table.Cell>
            case 'Elevation':
                return <Table.Cell>{specimen.elevation}</Table.Cell>
            case 'MV Lamp':
                return <Table.Cell>{specimen.mv_lamp}</Table.Cell>
            case 'Days':
                return <Table.Cell>{specimen.days}</Table.Cell>
            case 'Month':
                return <Table.Cell>{specimen.month}</Table.Cell>
            case 'Year':
                return <Table.Cell>{specimen.year}</Table.Cell>
            case 'Collector(s)':
                return <Table.Cell>{specimen.collectors}</Table.Cell>
            case 'Freezer':
                    return <Table.Cell>{specimen.freezer}</Table.Cell>
            case 'Rack #':
                return <Table.Cell>{specimen.rack}</Table.Cell>
            case 'Box':
                return <Table.Cell>{specimen.box}</Table.Cell>
            case 'Size':
                return <Table.Cell>{specimen.size}</Table.Cell>
            case 'Note':
                return <Table.Cell>{specimen.note}</Table.Cell>
        }
    })

    return ret

    
}

// ({data, filteredText, filterCategory, selectedUpdate, sortBy, clearQuery, current_query, query_headers}) 

export default class CollectionList extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            column: null,
            data: [],
            display: Array.from({length: 50}),
            hasMore: true,
            direction: null,
        }
    }

    getHeaderCells(headers) {
        if (headers === [] || headers === undefined) {
            return []
        }
        let ret = headers.map(header => {
            return (
                <Table.HeaderCell
                    sorted={this.state.column === header ? this.state.direction : null}
                    onClick={this.handleSort(header)}
                >
                    {header}
                </Table.HeaderCell>
            )
        })
    
        return ret
    }

    fetchMoreData = () => {
        let fetchAmount = (this.props.data.length - this.state.display.length) <= 50 ? (this.props.data.length - this.state.display.length) : 50
        console.log(fetchAmount)
        if (fetchAmount === 0) {
            this.setState({ hasMore: false });
            return;
        }

        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {

            this.setState({
                display: this.state.display.concat(Array.from({ length: fetchAmount }))
            })
        }, 500);
    }

    handleSort = (clickedColumn) => () => {
        const { column, direction } = this.state

        if (column !== clickedColumn) {
            this.setState({
                column: clickedColumn,
                data: _.sortBy(this.props.data, [clickedColumn]),
                direction: 'ascending',
            })

            return
        }

        this.setState({
            data: this.props.data.reverse(),
            direction: direction === 'ascending' ? 'descending' : 'ascending',
        })
    }
    


    render() {
        // console.log(this.state)
        let collectionList = this.props.data
        try {
            collectionList = collectionList
            .filter(specimen => {
                // LARGE SWITCH TO FILTER ITEMS
                if (this.props.filterCategory === 'Lep #' && specimen.lep_num) {
                    return specimen.lep_num.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                }
                else if (this.props.filterCategory === 'Superfamily' && specimen.superfamily) {
                    return specimen.superfamily.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                }
                else if (this.props.filterCategory === 'Family' && specimen.family) {
                    return specimen.family.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                }
                else if (this.props.filterCategory === 'Genus' && specimen.genus) {
                    return specimen.genus.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                }
                else if (this.props.filterCategory === 'Species' && specimen.species) {
                    return specimen.species.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                }
                else if (this.props.filterCategory === 'Country' && specimen.country) {
                    return specimen.country.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                }
                else if (this.props.filterCategory === 'Collection Date' && specimen.date_collected) {
                    return specimen.date_collected.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                }
                else {
                    // return specimen.species.toLowerCase().indexOf('') >= 0
                    return specimen
                } 
            })        
            // .sort((specimen_a, specimen_b) => {
            //     if (this.props.sortBy === 'Lep #') {
            //         return (specimen_a.id > specimen_b.id) ? 1 : ((specimen_b.id > specimen_a.id) ? -1 : 0)
            //     }
            //     else if (this.props.sortBy === 'Superfamily') {
            //         return (specimen_a.superfamily > specimen_b.superfamily) ? 1 : ((specimen_b.superfamily > specimen_a.superfamily) ? -1 : 0)
            //     }
            //     else if (this.props.sortBy === 'Family') {
            //         return (specimen_a.family > specimen_b.family) ? 1 : ((specimen_b.family > specimen_a.family) ? -1 : 0)
            //     }
            //     else if (this.props.sortBy === 'Genus') {
            //         return (specimen_a.genus > specimen_b.genus) ? 1 : ((specimen_b.genus > specimen_a.genus) ? -1 : 0)
            //     }
            //     else if (this.props.sortBy === 'Species') {
            //         return (specimen_a.species > specimen_b.species) ? 1 : ((specimen_b.species > specimen_a.species) ? -1 : 0)
            //     }
            //     else if (this.props.sortBy === 'Country') {
            //         return (specimen_a.country > specimen_b.country) ? 1 : ((specimen_b.country > specimen_a.country) ? -1 : 0)
            //     }
            //     else if (this.props.sortBy === 'Collection Date') {
            //         return (specimen_a.date_collected > specimen_b.date_collected) ? 1 : ((specimen_b.date_collected > specimen_a.date_collected) ? -1 : 0)
            //     }
            //     else if (this.props.sortBy === 'Rack #') {
            //         return (specimen_a.id > specimen_b.id) ? 1 : ((specimen_b.id > specimen_a.id) ? -1 : 0)
            //     }
            //     else {
            //         return 0
            //     }
            // })
            .map(specimen => {
                let cells = getCells(specimen, this.props.query_headers)

                return (
                    <Table.Row key={specimen.id} onClick={() => this.props.selectedUpdate(specimen)}>
                        {cells}
                    </Table.Row>
                )
            })
        } catch(error) {
            console.log(error)
            collectionList = []
        }


        let specimenHeaders = this.getHeaderCells(this.props.query_headers)

        return (
            <React.Fragment>
            <Table sortable celled selectable>
                <Table.Header>
                    <Table.Row>
                        {specimenHeaders}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <div id="scrollableDiv" style={{ height: "80vh", overflow: "auto" }}>
                    <InfiniteScroll
                        dataLength={this.state.display.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.hasMore}
                        scrollableTarget='scrollableDiv'
                        loader={<Loader active style={{marginTop: '35vh'}} className='loader-style'/>}
                    >
                        {this.state.display.map((row, index) => {
                            return collectionList[index]
                        })}
                    </InfiniteScroll>
                    </div>
                </Table.Body>
            </Table>
            <div className='query-info'>
            <Button 
                negative 
                onClick={this.props.clearQuery}
                disabled={this.props.current_query === '' ? true : false}
            >
                Clear Query
            </Button>
                <div className='query-text'><h4>Current Query:</h4><p>{this.props.current_query}</p></div>
                <div className='query-text'><h4>Query Size:</h4><p>{this.props.data.length}</p></div>
                <div className='query-text'><h4>Current Loaded:</h4><p>{this.props.data.length === 0 ? 0 : this.state.display.length}</p></div>
            </div>

            
            </React.Fragment>
        )
    }
}

// SCROLLABLE https://codesandbox.io/s/p2pr9zjrvj
// https://react.semantic-ui.com/collections/table/#variations-sortable