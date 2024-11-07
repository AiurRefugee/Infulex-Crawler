const Task = require('./task');


class taskFactory {
    constructor() {
        this.tasks = [];
    }

    createTask(media, mediaType) {
        const task = new Task(media, mediaType);
        this.tasks.push(task);
        return task;
    }

    getTaskList() {
        return this.tasks;
    }

}