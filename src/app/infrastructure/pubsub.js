export default class PubSub {

    constructor() {
        this.subscribers = [];
    }

    subscribe(subscriber) {
        this.#validate(subscriber);
        this.subscribers = [...this.subscribers, subscriber];
    }

    unsubscribe(subscriber) {
        this.#validate(subscriber);
        this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
    }

    publish(message) {
        this.subscribers.forEach(subscriber => subscriber(message));
    }

    #validate(subscriber) {
        if (typeof subscriber !== 'function') {
            throw new Error(`${typeof subscriber} is not a valid argument, expected a function`);
        }
    }
}
