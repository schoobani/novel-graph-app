import { Card } from 'antd';

export const Node = (props) => {
    const { Meta } = Card;
    const { node, nodeDesc } = props
    let desc = nodeDesc === undefined ? `` : <p className='panelText'>{nodeDesc.desc}</p>;
    let name = node === undefined ? `Select a Character` : node.name.charAt(0).toUpperCase() + node.name.slice(1);
    return (
        <Card
        bordered
        style={{borderWidth: 1, borderColor: '#cfcbcb'}}
        headStyle={{color: 'red'}}>
            <Meta title={name} description={desc} style={{color: 'red' }}/>
        </Card>
    )
}