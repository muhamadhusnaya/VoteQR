import React, { useContext, useEffect, useState } from "react";
import { CountdownContext } from "../Context/CountdownContext";

const BoxCounter = ({ isEven = true, isActive = true, children, timeComponents = "Time Component" }) => {
    if (isEven) {
        return <>
            <div className={`${isActive ? 'border-blue-lighter text-blue-lighter' : 'border-white text-white border-b-white'} border h-full aspect-square flex flex-col items-center justify-center p-8 border-b-4`}>
                <h1 className="text-4xl md:text-5xl font-bold">
                    {children}
                </h1>
                <p className="text-xs md:text-base">{timeComponents}</p>
            </div>
        </>
    } else {
        return <>
            <div className={`${isActive ? 'border-purple-light text-purple-light' : 'border-white text-white border-b-white'} border h-full aspect-square flex flex-col items-center justify-center p-8 border-b-4`}>
                <h1 className="text-4xl md:text-5xl font-bold">
                    {children}
                </h1>
                <p className="text-xs md:text-base">{timeComponents}</p>
            </div>
        </>
    }
}

const Countdown = () => {
    const targetDate = new Date("2025-05-15T00:00:00"); // Tanggal akhir
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
    const {setIsExpired} = useContext(CountdownContext);

    function getTimeRemaining() {
        const now = new Date();
        const difference = targetDate - now;

        if (difference <= 0) {
            return {
                total: 0,
                days: 0,
                hours: 0,
                minutes: 0,
                seconds: 0,
            };
        }

        const total = Math.max(difference, 0) || difference;
        const seconds = Math.floor((total / 1000) % 60);
        const minutes = Math.floor((total / 1000 / 60) % 60);
        const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
        const days = Math.floor(total / (1000 * 60 * 60 * 24));

        return { total, days, hours, minutes, seconds };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            const remaining = getTimeRemaining();
            setTimeLeft(remaining);
            if (remaining.total <= 0) {
                setIsExpired(true);
                clearInterval(timer);
            } else {
                setIsExpired(false);
            }
        }, 1000);

        return () => clearInterval(timer); // bersihkan interval saat unmount
    }, []);

    return (
        <>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <BoxCounter isEven={false} timeComponents={"Days"} isActive={timeLeft.days === 0 ? true : false}>
                    {timeLeft.days}
                </BoxCounter>
                <BoxCounter isEven={true} timeComponents={"Hours"} isActive={timeLeft.days <= 0 && timeLeft.hours === 0 ? true : false}>
                    {timeLeft.hours}
                </BoxCounter>
                <BoxCounter isEven={false} timeComponents={"Minutes"} isActive={timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes === 0 ? true : false}>
                    {timeLeft.minutes}
                </BoxCounter>
                <BoxCounter isEven={true} timeComponents={"Seconds"} isActive={timeLeft.total === 0 ? true : false}>
                    {timeLeft.seconds}
                </BoxCounter>
            </div>
        </>
    )
}

export default Countdown;