import { useAddCartMutation } from "@/store/apiSlice"
import { Button } from "../ui/button"
import toast from "react-hot-toast"
import { useCart } from "../hooks/use-cart"

interface Props {
    productId: number
}

export const AddCart = ({ productId }: Props) => {
    const [postCart] = useAddCartMutation()
    const { isProductInCart } = useCart()

    const handleClick = async (productId: number) => {
        try {
            await postCart(productId).unwrap()
            toast.success("Товар добавлен в корзину")
        } catch (err) {
            console.error(err)
            toast.error("Товар уже в корзине")
        }
    }

    return (
        <Button className={"w-full bg-[#CF8005] cursor-pointer"} disabled={isProductInCart(productId)} onClick={() => handleClick(productId)}>{isProductInCart(productId) ? "В корзине" : "В корзину"}</Button>
    )
}