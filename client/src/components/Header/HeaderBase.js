import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default class HeaderBase extends Component {
    state = { activeItem: 'home' }

    handleItemClick = (e, { name }) => { 
        this.setState({ activeItem: name })
    }

    render() {
        return (
            <div>
                <Menu>
                    <Menu.Item as={ Link }
                        name='home'
                        active={'home' === this.props.current_view}
                        disabled={this.props.current_view === 'login'}
                        onClick={this.handleItemClick}
                        to='/Home'
                    />
                    <Menu.Item as={ Link }
                        name='about'
                        active={'view' === this.props.current_view}
                        onClick={this.handleItemClick}
                        to='/About'
                    />
                </Menu>
            </div>
        )
    }
}