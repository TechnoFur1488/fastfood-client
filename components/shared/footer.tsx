import Link from "next/link"
import { Container } from "./container"
import Image from "next/image"

export const Footer = () => {
    return (
        <footer className={"bg-[#722419]"}>
            <Container className={"flex justify-between py-10"}>
                <div className={"flex flex-col"}>
                    <Link className={"text-white"} href={"/"}>Главная</Link>
                    <Link className={"text-white"} href={"/"}>Оплата</Link>
                    <Link className={"text-white"} href={"/"}>Новости</Link>
                </div>
                <div className={"flex justify-between"}>
                    <div>
                        <div className={"pb-5 text-white"}>
                            <p className={"text-[#F6B623] text-sm pb-5"}>Режим работы:</p>
                            <p>(с 9:30 до 18:00 без выходных)</p>
                        </div>
                        <div className={"pb-5 text-white w-[326px]"}>
                            <p className={"text-[#F6B623] text-sm pb-5"}>Адрес:</p>
                            <p>Россия, 125040, г. Москва, Ленинский проспект, дом, строение, номер кабинета</p>
                        </div>
                    </div>
                    <div >
                        <div className={"pb-5 text-white"}>
                            <p className={"text-[#F6B623] text-sm pb-5"}>Телефон:</p>
                            <p>+7 (000) 000-00-00</p>
                            <p>8 (000) 111-11-11</p>
                        </div>
                        <div className={"pb-5 "}>
                            <p className={"text-[#F6B623] text-sm pb-5"}>Мы в соц. сетях:</p>
                            <div className={"flex space-x-2"}>
                                <Image src="/Link (1).png" alt="Ссылка" width={30} height={30} />
                                <Image src="/Link (2).png" alt="Ссылка" width={30} height={30} />
                                <Image src="/Link (3).png" alt="Ссылка" width={30} height={30} />
                                <Image src="/Link (4).png" alt="Ссылка" width={30} height={30} />
                                <Image src="/Link (5).png" alt="Ссылка" width={30} height={30} />
                            </div>
                        </div>
                        <div>
                            <p className={"text-[#F6B623] text-sm pb-5"}>Принимаем к оплате:</p>
                            <div className={"flex flex-wrap w-50 gap-1"}>
                                <Image src="/PayPal.png" alt="Ссылка" width={51} height={32} />
                                <Image src="/Money.yandex.png" alt="Ссылка" width={51} height={32} />
                                <Image src="/Visa.png" alt="Ссылка" width={51} height={32} />
                                <Image src="/MasterCard.png" alt="Ссылка" width={51} height={32} />
                                <Image src="/Qiwi.png" alt="Ссылка" width={51} height={32} />
                                <Image src="/Robokassa.png" alt="Ссылка" width={51} height={32} />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    )
}