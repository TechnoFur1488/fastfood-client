"use client"

import { useDeleteCatalogMutation, useGetOneCatalogQuery, useUpdateCatalogMutation } from "@/store/apiSlice"
import { Button } from "../ui/button"
import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import toast from "react-hot-toast"

interface Props {
    catalogId: number
    role: string
}

export const CatalogOne = ({ catalogId, role }: Props) => {
    const [edit, setEdit] = useState(false)
    const { data, isLoading, isError } = useGetOneCatalogQuery(catalogId)
    const [editInput, setEditInput] = useState("")
    const [deleteCatalog] = useDeleteCatalogMutation()
    const [updateCatalog] = useUpdateCatalogMutation()

    useEffect(() => {
        if (data?.catalog.name) {
            setEditInput(data.catalog.name)
        }
    }, [data?.catalog.name])

    const handleDeleteCatalog = async (catalogId: number) => {
        try {
            await deleteCatalog(catalogId).unwrap()
            toast.success("Каталог успешно удален")
        } catch (err) {
            console.error(err)
        }
    }

    const handleUpdateCatalog = async (catalogId: number) => {
        try {
            await updateCatalog({ id: catalogId, name: editInput }).unwrap()
            toast.success("Каталог успешно обновлен")
        } catch (err) {
            console.error(err)
        }
    }

    if (isLoading) return <div>Загрузка...</div>
    if (isError) return <div>Ошибка</div>

    return (
        <div className={"py-[70px]"}>
            {role === "ADMIN" &&
                <div className={"w-full flex justify-between"}>
                    <Button onClick={() => setEdit(!edit)}>{edit ? "Отменить" : "Редактировать"}</Button>
                    {edit &&
                        <div className={"flex gap-2"}>
                            <Input value={editInput} onChange={e => setEditInput(e.target.value)} type="text" />
                            <Button onClick={() => handleUpdateCatalog(catalogId)}>Сохранить</Button>
                        </div>
                    }
                    <Button onClick={() => handleDeleteCatalog(catalogId)}>Удалить</Button>
                </div>
            }
            <h1 className={"text-center text-[40px] text-[#722419] font-bold"}>{data?.catalog.name}</h1>
        </div>
    )
}