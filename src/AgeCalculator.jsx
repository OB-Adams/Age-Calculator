import { useState } from "react";
import arrowIcon from "./assets/icon-arrow.svg";
import classNames from "classnames";

const AgeCalculator = () => {
  const [sDay, setSDay] = useState("");
  const [sMonth, setSMonth] = useState("");
  const [sYear, setSYear] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({
    emptyDay: false,
    emptyMonth: false,
    emptyYear: false,
    invalidDay: false,
    invalidMonth: false,
    invalidYear: false,
  });
  const [age, setAge] = useState({ years: "--", months: "--", days: "--" });

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
    setError("");
    setErrors({
      emptyDay: false,
      emptyMonth: false,
      emptyYear: false,
      invalidDay: false,
      invalidMonth: false,
      invalidYear: false,
    });
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const differenceMs = today - birthDate;
    const ageDate = new Date(differenceMs);
    return {
      years: Math.abs(ageDate.getUTCFullYear() - 1970),
      months: ageDate.getUTCMonth(),
      days: ageDate.getUTCDate() - 1,
    };
  };

  const handleAgeCalc = () => {
    if (!sDay || !sMonth || !sYear) {
      setError("All fields are required");

      //   if (!sDay) {
      //     setErrors((prevErrors) => {
      //         return {
      //             ...prevErrors,
      //             emptyDay: true
      //         }
      //     })
      //   } else if (!sMonth) {
      //     setErrors((prevErrors) => {
      //         return {
      //             ...prevErrors,
      //             emptyMonth: true
      //         }
      //     })
      //   } else if (!sYear) {
      //     setErrors((prevErrors) => {
      //         return {
      //             ...prevErrors,
      //             emptyYear: true
      //         }
      //     })
      //   }

      setErrors((prev) => {
        return { ...prev, emptyDay: true, emptyMonth: true, emptyYear: true };
      });
      return;
    }

    const day = parseInt(sDay, 10);
    const month = parseInt(sMonth, 10);
    const year = parseInt(sYear, 10);

    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900) {
      setError("Invalid date");
      //   if (day < 1 || day > 31) {
      //     setErrors((prevErrors) => {
      //         return {
      //             ...prevErrors,
      //             invalidDay: true
      //         }
      //     })
      //   } else if (month < 1 || month > 12) {
      //     setErrors((prevErrors) => {
      //         return {
      //             ...prevErrors,
      //             invalidMonth: true
      //         }
      //     })
      //   } else if (year < 1900) {
      //     setErrors((prevErrors) => {
      //         return {
      //             ...prevErrors,
      //             invalidYear: true
      //         }
      //     })
      //   }
      setErrors((prev) => {
        return {
          ...prev,
          invalidDay: true,
          invalidMonth: true,
          invalidYear: true,
        };
      });
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
    <div
      id="container"
      className="flex flex-col gap-2 font-Poppins w-[30rem] p-8 bg-white rounded-br-[6rem]"
    >
      <div id="date-input" className="flex gap-4">
        <div id="day" className="flex flex-col gap-1">
          <label
            htmlFor="day"
            className={classNames(
              "text-xs",
              "tracking-[0.1rem]",
              "font-normal",
              {
                "text-lightGrey": !error,
                "text-red-400": error,
              }
            )}
          >
            DAY
          </label>
          <input
            type="number"
            id="day"
            value={sDay}
            onChange={handleInputChange(setSDay)}
            placeholder="DD"
            className={classNames("w-[6rem]", "p-2", "placeholder-slate-500", {
              "focus:border-red-400 focus:ring-red-400 border-[1px] border-red-400":
                error,
              "": !error,
            })}
          />
          {errors.invalidDay && (
            <p className="text-[0.6rem] text-red-400 italic">
              Must be a valid day
            </p>
          )}
          {errors.emptyDay && (
            <p className="text-[0.6rem] text-red-400 italic">
              This field is required
            </p>
          )}
        </div>
        <div id="month" className="flex flex-col gap-1">
          <label
            htmlFor="month"
            className={classNames(
              "text-xs",
              "tracking-[0.1rem]",
              "font-normal",
              {
                "text-lightGrey": !error,
                "text-red-400": error,
              }
            )}
          >
            MONTH
          </label>
          <input
            type="number"
            id="month"
            value={sMonth}
            onChange={handleInputChange(setSMonth)}
            placeholder="MM"
            className={classNames("w-[6rem]", "p-2", "placeholder-slate-500", {
              "focus:border-red-400 focus:ring-red-400 border-[1px] border-red-400":
                error,
              "": !error,
            })}
          />
          {errors.invalidMonth && (
            <p className="text-[0.6rem] text-red-400 italic">
              Must be a valid month
            </p>
          )}
          {errors.emptyMonth && (
            <p className="text-[0.6rem] text-red-400 italic">
              This field is required
            </p>
          )}
        </div>
        <div id="year" className="flex flex-col gap-1">
          <label
            htmlFor="year"
            className={classNames(
              "text-xs",
              "tracking-[0.1rem]",
              "font-normal",
              {
                "text-lightGrey": !error,
                "text-red-400": error,
              }
            )}
          >
            YEAR
          </label>
          <input
            type="number"
            id="year"
            value={sYear}
            onChange={handleInputChange(setSYear)}
            placeholder="YYYY"
            className={classNames("w-[6rem]", "p-2", "placeholder-slate-500", {
              "focus:border-red-400 focus:ring-red-400 border-[1px] border-red-400":
                error,
              "": !error,
            })}
          />
          {errors.invalidYear && (
            <p className="text-[0.6rem] text-red-400 italic">
              Must be a valid year
            </p>
          )}
          {errors.emptyYear && (
            <p className="text-[0.6rem] text-red-400 italic">
              This field is required
            </p>
          )}
        </div>
      </div>
      <div id="arrow" className="flex justify-end">
        <div
          className="bg-purple rounded-full w-max p-3 hover:cursor-pointer active:scale-90 active:bg-black"
          onClick={handleAgeCalc}
        >
          <img src={arrowIcon} alt="arrow" className="w-6" />
        </div>
      </div>
      <div
        id="date-display"
        className="flex flex-col gap-0 h-[10rem] text-[3rem] font-extrabold italic"
      >
        <p className="mt-[-1rem]">
          <i className="text-purple">{age.years}</i> years
        </p>
        <p className="mt-[-1rem]">
          <i className="text-purple">{age.months}</i> months
        </p>
        <p className="mt-[-1rem]">
          <i className="text-purple">{age.days}</i> days
        </p>
      </div>
    </div>
  );
};

export default AgeCalculator;
