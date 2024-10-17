import { useState } from 'react'
import { Star, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import EconIcon from '../assets/econs.png'
import { Notes } from '@/types/types'
import { Badge } from '@/components/ui/badge'
import { useNavigate, useParams } from 'react-router-dom'

const NoteItem = () => {
    const [reviewText, setReviewText] = useState('')
    const [rating, setRating] = useState(0)
    const navigate = useNavigate();
    const item: Notes = {
        _id: '1',
        fk_account_owner: 'user1',
        title: 'Biology 101 Notes',
        description: 'Comprehensive notes covering the basics of Biology.',
        url: EconIcon,
        price: 15,
        categoryCode: 'BIO101',
    }
    const reviews = [
        {
            id: 1,
            author: 'Alice Johnson',
            rating: 5,
            content:
                'Absolutely loved this note! It was clear, concise, and helped me ace my exam. Highly recommend!',
        },
        {
            id: 2,
            author: 'Brian Smith',
            rating: 4,
            content:
                'Good content overall, but I wish there were more examples. Still, it was helpful for my understanding.',
        },
        {
            id: 3,
            author: 'Catherine Lee',
            rating: 3,
            content:
                'The notes were okay, but some sections felt rushed. They were helpful, but not the best.',
        },
        {
            id: 4,
            author: 'David Kim',
            rating: 2,
            content:
                "I had higher expectations. The information was too basic, and I didn't find it very helpful.",
        },
        {
            id: 5,
            author: 'Emily Clark',
            rating: 4,
            content:
                'Great notes! Very informative and easy to understand. I learned a lot from them.',
        }
    ]
    const { itemId } = useParams<{ itemId: string }>();

    return (
        <div className="container mx-auto px-16 py-10">
            <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <img
                        src={item.url}
                        alt="Preview Of Notes"
                        className="w-full h-auto rounded-lg shadow-lg"
                    />
                </div>
                <div>
                    <h1 className="text-3xl font-bold mb-4">{item.title}</h1>
               
                    <div className="flex items-center mb-4">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    className={`w-5 h-5 ${star <= 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                />
                            ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">
                            (24 reviews)
                        </span>
                    </div>
                    <Badge variant="outline" className="bg-background_white text-base mb-2">
                        {item.categoryCode}
                    </Badge>
                    <p className="text-xl font-bold mb-4">${item.price}</p>
                    <p className="mb-6">{item.description}</p>
                    <div className="flex space-x-4 mb-6">
                        <Button className="flex-1" onClick={() => navigate(`/payment?id=${itemId}`)}>
                            <ShoppingCart className="mr-2 h-4 w-4" /> Purchase
                        </Button>
                    </div>
                    <div className="border-t pt-4">
                        <h2 className="text-lg font-semibold mb-2">Details</h2>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>50 pages of detailed notes</li>
                            <li>Includes practice questions and answers</li>
                            <li>Digital PDF format</li>
                            <li>Last updated: May 2023</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
                <div className="grid gap-4">
                    {reviews.map((review) => (
                        <Card key={review.id}>
                            <CardHeader>
                                <div className="flex items-center">
                                    <Avatar className="h-4 w-4 mr-2">
                                        <AvatarImage
                                            src={`https://api.dicebear.com/6.x/initials/svg?seed=${review.author}`}
                                        />
                                        <AvatarFallback>
                                            {review.author[0]}
                                        </AvatarFallback>
                                    </Avatar>
                                    <CardTitle className="text-2xl">{review.author}</CardTitle>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <Star
                                            key={star}
                                            className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <CardDescription>
                                    {review.content}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle>Write a Review</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form>
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="rating">Rating</Label>
                                    <div className="flex mt-1">
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Star
                                                key={star}
                                                className={`w-6 h-6 cursor-pointer ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                                                onClick={() => setRating(star)}
                                            />
                                        ))}
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="review">Your Review</Label>
                                    <Textarea
                                        id="review"
                                        placeholder="Write your review here..."
                                        value={reviewText}
                                        onChange={(e) =>
                                            setReviewText(e.target.value)
                                        }
                                    />
                                </div>
                            </div>
                        </form>
                    </CardContent>
                    <CardFooter>
                        <Button>Submit Review</Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}

export default NoteItem
