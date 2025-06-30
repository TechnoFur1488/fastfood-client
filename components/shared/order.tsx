"use client"

import { usePostOrderMutation } from "@/store/apiSlice"
import { useState } from "react"
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { IMaskInput } from "react-imask"
import { cn } from "@/lib/utils"
import toast from "react-hot-toast"

export const Order = () => {
    const [adresUser, setAdresUser] = useState("")
    const [phoneUser, setPhoneUser] = useState("")
    const [postOrder] = usePostOrderMutation()

    const handlePostOrder = async () => {
        try {
            await postOrder({ adres: adresUser, phone: phoneUser }).unwrap()
            toast.success("Заказ успешно оформлен")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Dialog>
            <DialogTrigger className="bg-[#F6B623] text-white rounded-xl px-6 py-2 font-bold hover:bg-[#CF8005] transition">Заказать</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Оформление заказа</DialogTitle>
                </DialogHeader>
                <div className={"space-y-5"}>
                    <Input placeholder="Ваш адрес" type="text" value={adresUser} onChange={e => setAdresUser(e.target.value)} />
                    <IMaskInput
                        placeholder="Ваш телефон"
                        className={cn(
                            "w-full px-3 py-2 rounded-md border border-gray-200",
                            "focus:outline-none focus:ring-2 focus:ring-blue-500/50",
                            "placeholder:text-gray-400 text-sm"
                        )}
                        mask={"+7 (000) 000-00-00"}
                        value={phoneUser}
                        onChange={e => setPhoneUser((e.target as HTMLInputElement).value)}
                    />
                </div>
                <DialogFooter>
                    <DialogClose>Закрыть</DialogClose>
                    <Button onClick={() => handlePostOrder()}>Оформить заказ</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}