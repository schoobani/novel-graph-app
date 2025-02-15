import { Card } from 'antd';

export const About = ({ selectedBook }) => {
    const { Meta } = Card;

    const getBookContent = () => {
        if (selectedBook == 'The Brothers Karamazov') {
            return {
                cover: require('../assets/cover.jpeg'),
                description: <p>The Brothers Karamazov is a novel by the Russian author Fyodor Dostoevsky, first published in 1880. It tells the story of the three Karamazov brothers, their dysfunctional family dynamics, and their eventual involvement in the murder of their father. The novel is considered a masterpiece of world literature for its psychological depth, philosophical themes, and exploration of human nature."</p>
            };
        }
        return {
            cover: null,
            description: <p>{selectedBook} is coming soon!</p>,
        }
    };

    const content = getBookContent();

    return (
        <Card
            style={{ overflow: 'auto', marginBottom: 5, borderWidth: 1, borderColor: '#cfcbcb' }}
            cover={content.cover ? <img alt={selectedBook} style={{ height: "50%" }} src={content.cover} /> : null}
        >
            <Meta description={<p className='panelText'>{content.description}</p>} />
            {content.projectDesc && <p>{content.projectDesc}</p>}
        </Card>
    );
}