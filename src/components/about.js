import { Card } from 'antd';

export const About = () => {
    const { Meta } = Card;

    let desc = `As a language model, I can tell you that "The Brothers Karamazov" is a novel by the Russian author Fyodor Dostoevsky, first published in 1880. It tells the story of the three Karamazov brothers, their dysfunctional family dynamics, and their eventual involvement in the murder of their father. The novel is considered a masterpiece of world literature for its psychological depth, philosophical themes, and exploration of human nature. It is often praised for its complex characters, vivid descriptions, and profound insights into the human condition. The novel has had a profound influence on literature and continues to be widely read and studied today.`
    // let name = `The Brothers Karamazov`

    return (
        <Card
            hoverable
            cover={<img alt="example" src="https://kbimages1-a.akamaihd.net/1208ebc8-3b5d-40ef-ba2d-b5121520d7e2/1200/1200/False/the-brothers-karamazov-135.jpg" />}
        >
            <Meta description={desc} />
        </Card>
    )
}