import { useState } from "react";
import arrowIcon from "./assets/icon-arrow.svg";
import classNames from "classnames";

const AgeCalculator = () => {
  const [sDay, setSDay] = useState("");
  const [sMonth, setSMonth] = useState("");
  const [sYear, setSYear] = useState("");
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
    let newErrors = {
      emptyDay: !sDay,
      emptyMonth: !sMonth,
      emptyYear: !sYear,
      invalidDay: false,
      invalidMonth: false,
      invalidYear: false,
    };

    if (newErrors.emptyDay || newErrors.emptyMonth || newErrors.emptyYear) {
      setErrors(newErrors);
      return;
    }

    const day = parseInt(sDay, 10);
    const month = parseInt(sMonth, 10);
    const year = parseInt(sYear, 10);

    newErrors.invalidDay = day < 1 || day > 31;
    newErrors.invalidMonth = month < 1 || month > 12;
    newErrors.invalidYear = year < 1900;

    if (newErrors.invalidDay || newErrors.invalidMonth || newErrors.invalidYear) {
      setErrors(newErrors);
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    if (isNaN(birthDate.getTime()) || birthDate > new Date()) {      setErrors(newErrors);
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
                "text-lightGrey": !errors.emptyDay && !errors.invalidDay,
                "text-red-400": errors.emptyDay || errors.invalidDay,
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
                errors.emptyDay || errors.invalidDay,
            })}
          />
          <p className="text-[0.6rem] text-red-400 italic error-displayD">
            {errors.emptyDay ? "This field is required" : errors.invalidDay ? "Enter a valid day" : ""}
          </p>
        </div>
        <div id="month" className="flex flex-col gap-1">
          <label
            htmlFor="month"
            className={classNames(
              "text-xs",
              "tracking-[0.1rem]",
              "font-normal",
              {
                "text-lightGrey": !errors.emptyMonth && !errors.invalidMonth,
                "text-red-400": errors.emptyMonth || errors.invalidMonth,
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
                errors.emptyMonth || errors.invalidMonth,
            })}
          />
          <p className="text-[0.6rem] text-red-400 italic error-displayM">
            {errors.emptyMonth ? "This field is required" : errors.invalidMonth ? "Enter a valid month" : ""}
          </p>
        </div>
        <div id="year" className="flex flex-col gap-1">
          <label
            htmlFor="year"
            className={classNames(
              "text-xs",
              "tracking-[0.1rem]",
              "font-normal",
              {
                "text-lightGrey": !errors.emptyYear && !errors.invalidYear,
                "text-red-400": errors.emptyYear || errors.invalidYear,
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
                errors.emptyYear || errors.invalidYear,
            })}
          />
          <p className="text-[0.6rem] text-red-400 italic error-displayY">
            {errors.emptyYear ? "This field is required" : errors.invalidYear ? "Enter a valid year" : ""}
          </p>
        </div>
      </div>
      <div id="arrow" className="flex justify-end">
        <div
          className="bg-purple rounded-full w-max p-3 hover:cursor-pointer active:scale-90 active:bg-black transition-all"
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