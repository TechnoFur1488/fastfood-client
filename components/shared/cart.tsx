import { useGetCartQuery } from "@/store/apiSlice"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet"
import Image from "next/image"
import { CartUpdate } from "./cart-update"
import { ScrollArea } from "../ui/scroll-area"
import { CartDelete } from "./cart-delete"
import { Order } from "./order"

export const Cart = () => {
    const { data, isLoading, isError } = useGetCartQuery()

    if (isLoading) return <div>Загрузка...</div>
    if (isError) return <div>Ошибка</div>

    const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:5000/"

    const total = data?.cartItem.map(el => el.price)
    const totalSum = total?.reduce((sum, num) => sum + num, 0)

    return (
        <Sheet>
            <SheetTrigger>
                <Image width={60} height={60} alt="Корзина" src="/Link.png" />
            </SheetTrigger>
            <SheetContent className="bg-white rounded-2xl shadow-2xl p-6 max-w-md mx-auto">
                <SheetHeader>
                    <SheetTitle className="text-2xl font-bold mb-4 text-center">Корзина</SheetTitle>
                    {data?.cartItem.length === 0 &&
                        <SheetDescription className="text-gray-400 text-center py-8">Ваша корзина пуста</SheetDescription>
                    }
                </SheetHeader>
                <ScrollArea className={"h-230"}>
                    <div className={"space-y-4"}>
                        {data?.cartItem.map(el => (
                            <div key={el.id} className="flex items-center gap-4 bg-gray-50 rounded-xl p-4 shadow hover:shadow-lg transition-shadow">
                                <Image src={baseUrl + el.img} alt="Фото товара" width={80} height={80} className="rounded-xl border border-gray-200 shadow-sm" />
                                <div className="flex-1">
                                    <p className="font-semibold text-lg">{el.name}</p>
                                    <p className="text-green-600 font-bold text-xl">
                                        {el.price.toLocaleString("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                                    </p>
                                    {el.discount !== 0 && (
                                        <p className="text-red-500 font-semibold text-sm line-through">
                                            {el.discount.toLocaleString("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0, minimumFractionDigits: 0 })}
                                        </p>
                                    )}
                                </div>
                                <CartUpdate productId={el.id} quantity={el.quantity} />
                                <CartDelete cartId={el.id} />
                            </div>
                        ))}
                    </div>
                </ScrollArea>
                <SheetFooter className="flex flex-col gap-4 mt-6">
                    {totalSum &&
                        < div className="flex justify-between items-center w-full">
                            <span className="font-semibold text-lg">Итого:</span>
                            <span className="text-xl font-bold text-black">{totalSum.toLocaleString("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0, minimumFractionDigits: 0 })}</span>
                        </div>
                    }
                    <div className="flex justify-between items-center w-full gap-2">
                        <SheetClose className="bg-gray-200 rounded-xl px-4 py-2 font-semibold hover:bg-gray-300 transition">Закрыть</SheetClose>
                        <Order />
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet >
    )
}