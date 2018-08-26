import React from 'react';
import './create-task.css';

export default class CreateTask extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: ''
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.changeUserInput = this.changeUserInput.bind(this);
    }

    changeUserInput(event) {
        this.setState({userInput: event.target.value});
        const element = this.refs.btnCreate;
        if (event.target.value.trim() === '') {
            element.disabled = true;
            element.classList.add('button-disabled');
        } else {
            element.disabled = false;
            element.classList.remove('button-disabled');
        }        
    }

    handleCreate(event) {
        event.preventDefault();
        const task = this.state.userInput.trim();
        this.props.createTask(task);
        this.setState({userInput: ''});
        
        const element = this.refs.btnCreate;
        element.disabled = true;
        element.classList.add('button-disabled');
    }

    render() {
        return (
            <form onSubmit={this.handleCreate }>
                <div className="flex-container">
                    <input 
                        className="form-control" autoFocus 
                        type="text"
                        onChange={this.changeUserInput}
                        value={this.state.userInput}
                        placeholder="Новая задача"/>
                    <button
                        ref="btnCreate"
                        type="submit"
                        className="button-disabled"
                        disabled>Создать
                    </button>
                </div>
            </form>
        )
    }
}