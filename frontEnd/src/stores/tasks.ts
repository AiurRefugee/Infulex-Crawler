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
        async getTaskDetail(mediaType, mediaId) {
            this.selectedTask = null
            taskApi.getTaskDetail(mediaType, mediaId).then(task => {
                this.selectedTask = task
            }).catch((err) => {
                console.log('getTaskDetail err', err)
            })

        },
        
        createTask(media, mediaType, backdropPath) {
            const {
                id: mediaId,
                name,
                title,
            } = media
            const mediaTitle = title || name
            taskApi.createTask(mediaType, mediaId, mediaTitle, backdropPath).then((res) => {
                this.getTaskList()
            }).catch((err) => {
                console.log('createTask err', err)
            })
    
    
        },
        
        stopTask(mediaId: Number, mediaType: String) {
            const key = mediaType + String(mediaId)
            const task = this.taskPools[key]
            task.ctrl.abort()
        },
        getTaskList() {
            taskApi.getTaskList().then(taskList => {
                this.taskPools = taskList.reverse()
            })
    
        }
    },

    

})