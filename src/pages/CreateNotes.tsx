import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { createNotes } from '@/services/NotesService'
import { useToast } from "@/hooks/use-toast"
import {  useNavigate } from 'react-router-dom'


const MAX_FILE_SIZE = 500 * 1024 * 1024; // 500MB
const ACCEPTED_FILE_TYPES = ["application/pdf"];

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(0, {
    message: "Description must be at least 20 characters.",
  }),
  price: z.number().min(0.01, {
    message: "Price must be at least 0.01.",
  }),
  categoryCode:z.string().min(5, {
    message: "Category Code must be at least 5 characters.",
  }),
  pdfFile: z
  .instanceof(File) // Expecting a single File
  .refine((file) => file.size <= MAX_FILE_SIZE, `Max file size is 5MB.`)
  .refine(
    (file) => ACCEPTED_FILE_TYPES.includes(file.type),
    "Only PDF files are accepted."
  )
  .refine((file) => file !== null, "PDF file is required."), 
})

export default function CreateNotesListing() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      categoryCode: "",
      pdfFile: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    const formData = new FormData();
    // Append form values to the FormData object
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("price", values.price.toString());  // Convert number to string
    formData.append("categoryCode", values.categoryCode);
    formData.append("file", values.pdfFile);  // Append the file
    console.log('data is ' , formData.get('file'))
    // console.log('formData is ' , formData);
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }
    setTimeout(async() => {
      try {
        const data = await createNotes(formData);
        if (data.status === 201) {
          console.log('successfully created');
          toast({
            title: "Listing created!",
            description: "Your notes have been successfully listed.",
          })
          navigate('/account-settings/product-listing?page=1')
        } else {
          toast({
            variant: "destructive",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request. Please refresh and try again",
          })
        }
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Uh oh! Something went wrong.",
          description: "There was a problem with your request. Please refresh and try again",
        })
        console.log(error);
      }
      setIsSubmitting(false)
   
      form.reset()
    }, 2000)
  }
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFileName(file.name); 
        form.setValue('pdfFile', file); 
    } else {
      setSelectedFileName('');
    }

  }
  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-8 p-2 border-b-2">Create New Notes Listing</h1>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the title of your notes" {...field} className='bg-background_white'/>
                </FormControl>
                <FormDescription>
                  This is the title that will appear in the marketplace.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="Describe your notes in detail" 
                    className="min-h-[100px] bg-background_white"
                    {...field} 
                  />
                </FormControl>
                <FormDescription>
                  Provide a short description of what's included in your notes.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="pdfFile"
            render={({ field: { onChange, ...rest } }) => (
              <FormItem>
                <FormLabel>Upload PDF</FormLabel>
                <FormControl>
                <div className=" text-primary_text">
                    <div className=" flex justify-center flex-col items-center bg-background_white min-h-32 max-h-fit rounded-lg p-2 text-primary_subtext shadow">
                        <div className="rounded-3xl p-4 outline-dotted">
                            <input 
                                type="file" 
                                className="block w-full text-sm text-slate-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-lg file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-black file:text-white"
                                    onChange={handleFileChange}
                                />  
                        </div>
                        {/* {props.hasFile && (
                            <div className="flex flex-col items-center">
                                <label className="font-semibold text-primary_subtext">Image Preview:</label>
                                {loading && (
                                    <div className='flex justify-center items-center w-full'>
                                        <ClipLoader color='#46CEC0' size={50}/>
                                    </div>
                                    )}
                                <img
                                    src={`${props.imageUrl}`}
                                    alt="Uploaded File" className={`max-w-full h-auto ${loading ? 'hidden' : ''}`}
                                    onLoad={handleImageLoad}
                                    onError={handleImageError}
                                />
                            </div>
                        )} */}
                      
                    </div>
                </div>
                </FormControl>
                <FormDescription>
                  Upload your notes as a PDF file (max 5MB).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input  className='bg-background_white'
                    type="number" 
                    placeholder="0.00" 
                    {...field} 
                    onChange={event => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormDescription>
                  Set the price for your notes in SGD.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="categoryCode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the code of your note" {...field}  className='bg-background_white'/>
                </FormControl>
                <FormDescription>
                  Subject Code Example: CS101, CS203, CS304
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Listing"}
          </Button>
        </form>
      </Form>
    </div>
  )
}