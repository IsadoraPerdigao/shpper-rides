import DriverCard from "./driverCard";
import { ApiResult } from "@/app/ride/estimate/page";
import homerImg from "../assets/homer.jpeg"
import toretto from "../assets/toretto.jpeg"
import bond from "../assets/bond.jpeg"

export default function DriversList({apiResult} : {apiResult: ApiResult}) {
    const driversInfo = []


    for (let i = 0; i < apiResult.options.length; i++) {
        const driver = apiResult.options[i];

        if (driver.name == "Homer Simpson") {
            driver.driverImg = homerImg.src
        }

        if (driver.name == "Dominic Toretto") {
            driver.driverImg = toretto.src
        }

        if (driver.name == "James Bond") {
            driver.driverImg = bond.src
        }

        driversInfo.push(driver);
    }

    return (
        <div className="flex flex-col gap-4">
            {driversInfo.map((driver, index) => (
                <DriverCard
                    key={index}
                    name={driver.name}
                    driverImg={driver.driverImg}
                    car={driver.car}
                    rating={driver.review.rating}
                    value={driver.value}
                    about={driver.description}
                    comment={driver.review.comment}
                />
            ))}
        </div>
    );
}