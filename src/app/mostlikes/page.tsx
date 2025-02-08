'use client'

import MostLikesPage from "@/pages/most.likes.page"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'MostLikes'
}

const Page = () => {
    return <MostLikesPage/>
}

export default Page