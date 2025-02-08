import { Collapse } from 'antd';


export const Links = ({ neighbours, neighborsDesc, selectedBook }) => {
    const { Panel } = Collapse;

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

    const getNodeNeighbourDesc = (name, rels) => {
        return (rels.filter(function (el) {
            if (el.source === name | el.target === name) {
            }
            return (el.source === name | el.target === name)
        }))
    }

    let panels = neighbours.map((item, index) => {
        let desc = getNodeNeighbourDesc(item.name, neighborsDesc)
        desc.length === 1 ? desc = desc[0].desc : desc = ''
        return (
            <Panel header={item.name.charAt(0).toUpperCase() + item.name.slice(1)} ><p className='panelText'>{desc}</p></Panel>
        );
    })

    return (
        <Collapse >
            {panels}
        </Collapse>
    )
}