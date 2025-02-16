import { ForceGraph2D as ForceGraph } from 'react-force-graph';
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


export const Graph = ({ data, onNodeSelection, onBackgroundClick, selectedBook }) => {
  let [nieghbourNodes, setNieghbourNodes] = useState([]);
  let [selectedNode, setSelectedNode] = useState(undefined);
  let [lastClickTime, setLastClickTime] = useState(0);
  // let [selectedLinks, setselectedLinks] = useState([]);

  const handleNodeClick = node => {
    const currentTime = Date.now();
    if (currentTime - lastClickTime < 2000) {
      return;
    }
    
    setLastClickTime(currentTime);
    onNodeSelection(node);
    setSelectedNode(node);
    let neighbours = getNodeNeighbour(node.name, data);
    let nodes = [];
    neighbours.nodes.forEach(neighbor => nodes.push(neighbor));
    setNieghbourNodes(nodes);
  }

  const handleBackgroundClick = event => {
    // Only handle background clicks if the click was directly on the background
    if (event && event.target.nodeName === 'CANVAS') {
      onBackgroundClick()
      setNieghbourNodes([])
      setSelectedNode(undefined)
    }
  }

  const getColor = (node) => {
    if (nieghbourNodes.includes(node)) { return '#D4871F' }
    else if (selectedNode === node) { return '#C41221' }
    else { return '#171C1C' };
  }

  const getNodeSize = (value, globalScale) => {
    // Base font size range (min: 12px, max: 24px)
    const minSize = 12;
    const maxSize = 24;

    // Find the min and max values in the dataset
    const values = data.nodes.map(node => node.val);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);

    // Linear scaling of the node value to our desired font size range
    const scale = (value - minVal) / (maxVal - minVal);
    const fontSize = minSize + scale * (maxSize - minSize);

    // Adjust for zoom level
    return fontSize / globalScale;
  };

  if (!data) {
    return (
      <div className="placeholder-container">
        <p>Character network for {selectedBook} is coming soon!</p>
      </div>
    );
  }

  // Completely hides default node circles
  return (
    <ForceGraph
      graphData={data}
      maxZoom={10}
      nodeRelSize={0}
      nodeVal={() => 0}
      linkWidth={link => (link.value + 2) / 3}
      nodeCanvasObjectMode={() => 'before'} // Ensures correct hitbox detection
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.name.charAt(0).toUpperCase() + node.name.slice(1);
        const fontSize = getNodeSize(node.val, globalScale);
        ctx.font = `${fontSize}px Tahoma`;

        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.3);

        node.__bckgDimensions = bckgDimensions; // Store dimensions for hitbox adjustments

        // Background
        ctx.fillStyle = 'rgba(242, 242, 242, 1)';
        ctx.fillRect(
          node.x - bckgDimensions[0] / 2,
          node.y - bckgDimensions[1] / 2,
          ...bckgDimensions
        );

        // Text
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = getColor(node);
        ctx.fillText(label, node.x, node.y);
      }}
      nodePointerAreaPaint={(node, color, ctx) => {
        if (!node.__bckgDimensions) return;
        const [width, height] = node.__bckgDimensions;
        ctx.fillStyle = color;
        ctx.fillRect(node.x - width / 2, node.y - height / 2, width, height);
      }}
      onNodeClick={handleNodeClick}
      onBackgroundClick={handleBackgroundClick}
    />

  );
}