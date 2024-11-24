import Image from "next/image";
import car_icon from "../assets/directions_car.svg"

export default function Header () {
    return (
        <header className="flex justify-between p-5 items-center bg-gray-900 shadow-lg">
            <span className="text-green-700 text-xs italic">SHOPPER RIDES</span>
            <h1 className="text-green-600 font-bold text-3xl">Shopper Rides</h1>
            <Image src={car_icon} width={30} height={30} color="#15803d" alt="Car Icon"/> 
        </header>
    )
}