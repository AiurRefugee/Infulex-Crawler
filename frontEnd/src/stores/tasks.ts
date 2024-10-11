import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


import { fetchEventSource } from '@microsoft/fetch-event-source';

const baseUrl = '/api'

const ctlPools = {}

export const taskStore = defineStore('tasks', {
    state: () => ({
        tasks: ref([]),
        task: ref(null),
        loading: ref(false),
        error: ref(null)
    }),
    actions: {
        async fetchTasks() {
            this.loading = true
            try {
            } catch (error) {
                console.log(error)
            }
        },
        createTask(keywordObj) {
            const ctrl = new AbortController()
            const { title } = keywordObj
            ctlPools[title] = ctrl
            fetchEventSource('/api/crawlKeyword', {
                method: 'POST',
                openWhenHidden: false,
                body: JSON.stringify(keywordObj),
                headers: {
                    'Content-Type': 'application/json',
                },
                onmessage: (event) => {
                    const data = JSON.parse(event.data);
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