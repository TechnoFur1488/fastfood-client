import { useGetNewPopularQuery } from "@/store/apiSlice"
import Image from "next/image"
import { AddCart } from "./add-cart"

export const ProductsNew = () => {
    const { data, isLoading, isError } = useGetNewPopularQuery()

    if (isLoading) return <div>Загрузка...</div>
    if (isError) return <div>Ошибка</div>

    const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:5000/"

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data?.product.rows.map(el => (
                <div className={"flex justify-between flex-col"} key={el.id}>
                    <div>
                        <Image src={baseUrl + el.img} alt="Фото товара" width={280} height={280} />
                        <p className={"text-[18px] font-bold"}>{el.name}</p>
                        <p className={"text-sm"}>{el.description}</p>
                        {
                            el.discount > 0
                                ?
                                <div className={"flex space-x-2 items-center"}>
                                    <p className={"text-[#FF5640] text-[26px] font-bold"}>{el.discount.toLocaleString("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0, minimumFractionDigits: 0 })}</p>
                                    <p className={"text-[20px] line-through font-bold"}>{el.price.toLocaleString("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0, minimumFractionDigits: 0 })}</p>
                                </div>
                                :
                                <div>
                                    <p className={"text-[24px] font-bold"}>{el.price.toLocaleString("ru-RU", { style: "currency", currency: "RUB", maximumFractionDigits: 0, minimumFractionDigits: 0 })}</p>
                                </div>
                        }
                    </div>
                    <AddCart productId={el.id} />
                </div>
            ))}
        </div>
    )
}