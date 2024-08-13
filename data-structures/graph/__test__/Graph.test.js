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
        const graph = new Graph();

        const node = new GraphNode('a')
        const _node = new GraphNode('b')
        const __node = new GraphNode('c')
        const _node_ = new GraphNode('d')

        const eab = new GraphEdge(node, _node)
        const ebc = new GraphEdge(_node, __node)
        const ecd = new GraphEdge(__node, _node_)
        const ead = new GraphEdge(node, _node_)

        graph
            .addEdge(eab)
            .addEdge(ebc)
            .addEdge(ecd)
            .addEdge(ead)

        expect(graph.getWeight()).toBe(0)
    })

    it ('should calcualte total grpah weight for weighted graph', _ => {
        const graph = new Graph();

        const node = new GraphNode('a')
        const _node = new GraphNode('b')
        const __node = new GraphNode('c')
        const _node_ = new GraphNode('d')

        const eab = new GraphEdge(node, _node, 1)
        const ebc = new GraphEdge(_node, __node, 2)
        const ecd = new GraphEdge(__node, _node_, 3)
        const ead = new GraphEdge(node, _node_, 4)

        graph
            .addEdge(eab)
            .addEdge(ebc)
            .addEdge(ecd)
            .addEdge(ead)

        expect(graph.getWeight()).toBe(10)
    })

    it ('should be possible to delete edges from a graph', _ => {
        const graph = new Graph();

        const node = new GraphNode('a')
        const _node = new GraphNode('b')
        const __node = new GraphNode('c')

        const eab = new GraphEdge(node, _node)
        const ebc = new GraphEdge(_node, __node)
        const eac = new GraphEdge(node, __node)

        graph
            .addEdge(eab)
            .addEdge(ebc)
            .addEdge(eac)

        expect(graph.getWeight()).toBe(2)

        graph.deleteEdge(eab)

        expect(graph.getAllEdges().length).toBe(2);
        expect(graph.getAllEdges()[0].getKey()).toBe(ebc.getKey())
        expect(graph.getAllEdges()[1].getKey()).toBe(eac.getKey())
    })

    it ('should throw an error when trying to delete a non existing edge', _ => {
        deleteNoneExisting = () => {
            const graph = new Graph()

            const node = new GainNode('a')
            const _node = new GainNode('b')
            const __node = new GainNode('c')

            const eab = new GraphEdge(node, _node)
            const ebc = new GraphEdge(_node, __node)
            graph.addEdge(eab);
            graph.deleteEdge(ebc)
        }

        expect(deleteNoneExisting).toThrowError()
    });

    it ('should be possible to reverse graph', _ => {
        const node = new GraphNode('a')
        const _node = new GraphNode('b')
        const __node = new GraphNode('c')
        const _node_ = new GraphNode('d')

        const eab = new GraphEdge(node, _node)
        const eac = new GraphEdge(node, __node)
        const ecd = new GraphEdge(__node, _node_)

        const graph = new Graph(true)

        graph
            .addEdge(eab)
            .addEdge(eac)
            .addEdge(ecd)

        expect(grpah.toString()).toBe('a, b, c, d')
        expect(graph.getAllEdges().length).toBe(3)
        expect(graph.getNeighbor(node).legth).toBe(2)
        expect(graph.getNeighbor(node)[0].getKey()).toBe(_node.getKey())
        expect(graph.getNeighbor(node)[1].getKey()).toBe(__node.getKey())
        expect(graph.getNeighbor(_node).length).toBe(0)
        expect(graph.getNeighbor(__node)[0].length).toBe(1)
        expect(graph.getNeighbor(__node)[0].getKey()).toBe(_node_.getKey())

        graph.reverse()

        expect(graph.toString()).toBe('a, b, c, d')
        expect(graph.getAllEdges().length).toBe(3)
        expect(graph.getNeighbor(node).legth).toBe(0)
        expect(graph.getAllEdges(_node)[0].getKey).toBe(node.getKey())
        expect(graph.getNeighbor(__node).length).toBe(1)
        expect(graph.getNeighbor(__node)[0].getKey).toBe(node.getKey())
        expect(graph.getNeighbor(_node_).legth).toBe(1)
        expect(graph.getAllEdges(_node_)[0].getKey).toBe(node.getKey())
    })

    it ('should return nodes index', _ => {
        const node = new GraphNode('a')
        const _node = new GraphNode('b')
        const __node = new GraphNode('c')
        const _node_ = new GraphNode('d')

        const eab = new GraphEdge(node, _node)
        const ebc = new GraphEdge(_node, __node)
        const ecd = new GraphEdge(__node, _node_)
        const ebd = new GraphEdge(_node, _node_)

        const graph = new Graph()

        graph
            .addEdge(eab)
            .addEdge(ebc)
            .addEdge(ecd)
            .addEdge(ebd)

        const nodeIdx = graph.getNodeIndex()

        expect(nodeIdx).toEqual({
            a: 0,
            b: 1,
            c: 2,
            d: 3
        })
    })

    it ('should generate an adjency metrix for undirected graph', _ => {
        const node = new GraphNode('a')
        const _node = new GraphNode('b')
        const __node = new GraphNode('c')
        const _node_ = new GraphNode('d')

        const eab = new GraphEdge(node, _node)
        const ebc = new GraphEdge(_node, __node)
        const ecd = new GraphEdge(__node, _node_)
        const ebd = new GraphEdge(_node, _node_)

        const graph = new Graph()

        graph
            .addEdge(eab)
            .addEdge(ebc)
            .addEdge(ecd)
            .addEdge(ebd)

        const adjMat = graph.getAdjMatrix()

        expect(adjMat).toEqual([
            [Infinity, 0, Infinity, Infinity],
            [0, Infinity, 0, 0]
            [Infinity, 0, Infinity, 0],
            [Infinity, 0, 0, Infinity]
        ])
    })

    it ('should generate an adjacency matrix for directed graph', _ => {
        const node = new GraphNode('a')
        const _node = new GraphNode('b')
        const __node = new GraphNode('c')
        const _node_ = new GraphNode('d')

        const eab = new GraphEdge(node, _node)
        const ebc = new GraphEdge(_node, __node)
        const ecd = new GraphEdge(__node, _node_)
        const ebd = new GraphEdge(_node, _node_)

        const graph = new Graph()

        graph
            .addEdge(eab)
            .addEdge(ebc)
            .addEdge(ecd)
            .addEdge(ebd)

        const adjMat = graph.getAdjMatrix()

        expect(adjMat).toEqual([
            [Infinity, 2, Infinity, Infinity],
            [Infinity, Infinity, 1, 7]
            [Infinity, Infinity, Infinity, 5],
            [Infinity, Infinity, Infinity, Infinity]
        ])  
    })
})