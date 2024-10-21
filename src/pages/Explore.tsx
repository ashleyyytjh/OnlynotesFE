import { useState } from 'react'
import { Search, Filter, ChevronDown, Loader } from 'lucide-react'
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
import { Notes, Order } from '@/types/types'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { getAllVerifiedNotes } from '@/services/NotesService'
import { useQuery } from '@tanstack/react-query'
import { convertCentsToDollar } from '@/util/util'
import PaginationMINE from '@/components/Pagination'
import useSearchParamsHandler from '@/hooks/useSearchParamsHandler'
import { randomImg } from '@/assets/randomImg'


const Explore = () => {
    const {getParam, setParam} = useSearchParamsHandler({page:'1'})
    const [searchTerm, setSearchTerm] = useState('')
    const [sortBy, setSortBy] = useState('priceLowToHigh')
    const [selectedSubject, setSelectedSubject] = useState('All')
    const navigate = useNavigate()
    const imgData:any[] = randomImg
    const {data, isLoading,error} = useQuery({
        queryKey:['accNotes'],
        queryFn: () => getAllVerifiedNotes(`${Number(getParam(`page`))-1}`,'8')
    })
    if (isLoading) {
        return <Loader></Loader>
    }
    const setPageNextHandler = (page :number) => {
        setParam('page',page+1);
    }
    const noteData = data.response

    const filteredNotes = noteData
    
    .sort((a:Notes, b:Notes) => {
        if (sortBy === 'priceLowToHigh') return a.price - b.price
        if (sortBy === 'priceHighToLow') return b.price - a.price
        return 0
    })
    // .filter()
    // (note : Notes) =>
    //     note.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    //     (selectedSubject === 'All' ||
    //         note.categoryCode === selectedSubject)
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
                {filteredNotes.map((note: Notes, index: number) => (
                    <Card key={note._id} className="flex flex-col transform hover:scale-110 transition duration-200">
                        <CardHeader>
                            <CardTitle className="text-xl">
                                {note.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <img
                                src={imgData[(index+1) % imgData.length]}
                                alt={'image'}
                                className="w-full h-fit object-cover rounded-md mb-4"
                                style={{
                                    aspectRatio: '300/200',
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
                                        ${convertCentsToDollar(note.price)}
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
            <PaginationMINE
                currentPage={Number(getParam('page'))}
                totalPages={data.totalPages}
                maxPagesToShow={4}
                onPageChange= {()=>{}}
                onPageNext= {setPageNextHandler}
                onPagePrevious={()=>{ setParam('page',3)}}
            ></PaginationMINE>

        </div>
    )
}

export default Explore
