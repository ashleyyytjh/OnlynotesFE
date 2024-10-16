import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import BannerIcon from '../assets/educator.svg'
import EconIcon from '../assets/econs.png'
import { Notes } from '@/types/types'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
const notesList: Notes[] = [
    {
        _id: '1',
        fk_account_owner: 'user1',
        title: 'Biology 101 Notes',
        description: 'Comprehensive notes covering the basics of Biology.',
        url: EconIcon,
        price: 15,
        categoryCode: 'BIO101',
    },
    {
        _id: '2',
        fk_account_owner: 'user2',
        title: 'Chemistry 101 Notes',
        description: 'Detailed notes on Chemistry principles and reactions.',
        url: EconIcon,
        price: 20,
        categoryCode: 'CHE101',
    },
    {
        _id: '3',
        fk_account_owner: 'user3',
        title: 'Physics 101 Notes',
        description:
            'Essential Physics notes focusing on mechanics and motion.',
        url: EconIcon,
        price: 10,
        categoryCode: 'PHY101',
    },
    {
        _id: '4',
        fk_account_owner: 'user4',
        title: 'Math 101 Notes',
        description: 'Mathematics notes including algebra and calculus basics.',
        url: EconIcon,
        price: 25,
        categoryCode: 'MTH101',
    },
    {
        _id: '5',
        fk_account_owner: 'user5',
        title: 'History 101 Notes',
        description: 'Historical events and timelines for major world events.',
        url: EconIcon,
        price: 18,
        categoryCode: 'HIS101',
    },
    {
        _id: '6',
        fk_account_owner: 'user6',
        title: 'English 101 Notes',
        description: 'Notes covering grammar, literature, and essay writing.',
        url: EconIcon,
        price: 22,
        categoryCode: 'ENG101',
    },
]

const Home = () => {
    const navigate = useNavigate()
    return (
        <div className="container  mx-auto px-4 py-8 space-y-10">
            <Card className="mb-8">
                <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <div className="mb-4 md:mb-0 md:mr-4">
                            <h2 className="text-3xl font-bold mb-2">
                                Find the best study notes and ace your exams.
                            </h2>
                            <div className="flex mt-4">
                                <Input
                                    className="mr-2"
                                    placeholder="Search for study notes"
                                />
                                <Button>Search</Button>
                            </div>
                        </div>
                        <img
                            alt="Student studying"
                            className="rounded-lg"
                            height="200"
                            src={BannerIcon}
                            style={{
                                aspectRatio: '300/200',
                                objectFit: 'cover',
                            }}
                            width="300"
                        />
                    </div>
                </CardContent>
            </Card>
            <div className="h-40  flex flex-col justify-between">
                <div>
                    <p className="text-3xl font-bold">
                        {' '}
                        What are you looking for?{' '}
                    </p>
                    <p className="text-base font-semibold pt-2">
                        {' '}
                        Find the best study notes for your needs{' '}
                    </p>
                </div>
                <Button
                    className="w-32 item-bottom"
                    onClick={() => navigate('/market')}
                >
                    {' '}
                    Explore Notes
                </Button>
            </div>

            <section className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">
                    Popular study notes
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {notesList.map((note) => (
                        <Card
                            key={note._id}
                            className="transform hover:scale-110 transition duration-200"
                        >
                            <CardContent className="p-4">
                                <img
                                    alt={note.title}
                                    className="rounded-lg mb-2"
                                    height="100"
                                    src={note.url}
                                    style={{
                                        aspectRatio: '200/100',
                                        objectFit: 'cover',
                                    }}
                                    width="fit"
                                />
                                <p className="text-base font-medium">
                                    {note.title}
                                </p>
                                <p className="text-xs font-base pb-4">{note.description}</p>
                                <Badge
                                    variant="outline"
                                    className="bg-background_white"
                                >
                                    {note.categoryCode}
                                </Badge>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default Home
