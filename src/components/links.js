import { Collapse } from 'antd';


export const Links = ({ neighbours, neighborsDesc, selectedBook }) => {
    const { Panel } = Collapse;

    console.log(neighborsDesc)
    if (!neighbours || !neighborsDesc) {
        if (selectedBook !== 'The Brothers Karamazov') {
            return (
                <div className="placeholder-container">
                    <p>Character relationships for {selectedBook} are coming soon!</p>
                </div>
            );
        }
        return null;
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