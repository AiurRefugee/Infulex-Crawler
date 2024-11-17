import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { fetchEventSource } from '@microsoft/fetch-event-source';

import { task } from '@/mocData/task'
import { taskApi } from '@/apis/tasks'

const defaultTasks = [...task, ...task, ...task, ...task]

export const useTaskStore = defineStore('tasks', {
    state: () => ({
        taskPools: [],
        selectedTask: null
    }),
    actions: {
        async fetchTasks() {
            this.loading = true
            try {
            } catch (error) {
                console.log(error)
            }
        },
        setCurrentTask(task) {
            console.log(task)
            this.selectedTask = task
        },
        createTask(media, mediaType, backdropPath) {
            const {
                id: mediaId,
                name,
                title, 
            } = media
            const taskObj = {
                status: '进行中',
                msgs: [],
                mediaId,
                mediaType,
                backdropPath,
                title: title || name,
            }
            taskApi.createTask(media, mediaType, backdropPath).then((res) => {

                this.taskPools.push(taskObj)
            })
            

        },
        stopTask(mediaId: Number, mediaType: String) {
            const key = mediaType + String(mediaId)
            const task = this.taskPools[key]
            task.ctrl.abort()
        },
        fetchTaskList () {
            taskApi.getTaskList().then( taskList => { 
                this.taskPools = taskList.reverse()
            })
            
        }
    }
})