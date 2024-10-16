import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'
import { Notes } from '@/types/types'
import EconIcon from '../assets/econs.png'
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
const OrderListingTable = () =>{
    const navigate =  useNavigate();

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = 7

  return (
    <div className='mt-10 pt-5 rounded-2xl shadow'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Product</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {notesList.map((order, index) => (
            <TableRow key={order._id} className={`${index % 2 === 0 ? '' : ''} cursor-pointer`} >
              <TableCell className="font-medium">
                <div className="flex items-center space-x-4">
                  {/* <Avatar className="h-8 w-8">
                    <AvatarImage src={order.avatar} alt={order.product} />
                    <AvatarFallback>{order.product[0]}</AvatarFallback>
                  </Avatar> */}
                  <span className='hover:underline' onClick={() => navigate(`/note/${order._id}`)}>{order.title}</span>
                </div>
              </TableCell>
              <TableCell className="">{order._id}</TableCell>
              <TableCell>${order.price}</TableCell>
              <TableCell>{order.description}</TableCell>

              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'Verified' ? 'bg-gray-200 text-gray-800' : 'bg-orange-500 text-white'
                }`}>
                  {order.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
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
                    <PaginationNext href="#product-listing" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

export default OrderListingTable