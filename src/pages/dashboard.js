import React, { useState, useEffect } from "react";
import data from "../assets/karamazov-graph.json";
import desc from "../assets/char-desc.json";
import { Graph } from '../components/graph';
import { Node } from "../components/node";
import { Links } from "../components/links";
import { About } from "../components/about";
import {
  ResponsiveReactGridLayout,
  layouts,
  gridProps,
  MENU_HEIGHT,
  FOOTER_HEIGHT,
  SPACING
} from '../layouts/dashboardLayouts';
import { Menu } from "antd";
import { BookOutlined } from '@ant-design/icons';

// Move utility functions to a separate utils file
const BOOKS = {
  KARAMAZOV: 'The Brothers Karamazov',
  SOLITUDE: '100 Years of Solitude'
};

const MENU_ITEMS = [
  {
    label: 'Books',
    key: 'books',
    icon: <BookOutlined />,
    children: [
      {
        label: BOOKS.KARAMAZOV,
        key: 'the-brothers-karamazov',
      },
      {
        label: BOOKS.SOLITUDE,
        key: '100-years-of-solitude',
      }
    ],
  },
];

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
  // State management
  const [selectedNode, setSelectedNode] = useState(undefined);
  const [selectedNodeNeighborsDesc, setSelectedNodeNeighborsDesc] = useState(undefined);
  const [nodeNeighbours, setNodeNeighbours] = useState(undefined);
  const [nodeDesc, setNodeDesc] = useState(undefined);
  const [selectedBook, setSelectedBook] = useState(BOOKS.KARAMAZOV);

  const contentHeight = `calc(100vh - ${MENU_HEIGHT + FOOTER_HEIGHT + (SPACING * 2)}px)`;

  // Reset states when book changes
  useEffect(() => {
    resetStates();
  }, [selectedBook]);

  // Update node neighbours when selected node changes
  useEffect(() => {
    updateNodeNeighbours();
  }, [selectedNode]);

  // Helper functions
  const resetStates = () => {
    setSelectedNode(undefined);
    setNodeDesc(undefined);
    setNodeNeighbours(undefined);
    setSelectedNodeNeighborsDesc(undefined);
  };

  const updateNodeNeighbours = () => {
    if (selectedNode === undefined) {
      setNodeNeighbours(undefined);
    } else {
      const neighbours = getNodeNeighbour(selectedNode.name, data);
      setNodeNeighbours(neighbours);
    }
  };

  const getBookData = () => {
    switch (selectedBook) {
      case BOOKS.KARAMAZOV:
        return { graphData: data, descriptions: desc };
      case BOOKS.SOLITUDE:
      default:
        return { graphData: null, descriptions: null };
    }
  };

  const handleNodeClick = (node) => {
    const { descriptions } = getBookData();
    if (!descriptions) return;

    setSelectedNode(node);
    setSelectedNodeNeighborsDesc(getNodeNeighbourDesc(node.name, descriptions.rels));
    
    const nodeDescription = descriptions.characters.find(el => el.name === node.name);
    setNodeDesc(nodeDescription || undefined);
  };

  const handleBackgroundClick = () => {
    resetStates();
  };

  const handleBookSelect = (bookName) => {
    setSelectedBook(bookName);
  };

  const menuItems = MENU_ITEMS.map(item => ({
    ...item,
    children: item.children.map(child => ({
      ...child,
      onClick: () => handleBookSelect(child.label)
    }))
  }));

  // Render components
  const renderMenu = () => (
    <div className="menu-wrapper">
      <Menu
        mode="horizontal"
        items={menuItems}
        style={{
          width: 'fit-content',
          minWidth: 'auto'
        }}
      />
      <div className="selected-book">
        <span className="book-title">{selectedBook}</span>
      </div>
    </div>
  );

  const renderGridLayout = () => (
    <div className="grid-container" style={{ height: contentHeight }}>
      <ResponsiveReactGridLayout
        className="layout"
        layouts={layouts}
        {...gridProps}
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
              selectedBook={selectedBook}
            />
          </div>
        </div>

        <div key="graph" className="panel graph">
          <div className="scroll-container">
            <Graph
              data={getBookData().graphData}
              onNodeSelection={handleNodeClick}
              onBackgroundClick={handleBackgroundClick}
              selectedBook={selectedBook}
            />
          </div>
        </div>

        <div key="about" className="panel about">
          <div className="scroll-container">
            <About selectedBook={selectedBook} />
          </div>
        </div>
      </ResponsiveReactGridLayout>
    </div>
  );

  return (
    <div className="dashboard-container">
      {renderMenu()}
      <div className="content-wrapper">
        {renderGridLayout()}
      </div>
      <div className="footer-wrapper">
        Novel Graph © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Dashboard;