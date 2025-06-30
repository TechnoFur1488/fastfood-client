import { useGetCatalogQuery } from "@/store/apiSlice"
import Link from "next/link"

interface Props {
    setBar: React.Dispatch<React.SetStateAction<boolean>>
}

export const CatalogItem = ({ setBar }: Props) => {
    const { data, isLoading, isError } = useGetCatalogQuery()

    if (isLoading) return <div>Загрузка...</div>
    if (isError) return <div>Ошибка</div>

    return (
        <div className={"grid grid-cols-4"}>
            {data?.catalog.map(el => (
                <Link onClick={() => setBar(false)} href={`/catalog/${el.id}`} className={"text-[22px] font-bold"} key={el.id}>{el.name}</Link>
            ))}
        </div>
    )
}