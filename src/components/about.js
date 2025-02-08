import { Card } from 'antd';

export const About = () => {
    const { Meta } = Card;
    const logo = require('../assets/cover.jpeg')

    let desc = <p className='panelText'>"The Brothers Karamazov" is a novel by the Russian author Fyodor Dostoevsky, first published in 1880. It tells the story of the three Karamazov brothers, their dysfunctional family dynamics, and their eventual involvement in the murder of their father. The novel is considered a masterpiece of world literature for its psychological depth, philosophical themes, and exploration of human nature. </p>
    let projectDesc = <p >Brothers Karamaozv is a masterpiece by Fyodor Dostoevsky. The complexity of the characters and their interactions made me build a tool with ChatGPT to explore and summarize this masterpiece. <a href="https://github.com/schoobani/novel-graph">Read More</a></p>

    return (
        <>
            <Card
                style={{ overflow: 'auto', marginBottom: 5, borderWidth: 1, borderColor: '#cfcbcb' }}
                cover={<img alt="example" style={{ height: "50%" }} src={logo} />}
            >
                <Meta description={desc} />
            </Card>
        </>
    )
}