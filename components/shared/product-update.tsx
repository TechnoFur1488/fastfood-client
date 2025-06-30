"use client"

import { useUpdateProductMutation, useGetCatalogQuery } from "@/store/apiSlice"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState } from "react"
import Image from "next/image"
import { Textarea } from "../ui/textarea"
import toast from "react-hot-toast"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../ui/dialog"

interface Props {
    productId: number
    name: string
    price: number
    discount: number
    catalogId: number
    description: string
    img: string
    className?: string
}

export const ProductUpdate = ({
    productId,
    name,
    price,
    discount,
    catalogId,
    description,
    img,
    className
}: Props) => {
    const [updateProduct] = useUpdateProductMutation()
    const { data: catalogs } = useGetCatalogQuery()
    const [previewUrl, setPreviewUrl] = useState<string>("")
    const [open, setOpen] = useState(false)

    const formSchema = z.object({
        img: z.instanceof(File)
            .refine(file => file.size <= 5 * 1024 * 1024, "Файл должен быть меньше 5MB")
            .refine(
                file => ["image/jpeg", "image/png", "image/webp"].includes(file.type),
                "Только .jpg, .png или .webp форматы"
            ),
        name: z.string().min(2, { message: "Имя не может быть короче 2 символов" }),
        price: z.coerce.number(),
        discount: z.coerce.number(),
        catalogId: z.coerce.number(),
        description: z.string().min(2, { message: "Описание не может быть короче 2 символов" }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name,
            price,
            discount,
            catalogId,
            description,
            img: undefined,
        }
    })

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, field: { onChange: (file: File) => void }) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0]
            field.onChange(file)
            setPreviewUrl(URL.createObjectURL(file))
        }
    }

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            const formData = new FormData()
            if (data.img instanceof File) {
                formData.append("img", data.img)
            }
            formData.append("name", data.name)
            formData.append("price", String(data.price))
            formData.append("discount", String(data.discount))
            formData.append("catalogId", String(data.catalogId))
            formData.append("description", data.description)
            formData.append("id", String(productId))

            await updateProduct(formData).unwrap()
            toast.success("Продукт успешно обновлен")
            setOpen(false)
        } catch (err) {
            console.error(err)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className={className}>Редактировать продукт</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Редактировать продукт</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="img"
                            render={({ field: { value, onChange, ...field } }) => (
                                <FormItem>
                                    <FormLabel>Изображение</FormLabel>
                                    {(previewUrl || img) && (
                                        <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                                            <Image
                                                src={previewUrl || img}
                                                alt="Preview"
                                                fill
                                                className="object-cover rounded-md"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                        </div>
                                    )}
                                    <FormControl>
                                        <Input
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={(e) => handleImageChange(e, { onChange })}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Название</FormLabel>
                                        <FormControl>
                                            <Input type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Цена</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={e => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="discount"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Скидка</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                {...field}
                                                onChange={e => field.onChange(Number(e.target.value))}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Описание</FormLabel>
                                        <FormControl>
                                            <Textarea {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="catalogId"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Каталог</FormLabel>
                                        <Select
                                            value={String(field.value)}
                                            onValueChange={(value) => {
                                                field.onChange(Number(value))
                                            }}
                                        >
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Выберите каталог" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {catalogs?.catalog.map((catalog) => (
                                                    <SelectItem key={catalog.id} value={String(catalog.id)}>
                                                        {catalog.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit" className="w-full">Сохранить изменения</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}