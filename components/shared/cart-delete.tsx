import { useDeleteCartMutation } from "@/store/apiSlice"
import { Trash2 } from "lucide-react"

interface Props {
    cartId: number
}

export const CartDelete = ({ cartId }: Props) => {
    const [deleteCart] = useDeleteCartMutation()

    const handleDeleteCart = async (id: number) => {
        try {
            await deleteCart(id).unwrap()
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <button onClick={() => handleDeleteCart(cartId)}><Trash2 className={"text-red-500"} /></button>
    )
}