import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import SearchFilter from '../Search/SearchFilter'
import DBSearch from '../Search/DBSearch'
import SortCollection from '../CollectionList/SortCollection'
import InsertDocument from '../InsertDocument/InsertDocument'
import { Link } from 'react-router-dom'
import DownloadDB from '../DownloadDB/DownloadDB'
import QueryGrid from '../Query/QueryGrid'

export default class Header extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => { 
        this.setState({ activeItem: name })
    }

    render() {
        const { activeItem } = this.state

        return (
            <div>
                <Menu>
                    <Menu.Item as={ Link }
                        name='home'
                        active={activeItem === 'home'}
                        onClick={this.handleItemClick}
                        to='/Home'
                    />
                    <Menu.Item as={ Link }
                        name='about'
                        active={activeItem === 'about'}
                        onClick={this.handleItemClick}
                        to='/About'
                    />

                    <Menu.Menu position='right'>
                        <Menu.Item style={{width: '15rem'}}></Menu.Item>
                        <Menu.Item>
                            {/* <Input icon='search' placeholder='Search...' /> */}
                            <DBSearch updateFilteredText={this.props.updateFilteredText.bind(this)}/>
                        </Menu.Item>
                        <Menu.Item>
                            <QueryGrid updateQuery={this.props.updateQuery.bind(this)} runQuery={this.props.runQuery.bind(this)}/>
                        </Menu.Item>
                        <Menu.Item>
                            <SearchFilter updateFilterCategory={this.props.updateFilterCategory.bind(this)}/>
                        </Menu.Item>
                        <Menu.Item>
                            <SortCollection updateSortBy={this.props.updateSortBy.bind(this)}/>
                        </Menu.Item>
                        <Menu.Item>
                            <InsertDocument updateList={this.props.updateList.bind(this)} isValidCSV={this.props.isValidCSV.bind(this)} />
                        </Menu.Item>
                        <Menu.Item>
                            <DownloadDB data={this.props.data} />
                        </Menu.Item>
                    </Menu.Menu>
                </Menu>
            </div>
        )
    }
}