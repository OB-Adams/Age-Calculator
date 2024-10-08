import { useState, useEffect } from "react";
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
    invalidDate: false,
    isFuture: false,
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
      invalidDate: false,
      isFuture: false,
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
      invalidDate: false,
      isFuture: false,
    };

    const ageReset = { years: "--", months: "--", days: "--" };

    const day = parseInt(sDay, 10);
    const month = parseInt(sMonth, 10);
    const year = parseInt(sYear, 10);

    if (newErrors.emptyDay || newErrors.emptyMonth || newErrors.emptyYear) {
      setErrors(newErrors);
      setAge(ageReset);
      if (!newErrors.emptyDay && (day < 1 || day > 31)) {
        setErrors((prev) => {
          return { ...prev, invalidDay: true };
        });
      }
      if (!newErrors.emptyMonth && (month < 1 || month > 12)) {
        setErrors((prev) => {
          return { ...prev, invalidMonth: true };
        });
      }
      if (!newErrors.emptyYear && year < 100) {
        setErrors((prev) => {
          return { ...prev, invalidYear: true };
        });
      }
      if (!newErrors.emptyYear && year > new Date().getUTCFullYear()) {
        setErrors((prev) => {
          return { ...prev, isFuture: true };
        });
      }
      return;
    }

    newErrors.invalidDay = day < 1 || day > 31;
    newErrors.invalidMonth = month < 1 || month > 12;
    newErrors.invalidYear = year < 100;
    newErrors.isFuture = year > new Date().getUTCFullYear();

    if (
      newErrors.invalidDay ||
      newErrors.invalidMonth ||
      newErrors.invalidYear ||
      newErrors.isFuture
    ) {
      setAge(ageReset);
      if (newErrors.invalidDay) {
        setErrors((prev) => {
          return { ...prev, invalidDay: true };
        });
      }
      if (newErrors.invalidMonth) {
        setErrors((prev) => {
          return { ...prev, invalidMonth: true };
        });
      }
      if (newErrors.invalidYear) {
        setErrors((prev) => {
          return { ...prev, invalidYear: true };
        });
      }
      if (newErrors.isFuture) {
        setErrors((prev) => {
          return { ...prev, isFuture: true };
        });
      }
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    if (isNaN(birthDate.getTime()) || birthDate > new Date()) {
        setAge(ageReset)
      setErrors((prev) => {
        return { ...prev, invalidDate: true };
      });
      return;
    }

    setAge(calculateAge(birthDate));
  };

  useEffect(() => {
    const handleEnterPress = (e) => {
      if (e.key === "Enter") {
        handleAgeCalc();
      }
    };

    window.addEventListener("keydown", handleEnterPress);

    return () => {
      window.removeEventListener("keydown", handleEnterPress);
    };
  });

  return (
    <div
      id="container"
      className="flex flex-col gap-2 font-Poppins sm:w-[30rem] w-full max-w-[30rem] p-4 sm:p-8 bg-white rounded-br-[3rem] sm:rounded-br-[6rem]"
    >
      <div id="date-input" className="flex flex-col sm:flex-row gap-3">
        <div id="day" className="flex flex-col gap-1">
          <label
            htmlFor="day"
            className={classNames(
              "text-xs",
              "tracking-[0.1rem]",
              "font-normal",
              {
                "text-lightGrey": !errors.emptyDay && !errors.invalidDay,
                "text-red-400":
                  errors.emptyDay || errors.invalidDay || errors.invalidDate,
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
            className={classNames(
              "w-full sm:w-[6rem]",
              "p-2",
              "placeholder-slate-500",
              {
                "focus:border-red-400 focus:ring-red-400 border-[1px] border-red-400":
                  errors.emptyDay || errors.invalidDay || errors.invalidDate,
              }
            )}
          />
          <p className="text-[0.6rem] text-red-400 italic error-displayD">
            {errors.emptyDay
              ? "This field is required"
              : errors.invalidDay
              ? "Enter a valid day"
              : errors.invalidDate
              ? "Must be a valid date"
              : ""}
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
                "text-lightGrey":
                  !errors.emptyMonth &&
                  !errors.invalidMonth &&
                  !errors.invalidDate,
                "text-red-400":
                  errors.emptyMonth ||
                  errors.invalidMonth ||
                  errors.invalidDate,
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
            className={classNames(
              "w-full sm:w-[6rem]",
              "p-2",
              "placeholder-slate-500",
              {
                "focus:border-red-400 focus:ring-red-400 border-[1px] border-red-400":
                  errors.emptyMonth ||
                  errors.invalidMonth ||
                  errors.invalidDate,
              }
            )}
          />
          <p className="text-[0.6rem] text-red-400 italic error-displayM">
            {errors.emptyMonth
              ? "This field is required"
              : errors.invalidMonth
              ? "Enter a valid month"
              : ""}
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
                "text-lightGrey":
                  !errors.emptyYear &&
                  !errors.invalidYear &&
                  !errors.invalidDate &&
                  !errors.isFuture,
                "text-red-400":
                  errors.emptyYear ||
                  errors.invalidYear ||
                  errors.invalidDate ||
                  errors.isFuture,
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
            className={classNames(
              "w-full sm:w-[6rem]",
              "p-2",
              "placeholder-slate-500",
              {
                "focus:border-red-400 focus:ring-red-400 border-[1px] border-red-400":
                  errors.emptyYear ||
                  errors.invalidYear ||
                  errors.invalidDate ||
                  errors.isFuture,
              }
            )}
          />
          <p className="text-[0.6rem] text-red-400 italic error-displayY">
            {errors.emptyYear
              ? "This field is required"
              : errors.invalidYear
              ? "Enter a valid year"
              : errors.isFuture
              ? "Must be in the past"
              : ""}
          </p>
        </div>
      </div>
      <div
        id="arrow"
        className="flex justify-center sm:justify-end mt-4 sm:mt-0"
      >
        <div
          className="bg-purple hover:bg-lightPurple rounded-full w-max p-3 hover:cursor-pointer active:scale-90 active:bg-black transition-all"
          onClick={handleAgeCalc}
        >
          <img src={arrowIcon} alt="arrow" className="w-6" />
        </div>
      </div>
      <div
        id="date-display"
        className="flex flex-col gap-0 h-auto sm:h-[10rem] text-[2rem] sm:text-[3rem] font-extrabold italic mt-3 sm:mt-0"
      >
        <p className="sm:mt-[-1rem]">
          <i className="text-purple">{age.years}</i>{" "}
          {age.years > 1 || age.years === "--" ? "years" : "year"}
        </p>
        <p className="sm:mt-[-1rem]">
          <i className="text-purple">{age.months}</i>{" "}
          {age.months > 1 || age.months === "--" ? "months" : "month"}
        </p>
        <p className="sm:mt-[-1rem]">
          <i className="text-purple">{age.days}</i>{" "}
          {age.days > 1 || age.days === "--" ? "days" : "day"}
        </p>
      </div>
    </div>
  );
};

export default AgeCalculator;
