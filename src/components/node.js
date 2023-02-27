import { Card } from 'antd';

export const Node = (props) => {
    const { Meta } = Card;

    const { node, nodeDesc } = props

    console.log(nodeDesc)
    let desc = nodeDesc === undefined ? `Not Generated Yet!` : nodeDesc.desc;
    let name = node.name === undefined ? `Undefined` : node.name

    return (
        <Card
            hoverable
        >
            <Meta title={name} description={desc} />
        </Card>
    )
}