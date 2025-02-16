import { Collapse } from 'antd';


export const Links = ({ neighbours, neighborsDesc, selectedBook }) => {
    const { Panel } = Collapse;

    // If no node is selected, show a helper message
    if (!neighbours || !neighborsDesc) {
        return (
            <div className="placeholder-container">
                <p>Select a character to see their relationships</p>
            </div>
        );
    }

    let panels = neighbours.map((item) => {
        // Find the relationship description for this neighbor
        const relationship = neighborsDesc.find(rel =>
            (rel.from === item.name || rel.to === item.name)
        );

        return (
            <Panel
                key={item.name}
                header={item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                style={{ backgroundColor: '#f5f5f5' }}
            >
                <p className='panelText'>{relationship ? relationship.description : 'N/A'}</p>
            </Panel>
        );
    });

    return (
        <Collapse>
            {panels}
        </Collapse>
    );
};