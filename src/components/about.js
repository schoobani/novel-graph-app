import { Card } from 'antd';

export const About = ({ selectedBook }) => {
    const { Meta } = Card;

    const getBookContent = () => {
        if (selectedBook === 'Brothers Karamazov') {
            return {
                cover: require('../assets/cover.jpeg'),
                description: <p>The Brothers Karamazov is a novel by the Russian author Fyodor Dostoevsky, first published in 1880. It tells the story of the three Karamazov brothers, their dysfunctional family dynamics, and their eventual involvement in the murder of their father. The novel is considered a masterpiece of world literature for its psychological depth, philosophical themes, and exploration of human nature.</p>
            };
        } else if (selectedBook === 'One Hundred Years of Solitude') {
            return {
                description: <p>One Hundred Years of Solitude is a landmark novel by Colombian author Gabriel García Márquez, first published in 1967. The novel tells the multi-generational story of the Buendía family in the fictional town of Macondo. Through magical realism, it weaves together the extraordinary and the mundane, exploring themes of time, solitude, love, and the cyclical nature of history. The novel is considered one of the most significant works in the Spanish literary canon and a masterpiece of magical realism.</p>
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