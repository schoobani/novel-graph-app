import React, { useState, useEffect } from "react";
import data from "../assets/karamazov-graph.json";
import characters from "../assets/char-desc.json";
import { Graph } from '../components/graph';
import { Node } from "../components/node";
import { Links } from "../components/links";
import { About } from "../components/about";
import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);


const filterNodes = (nodes_list, data) => {
  const filteredNodes = data.filter(function (el) {
    return (nodes_list.has(el.id))
  })
  return filteredNodes
}


const getNodeNeighbour = (id, data) => {
  if (id !== {}) {
    const neighbours = data.links.filter(function (el) {
      return (el.source.id === id | el.target.id === id)
    })
    let sources = neighbours.map(a => a.source.id);
    let targets = neighbours.map(a => a.target.id);
    targets.push.apply(targets, sources)
    const uniqu_neighbours = new Set(targets)
    uniqu_neighbours.delete(id)
    const filteredNodes = filterNodes(uniqu_neighbours, data.nodes)
    return filteredNodes
  }
  else {
    return data
  }

}

const Dashboard = () => {


  const defaultSelectedNode = data.nodes.filter(function (el) {
    return (el.name === 'alyosha')
  })

  const defaultNodeDesc = characters.characters.filter(function (el) {
    return (el.name === 'alyosha')
  })

  const defaultNeighbours = getNodeNeighbour(defaultSelectedNode[0].id, data)
  

  const [selectedNode, setSelectedNode] = useState(defaultSelectedNode[0])
  const [nodeNeighbours, setNodeNeighbours] = useState(defaultNeighbours)
  const [nodeDesc, setNodeDesc] = useState(defaultNodeDesc[0])

  const layouts = {
    lg: [
      { i: "summary", x: 0, y: 0, w: 3, h: 6, static: true },
      { i: "graph", x: 3, y: 0, w: 7, h: 6, static: true },
      { i: "about", x: 10, y: 0, w: 2, h: 6, static: true }
    ]
  }

  const handleNodeClick = (node) => {
    setSelectedNode(node)
    const nodeDesc = characters.characters.filter(function (el) {
      return (el.id === node.id)
    })
    console.log(nodeDesc)
    nodeDesc.length === 1 ? setNodeDesc(nodeDesc[0]) : setNodeDesc(undefined)
    
  }

  const handleBackgroundClick = () => {
    setSelectedNode(defaultSelectedNode[0])
  }

  useEffect(() => {
    setNodeNeighbours(getNodeNeighbour(selectedNode.id, data))
  }, [selectedNode])

  return (
    <ResponsiveReactGridLayout
      className="layout"
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 9, sm: 6, xs: 4, xxs: 2 }}
      layouts={layouts}
    >
      <div key="graph" className="graphContainer">
        < Graph
          data={data}
          onNodeSelection={handleNodeClick}
          onBackgroundClick={handleBackgroundClick}
        />
      </div>
      <div key="summary" className="summary">
        <div className="nodeSumContainer">
          <Node
            node={selectedNode}
            nodeDesc={nodeDesc}
          />
        </div>
        <div>
          <Links
            neighbours={nodeNeighbours}
            selectedNode={selectedNode}
          />
        </div>
      </div>

      <div key="about" className="aboutContainer">
        <About />
      </div>

    </ResponsiveReactGridLayout>
  );
}

export default Dashboard;