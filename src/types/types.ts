export type SampleType = {
    id: string
}

export type Notes = {
    _id: string
    fk_account_owner: string
    title: string
    description: string
    url: string //s3 bucket
    price: number
    categoryCode: string
}

export type Account = {
    cognito_id: number
    _id: string
    username: string
    email: string
    contact: string
}

export type User = {
    _id: string
    fk_account_user: string
    total_reviews: number
    total_rating: number
}

export type Order = {
    _id: string
    stripeTransactionId: string
    noteId: string
    buyerId: string
    orderStatus: string
    orderPrice: number
}

export type Stripe = {
    stripe_id: string
    fk_account_user: string
}

export type Review = {
    _id: string
    fk_account_reviewer: string
    fk_account_user: string
    rating: number
}
