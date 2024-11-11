import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from './ui/pagination'
import { Notes } from '@/types/types'
import EconIcon from '../assets/econs.png'
import { useNavigate } from 'react-router-dom'
import { getNotesFromAccountId } from '@/services/NotesService'
import { useQuery } from '@tanstack/react-query'
import { convertCentsToDollar } from '@/util/util'
import Loader from './Loader'
import PaginationMINE from './Pagination'
import useSearchParamsHandler from '@/hooks/useSearchParamsHandler'

const NoteListingTable = () =>{
    const {getParam,setParam} = useSearchParamsHandler({page:'1'})
    const navigate =  useNavigate();
    const {data, isLoading,error} = useQuery({
        queryKey:['accNotes'],
        queryFn: () => getNotesFromAccountId()
    })
  if (isLoading) {
    return <Loader></Loader>
  }
  console.log(data);
  return (
    <div className='mt-10 pt-5 rounded-2xl shadow'>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Name</TableHead>
            <TableHead> Status </TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.response.map((order : Notes, index : number) => (
            <TableRow key={order._id} className={`${index % 2 === 0 ? '' : ''} cursor-pointer`} >
              <TableCell className="font-medium">
                <div className="flex items-center space-x-4">
                  {/* <Avatar className="h-8 w-8">
                    <AvatarImage src={order.avatar} alt={order.product} />
                    <AvatarFallback>{order.product[0]}</AvatarFallback>
                  </Avatar> */}
                  <div onClick={() => navigate(`/note/${order._id}`)}>
                    {order.title}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.status === 'Verified' ? 'bg-orange-200 text-gray-800' : order.status==='Rejected' ? 'bg-red-500 text-white' : 'bg-grey-500 text-white' 
                }`}>
                  {order.status}
                </span>
              </TableCell>
              <TableCell className="">{order._id}</TableCell>
              <TableCell>${convertCentsToDollar(order.price)}</TableCell>
              <TableCell>{order.description}</TableCell>

     
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex items-center justify-end space-x-2 py-4">
      <PaginationMINE
                currentPage={Number(getParam('page'))}
                totalPages={data.totalPages}
                maxPagesToShow={4}
                onPageChange= {()=>{}}
                onPageNext= {()=>{setParam('page', `${Number(getParam('page'))+1,'#product-listing'}`)}}
                onPagePrevious={()=>{}}
            ></PaginationMINE>  
      </div>
    </div>
  )
}

export default NoteListingTable