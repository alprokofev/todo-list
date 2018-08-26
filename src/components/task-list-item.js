import React from 'react';
import './task-list-item.css';

export default class TaskListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false
        };
        this.onSaveClick = this.onSaveClick.bind(this);
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
    }

    onSaveClick(event) {
        event.preventDefault();
        const oldTask = this.props.task.name;
        const newTask = this.refs.editInput.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({ isEditing: false });
    }

    onEditClick() {
        this.setState({ isEditing: true });
    }

    onCancelClick() {
        this.setState({ isEditing: false });
    }

    componentDidUpdate() {
        if (this.state.isEditing) {
            this.refs.editInput.focus();
        }
    }

    renderTaskSection() {
        const name = this.props.task.name;
        const isCompleted = this.props.task.isCompleted;

        const taskStyle = {
            color: isCompleted ? '#5cb85c' : '#d9534f',
            cursor: 'pointer'
        };

        if (this.state.isEditing) {
            return (
                <div className="task-section">
                    <form onSubmit={this.onSaveClick}>
                        <input className="taskInput"
                            defaultValue={name}
                            ref="editInput"
                            type="text"/>
                    </form>
                </div>
            )
        }

        return (
            <div className="task-section">
                <label className=""
                    style={ taskStyle }
                    onClick={this.props.toggleTask.bind(this, name)}>
                    {name}
                </label>                    
            </div>
        )
    }

    renderStateSection() {
        const isCompleted = this.props.task.isCompleted;

        if (isCompleted) {
            return (
                <div className="state-section">
                    <span className="label-done">done</span>
                </div>
            )
        }

        return (
            <div className="state-section">
                <span className="label-undone">undone</span>
            </div>
        )
    }

    renderActionSection() {
        if (this.state.isEditing) {
            return (
                <div className="action-section">
                    <button className="btnSave" onClick={this.onSaveClick}>Save</button>
                    <button className="btnCancel" onClick={this.onCancelClick}>Cancel</button>
                </div>
            )
        }

        return (
            <div className="action-section">
                <button className="btnEdit" onClick={this.onEditClick}>Edit</button>
                <button className="btnDelete" 
                    onClick={this.props.deleteTask.bind(this, this.props.task.name) }>Delete
                </button>
            </div>
        )
    }

    render() {
        return (
            <div className="form-group">
                { this.renderTaskSection() }
                { this.renderStateSection() }
                { this.renderActionSection() }
            </div>
        )
    }
}