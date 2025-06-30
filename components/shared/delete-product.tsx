import { useDeleteProductMutation } from "@/store/apiSlice"
import toast from "react-hot-toast"
import { Button } from "../ui/button"
import { Trash2 } from "lucide-react"

interface Props {
    productId: number
}

export const DeleteProduct = ({ productId }: Props) => {
    const [deleteProduct] = useDeleteProductMutation()

    const handleDeleteProduct = async (productId: number) => {
        try {
            await deleteProduct(productId).unwrap()
            toast.success("Товар успешно удален")
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Button onClick={() => handleDeleteProduct(productId)}><Trash2 /></Button>
    )
}