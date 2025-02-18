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
        else if (selectedBook === 'War and Peace') {
            return {
                description: <><p>War and Peace (Russian: Война и мир, romanized: Voyna i mir; pre-reform Russian: Война и миръ; [vɐjˈna i ˈmʲir]) is a literary work by the Russian author Leo Tolstoy. Set during the Napoleonic Wars, the work comprises both a fictional narrative and chapters in which Tolstoy discusses history and philosophy. An early version was published serially beginning in 1865, after which the entire book was rewritten and published in 1869. It is regarded, with Anna Karenina, as Tolstoy's finest literary achievement, and it remains an internationally praised classic of world literature.</p>
                    <p>The book chronicles the French invasion of Russia and its aftermath during the Napoleonic era. It uses five interlocking narratives following different Russian aristocratic families to illustrate Napoleon's impact on Tsarist society. Portions of an earlier version, titled The Year 1805, were serialized in The Russian Messenger from 1865 to 1867 before the novel was published in its entirety in 1869.</p></>
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