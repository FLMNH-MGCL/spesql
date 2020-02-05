import React from 'react'
import { Button, Icon, Modal, Message, Grid, Table } from 'semantic-ui-react'

export default class QueryHelp extends React.Component {
    state = { open: false }

    open = () => this.setState({ open: true })
    close = () => this.setState({ open: false })

    render() {
        const { open } = this.state
        switch (this.props.queryType) {
            case 'SELECT':
                let example_select = String("SELECT [DISTINCT|ALL ] { * | [fieldExpression [AS newName]} FROM tableName [alias] [WHERE condition][GROUP BY fieldName(s)]  [HAVING condition] ORDER BY fieldName(s)")
                return (
                    <Modal
                        open={open}
                        onOpen={this.open}
                        onClose={this.close}
                        size='small'
                        trigger={
                        <Button primary icon type="button">
                            See Help <Icon name='question' />
                        </Button>
                        }
                    >
                        <Modal.Header>SELECT Query Help</Modal.Header>
                        <Modal.Content scrolling style={{minHeight: '70vh'}}>
                            <Message>
                                <Message.Header>SELECT Query:    Basic Structure</Message.Header>
                                <Message.Content>
                                    <br />
                                    {example_select}
                                </Message.Content>
                            </Message>
                            <p>
                                No sugar coating it: that mess looks daunting (I know). However, you likely will not be using most of that.
                                If you are curious about what each part means, please reference <a href='https://www.guru99.com/select-statement.html' target='_blank'>this </a>
                                website for futher instruction. Otherwise, for all intents and purposes, this is a much simpler generic outline to follow
                                when using this program:
                            </p>
                            <Message>
                                <Message.Content>
                                    1). SELECT * FROM `table_name` [WHERE condition];
                                </Message.Content>
                                <br />
                                <Message.Content>
                                    2). SELECT `field_name_1`,`field_name_2`,...,`field_name_x` FROM `table_name` [WHERE condition];
                                </Message.Content>
                            </Message>
                            <p>
                                Let's first look at query 1: it is asking to retreive ALL entries from the specified table (`table_name`), given it 
                                passes a conditional statement. Query 2 is asking to retrieve only a select number of named fields from the entries in the 
                                specified table, given they pass a given conditional. An example of this could be as follows:
                            </p>
                            <Message>
                                <Message.Content>
                                    SELECT `id`,`genus` FROM `collection` WHERE `genus` = `Catacola`;
                                </Message.Content>
                            </Message>
                            <p>
                                This will return a table (with columns id and genus) of all entries in the database table, given that 
                                the genus value in the database table is `Catacola.` It is important to note that the tables in the Museum's 
                                database are rather large, containing upwards of 25-30 columns. So when you only query for a specific number of 
                                columns (fields), you are cutting out data accessible to you. To visualize this:
                            </p>

                            <Grid width={16}>
                                <Grid.Column width={7}>
                                    <Table celled selectable>
                                        <Table.Header>
                                            <Table.Row textAlign='center'>
                                                <Table.HeaderCell>collection</Table.HeaderCell>
                                            </Table.Row>    
                                        </Table.Header>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>id</Table.HeaderCell>
                                                <Table.HeaderCell>...</Table.HeaderCell>
                                                <Table.HeaderCell positive>genus</Table.HeaderCell>
                                            </Table.Row>    
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>1</Table.Cell>
                                                <Table.Cell>...</Table.Cell>
                                                <Table.Cell negative>Catacola</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>2</Table.Cell>
                                                <Table.Cell>...</Table.Cell>
                                                <Table.Cell>Papilio</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                                <Grid.Column width={2} textAlign='center' verticalAlign='middle'>
                                    <Icon name='arrow right' />
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    <Table celled selectable>
                                        <Table.Header>
                                            <Table.Row textAlign='center'>
                                                <Table.HeaderCell>collection</Table.HeaderCell>
                                            </Table.Row>    
                                        </Table.Header>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>id</Table.HeaderCell>
                                                <Table.HeaderCell>genus</Table.HeaderCell>
                                            </Table.Row>    
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>1</Table.Cell>
                                                <Table.Cell negative>Catacola</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            </Grid>

                            <p style={{paddingTop: '2rem'}}>
                                Had you instead attempted the first query, you would have maintained access to all of the specimen data: 
                            </p>
                            <Message>
                                <Message.Content>
                                    SELECT * FROM `collection` WHERE `genus` = `Catacola`;
                                </Message.Content>
                            </Message>

                            <Grid width={16}>
                                <Grid.Column width={7}>
                                    <Table celled selectable>
                                        <Table.Header>
                                            <Table.Row textAlign='center'>
                                                <Table.HeaderCell>collection</Table.HeaderCell>
                                            </Table.Row>    
                                        </Table.Header>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>id</Table.HeaderCell>
                                                <Table.HeaderCell>...</Table.HeaderCell>
                                                <Table.HeaderCell>genus</Table.HeaderCell>
                                            </Table.Row>    
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>1</Table.Cell>
                                                <Table.Cell>...</Table.Cell>
                                                <Table.Cell negative>Catacola</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>2</Table.Cell>
                                                <Table.Cell>...</Table.Cell>
                                                <Table.Cell>Papilio</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                                <Grid.Column width={2} textAlign='center' verticalAlign='middle'>
                                    <Icon name='arrow right' />
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    <Table celled selectable>
                                        <Table.Header>
                                            <Table.Row textAlign='center'>
                                                <Table.HeaderCell>collection</Table.HeaderCell>
                                            </Table.Row>    
                                        </Table.Header>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>id</Table.HeaderCell>
                                                <Table.HeaderCell>...</Table.HeaderCell>
                                                <Table.HeaderCell>genus</Table.HeaderCell>
                                            </Table.Row>    
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>1</Table.Cell>
                                                <Table.Cell>...</Table.Cell>
                                                <Table.Cell negative>Catacola</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            </Grid>
                            <p style={{paddingTop: '2rem', paddingBottom: '1rem'}}>
                                Another important note would be the REGEXP operator option in the query selection form. Instead of 
                                matching the query results to a typical conditional (=, >, etc) this operator initiates
                                a <a href='https://www.guru99.com/regular-expressions.html' target='_blank'>regular expression</a>. There are 
                                many parts to a regular expression, so please see the referenced documentation if you plan on using it. 
                            </p>
                            <p style={{paddingBottom: '2rem'}}>
                                For more generic SELECT examples, visit <a href='https://www.guru99.com/select-statement.html' target='_blank'>this </a> link.
                            </p>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button icon='check' content='Got it!' onClick={this.close} />
                        </Modal.Actions>
                    </Modal>
                )
            case 'UPDATE':
                return (
                    <Modal
                        open={open}
                        onOpen={this.open}
                        onClose={this.close}
                        size='small'
                        trigger={
                        <Button primary icon type="button">
                            See Help <Icon name='question' />
                        </Button>
                        }
                    >
                        <Modal.Header>UPDATE Query Help</Modal.Header>
                        <Modal.Content>
                            <Message>
                                <Message.Header>UPDATE Query:    Basic Structure</Message.Header>
                                <Message.Content><br />UPDATE `table_name` SET `column_name` = `new_value' [WHERE condition];</Message.Content>
                            </Message>
                            <p>
                                In simple terms, this line queries the database to: inside the table, update the 
                                field entitled `column_name` to a new value of `new_value`. If you were to exclude
                                the WHERE condition clause, something that is not allowed in this program for data-security
                                purposes, then the update would act on ALL of the entries' field denoted by the provided 
                                `column name`. For example: 
                            </p>
                            <Message>
                                <Message.Content>
                                    UPDATE `collection` SET `genus` = `fake` WHERE `genus` = `Catacola`;
                                </Message.Content>
                            </Message>
                            <p>
                                While being a silly request, this query would tell the database to update all entries' `genus` field, in the table `collection,`
                                with the value `fake,` given that the `genus` field currently contains the value `Catacola.` <br />
                                To visualize this: 
                            </p>

                            <Grid width={16}>
                                <Grid.Column width={7}>
                                    <Table celled selectable>
                                        <Table.Header>
                                            <Table.Row textAlign='center'>
                                                <Table.HeaderCell>collection</Table.HeaderCell>
                                            </Table.Row>    
                                        </Table.Header>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>id</Table.HeaderCell>
                                                <Table.HeaderCell>...</Table.HeaderCell>
                                                <Table.HeaderCell positive>genus</Table.HeaderCell>
                                            </Table.Row>    
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>1</Table.Cell>
                                                <Table.Cell>...</Table.Cell>
                                                <Table.Cell negative>Catacola</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>2</Table.Cell>
                                                <Table.Cell>...</Table.Cell>
                                                <Table.Cell>Papilio</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                                <Grid.Column width={2} textAlign='center' verticalAlign='middle'>
                                    <Icon name='arrow right' />
                                </Grid.Column>
                                <Grid.Column width={7}>
                                    <Table celled selectable>
                                        <Table.Header>
                                            <Table.Row textAlign='center'>
                                                <Table.HeaderCell>collection</Table.HeaderCell>
                                            </Table.Row>    
                                        </Table.Header>
                                        <Table.Header>
                                            <Table.Row>
                                                <Table.HeaderCell>id</Table.HeaderCell>
                                                <Table.HeaderCell>...</Table.HeaderCell>
                                                <Table.HeaderCell>genus</Table.HeaderCell>
                                            </Table.Row>    
                                        </Table.Header>
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>1</Table.Cell>
                                                <Table.Cell>...</Table.Cell>
                                                <Table.Cell negative>fake</Table.Cell>
                                            </Table.Row>
                                            <Table.Row>
                                                <Table.Cell>2</Table.Cell>
                                                <Table.Cell>...</Table.Cell>
                                                <Table.Cell>Papilio</Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                    </Table>
                                </Grid.Column>
                            </Grid>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button icon='check' content='Got it!' onClick={this.close} />
                        </Modal.Actions>
                    </Modal>
                )
            default:
                return (
                    <Modal
                        open={open}
                        onOpen={this.open}
                        onClose={this.close}
                        size='small'
                        trigger={
                        <Button primary icon type="button">
                            See Help <Icon name='question' />
                        </Button>
                        }
                    >
                        <Modal.Header>TBA Query Help</Modal.Header>
                        <Modal.Content>
                        <p>
                            Eventually, there will be a thorough explanation, as well as a few examples on this page.
                            For now, this is all there will be.
                        </p>
                        </Modal.Content>
                        <Modal.Actions>
                        <Button icon='check' content='Got it!' onClick={this.close} />
                        </Modal.Actions>
                    </Modal>
                )
        }
    }
}