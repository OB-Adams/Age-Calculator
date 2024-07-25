import { useState } from "react";

const AgeCalculator = () => {
    const [sDay, setSDay] = useState("");
    const [sMonth, setSMonth] = useState("");
    const [sYear, setSYear] = useState("");
    const [error, setError] = useState("");
    const [age, setAge] = useState({ years: "--", months: "--", days: "--" });

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
        setError("");
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const differenceMs = today - birthDate;
        const ageDate = new Date(differenceMs);
        return {
            years: Math.abs(ageDate.getUTCFullYear() - 1970),
            months: ageDate.getUTCMonth(),
            days: ageDate.getUTCDate() - 1
        };
    };

    const handleAgeCalc = () => {
        if (!sDay || !sMonth || !sYear) {
            setError("All fields are required");
            return;
        }

        const day = parseInt(sDay, 10);
        const month = parseInt(sMonth, 10);
        const year = parseInt(sYear, 10);

        if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
            setError("Invalid date");
            return;
        }

        const birthDate = new Date(year, month - 1, day);
        if (isNaN(birthDate.getTime())) {
            setError("Invalid date");
            return;
        }

        if (birthDate > new Date()) {
            setError("Date must be in the past");
            return;
        }

        setAge(calculateAge(birthDate));
    };

    return (
        <div id="container" className="flex flex-col gap-2 font-Poppins w-[28rem] p-8 bg-white rounded-br-[6rem]">
            <div id="date-input" className="flex gap-4">
                <div id="day" className="flex flex-col gap-1">
                    <label htmlFor="day" className="text-xs text-smokeyGrey tracking-[0.1rem] font-normal">
                        DAY
                    </label>
                    <input
                        type="number"
                        id="day"
                        value={sDay}
                        onChange={handleInputChange(setSDay)}
                        placeholder="DD"
                        className="w-[6rem] p-1"
                    />
                </div>
                <div id="month" className="flex flex-col gap-1">
                    <label htmlFor="month" className="text-xs text-smokeyGrey tracking-[0.1rem] font-normal">
                        MONTH
                    </label>
                    <input
                        type="number"
                        id="month"
                        value={sMonth}
                        onChange={handleInputChange(setSMonth)}
                        placeholder="MM"
                        className="w-[6rem] p-1"
                    />
                </div>
                <div id="year" className="flex flex-col gap-1">
                    <label htmlFor="year" className="text-xs text-smokeyGrey tracking-[0.1rem] font-normal">
                        YEAR
                    </label>
                    <input
                        type="number"
                        id="year"
                        value={sYear}
                        onChange={handleInputChange(setSYear)}
                        placeholder="YYYY"
                        className="w-[6rem] p-1"
                    />
                </div>
            </div>
            {error && <div className="text-red-500">{error}</div>}
            <div id="arrow" className="flex justify-end">
                <div 
                    className="bg-purple rounded-full w-max p-3 hover:cursor-pointer active:scale-90 active:bg-black"
                    onClick={handleAgeCalc}
                >
                    <img
                        src="src\assets\arrow-down.svg"
                        alt="arrow"
                        className="w-6"
                    />
                </div>
            </div>
            <div
                id="date-display"
                className="flex flex-col gap-0 h-[10rem] text-[3rem] font-extrabold italic"
            >
                <p  className="mt-[-1rem]">
                    <i className="text-purple">{age.years}</i> years
                </p>
                <p className="mt-[-1rem]">
                    <i className="text-purple">{age.months}</i> months
                </p>
                <p  className="mt-[-1rem]">
                    <i className="text-purple">{age.days}</i> days
                </p>
            </div>
        </div>
    );
};

export default AgeCalculator;