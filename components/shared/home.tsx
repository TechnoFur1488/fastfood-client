"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

import { Navigation } from 'swiper/modules';
import { Button } from '../ui/button';
import { ProductsPopular } from './products-popular';
import { ProductsNew } from './products-new';
import Link from 'next/link';
import Image from 'next/image';
import { Input } from '../ui/input';

export const Home = () => {
    return (
        <>
            <Swiper className="h-[200px] sm:h-[300px] md:h-[400px] lg:h-[628px] mt-5 sm:mt-10">
                <SwiperSlide>
                    <div className="relative h-full w-full rounded-[8px] overflow-hidden">
                        <Image
                            src="/Listbox → Option.png"
                            alt="Слайд"
                            fill
                            className="object-cover rounded-[8px]"
                            priority
                        />
                        <div className="absolute inset-0 bg-black opacity-20 rounded-[8px]" />
                        <div className="absolute inset-0 flex justify-center items-center z-10 text-white">
                            <div className="h-[40%] flex flex-col justify-center space-y-2 sm:space-y-4 text-center">
                                <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold">Бургеры Чикен Филе</h1>
                                <p className="text-base sm:text-xl md:text-2xl">Два по цене одного</p>
                                <div className="w-full flex justify-center">
                                    <Button className="w-[120px] sm:w-[160px] bg-[#F6B623] rounded-full h-[40px] sm:h-[60px] text-base sm:text-[20px]">В корзину</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <div>
                <div className="flex items-center justify-center flex-col">
                    <div>
                        <h3 className="text-[#E9281D] text-2xl sm:text-3xl md:text-[44px] font-bold">Наше Меню</h3>
                        <div className="mt-2 sm:mt-3 w-full h-[2px] bg-[#E9281D]" />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-7.5 mt-7 justify-center">
                    <div className="bg-cover bg-center h-40 sm:h-60 md:h-80 w-full rounded-lg relative" style={{ backgroundImage: "url('/Бургеры.png')" }}>
                        <div className="h-full flex justify-center items-center relative z-10">
                            <div className="text-white">
                                <p className="text-2xl sm:text-4xl md:text-6xl font-bold">
                                    Бургеры
                                </p>
                            </div>
                        </div>
                        <div className="bg-black w-full h-full absolute top-0 left-0 opacity-20 rounded-lg" />
                    </div>
                    <div className="bg-cover bg-center h-40 sm:h-60 md:h-80 w-full rounded-lg relative" style={{ backgroundImage: "url('/Пицца.png')" }}>
                        <div className="h-full flex justify-center items-center relative z-10">
                            <div className="text-white">
                                <p className="text-2xl sm:text-4xl md:text-6xl font-bold">
                                    Пицца
                                </p>
                            </div>
                        </div>
                        <div className="bg-black w-full h-full absolute top-0 left-0 opacity-20 rounded-lg" />
                    </div>
                    <div className="bg-cover bg-center h-40 sm:h-60 md:h-80 w-full rounded-lg relative" style={{ backgroundImage: "url('/Шашлыки.png')" }}>
                        <div className="h-full flex justify-center items-center relative z-10">
                            <div className="text-white">
                                <p className="text-2xl sm:text-4xl md:text-6xl font-bold">
                                    Шашлыки
                                </p>
                            </div>
                        </div>
                        <div className="bg-black w-full h-full absolute top-0 left-0 opacity-20 rounded-lg" />
                    </div>
                    <div className="bg-cover bg-center h-40 sm:h-60 md:h-80 w-full rounded-lg relative" style={{ backgroundImage: "url('/Роллы и суши.png')" }}>
                        <div className="h-full flex justify-center items-center relative z-10">
                            <div className="text-white">
                                <p className="text-2xl sm:text-4xl md:text-6xl font-bold">
                                    Роллы и суши
                                </p>
                            </div>
                        </div>
                        <div className="bg-black w-full h-full absolute top-0 left-0 opacity-20 rounded-lg" />
                    </div>
                </div>
            </div>
            <div className="mt-10 sm:mt-20 mb-6 sm:mb-10">
                <h2 className="font-bold text-2xl sm:text-3xl md:text-[40px] text-[#E9281D] text-center">Популярные блюда</h2>
                <ProductsPopular />
            </div>
            <div className="mt-10 sm:mt-20 mb-6 sm:mb-10">
                <h2 className="font-bold text-2xl sm:text-3xl md:text-[40px] text-[#E9281D] text-center">Новинки</h2>
                <ProductsNew />
            </div>
            <div className="flex justify-center">
                <div className="mt-10 sm:mt-20 mb-6 sm:mb-10 w-full max-w-2xl space-y-5 px-4">
                    <h2 className="font-bold text-2xl sm:text-3xl md:text-[40px] text-[#722419] text-center">Немного о нас</h2>
                    <p className="text-base sm:text-lg md:text-[18px]">На работу и домой. В любую точку города и в любое время суток. Только самые вкусные блюда. Огромный ассортимент, приемлемые цены. Все это о нашей компании.</p>
                    <p className="text-base sm:text-lg md:text-[18px]">Хотите побаловать себя изысканной кухней? Нет времени, а хочется перекусить? Хотите порадовать друзей или коллег? Заказывайте блюда у нас. Курьер будет у Ваших дверей в течение получаса.</p>
                </div>
            </div>
            <div className="bg-cover bg-center h-[120px] sm:h-[180px] md:h-[263px]" style={{ backgroundImage: "url('/Background.png')" }}>
                <div className="flex justify-start items-center h-full">
                    <div className="pl-4 sm:pl-[70px] text-white">
                        <div>
                            <h3 className="font-bold text-lg sm:text-2xl md:text-[40px]">Лучший бургерсет</h3>
                            <p className="text-base sm:text-lg md:text-[22px]">По специальной скидке</p>
                        </div>
                        <div className="pt-4 sm:pt-10">
                            <Link className="bg-[#F6B623] font-bold text-white text-lg sm:text-2xl rounded-full w-[120px] sm:w-[169px] h-10 sm:h-15 text-center flex items-center justify-center" href={"/catalog"}>Каталог</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="mt-10 sm:mt-20 mb-6 sm:mb-10 w-full max-w-2xl space-y-5 px-4">
                    <h2 className="font-bold text-2xl sm:text-3xl md:text-[40px] text-[#722419] text-center">Спасибо что выбрали нас!</h2>
                    <p className="text-base sm:text-lg md:text-[18px]">У нас Вы найдете все самое свежее, вкусное, аппетитное. Среди предлагаемых нами яств:</p>
                    <ul className="text-base sm:text-lg md:text-[18px] list-disc space-y-1">
                        <li>Суши и роллы. У нас есть как целый каталог готовых сетов, так и возможность самостоятельно сформировать индивидуальный сет.</li>
                        <li>Пиццы. Огромный выбор: от экзотических пицц и пицц с морепродуктами до вегетарианских.</li>
                        <li>Супы. На любой вкус и цвет, всегда горячие и свежие.</li>
                        <li>Напитки - соки, морсы, газированные напитки и многое другое. </li>
                    </ul>
                </div>
            </div>
            <div className="border-[#F6B623] border-[3px] border-t-0">
                <div className="w-full flex items-center h-0">
                    <div className="bg-[#F6B623] h-[2px] sm:h-[3px] w-full" />
                    <h2 className="px-4 sm:px-8 font-bold text-lg sm:text-2xl md:text-[40px] text-[#F6B623]">Акции</h2>
                    <div className="bg-[#F6B623] h-[2px] sm:h-[3px] w-full" />
                </div>
                <div className="p-4 sm:p-7.5 flex flex-col md:flex-row items-center gap-6">
                    <div>
                        <Image width={320} height={220} className="w-full max-w-xs md:max-w-md" src={"/Получите скидку.png"} alt='Картинка' />
                    </div>
                    <div className="md:pl-10 space-y-5">
                        <h3 className="text-[#E9281D] font-bold text-xl sm:text-2xl md:text-3xl">Получите скидку 30%</h3>
                        <p className="text-base sm:text-lg md:text-[18px]">Закажите любое блюдо в нашем интернет магазине и получите скидку 30%!</p>
                        <Link className="bg-[#E9281D] font-bold text-white text-lg sm:text-2xl rounded-full w-[120px] sm:w-[169px] h-10 sm:h-15 text-center flex items-center justify-center" href={"/catalog"}>Подробнее</Link>
                    </div>
                </div>
            </div>
            <div className="bg-cover bg-center mt-10 sm:mt-30 mb-6 sm:mb-10 h-[120px] sm:h-[220px] md:h-[358px]">
                <div className="h-full w-full flex justify-center items-center">
                    <div className="w-full max-w-xl flex flex-col justify-center px-4">
                        <h3 className="text-center font-bold text-base sm:text-xl md:text-[28px] mb-6 sm:mb-15">Подписаться на рассылку выгодных предложений нашего магазина</h3>
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-5">
                            <Input type='text' placeholder='Ваша e-mail:*' className="w-full bg-white rounded-full h-10 sm:h-12" />
                            <Button className="bg-[#E9281D] w-full sm:w-[188px] h-10 sm:h-12 rounded-full font-bold">Подписаться</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}