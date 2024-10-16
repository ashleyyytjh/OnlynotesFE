import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'
import { Notes, Order } from '@/types/types'
import EconIcon from '../assets/econs.png'
import { useNavigate } from 'react-router-dom'

const orderList : Order[] = [
    {
        _id: "66efbf435eda2af84ed86d92",
        stripeTransactionId: "pi_3Q1jh9DkLPcWi5RD0sp7ToNP",
        noteId: "222",
        buyerId: "1",
        orderStatus: "processing",
        orderPrice: 2000,
        // "__v": 0
    },
    {
        _id: "66efbf435eda2af84ed86d92",
        stripeTransactionId: "pi_3Q1jh9DkLPcWi5RD0sp7ToNP",
        noteId: "32",
        buyerId: "1",
        orderStatus: "processing",
        orderPrice: 200,
        // "__v": 0
    },
    {
        _id: "66efbf435eda2af84ed86d92",
        stripeTransactionId: "pi_3Q1jh9DkLPcWi5RD0sp7ToNP",
        noteId: "212",
        buyerId: "1",
        orderStatus: "processing",
        orderPrice: 20,
        // "__v": 0
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
            {/* <TableHead className="w-[300px]">Product</TableHead> */}
            <TableHead>Order ID</TableHead>
            <TableHead>Notes ID</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderList.map((order, index) => (
            <TableRow key={order._id} className={`${index % 2 === 0 ? '' : ''} cursor-pointer`} >
         
              <TableCell className="">{order._id}</TableCell>
              <TableCell className="">{order.noteId}</TableCell>
              <TableCell>${order.orderPrice}</TableCell>

              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.orderStatus === 'succeeded' ? 'bg-gray-200 text-gray-800' : 'bg-orange-500 text-white'
                }`}>
                  {order.orderStatus.toLocaleUpperCase()}
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