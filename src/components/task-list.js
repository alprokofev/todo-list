import React from 'react';
import TaskListItem from './task-list-item';

export default class TaskList extends React.Component {
    renderTaskItems() {
        const props = this.props;
        let taskItems = this.props.arrTask.map(function(task, index) {
            return <TaskListItem key={index} task={task} {...props} />            
        });
        return taskItems;
    }

    render() {
        return (
            <div>
                { this.renderTaskItems() }
            </div>
        )
    }
}