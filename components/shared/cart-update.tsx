"use client"

import { useUpdateCartMutation } from "@/store/apiSlice"
import { useState } from "react"
import { Input } from "../ui/input"
import { Triangle } from "lucide-react"

interface Props {
    productId: number
    quantity: number
}

export const CartUpdate = ({ productId, quantity }: Props) => {
    const [inputQuantity, setInputQuantity] = useState(quantity)
    const [updateCart] = useUpdateCartMutation()

    const handleCartUpdate = async (productId: number, quantity: number) => {
        try {
            await updateCart({
                id: productId,
                quantity
            }).unwrap()
        } catch (err) {
            console.error(err)
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseInt(e.target.value)
        if (!isNaN(value)) {
            setInputQuantity(value)
        }
    }

    const handleIncrement = () => {
        const newQuantity = inputQuantity + 1
        setInputQuantity(newQuantity)
        handleCartUpdate(productId, newQuantity)
    }

    const handleDecrement = () => {
        const newQuantity = Math.max(1, inputQuantity - 1)
        setInputQuantity(newQuantity)
        handleCartUpdate(productId, newQuantity)
    }

    return (
        <div className={"relative"}>
            <Input
                className={`w-19 rounded-3xl [&::-webkit-outer-spin-button]:appearance-none 
                [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0
                [-moz-appearance:textfield]`}
                value={inputQuantity}
                onChange={handleInputChange}
                type="number"
            />
            <div className={"absolute right-2 top-1/2 -translate-y-1/2"}>
                <Triangle onClick={handleIncrement} fill="#9199AB" className={"text-[#9199AB] size-3 cursor-pointer"} />
                <Triangle onClick={handleDecrement} fill="#9199AB" className={"text-[#9199AB] rotate-180 size-3 cursor-pointer"} />
            </div>
        </div>
    )
}