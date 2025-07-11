"use client"

import { CatalogPage } from "@/components/shared/catalog-page";
import { Container } from "@/components/shared/container";
import { useGetRoleQuery } from "@/store/apiSlice";

export default function PageCatalog() {
    const { data } = useGetRoleQuery()

    return (
        <Container>
            <CatalogPage role={data?.role} />
        </Container>
    )
}