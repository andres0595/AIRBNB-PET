export interface Service {
  id: string;
  name: string;
  subtitle: string;
  type: "accommodation" | "time-slot";
  icon: any;
}

export interface CalendarState {
  selectedService: string | null;
  selectedDates: Record<string, any>;
  price: string;
  deliveryTime: Date;
  pickupTime: Date;
  showDeliveryPicker: boolean;
  showPickupPicker: boolean;
  dayPrices: Record<string, any>;
  isDragging: boolean;
  dragStartDate: string | null;
  selectionMode: "exact" | "range";
  rangeStart: string | null;
  rangeEnd: string | null;
}

export interface TimeSlotState {
  selectedTimeSlot: string;
  serviceDuration: string;
  startTime: Date;
  endTime: Date;
  showStartTimePicker: boolean;
  showEndTimePicker: boolean;
  basePrice: string;
  schedules: Array<{
    timeSlot: string;
    duration: string;
    startTime: string;
    endTime: string;
    price: string;
  }>;
}

export interface ProfileState {
  petType: string;
  experienceLevel: string;
  certifications: string[];
  hasAllergies: string;
  allergiesDetail: string;
  homeType: string;
  hasOutdoorSpace: string;
  peopleAtHome: string;
  childrenAge: string;
}

export interface ServiceConfig {
  dates: string[];
  type: "accommodation" | "time-slot";
  price?: string;
  deliveryTime?: string;
  pickupTime?: string;
  schedules?: TimeSlotState["schedules"];
}
