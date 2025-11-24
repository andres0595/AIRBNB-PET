import { TimeSlotState } from "@/Models/Model-ServiceConfig/serviceConfig";
import { useState } from "react";

const initialTimeSlotState: TimeSlotState = {
  selectedTimeSlot: "",
  serviceDuration: "",
  startTime: new Date(),
  endTime: new Date(),
  showStartTimePicker: false,
  showEndTimePicker: false,
  basePrice: "",
  schedules: [],
};

export const useTimeSlotState = () => {
  const [state, setState] = useState<TimeSlotState>(initialTimeSlotState);

  const updateState = (updates: Partial<TimeSlotState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const addSchedule = (schedule: TimeSlotState["schedules"][0]) => {
    setState((prev) => ({
      ...prev,
      schedules: [...prev.schedules, schedule],
      selectedTimeSlot: "",
      serviceDuration: "",
      basePrice: "",
      startTime: new Date(),
      endTime: new Date(),
    }));
  };

  const removeSchedule = (index: number) => {
    setState((prev) => ({
      ...prev,
      schedules: prev.schedules.filter((_, i) => i !== index),
    }));
  };

  const resetTimeSlot = () => {
    setState(initialTimeSlotState);
  };

  return { state, updateState, addSchedule, removeSchedule, resetTimeSlot };
};
