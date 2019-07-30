export class Queue {
    private elements = [];

    public empty(): boolean {
        return this.elements.length == 0;
    }

    public pop() {
        return this.elements.shift();
    }

    public push(elem) {
        this.elements.push(elem);
    }
}

export class PriorityQueue {
    private elements: [any, number][] = [];

    public empty(): boolean {
        return this.elements.length == 0;
    }

    public pop() {
        return this.elements.shift()[0];
    }

    public push(elem, priority) {
        for (let i = this.elements.length - 1; i >= 0; i--) {
            const e = this.elements[i];
            if (e[1] <= priority) {
                this.elements.splice(i+1, 0, [elem, priority]);
                return;
            }
        }
        this.elements.unshift([elem, priority]);
    }
}