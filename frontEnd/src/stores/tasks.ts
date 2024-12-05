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

        clearSelectedTask() {
            this.selectedTask = null
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
                
                if (msg.type != 'GET File' && msg.type != 'GET Video') {
                    return
                } 
                for (const file of msg.data) {
                    const { file_id, parent_file_id, name } = file 
                    if (file_id) {

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
                    
                    
                }
            })
            console.log('fileTree', root)
            return root
        },

        async getTaskDetail(mediaType, mediaId) {
            this.resetSelectedTask()
            const media_id = Number(mediaId)
            taskApi.getTaskDetail(mediaType, media_id).then(task => {
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
                const lastFile = this.filePaths[length - 1]
                const { file_id: last_file_id } = lastFile
                this.topChildren = this.nodes[last_file_id].children
            }
            return this.topChildren
        },

        getTopFiles() {
            this.selectedFiles = {}
            this.topFiles = Object.values(this.topChildren).map(node => node.file)
        },

        updateFilePaths(index) {
            this.selectedFiles = {}
            this.filePaths = this.filePaths.slice(0, index + 1)
            this.getTopChildren()
            this.getTopFiles()
        },

        resetFilePath() { 
            if (this.filePaths.length == 0) return false
            this.filePaths = []
            this.getTopChildren()
            this.getTopFiles()
        },

        pushFilePath(file) { 
            this.selectedFiles = {}
            const { file_id, name } = file 
            this.topTitle = name
            this.filePaths.push(file)
            this.getTopChildren()
            this.getTopFiles()
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