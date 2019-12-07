import React from 'react'
import { Row, Col } from 'react-bootstrap'
import DBSearch from '../Search/DBSearch'

const DBToolbar = ({filterUpdate}) => (
    <Row style={{backgroundColor: 'lightGrey'}}>
        <Col>various querrying tools will be here</Col>
        <Col><DBSearch filterUpdate={filterUpdate.bind(this)}/></Col>
        
    </Row>
)

export default DBToolbar