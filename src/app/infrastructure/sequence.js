export default class Sequence {

    #currentValue;

    constructor() {
        this.#currentValue = 1;
    }

    getCurrent() {
        return this.#currentValue;
    }

    getCurrentAndIncrement() {
        return this.#currentValue++;
    }
}
