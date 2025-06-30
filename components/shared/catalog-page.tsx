"use client"

import { useParams, useSearchParams } from "next/navigation"
import { CatalogOne } from "./catalog-one"
import { CatalogProducts } from "./catalog-products"

interface Props {
    role: string | null
}

export const CatalogPage = ({ role }: Props) => {

    if (!role) return null

    const searchParams = useSearchParams()
    const router = useParams()

    const catalogId = router.catalogId

    const page = searchParams.get("page")


    return (
        <div>
            <CatalogOne role={role} catalogId={Number(catalogId)} />
            <CatalogProducts role={role} page={page || 1} catalogId={Number(catalogId)} />
        </div>
    )
}