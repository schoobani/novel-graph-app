import React, { useState, useEffect } from "react";
import data from "../assets/karamazov-graph.json";
import desc from "../assets/char-desc.json";
import { Graph } from '../components/graph';
import { Node } from "../components/node";
import { Links } from "../components/links";
import { About } from "../components/about";
import { WidthProvider, Responsive } from "react-grid-layout";
import { Menu } from "antd";
import { BookOutlined } from '@ant-design/icons';

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
  const [selectedNode, setSelectedNode] = useState(undefined);
  const [selectedNodeNeighborsDesc, setSelectedNodeNeighborsDesc] = useState(undefined);
  const [nodeNeighbours, setNodeNeighbours] = useState(undefined);
  const [nodeDesc, setNodeDesc] = useState(undefined);
  const [selectedBook, setSelectedBook] = useState('The Brothers Karamazov'); // Add selected book state


  // Calculate available height for the main content area
  const MENU_HEIGHT = 46;
  const FOOTER_HEIGHT = 36;
  const SPACING = 8; // Consistent spacing value
  const contentHeight = `calc(100vh - ${MENU_HEIGHT + FOOTER_HEIGHT + (SPACING * 2)}px)`; // Add spacing to top and bottom

  const layouts = {
    lg: [
      { i: "summary", x: 0, y: 0, w: 3, h: 8.8, static: true },
      { i: "graph", x: 3, y: 0, w: 6.5, h: 8.8, static: true },
      { i: "about", x: 9.5, y: 0, w: 2.5, h: 8.8, static: true }
    ],
    md: [
      { i: "summary", x: 0, y: 0, w: 3, h: 8.8, static: true },
      { i: "graph", x: 3, y: 0, w: 6, h: 8.8, static: true },
      { i: "about", x: 0, y: 10, w: 9, h: 8.8, static: true }
    ],
    sm: [
      { i: "summary", x: 0, y: 0, w: 6, h: 8.8, static: true },
      { i: "graph", x: 0, y: 10, w: 6, h: 8.8, static: true },
      { i: "about", x: 0, y: 20, w: 6, h: 8.8, static: true }
    ],
    xs: [
      { i: "summary", x: 0, y: 0, w: 4, h: 8.8, static: true },
      { i: "graph", x: 0, y: 10, w: 4, h: 8.8, static: true },
      { i: "about", x: 0, y: 20, w: 4, h: 8.8, static: true }
    ],
    xxs: [
      { i: "summary", x: 0, y: 0, w: 2, h: 8.8, static: true },
      { i: "graph", x: 0, y: 10, w: 2, h: 8.8, static: true },
      { i: "about", x: 0, y: 20, w: 2, h: 8.8, static: true }
    ]
  };

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

  const items = [
    {
      label: 'Books',
      key: 'books',
      icon: <BookOutlined />,
      children: [
        {
          label: 'The Brothers Karamazov',
          key: 'the-brothers-karamazov',
          onClick: () => setSelectedBook('The Brothers Karamazov')
        },
        {
          label: '100 Years of Solitude',
          key: '100-years-of-solitude',
          onClick: () => setSelectedBook('100 Years of Solitude')
        }
      ],
    },
  ];

  return (
    <div className="dashboard-container">
      <div className="menu-wrapper">
        <Menu
          mode="horizontal"
          items={items}
          style={{
            width: 'fit-content',
            minWidth: 'auto'
          }}
        />
        <div className="selected-book">
          <span className="book-title">{selectedBook}</span>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="grid-container" style={{ height: contentHeight }}>
          <ResponsiveReactGridLayout
            className="layout"
            breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
            cols={{ lg: 12, md: 9, sm: 6, xs: 4, xxs: 2 }}
            layouts={layouts}
            rowHeight={100}
            margin={[4, 4]}
            containerPadding={[4, 4]}
            isDraggable={false}
            isResizable={false}
          >
            <div key="summary" className="panel summary">
              <div className="scroll-container">
                <div className="nodeSumContainer">
                  <Node node={selectedNode} nodeDesc={nodeDesc} />
                </div>
                <Links
                  selectedNode={selectedNode}
                  neighbours={nodeNeighbours}
                  neighborsDesc={selectedNodeNeighborsDesc}
                />
              </div>
            </div>

            <div key="graph" className="panel graph">
              <div className="scroll-container">
                <Graph
                  data={data}
                  onNodeSelection={handleNodeClick}
                  onBackgroundClick={handleBackgroundClick}
                />
              </div>
            </div>

            <div key="about" className="panel about">
              <div className="scroll-container">
                <About />
              </div>
            </div>
          </ResponsiveReactGridLayout>
        </div>
      </div>

      <div className="footer-wrapper">
        Novel Graph © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Dashboard;