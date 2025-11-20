import { CalendarState } from "@/Models/Model-ServiceConfig/serviceConfig";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const initialCalendarState: CalendarState = {
  selectedService: null,
  selectedDates: {},
  price: "",
  deliveryTime: new Date(),
  pickupTime: new Date(),
  showDeliveryPicker: false,
  showPickupPicker: false,
  dayPrices: {},
  isDragging: false,
  dragStartDate: null,
  selectionMode: "exact",
  rangeStart: null,
  rangeEnd: null,
};

export const useCalendarState = () => {
  const [state, setState] = useState<CalendarState>(initialCalendarState);

  useEffect(() => {
    const today = dayjs();
    const prices: Record<string, { price: string }> = {};
    const monthsToGenerate = 6;

    for (let m = 0; m < monthsToGenerate; m++) {
      const date = today.add(m, "month");
      const daysInMonth = date.daysInMonth();

      for (let d = 1; d <= daysInMonth; d++) {
        const currentDate = date.date(d);
        if (currentDate.isAfter(today.subtract(1, "day"))) {
          prices[currentDate.format("YYYY-MM-DD")] = { price: "$40" };
        }
      }
    }

    setState((prev) => ({ ...prev, dayPrices: prices }));
  }, []);

  const updateState = (updates: Partial<CalendarState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const resetCalendar = () => {
    setState(initialCalendarState);
  };

  const toggleDateSelection = (date: string) => {
    setState((prev) => {
      const newDates = { ...prev.selectedDates };
      if (newDates[date]) {
        delete newDates[date];
      } else {
        newDates[date] = {
          selected: true,
          selectedColor: "#36ebd8",
          textColor: "white",
        };
      }
      return { ...prev, selectedDates: newDates };
    });
  };

  return { state, updateState, resetCalendar, toggleDateSelection };
};
