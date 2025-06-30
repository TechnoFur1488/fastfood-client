import { useGetProductsCatalogQuery } from "@/store/apiSlice"
import Image from "next/image"
import { useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { AddCart } from "./add-cart"
import { DeleteProduct } from "./delete-product"
import { ProductUpdate } from "./product-update"

interface Props {
    catalogId: number
    page: number | string
    role: string
}

export const CatalogProducts = ({ catalogId, page }: Props) => {
    const [state, setState] = useState(Number(page))
    const { data, isLoading, isError } = useGetProductsCatalogQuery({ id: catalogId, page: state })


    if (!data) return <div>Нет данных</div>
    if (isLoading) return <div>Загрузка...</div>
    if (isError) return <div>Ошибка</div>

    const pageCount = Math.ceil(data.product.count / 10)
    const pages = []

    for (let i = 0; i < pageCount; i++) {
        pages.push(i + 1)
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_API_URL || "http://localhost:5000/"

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {data?.product.rows.map(el => (
                    <div className={"flex justify-between flex-col relative"} key={el.id}>
                        <div>
                            <Image src={baseUrl + el.img} alt="Фото товара" width={280} height={280} className="w-full h-auto object-cover rounded-lg" />
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
                        <div className={"absolute top-0"}>
                            <DeleteProduct productId={el.id} />
                            <ProductUpdate productId={el.id} name={el.name} description={el.description} price={el.price} discount={el.discount} catalogId={el.catalogId} img={baseUrl + el.img} />
                        </div>
                    </div>
                ))}
            </div>
            <div className={"flex justify-center my-10"}>
                <div className={"flex gap-2"}>
                    {pages.map((el, i) => (
                        <div key={i}>
                            <Link href={`/catalog/${catalogId}?page=${el}`} onClick={() => setState(el)}>
                                <div className={cn("text-[20px] font-bold rounded-full bg-[#CF8005] size-12 flex justify-center items-center text-white", state === el && "bg-black text-white")}>
                                    {el}
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}