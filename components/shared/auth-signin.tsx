"use client"

import { useSigninUserMutation } from "@/store/apiSlice"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import toast from "react-hot-toast"
import { Container } from "./container"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Eye, EyeOff } from "lucide-react"

export const AuthSignin = () => {
    const router = useRouter()
    const [checkPassword, setCheckPassword] = useState(false)
    const [signin] = useSigninUserMutation()

    const formSchema = z.object({
        email: z.string().min(2, { message: "Email не может быть короче 2 символов" }),
        password: z.string().min(8, { message: "Пароль должен содержать не менее 8 символов" })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            await signin({
                email: data.email,
                password: data.password
            }).unwrap()
            toast.success("Вход прошел успешно")
            router.push("/")
        } catch (err) {
            console.error(err)
            toast.error("Произошла ошибка")
        }
    }

    return (
        <Container className={"py-65 max-w-150"}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className={""}>
                        <CardHeader>
                            <CardTitle>Войдите в аккаунт</CardTitle>
                            <CardDescription>
                                Введите email и пароль для входа в аккаунт
                            </CardDescription>
                            <CardAction>
                                <Link href={"/auth/signup"}>
                                    Зарегистрироваться
                                </Link>
                            </CardAction>
                        </CardHeader>
                        <CardContent className={"space-y-5"}>
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Почта</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="email" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Пароль</FormLabel>
                                        <FormControl>
                                            <div className={"relative"}>
                                                <Input type={checkPassword ? "text" : "password"} {...field} />
                                                <button className={"absolute right-0 top-1/2 -translate-y-1/2 mr-2 cursor-pointer"} type="button" onClick={() => setCheckPassword(!checkPassword)}>{checkPassword ? <Eye /> : <EyeOff />}</button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">Войти</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </Container>
    )
}