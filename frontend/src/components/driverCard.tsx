"use client"

import Image from "next/image"

export type DriverProps = {
    driverImg: string;
    name: string;
    car: string;
    rating: number;
    value: number;
    about: string;
    comment: string;
};

export default function DriverCard ({ driverImg, car, rating, value, about, comment, name }: DriverProps) {
    return (
        <div className="p-6 rounded bg-green-100 text-green-900 w-[90%] shadow-md">
            <div className="flex items-center justify-between flex-col text-center mb-2">
                <Image src={driverImg} alt="Foto do motorista" height={80} width={80} className="rounded-full object-cover w-20 h-20"/>
                <div className="mt-3">
                    <p className="font-bold">{name}</p>
                    <p className="italic">{car}</p>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex gap-1 mb-4">
                        <p className="font-bold text-sm">Nota:</p>
                        <p className=" text-sm">{rating}</p>
                    </div>
                    <div className="flex gap-1 mb-4">
                        <p className="font-bold text-sm">Valor da Corrida:</p>
                        <p className=" text-sm">R$ {value}</p>
                    </div>
                </div>
                <h3 className="underline">Sobre</h3>
                <p className="mb-3 text-justify">{about}</p>
                <h3 className="underline">Avaliações</h3>
                <p className="mb-3 text-justify">{comment}</p>
                <button className="bg-green-700 rounded p-1 text-slate-50">Escolher</button>
            </div>
        </div>
    )
}