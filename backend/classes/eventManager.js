class EventManager {
    constructor() {
        this.subscribers = {};
    }

    subscribe(topic, callback) {
        if (!this.subscribers[topic]) {
            this.subscribers[topic] = [];
        }
        this.subscribers[topic].push(callback);
    }

    unsubscribe(topic, callback) {
        if (this.subscribers[topic]) {
            this.subscribers[topic] = this.subscribers[topic].filter(sub => sub !== callback);
        }
    }

    publish(topic, data) {
        if (this.subscribers[topic]) {
            this.subscribers[topic].forEach(callback => {
                callback(data);
            });
        }
    }
}

module.exports = EventManager;