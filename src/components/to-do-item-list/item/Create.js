import React from 'react';
import * as actions from '../../../actions/toDoAction';
import { connect } from 'react-redux';
import ToDoItem from '../../../models/ToDoItem';
import { Button, ButtonToolbar } from 'react-bootstrap';
import { AddItem } from '../../to-do-item-list/item/AddItem';

class Create extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentItem: '',
            description: '',
            from: '',
            to: '',
            isToDo: false,
            addModalShow: false
        }
    }

    handleInput = (e) => {

        this.setState({ currentItem: e.target.value, from: e.target.value, to: e.target.value })
    }
    descriptionHandler = (e) => {
        this.setState({ description: e.target.value });
    }
    fromTimeHandler = (e) => {
        this.setState({ from: e.target.value });
    }

    toTimeHandler = (e) => {
        this.setState({ to: e.target.value });
    }
    addItem = (e) => {
        e.preventDefault();
        const newItem = this.state.currentItem;
        const newDesc = this.state.description;
        const newFrom = this.state.from;
        const newTo = this.state.to;
        if (newItem.text !== '') {
            this.setState({ currentItem: '', description: '', from: '', to: ''})
            const todoItem = new ToDoItem(3, newItem, newDesc, newFrom, newTo, false, false)
            this.props.createToDo(todoItem);  
        }
    }
    render() {
        console.log(this.props.toDos);
        let addModalClose = () => this.setState({ addModalShow: false });
        return (
            <header>
                <ButtonToolbar >
                    <span style={{ color: "white", fontSize: "20px" }}> Click   <Button
                        
                        variant = "dark"
                        onClick={() => this.setState({ addModalShow: true })}
                    >
                       <span onClick={() => this.setState({ addModalShow: true })}>
                            <i className="fa fa-plus-circle" aria-hidden="true" style={{ fontSize: "50px" }}></i>
                        </span></Button>   to Add Your Task </span>  

                    

                    <AddItem
                        show={this.state.addModalShow}
                        onHide={addModalClose}
                        addItem={this.addItem}
                        currentItem={this.state.currentItem}
                        handleInput={this.handleInput}
                        descriptionHandler={this.descriptionHandler}
                        fromTimeHandler={this.fromTimeHandler}
                        toTimeHandler={this.toTimeHandler}

                    />
                    
                </ButtonToolbar>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        toDos: state.toDos
    };
};

//if you are performing operations then we have use this 
const mapDispatchToProps = (dispatch) => {
    return {
        createToDo: todo => dispatch(actions.createToDo(todo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Create);
//export default Create;