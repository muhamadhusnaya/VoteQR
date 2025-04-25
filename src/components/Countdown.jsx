import { useEffect, useState } from "react";

const Countdown = () => {
    const targetDate = new Date("2025-05-15T00:00:00"); // Tanggal akhir
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
    const [isExpired, setIsExpired] = useState(false);
  
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
        if(remaining.total <= 0){
            setIsExpired(true);
            clearInterval(timer);
        }
      }, 1000);
  
      return () => clearInterval(timer); // bersihkan interval saat unmount
    }, []);

    return (
        <>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className={`${timeLeft.days === 0 ? 'border-purple-light text-purple-light' : 'border-white text-white border-b-white'} border h-full aspect-square flex flex-col items-center justify-center p-8 border-b-4`}>
                    <h1 className="text-xl md:text-5xl font-bold">
                        {timeLeft.days}
                    </h1>
                    <p className="text-xs md:text-base">Days</p>
                </div>
                <div className={`${timeLeft.days <= 0 && timeLeft.hours === 0 ? 'border-blue-lighter text-blue-lighter' : 'border-white text-white border-b-white'} border h-full aspect-square flex flex-col items-center justify-center p-8 border-b-4`}>
                    <h1 className="text-xl md:text-5xl font-bold">
                        {timeLeft.hours}
                    </h1>
                    <p className="text-xs md:text-base">Hours</p>
                </div>
                <div className={`${timeLeft.days <= 0 && timeLeft.hours <= 0 && timeLeft.minutes === 0 ? 'border-purple-light text-purple-light' : 'border-white text-white border-b-white'} border h-full aspect-square flex flex-col items-center justify-center p-8 border-b-4`}>
                    <h1 className="text-xl md:text-5xl font-bold">
                        {timeLeft.minutes}
                    </h1>
                    <p className="text-xs md:text-base">Minutes</p>
                </div>
                <div className={`${timeLeft.total === 0 ? 'border-blue-lighter text-blue-lighter' : 'border-white text-white border-b-white'} border h-full aspect-square flex flex-col items-center justify-center p-8 border-b-4`}>
                    <h1 className="text-xl md:text-5xl font-bold">
                        {timeLeft.seconds}
                    </h1>
                    <p className="text-xs md:text-base">Seconds</p>
                </div>
            </div>
        </>
    )
}

export default Countdown;