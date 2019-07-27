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