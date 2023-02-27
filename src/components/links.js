import { Collapse } from 'antd';


export const Links = (data) => {

    const { Panel } = Collapse;

    let panels = data.neighbours.length > 0 ?
        data.neighbours.map((item, index) => {
            let desc = `This text describes the relationship between ${data.selectedNode.name} and ${item.name}`
            // let key = `${item}`
            return (
                <Panel header={item.name}>{desc}</Panel>
            );
        }) : <p>Please select a Node!</p>


    // for (let i = 0; i < d.length; i++) {
    //     header = d[i].name
    //     panels.push(
    //         <Panel header={header} key={i}>
    //             <p>{text}</p>
    //         </Panel>
    //     )
    // }


    return (
        <Collapse >
            {panels}
            {/* <Panel header="This is panel header 1" key="1">
                <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 2" key="2">
                <p>{text}</p>
            </Panel>
            <Panel header="This is panel header 3" key="3">
                <p>{text}</p>
            </Panel> */}
        </Collapse>
    )
}