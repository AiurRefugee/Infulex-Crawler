class EventManager {
    constructor() {
        
        // 确保只创建一个实例
        if (!EventManager.instance) {
            this.subscribers = {};
            EventManager.instance = this;

        }
        return EventManager.instance;

    }

    subscribe(topic, callback) {
        if (!this.subscribers[topic]) {
            this.subscribers[topic] = [];
        }
        this.subscribers[topic].push(callback);
    }
 
    addMsg(topic, data) {
        if (this.subscribers[topic]) {
            this.subscribers[topic].forEach(callback => {
                callback(data);
            });
        }
    }
}

module.exports = EventManager;