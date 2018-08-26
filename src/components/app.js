import React from 'react';
import './app.css';
import CreateTask from './create-task';
import TaskList from './task-list';

let arrTask = [];

function storageAvailable(type) {
    try {
        let storage = window[type];
        let x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return false;
    }
}

if (storageAvailable('localStorage')) {
    arrTask = JSON.parse(localStorage.getItem("TaskList"));
    if (!arrTask) arrTask = [];
} else {
    arrTask = [];
    alert('Browser not support localStorage');
}

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrTask: arrTask
        }
        this.createTask = this.createTask.bind(this);
        this.saveTask = this.saveTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.toggleTask = this.toggleTask.bind(this);
    }

    createTask(name) {
        if (this.taskAlreadyExist(name)) {
            return false;
        }

        let newTask = {
            name: name,
            isCompleted: false
        };        
        this.state.arrTask.push(newTask);
        this.setState({ arrTask: this.state.arrTask });
        console.log('Добавлена новая задача: ' + name);
    }

    taskAlreadyExist(name) {
        const foundTask = this.state.arrTask.filter(function(task) {
            return task.name === name;
        });        

        if (foundTask.length !== 0) {
            console.log('Задача с таким именем уже существует');
            return true;
        }
        return false;
    }

    saveTask(oldTask, newTask) {
        if (this.taskAlreadyExist(newTask)) return false;

        const foundTask = this.state.arrTask.find(function(task) {
            return task.name === oldTask;
        });
        foundTask.name = newTask;        
        this.setState({ arrTask: this.state.arrTask });
    }

    deleteTask(name) {
        const newArrTask = this.state.arrTask.filter(function(task) {
            return task.name !== name;
        });
        this.setState({ arrTask: newArrTask });
    }    

    toggleTask(name) {
        const foundTask = this.state.arrTask.find(function(task) {
            return task.name === name;
        });
        foundTask.isCompleted = !foundTask.isCompleted;
        this.setState({ arrTask: this.state.arrTask });
    }

    componentDidUpdate() {
        var serialObj = JSON.stringify(this.state.arrTask);
        delete localStorage["TaskList"];
        localStorage.setItem("TaskList", serialObj);
    }

    render() {
        return (
            <div className="content">
                <CreateTask
                    arrTask={ this.state.arrTask }
                    createTask={ this.createTask }
                />
                <TaskList
                    arrTask={ this.state.arrTask }
                    saveTask={ this.saveTask }
                    deleteTask={ this.deleteTask }
                    toggleTask={ this.toggleTask }
                />
            </div>
        )
    }
}