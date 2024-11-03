import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { fetchEventSource } from '@microsoft/fetch-event-source';

import { task } from '@/mocData/task'

const baseUrl = '/api'

const defaultTasks = [...task, ...task, ...task, ...task]

export const taskStore = defineStore('tasks', {
    state: () => ({
        loading: ref(false),
        error: ref(null),
        taskPools: ref(defaultTasks),
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
        createTask(media, mediaType) {
            const {
                id,
                name,
                title,
                original_name,
                original_title
            } = media
            const keyword = name || title
            const keywordObj = {
                title: keyword,
                original_title: original_name || original_title || keyword,
            }
            const postData = {
                keywordObj,
                media,
                mediaType
            }

            const ctrl = new AbortController()
            const msgs = []
            const taskObj = {
                status: '进行中',
                media,
                mediaType,
                msgs,
                ctrl
            }
            this.taskPools[`${mediaType}${id}`] = taskObj
            this.selectedTask = taskObj

            fetchEventSource('/api/crawlKeyword', {
                method: 'POST',
                openWhenHidden: false,
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json',
                },
                onmessage: (event) => {
                    const data = JSON.parse(event.data);
                    msgs.push(data)
                    console.log(data);
                },
                onerror: (err) => {
                    console.log('error', err);
                    ctrl.abort()
                },
                signal: ctrl.signal,
            })
        },
        stopTask(mediaId: Number, mediaType: String) {
            const key = mediaType + String(mediaId)
            const task = this.taskPools[key]
            task.ctrl.abort()
        }
    }
})