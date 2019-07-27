export interface Node {

}

export interface Graph {
    neighbors(node: Node): Node[];
}