import { ForceGraph2D } from 'react-force-graph';


export const Graph = ({ data, onNodeSelection, onBackgroundClick }) => {

  return (
    <ForceGraph2D
      graphData={data}
      dagMode='zout'
      linkCurvature={0.01}
      linkWidth={link => (link.value+2)/3}
      // linkDirectionalParticles="value"
      // linkDirectionalParticleSpeed={d => d.value * 0.00001}
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.name;
        const fontSize = (node.val + 10) / globalScale;
        ctx.font = `${fontSize}px Sans-Serif`;
        const textWidth = ctx.measureText(label).width;
        const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding

        ctx.fillStyle = 'rgba(242, 242, 242, 0.8)';
        ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);

        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = node.color;
        ctx.fillText(label, node.x, node.y);

        node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
      }}
      nodePointerAreaPaint={(node, color, ctx) => {
        ctx.fillStyle = color;
        const bckgDimensions = node.__bckgDimensions;
        bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
      }}
      onNodeClick={onNodeSelection}
      onBackgroundClick={onBackgroundClick}
    />
  );
}