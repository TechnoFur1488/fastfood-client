"use client"

import Link from "next/link"
import { Container } from "./container"
import { Button } from "../ui/button"
import { useState } from "react"
import { Catalog } from "./catalog"
import { User } from "lucide-react"
import { Cart } from "./cart"

export const Header = () => {
    const [bar, setBar] = useState(false)


    return (
        <>
            <header className={"mt-20"}>
                <Container className={"flex items-center justify-between"}>
                    <Button onClick={() => setBar(true)} className={"bg-[#E9281D] cursor-pointer font-bold text-white text-2xl rounded-full w-[169px] h-15 text-center flex items-center justify-center"}>Каталог</Button>
                    <div className={"w-[35%] bg-[#E9E9E9] h-[2px]"} />
                    <Link className={"font-bold text-4xl text-center h-15"} href={"/"}>
                        <div className={"flex flex-col"}>
                            <span>
                                Фаршик
                            </span>
                            <span className={"text-[20px] font-normal"}>
                                Доставка еды
                            </span>
                        </div>
                    </Link>
                    <div className={"w-[35%] bg-[#E9E9E9] h-[2px]"} />
                    <Link href="/auth/signup" className={" flex items-center justify-center"}><User className={"size-8"} /></Link>
                    <Cart />
                </Container>
            </header>
            <Catalog bar={bar} setBar={setBar} />
        </>
    )
}