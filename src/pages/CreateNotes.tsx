import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from '@/hooks/use-toast'

const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  description: z.string().min(20, {
    message: "Description must be at least 20 characters.",
  }),
  price: z.number().min(0.01, {
    message: "Price must be at least 0.01.",
  }),
  categoryCode:z.string().min(5, {
    message: "Category Code must be at least 5 characters.",
  }),
})

export default function CreateNotesListing() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      categoryCode: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log('test')
    setIsSubmitting(true)
    // Send data to backend here
    console.log(values)
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Listing created!",
        description: "Your notes have been successfully listed.",
      })
      form.reset()
    }, 2000) // Simulating API call
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