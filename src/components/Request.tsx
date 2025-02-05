import { deleteRequest, getAllUserRequest, subscribeRequest } from "@/services/RequestService";
import { useQuery } from "@tanstack/react-query";
import Loader from "./Loader";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { convertCentsToDollar } from "@/util/util";
import { useNavigate } from "react-router-dom";

const Request = () => {
    const navigate = useNavigate();
    const {data, isLoading, error, refetch} =  useQuery({
        queryKey: ['requests'],
        queryFn: () => getAllUserRequest()
    })

 
    const [subjectCode, setSubjectCode] = useState<string>('');
    const subscribeNotesHandler = async () => {
        try {
            await subscribeRequest(subjectCode).then((data) => {
                if (data) {
                    toast({
                      title: "Subscribed!",
                      description: "You have successfully subscribed",
                      color: 'green'
                    })
                    refetch();
                } else {
                    toast({
                        title: "Error!",
                        description: "Error subscribing",
                        color: 'red'
                      })
                }
                setSubjectCode('')
            })
        } catch (error) {
            console.log(error);
            toast({
                title: "Error!",
                description: "Error subscribing",
                color: 'red'

              })
        }
    }

    const deleteRequestHandler = async (id: string) => {
        try {
          await deleteRequest(id).then((data) => {
            if (data.status === 200 || data.status === 201) {
              toast({
                title: "Deleted!",
                description: "You have successfully deleted",
              })
              refetch();
            } else {
              toast({
                title: "Error!",
                description: "Error deleting",
              })
            }
          })
        } catch (error) {
          console.log(error);
          toast({
            title: "Error!",
            description: "Error deleting",
          })
        } 
      }

    if (isLoading) {
        return <Loader/>
    }
    if (error) return <div>Error retrieving. Please refresh and try again </div>;
    
    return (
        <main className="w-full md:w-3/4 ">
        <h2 className="text-2xl font-semibold mb-2">Notes Request</h2>
        <p className="text-gray-600 mb-6">
            Subscribe to notes tag for notifications when new notes are available.
        </p>

        <div className="space-y-2">
            <Label htmlFor="username">Subscribe</Label>
            <Input id="username" value={subjectCode} onChange={(e) => {setSubjectCode(e.target.value)}}/>
            <p className="text-sm text-gray-500">
                Enter subject code you are interested to subscribe to
            </p>
            <Button onClick={() => subscribeNotesHandler()}> Subscribe </Button>
        </div>

        <div className='mt-10 pt-5 rounded-2xl shadow'>
            <Table>
                <TableHeader>
                <TableRow>
                    {/* <TableHead className="w-[300px]">Id</TableHead>
                    <TableHead> User Id </TableHead>
                    <TableHead>Email </TableHead> */}
                    <TableHead>Category Code</TableHead>
                    <TableHead>Actions</TableHead>

                </TableRow>
                </TableHeader>
                <TableBody>
                {data.map((order : any, index : number) => (
                    <TableRow key={order._id} className={`${index % 2 === 0 ? '' : ''} cursor-pointer`} >
                    {/* <TableCell className="font-medium">
                        <div className="flex items-center space-x-4">
                            <div onClick={() => navigate(`/note/${order._id}`)}>
                                {order._id}
                            </div>
                        </div>
                    </TableCell>
                    <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold`}>
                        {order.userId}
                        </span>
                    </TableCell>
                    <TableCell>${order.email}</TableCell> */}
                    <TableCell>{order.tag}</TableCell>
                    <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold`} onClick={() => deleteRequestHandler(order._id)}>
                        Delete
                        </span>
                        </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </div>
    </main>
    )
}


export default Request;