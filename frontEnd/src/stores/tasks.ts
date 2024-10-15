import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { fetchEventSource } from '@microsoft/fetch-event-source';

import { task } from '@/mocData/task'

const baseUrl = '/api'



export const taskStore = defineStore('tasks', {
    state: () => ({
        tasks: ref([]),
        task: ref(null),
        loading: ref(false),
        error: ref(null),
        taskPools: ref([...task, ...task, ...task, ...task])
    }),
    actions: {
        async fetchTasks() {
            this.loading = true
            try {
            } catch (error) {
                console.log(error)
            }
        },
        createTask(data) {
            const {
                name,
                title,
                original_name
              } = data
            const keyword = name || title
            const keywordObj = {
                title: keyword, 
                original_title: original_name || keyword
            }
            
            const { poster_path } = data
            const ctrl = new AbortController()
            const msgs = []
            taskPools[keyword] = {
                poster_path,
                title: keyword,
                ctrl,
                msgs
            }
            fetchEventSource('/api/crawlKeyword', {
                method: 'POST',
                openWhenHidden: false,
                body: JSON.stringify(keywordObj),
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
        stopTask(keywordObj) {
            const { title } = keywordObj
            ctlPools[title].abort()
        }
    }
})