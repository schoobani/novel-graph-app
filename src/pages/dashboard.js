import React, { useState, useEffect } from "react";
import data from "../assets/karamazov-graph.json";
import desc from "../assets/char-desc.json";
import { Graph } from '../components/graph';
import { Node } from "../components/node";
import { Links } from "../components/links";
import { About } from "../components/about";
import { WidthProvider, Responsive } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);



const filterNodes = (nodes_list, data) => {
  const filteredNodes = data.filter(function (el) {
    return (nodes_list.has(el.name))
  })
  return filteredNodes
}


const getNodeNeighbour = (name, data) => {
  if (name !== {}) {
    const neighbours = data.links.filter(function (el) {
      return (el.source.name === name | el.target.name === name)
    })
    let sources = neighbours.map(a => a.source.name);
    let targets = neighbours.map(a => a.target.name);
    targets.push.apply(targets, sources)
    const uniqu_neighbours = new Set(targets)
    uniqu_neighbours.delete(name)
    const filteredNodes = filterNodes(uniqu_neighbours, data.nodes)
    return filteredNodes
  }
  else {
    return data
  }
}

const getNodeNeighbourDesc = (name, rels) => {
  return (rels.filter(function (el) {
    return (el.source === name | el.target === name)
  }))
}

const Dashboard = () => {

  const [selectedNode, setSelectedNode] = useState(undefined)
  const [selectedNodeNeighborsDesc, setSelectedNodeNeighborsDesc] = useState(undefined)
  const [nodeNeighbours, setNodeNeighbours] = useState(undefined)
  const [nodeDesc, setNodeDesc] = useState(undefined)

  const layouts = {
    lg: [
      { i: "summary", x: 0, y: 0, w: 3, h: 6, static: true },
      { i: "graph", x: 3, y: 0, w: 6.5, h: 6, static: true },
      { i: "about", x: 9.5, y: 0, w: 2.5, h: 6, static: true }
    ]
  }

  const handleNodeClick = (node) => {
   
    setSelectedNode(node)
    setSelectedNodeNeighborsDesc(getNodeNeighbourDesc(node.name, desc.rels))
    const nodeDesc = desc.characters.filter(function (el) {
      return (el.name === node.name)
    })
    nodeDesc.length === 1 ? setNodeDesc(nodeDesc[0]) : setNodeDesc(undefined)
  }

  const handleBackgroundClick = () => {
    setSelectedNode(undefined)
    setNodeDesc(undefined)
  }

  useEffect(() => {
    selectedNode === undefined ? setNodeNeighbours(undefined) :
    setNodeNeighbours(getNodeNeighbour(selectedNode.name, data))
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
            selectedNode={selectedNode}
            neighbours={nodeNeighbours}
            neighborsDesc={selectedNodeNeighborsDesc}
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