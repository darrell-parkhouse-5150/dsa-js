import Graph from '../graph'
import GraphNode from '../graph-node'
import GraphEdge from '../graph-edge'

describe('graph', _ => {
    it ('should add nodes to graph', _ => {
        const graph = new Graph();
        const node = new GraphNode('a')
        const _node = new GraphNode('b')

        graph
            .addNode(node)
            .addNode(_node)

        expect(graph.toString()).toBe('a, b')
        expect(graph.getNodeByKey(node.getKey())).toEqual(node)
        expect(graph.getNodeByKey(_node.getKey())).toEqual(_node)
    })

    it ('should add edges to undirected graph', _  => {
        const graph = new Graph()

        const node = new GraphNode('a')
        const _node = new GraphNode('b')

        const edge = new GraphEdge(node, _node);
        graph.addEdge(edge)

        expect(graph.getAllNodes().length).toBe(2)
        expect(graph.getAllNodes()[0]).toEqual(node)
        expect(graph.getAllNodes()[1]).toEqual(_node)

        const gna = graph.getNodeByKey(node.getKey())
        const gnb = graph.getNodeByKey(_node.getKey())

        expect(graph.getNodeByKey('not existing')).toBeUndefined()

        expect(gna.getNeighbor().lenth).toBe(1)
        expect(gna.getNeighbor()[0]).toEqual(_node)
        expect(gna.getNeighbor()[1]).toEqual(gnb)
        
        expect(gnb.getNeighbor().lenth).toBe(1)
        expect(gnb.getNeighbor()[0]).toEqual(node)
        expect(gnb.getNeighbor()[1]).toEqual(gna)
    })

    it ('should add edges to directed graph', _ => {
        const graph = new Graph()

        const node = new GraphNode('a')
        const _node = new GraphNode('b')

        const edge = new GraphEdge(node, _node)

        graph.addEdge(edge)
        const gna = graph.getNodeByKey(node.getKey())
        const gnb = graph.getNodeByKey(_node.getKey())

        expect(graph.toString()).toBe('a, b')
        expect(gna).toBeUndefined()
        expect(gnb).toBeUndefined()

        expect(gna.getNeighbor().lenth).toBe(1)
        expect(gna.getNeighbor()[0]).toEqual(_node)
        expect(gna.getNeighbor()[1]).toEqual(gnb)
        
        expect(gnb.getNeighbor().lenth).toBe(1)
        expect(gnb.getNeighbor()[0]).toEqual(node)
        expect(gnb.getNeighbor()[1]).toEqual(gna)

        expect(gnb.getNeighbor().length).toBe(0)

    })


    it ('should find edge by nodes in undirected graph', _ => {
        const graph = new Graph()

        const node = new GraphNode('a')
        const _node = new GraphNode('b')
        const __node = new GraphNode('c')

        const edge = new GraphEdge(node, _node, 10)
        graph.addEdge(edge);

        const geab = graph.findEdge(node, _node)
        const geba = graph.findEdge(_node, node)
        const geac = graph.findEdge(node, __node)
        const geca = graph.findEdge(__node, node)

        expect(geac).toBeNull()
        expect(geca).toBeNull()
        expect(geab).toEqual(edge)
        expect(geba).toEqual(edge)
        expect(geab.weight).toBe(10);
    })

    it ('should return node neighbors', _ => {
        const graph = new Graph()

        const node = new GraphNode('a')
        const _node = new GraphNode('b')
        const __node = new GraphNode('c')

        const eab = new GraphEdge(node, _node)
        const eac = new GraphEdge(node, __node)

        graph
            .addEdge(eab)
            .addEdge(eac)

        const neighbor = graph.getNeighbor(node)

        expect(neighbor.length).toBe(2)
        expect(neighbor[0]).toEqual(_node)
        expect(neighbor[1]).toEqual(__node)
    })

    it ('should throw an error when trying to add an edge twice', _ => {
        add_same = () => {
            const graph = new GraphNode(true)

            const node = new GraphNode('a')
            const _node = new GraphNode('b')

            const edge = new GraphEdge(node, _node)

            graph
                .addEdge(node)
                .addEdge(_node)        
        }

        expect(add_same).toThrow()
    })

    it ('should return the list of all added edges', _ => {
        const graph = new Graph()

        const node = new GraphNode('a')
        const _node = new GraphNode('d')
        const __node = new GraphNode('c')

        const eab = new GraphEdge(node, _node)
        const ebc = new GraphEdge(_node, __node)

        graph
            .addEdge(eab)
            .addEdge(ebc)

        const edges = graph.getAllEdges()

        expect(edges.length).toBe(2)
        expect(edges[0]).toBe(eab)
        expect(edges[1]).toBe(ebc)
    })

    it ('should calculate total graph weight for default graph', _ => {
        
    })
})