import { ForceGraph2D } from 'react-force-graph';
import React, { useState } from "react";


const filterNodes = (nodes_list, data) => {
  const filteredNodes = data.filter(function (el) {
    return (nodes_list.has(el.name))
  })
  return filteredNodes
}

const getNodeNeighbour = (name, data) => {
  const neighbours = data.links.filter(function (el) {
    return (el.source.name === name | el.target.name === name)
  })
  let sources = neighbours.map(a => a.source.name);
  let targets = neighbours.map(a => a.target.name);
  targets.push.apply(targets, sources)
  const uniqu_neighbours = new Set(targets)
  uniqu_neighbours.delete(name)
  const filteredNodes = filterNodes(uniqu_neighbours, data.nodes)
  return { 'nodes': filteredNodes, 'links': neighbours }
}


export const Graph = ({ data,  onNodeSelection, onBackgroundClick }) => {

  let [selectedNodes, setSelectedNoded] = useState([]);
  let [selectedLinks, setselectedLinks] = useState([]);

  const handleNodeClick = node => {
    onNodeSelection(node)
    let nodes = []
    if (node) {
      nodes.push(node);
      let neighbours = getNodeNeighbour(node.name, data)
      setselectedLinks(neighbours.links)
      neighbours.nodes.forEach(neighbor => nodes.push(neighbor));
    }
    setSelectedNoded(nodes)
  }

  const handleBackgroundClick = () => {
    onBackgroundClick()
    setSelectedNoded([])
    setselectedLinks([])
  }

  return (
    <ForceGraph2D
      graphData={data}
      dagMode='zout'
      zoomToFit={true}
      minZoom={3}
      maxZoom={10}
      linkCurvature={0.01}
      linkWidth={link => (link.value + 2) / 3}
      linkDirectionalParticles={link => selectedLinks.includes(link) ? 5 : 0}
      linkDirectionalParticleSpeed={d => selectedLinks.includes(d) ? d.value * 0.00005 : 0}
      linkDirectionalParticleWidth={d => selectedLinks.includes(d) ? d.value * 0.1 : 0}
      nodeCanvasObject={(node, ctx, globalScale) => {
        node.color = selectedNodes.includes(node) ? 'red' : 'blue';
        const label = node.name.charAt(0).toUpperCase() + node.name.slice(1);
        const fontSize = (node.val + 10) / globalScale;
        ctx.font = `${fontSize}px Tahoma`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.3); // some padding
        ctx.fillStyle = 'rgba(242, 242, 242, 10)';
        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = selectedNodes.includes(node) ? '#C41221' : '#171C1C';
        ctx.fillText(label, node.x, node.y);
      }}
      // nodeLabel={(node) => node.name}
      // nodeColor={(node) => selectedNodes.includes(node) ? 'red' : 'blue'}
      onNodeClick={handleNodeClick}
      onBackgroundClick={handleBackgroundClick}
    />
  );
}