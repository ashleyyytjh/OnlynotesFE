import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'
import {  Order } from '@/types/types'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query';
import { getOrders } from "@/services/OrdersService";
import { convertCentsToDollar } from "@/util/util";
import Loader from "./Loader";
import { useEffect, useState } from "react";
import { getSession } from "@/services/UserService";

const OrderListingTable = () =>{
  useEffect(() => {
    getSession().then((data) => {
        setId(data.id)
    })
}, [])
    const navigate =  useNavigate();

    const userId = 1
     
    const { data: orders, error, isLoading } = useQuery<Order[], Error>({
        queryKey: ['orders', userId],
        queryFn: () => getOrders(id),
    })

    const [id, setId] = useState<number>()

 

    console.log()
    if (isLoading) return <Loader/>;
    if (error) return <div>Error retrieving orders. Please refresh and try again </div>;

  return (
    <div className='mt-10 pt-5 rounded-2xl shadow'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Notes ID</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders!.map((order, index) => (
            <TableRow key={order._id} className={`${index % 2 === 0 ? '' : ''} cursor-pointer`} >
              <TableCell className="">{order._id}</TableCell>
              <TableCell className="">{order.noteId}</TableCell>
              <TableCell>
                <span   
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.orderStatus === 'successful'
                    ? 'bg-green-500 text-white'
                    : order.orderStatus === 'failed'
                    ? 'bg-red-500 text-white'
                    : 'bg-gray-500 text-white'
                  }`}
              
                >
                  {order.orderStatus.toLocaleUpperCase()}
                </span>
              </TableCell>
              <TableCell>${convertCentsToDollar(order.orderPrice)}</TableCell>
       
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