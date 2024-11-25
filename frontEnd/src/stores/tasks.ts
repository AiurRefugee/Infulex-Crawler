import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { fetchEventSource } from '@microsoft/fetch-event-source';

import { task } from '@/mocData/task'
import { taskApi } from '@/apis/tasks'

const defaultTasks = [...task, ...task, ...task, ...task]

 
export const useTaskStore = defineStore('tasks', {
    state: () => ({
        taskPools: [],
        selectedTask: null,
        fileTree: null,
        filePaths: [],
        topFiles: [],
        topChildren: null,
        nodes: {}, // 存储task msg的所有file节点 
        topTitle: "",
        selectedFiles: {},
        listStype: 0,
    }),
    actions: {
        resetSelectedTask() { 
            this.selectedTask = null
            this.fileTree = null
            this.filePaths = []
            this.topFiles = []
            this.topChildren = null
            this.nodes = {}
            this.selectedFiles = {}
        },

        switchListStype(type) {
            this.selectedFiles = {}
            this.listStype = type
        },

        switchSelectFile(file) {
            const { file_id } = file
            if (this.selectedFiles[file_id]) {
                this.selectedFiles[file_id] = false 
            } else {
                this.selectedFiles[file_id] = true 
            }
            
        },

        buildFileTree(task) {
            const msgs = task.msgs
            if (!msgs || msgs.length === 0) {
                console.log('buildFileTree null')
                return {}
            } 
            const forest = {}
            let root = {
                file: 'root',
                children: {}
            }
            msgs.forEach(msg => {
                for (const file of msg.data) {
                    const { file_id, parent_file_id, name } = file 
                    const node = {
                        file,
                        children: {}
                    }
                    
                    
                    const hasParentInNodes = parent_file_id in this.nodes
                    // 如果所有叶子节点中有节点是node的父节点
                    if (hasParentInNodes) {
                        const parent_node = this.nodes[parent_file_id]
                        parent_node.children[file_id] = node
                    } else {  
                        root.children[file_id] = node 
                    }
                    this.nodes[file_id] = node
                    
                }
            })
            console.log('fileTree', root)
            return root
        },

        async getTaskDetail(mediaType, mediaId) {
            this.resetSelectedTask()
            taskApi.getTaskDetail(mediaType, mediaId).then(task => {
                this.selectedTask = task
                this.fileTree = this.buildFileTree(task)
                this.getTopChildren(this.filePaths)
                this.getTopFiles()
            }).catch((err) => {
                console.log('getTaskDetail err', err)
            })

        },

        getTopChildren() {
            this.topChildren = this.fileTree.children
            if (this.filePaths && this.filePaths.length > 0) {
                const length = this.filePaths.length
                const last_file_id = this.filePaths[length - 1]
                this.topChildren = this.nodes[last_file_id].children
            }
            return this.topChildren
        },

        getTopFiles() {
            this.topFiles = Object.values(this.topChildren).map(node => node.file)
        },

        pushFilePath(file) { 
            const { file_id, name } = file
            if (Object.keys(this.topChildren[file_id].children).length) { 
                this.topTitle = name
                this.filePaths.push(file_id)
                this.getTopChildren()
                this.getTopFiles()
            } 
        },

        popFilePath() {
            if (this.filePaths.length == 0) return false
            this.filePaths.pop()
            this.getTopChildren()
            this.getTopFiles()
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
        
        stopChildrenTask(mediaId: Number, mediaType: String) {
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