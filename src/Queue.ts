class Queue {
    private elements = [];

    public empty(): boolean {
        return this.elements.length == 0;
    }

    public put(elem) {
        this.elements.push(elem);
    }

    public get() {
        return this.elements.shift();
    }
}
