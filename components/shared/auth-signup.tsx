"use client"

import { useSignupUserMutation } from "@/store/apiSlice"
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

export const AuthSignup = () => {
    const router = useRouter()
    const [checkPassword, setCheckPassword] = useState(false)
    const [signup] = useSignupUserMutation()

    const formSchema = z.object({
        name: z.string().min(2, { message: "Имя не может быть короче 2 символов" }),
        email: z.string().min(2, { message: "Email не может быть короче 2 символов" }),
        password: z.string().min(8, { message: "Пароль должен содержать не менее 8 символов" })
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof formSchema>) => {
        try {
            await signup({
                name: data.name,
                email: data.email,
                password: data.password
            }).unwrap()
            toast.success("Регистрация прошла успешно")
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
                            <CardTitle>Зарегистрируйте аккаунт</CardTitle>
                            <CardDescription>
                                Введите email, имя и пароль для регистрации
                            </CardDescription>
                            <CardAction>
                                <Link href={"/auth/signin"}>
                                    Войти
                                </Link>
                            </CardAction>
                        </CardHeader>
                        <CardContent className={"space-y-5"}>
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Имя</FormLabel>
                                        <FormControl>
                                            <Input {...field} type="text" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
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
                            <Button type="submit">Зарегистрироваться</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </Container>
    )
}