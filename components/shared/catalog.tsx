import React from "react"
import { Container } from "./container"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { CatalogItem } from "./catalog-item"

interface Props {
    bar: boolean
    setBar: React.Dispatch<React.SetStateAction<boolean>>
}

export const Catalog = ({ bar, setBar }: Props) => {
    return (
        <div className={cn("top-0 w-screen bg-white h-200 fixed z-50 border-b border-black", bar ? "visible" : "hidden")}>
            <Container className={"relative"}>
                <button className={"bg-none absolute right-0 top-2 cursor-pointer"} onClick={() => setBar(false)}><X /></button>
                <h2 className={"py-[72px] text-center text-[40px] font-bold text-[#C30000]"}>Каталог</h2>
                <CatalogItem setBar={setBar} />
            </Container>
        </div>
    )
}