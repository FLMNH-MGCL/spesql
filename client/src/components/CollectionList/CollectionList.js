import React from 'react'
import { Table, Button, Loader, Icon } from 'semantic-ui-react'
import _ from 'lodash'
import './CollectionList.css'
import InfiniteScroll from 'react-infinite-scroll-component'
//import SpecimenCard from './SpecimenCard'

function getCells(specimen, headers) {
    if (headers === [] || headers === undefined || specimen === undefined) {
        return []
    }
    let ret = headers.map((header, index) => {
        switch (header) {
            case 'MGCL #':
                return <Table.Cell key={index}>{specimen.mgcl_num}</Table.Cell>
            case 'Lep #':
                return <Table.Cell key={index}>{specimen.lep_num}</Table.Cell>
            case 'Order':
                return <Table.Cell key={index}>{specimen.order_}</Table.Cell>
            case 'Superfamily':
                return <Table.Cell key={index}>{specimen.superfamily}</Table.Cell>
            case 'Family':
                return <Table.Cell key={index}>{specimen.family}</Table.Cell>
            case 'Subfamily':
                return <Table.Cell key={index}>{specimen.subfamily}</Table.Cell>
            case 'Tribe':
                return <Table.Cell key={index}>{specimen.tribe}</Table.Cell>
            case 'Section':
                return <Table.Cell key={index}>{specimen.section}</Table.Cell>
            case 'Genus':
                return <Table.Cell key={index}>{specimen.genus}</Table.Cell>
            case 'Species':
                return <Table.Cell key={index}>{specimen.species}</Table.Cell>
            case 'Subspecies':
                return <Table.Cell key={index}>{specimen.subspecies}</Table.Cell>
            case 'Sex':
                return <Table.Cell key={index}>{specimen.sex}</Table.Cell>
            case 'Country':
                return <Table.Cell key={index}>{specimen.country}</Table.Cell>
            case 'Province':
                return <Table.Cell key={index}>{specimen.province}</Table.Cell>
            case 'Locality':
                return <Table.Cell key={index}>{specimen.locality}</Table.Cell>
            case 'Latitude':
                return <Table.Cell key={index}>{specimen.latitude}</Table.Cell>
            case 'Longitude':
                return <Table.Cell>{specimen.longitude}</Table.Cell>
            case 'Elevation':
                return <Table.Cell key={index}>{specimen.elevation}</Table.Cell>
            case 'MV Lamp':
                return <Table.Cell key={index}>{specimen.mv_lamp}</Table.Cell>
            case 'Days':
                return <Table.Cell key={index}>{specimen.days}</Table.Cell>
            case 'Month':
                return <Table.Cell key={index}>{specimen.month}</Table.Cell>
            case 'Year':
                return <Table.Cell key={index}>{specimen.year}</Table.Cell>
            case 'Collector(s)':
                return <Table.Cell key={index}>{specimen.collectors}</Table.Cell>
            case 'Freezer':
                    return <Table.Cell key={index}>{specimen.freezer}</Table.Cell>
            case 'Rack #':
                return <Table.Cell key={index}>{specimen.rack}</Table.Cell>
            case 'Box':
                return <Table.Cell key={index}>{specimen.box}</Table.Cell>
            case 'Size':
                return <Table.Cell key={index}>{specimen.size}</Table.Cell>
            case 'Note':
                return <Table.Cell key={index}>{specimen.note}</Table.Cell>
            default: 
                return null
        }
    })

    return ret

    
}

// ({data, filteredText, filterCategory, selectedUpdate, sortBy, clearQuery, current_query, query_headers}) 

export default class CollectionList extends React.Component {
    constructor(props) {
        super(props)

        this.props.updateLoadingStatus(true)

        this.state = {
            column: null,
            data: this.props.data,
            display: Array.from({length: 0}),
            prevFetchAmount: 0,
            hasMore: false,
            direction: null,
        }
    }

    componentDidUpdate() {
        if (this.props.data.length !== 0 && this.state.display.length === 0) {
            let fetchAmount = this.props.data.length <= 50 ? this.props.data.length : 50
            let hasMore = fetchAmount === this.props.data.length ? false : true
            // console.log(`has more ${hasMore}`)
            const newDisplay = this.props.data.slice(0, fetchAmount)
            this.props.updateDisplayData(newDisplay)
            this.setState({display: newDisplay, hasMore: hasMore, prevFetchAmount: fetchAmount})
        }

        else if (this.props.data.length === 0 && this.state.display.length !== 0) {
            this.setState({
                display: Array.from({length: 0}),
                prevFetchAmount: 0
            })
        }

        if (this.props.current_query !== '' && this.props.data.length >= 0) {
            // console.log('first')
            this.props.updateLoadingStatus(false)
            this.props.updateRefreshStatus(false)
        }
        else if (this.props.current_query === '' && this.props.data.length === 0 && !this.props.refreshing) {
            // console.log('second')
            this.props.updateLoadingStatus(false)
        }
        else if (this.props.current_query === '' && this.props.data.length === 0 && this.props.refreshing) {
            // console.log('third')
            this.props.updateLoadingStatus(true)
        }
        else if (this.props.current_query === '' && this.props.data.length !== 0) {
            // console.log('fourth')
            this.props.updateLoadingStatus(true)
        }
    }

    getHeaderCells(headers) {
        if (headers === [] || headers === undefined) {
            return []
        }
        let ret = headers.map((header, index) => {
            return (
                <Table.HeaderCell
                    sorted={this.state.column === header ? this.state.direction : null}
                    onClick={this.handleSort(header)}
                    key={index}
                >
                    {header}
                </Table.HeaderCell>
            )
        })
    
        return ret
    }

    fetchMoreData = () => {
        let fetchAmount = (this.props.data.length - this.state.display.length) <= 50 ? (this.props.data.length - this.state.display.length) : 50

        if (fetchAmount === 0) {
            this.setState({ hasMore: false });
            return;
        }

        // a fake async api call like which sends
        // 20 more records in .5 secs
        setTimeout(() => {
            let newDisplay = this.state.display.concat(Array.from({ length: fetchAmount }))
            newDisplay = newDisplay.map((item, index) => {
                return this.props.data[index]
            })
            this.props.updateDisplayData(newDisplay)
            this.setState({
                display: newDisplay
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
                switch(this.props.filterCategory) {
                    case 'Lep #':
                        if (specimen.lep_num) {
                            return specimen.lep_num.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                        }
                        else return false

                    case 'Superfamily':
                        if (specimen.superfamily) {
                            return specimen.superfamily.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                        }
                        else return false

                    case'Family':
                        if (specimen.family) {
                            return specimen.family.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                        }
                        else return false

                    case'Genus': 
                        if(specimen.genus || specimen.genus === '') {
                            return specimen.genus.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                        }
                        else return false

                    case'Species':
                        if (specimen.species || specimen.species === '') {
                            return specimen.species.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                        }
                        else return false

                    case 'Country': 
                        if (specimen.country) {
                            return specimen.country.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                        }
                        else return false

                    case 'Collection Date':
                        if(specimen.date_collected) {
                            return specimen.date_collected.toLowerCase().indexOf(this.props.filteredText.toLowerCase()) >= 0
                        }
                        else return false

                    case '':
                        return true

                    default: 
                        return false
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
            .map((specimen, index) => {
                let cells = getCells(specimen, this.props.query_headers)

                return (
                    <Table.Row key={index} onClick={() => this.props.selectedUpdate(specimen)}>
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
            <Table sortable celled selectable stackable>
                <Table.Header>
                    <Table.Row>
                        {specimenHeaders}
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    <div id="scrollableDiv" style={{ height: "75vh", overflow: "auto" }}>
                    <InfiniteScroll
                        dataLength={this.state.display.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.hasMore}
                        scrollableTarget='scrollableDiv'
                        loader={<Loader active style={{marginTop: '30vh'}} content='Loading' className='loader-style'/>}
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
                onClick={() => {
                    this.props.clearQuery()
                    this.setState({
                        hasMore: false,
                        display: Array.from({length: 0})
                    })
                }}
                disabled={this.props.current_query === '' ? true : false}
            >
                Clear Query
            </Button>
            <Button
                icon
                onClick={() => {
                    // console.log('refreshed!')
                    let command = this.props.current_query
                    this.props.clearQuery()
                    this.props.updateRefreshStatus(true)
                    this.props.updateLoadingStatus(true)
                    this.props.runQuery(command)
                }}
                disabled={this.props.current_query === '' ? true : false}
            >
                <Icon name='refresh'  />
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