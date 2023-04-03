import { Collapse } from 'antd';


export const Links = (data) => {

    const getNodeNeighbourDesc = (name, rels) => {
        return (rels.filter(function (el) {
            if (el.source === name | el.target === name) {
            }
            return (el.source === name | el.target === name)
        }))
    }

    const { Panel } = Collapse;
    let panels = data.neighbours !== undefined ?
        data.neighbours.map((item, index) => {
            let desc = getNodeNeighbourDesc(item.name, data.neighborsDesc)
            desc.length === 1 ? desc = desc[0].desc : desc = ''
            return (
                <Panel header={item.name.charAt(0).toUpperCase() + item.name.slice(1)} ><p className='panelText'>{desc}</p></Panel>
            );
        }) : <></>

    return (
        <Collapse >
            {panels}
        </Collapse>
    )
}