"use client"

import { useCreateCatalogMutation } from "@/store/apiSlice"
import { useState } from "react"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import toast from "react-hot-toast"

export const CatalogCreate = () => {
    const [name, setName] = useState("")
    const [postCatalog] = useCreateCatalogMutation()

    const handleClickCreateCatalog = async () => {
        try {
            await postCatalog({
                name: name
            }).unwrap()
            toast.success("Успешно создано")
            setName("")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <div className={"flex justify-center my-10"}>
            <div className={"w-[50%] flex items-center flex-col space-y-4"}>
                <h2 className={"text-4xl"}>Создание каталога</h2>
                <Input type="text" placeholder="Название каталога" onChange={(e) => setName(e.target.value)} />
                <Button className={"w-full"} onClick={() => handleClickCreateCatalog()}>Создать каталог</Button>
            </div>
        </div>
    )
}