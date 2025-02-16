import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { BookOutlined } from '@ant-design/icons';
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

const BOOKS = {
  KARAMAZOV: 'The Brothers Karamazov',
  SOLITUDE: '100 Years of Solitude',
  MASTER_AND_MARGARITA: 'Master and Margarita'
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
      },
      {
        label: BOOKS.MASTER_AND_MARGARITA,
        key: 'master-and-margarita',
      }
    ],
  },
];

const filterNodes = (nodes_list, data) => {
  if (!data || !Array.isArray(data)) return [];

  return data.filter(el => nodes_list.has(el.name));
}

const getNodeNeighbour = (name, data) => {
  // Return early if data is not properly structured
  if (!data || !data.links || !Array.isArray(data.links) || !data.nodes) {
    return [];
  }

  if (name && name !== '') {
    const neighbours = data.links.filter(el => {
      // Handle both object and string source/target
      const sourceName = typeof el.source === 'object' ? el.source.name : el.source;
      const targetName = typeof el.target === 'object' ? el.target.name : el.target;
      return sourceName === name || targetName === name;
    });

    let sources = neighbours.map(a => typeof a.source === 'object' ? a.source.name : a.source);
    let targets = neighbours.map(a => typeof a.target === 'object' ? a.target.name : a.target);
    targets.push.apply(targets, sources);
    const uniqu_neighbours = new Set(targets);
    uniqu_neighbours.delete(name);
    return filterNodes(uniqu_neighbours, data.nodes);
  }

  return [];
}

const getNodeNeighbourDesc = (name, rels) => {
  if (!rels || !Array.isArray(rels) || !name) return [];

  return rels.filter(el => el.from === name || el.to === name);
}

const Dashboard = () => {
  // State management
  const [selectedNode, setSelectedNode] = useState(undefined);
  const [selectedNodeNeighborsDesc, setSelectedNodeNeighborsDesc] = useState(undefined);
  const [nodeNeighbours, setNodeNeighbours] = useState(undefined);
  const [nodeDesc, setNodeDesc] = useState(undefined);
  const [selectedBook, setSelectedBook] = useState(BOOKS.KARAMAZOV);
  const [graphData, setGraphData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const contentHeight = `calc(100vh - ${MENU_HEIGHT + FOOTER_HEIGHT + (SPACING * 2)}px)`;

  // Fetch data when component mounts or book changes
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch('https://raw.githubusercontent.com/schoobani/novel-graph/refs/heads/main/data/brothers-karamazov/graph.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        // // Validate the data structure
        console.log(data)
        if (!data || !data.nodes || !data.links) {
          throw new Error('Invalid data structure received');
        }
        setGraphData(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [selectedBook]);

  console.log(graphData)

  // Reset states when book changes
  useEffect(() => {
    resetStates();
  }, [selectedBook]);

  // Update node neighbours when selected node changes
  useEffect(() => {
    updateNodeNeighbours();
  }, [selectedNode, graphData]);

  // Helper functions
  const resetStates = () => {
    setSelectedNode(undefined);
    setNodeDesc(undefined);
    setNodeNeighbours(undefined);
    setSelectedNodeNeighborsDesc(undefined);
  };

  const updateNodeNeighbours = () => {
    if (!selectedNode || !graphData) {
      setNodeNeighbours(undefined);
      return;
    }

    const neighbours = getNodeNeighbour(selectedNode.name, graphData);
    setNodeNeighbours(neighbours);
  };

  const getBookData = () => {
    if (!graphData) return { graphData: null, descriptions: null, rels: [] };

    switch (selectedBook) {
      case BOOKS.KARAMAZOV:
        return {
          graphData: graphData,
          descriptions: graphData.characters || [],
          rels: graphData.character_relations || []
        };
      case BOOKS.SOLITUDE:
      default:
        return { graphData: null, descriptions: null, rels: [] };
    }
  };

  const handleNodeClick = (node) => {
    if (!node) return;

    const { descriptions, rels } = getBookData();
    if (!descriptions) return;

    setSelectedNode(node);
    setSelectedNodeNeighborsDesc(getNodeNeighbourDesc(node.name, rels));
    const nodeDescription = descriptions.find(el => el.name === node.name);
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

  const renderContent = () => {
    if (isLoading) {
      return <div className="loading">Loading...</div>;
    }

    if (error) {
      return <div className="error">Error: {error}</div>;
    }

    const { graphData: currentGraphData, descriptions, rels } = getBookData();

    return (
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
                data={currentGraphData}
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
  };

  return (
    <div className="dashboard-container">
      {renderMenu()}
      <div className="content-wrapper">
        {renderContent()}
      </div>
      <div className="footer-wrapper">
        Novel Graph © {new Date().getFullYear()}
      </div>
    </div>
  );
};

export default Dashboard;