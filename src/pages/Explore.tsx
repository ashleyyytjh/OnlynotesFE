import { useState } from 'react'
import { Search, Filter, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"

  
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

const Explore = () => {
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('priceLowToHigh')
    const [selectedSubject, setSelectedSubject] = useState('All')
    const navigate = useNavigate()
    const filteredNotes = notesList
        .filter(
            (note) =>
                note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
                (selectedSubject === 'All' ||
                    note.categoryCode === selectedSubject)
        )
        .sort((a, b) => {
            if (sortBy === 'priceLowToHigh') return a.price - b.price
            if (sortBy === 'priceHighToLow') return b.price - a.price
            return 0
        })

    const onClickHandler = (id: string) => {
        navigate(`/note/${id}`)
    }
    return (
        <div className="">
            <h1 className="text-3xl font-bold mb-8"> Marketplace</h1>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0">
                <div className="relative w-full md:w-1/3">
                    <Input
                        type="text"
                        placeholder="Search notes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                    />
                    <Search
                        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                        size={20}
                    />
                </div>

                <div className="flex space-x-4">
                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                            {/* <SelectItem value="rating">Rating</SelectItem> */}
                            <SelectItem value="priceLowToHigh">
                                Price: Low to High
                            </SelectItem>
                            <SelectItem value="priceHighToLow">
                                Price: High to Low
                            </SelectItem>
                        </SelectContent>
                    </Select>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="w-[180px]">
                                <Filter className="mr-2 h-4 w-4" />
                                Filter
                                <ChevronDown className="ml-auto h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56">
                            <DropdownMenuLabel>
                                Filter by Subject
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={() => setSelectedSubject('All')}
                            >
                                All Subjects
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setSelectedSubject('Biology')}
                            >
                                Biology
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setSelectedSubject('Psychology')}
                            >
                                Psychology
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() =>
                                    setSelectedSubject('Mathematics')
                                }
                            >
                                Mathematics
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setSelectedSubject('History')}
                            >
                                History
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setSelectedSubject('Chemistry')}
                            >
                                Chemistry
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setSelectedSubject('Literature')}
                            >
                                Literature
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setSelectedSubject('Physics')}
                            >
                                Physics
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => setSelectedSubject('Economics')}
                            >
                                Economics
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {filteredNotes.map((note) => (
                    <Card key={note._id} className="flex flex-col transform hover:scale-110 transition duration-200">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                {note.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={note.url}
                                alt={'image'}
                                className="w-full h-fit object-cover rounded-md mb-4"
                                style={{
                                    aspectRatio: '200/100',
                                    objectFit: 'cover',
                                }}
                            />
                            <div className='flex flex-row justify-between pb-2'>
                                <Badge
                                    variant="outline"
                                    className="bg-background_white"
                                >
                                    {note.categoryCode}
                                </Badge>
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-base">
                                        ${note.price.toFixed(2)}
                                    </span>
                                </div>
                            </div>
                    
                            <p className="text-base font-base">{note.description}</p>

                        </CardContent>
                        <CardFooter className="mt-auto">
                            <Button
                                className="w-full"
                                onClick={() => onClickHandler(note._id)}
                            >
                                View Details
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href="#" />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationLink href="#">1</PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                    <PaginationItem>
                        <PaginationNext href="#" />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>

        </div>
    )
}

export default Explore
