import { Link } from 'gatsby';
import React, { createRef, Fragment, useRef } from 'react';

import { Dialog, Menu, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import {
    CalendarIcon, ChevronLeftIcon, ChevronRightIcon, EllipsisHorizontalIcon, MapPinIcon
} from '@heroicons/react/24/solid';

import imageDom from '../images/avatar.png';
import imageConny from '../images/conny.png';

interface Props {
  events: [
    {
      summary: string;
      location: string;
      start: {
        date: string;
        dateTime: string;
      };
      description: string;
      end: {
        date: string;
        dateTime: string;
      };
    }
  ];
}

interface CalendarEvent {
  id: any;
  date: string;
  time: string;
  datetime: Date;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
}

interface CalendarDay {
  date: Date;
  isCurrentMonth: boolean;
  isSelected?: boolean;
  isToday: boolean;
  isPrevMonth: boolean;
  isNextMonth: boolean;
}

interface State {
  calendarDays: Array<CalendarDay>;
  calendarEvents: Array<CalendarEvent>;
  filteredCalendarEvents: Array<CalendarEvent>;
  selectedMonth: Date;
  isCurrentMonth: boolean;
  showDetails: boolean;
  selectedCalendarEvent?: CalendarEvent;
}

const monthsToString = new Array(
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember"
);

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

class Calendar extends React.Component<Props, State> {
  eventDetailHeadingRef = React.createRef<HTMLInputElement>();
  eventListRef: Array<React.RefObject<HTMLLIElement>> = [];

  constructor(props: Props) {
    super(props);

    let today = new Date();

    let newCalendarDays = this.calculareCalendarData(today);
    newCalendarDays = newCalendarDays.map((day, idx) => {
      day.isSelected = day.isToday;
      return day;
    });

    var events: Array<CalendarEvent> = [];

    let idx: number = 1;
    for (let event of props.events) {
      const startDate = new Date(event.start.dateTime);
      const endDate = new Date(event.end.dateTime);

      let expr: RegExp = /Trainer:<\/u><br>(\w+)<\/p>/g;
      let trainerFound = expr.exec(event.description);
      let trainer = "-";

      if (trainerFound && trainerFound.length > 1) {
        trainer = trainerFound[1];
      }

      events.push({
        id: idx++,
        date: startDate.toLocaleDateString(),
        time: startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        datetime: new Date(event.start.dateTime),
        name: event.summary,
        description: event.description,
        imageUrl: this.getTrainerImage(trainer),
        location: event.location,
      });
    }

    let newFilteredCalendarEvents = events.filter(
      (event) => event.datetime >= today && event.datetime.getMonth() === today.getMonth()
    );

    this.eventListRef = newFilteredCalendarEvents.map(() => React.createRef());

    // this.eventListRef[0].current?.addEventListener('hover', (ev) => {
    //   console.log(ev.timeStamp);
    // })

    this.state = {
      calendarDays: newCalendarDays,
      calendarEvents: events,
      filteredCalendarEvents: newFilteredCalendarEvents,
      selectedMonth: today,
      isCurrentMonth: true,
      showDetails: false,
    };
  }

  getTrainerImage(trainerName: string) {
    if (trainerName === "Dom") {
      return imageDom;
    } else if (trainerName === "Conny") {
      return imageConny;
    } else {
      return "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
    }
  }

  calculareCalendarData(month: Date): Array<CalendarDay> {
    let days: Array<CalendarDay> = [];

    console.log(month);
    let today = new Date();

    let firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    let lastDayOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    let daysLastMonth = (firstDayOfMonth.getDay() + 7 - 1) % 7;
    let daysNextMonth = 7 - lastDayOfMonth.getDay();

    // Get Days of last month
    for (let i = 0; i < daysLastMonth; ++i) {
      const day = new Date(month.getFullYear(), month.getMonth(), i - daysLastMonth + 1);
      const isCurrentDayToday =
        day.getDate() === today.getDate() &&
        day.getMonth() === today.getMonth() &&
        day.getFullYear() === today.getFullYear();
      days.push({
        date: day,
        isPrevMonth: true,
        isCurrentMonth: false,
        isNextMonth: false,
        isToday: isCurrentDayToday,
      });
    }

    // Get Days of current month
    for (let i = 1; i <= lastDayOfMonth.getDate(); ++i) {
      const day = new Date(month.getFullYear(), month.getMonth(), i);
      const isCurrentDayToday =
        day.getDate() === today.getDate() &&
        day.getMonth() === today.getMonth() &&
        day.getFullYear() === today.getFullYear();
      days.push({
        date: day,
        isPrevMonth: false,
        isCurrentMonth: true,
        isNextMonth: false,
        isToday: isCurrentDayToday,
      });
    }

    // Get Days of next month
    for (let i = 1; i <= daysNextMonth; ++i) {
      const day = new Date(month.getFullYear(), month.getMonth(), lastDayOfMonth.getDate() + i);
      const isCurrentDayToday =
        day.getDate() === today.getDate() &&
        day.getMonth() === today.getMonth() &&
        day.getFullYear() === today.getFullYear();
      days.push({
        date: day,
        isPrevMonth: false,
        isCurrentMonth: false,
        isNextMonth: true,
        isToday: isCurrentDayToday,
      });
    }

    return days;
  }

  handlePrevMonthClicked() {
    const thisMonth = new Date();
    const newMonth = new Date(this.state.selectedMonth.getFullYear(), this.state.selectedMonth.getMonth() - 1);

    let newCalendarDays = this.calculareCalendarData(newMonth);
    let newFilteredCalendarEvents = this.state.calendarEvents.filter(
      (event) => event.datetime >= newMonth && event.datetime.getMonth() === newMonth.getMonth()
    );

    this.setState({
      ...this.state,
      calendarDays: newCalendarDays,
      selectedMonth: newMonth,
      isCurrentMonth:
        thisMonth.getFullYear() === newMonth.getFullYear() && thisMonth.getMonth() === newMonth.getMonth(),
      filteredCalendarEvents: newFilteredCalendarEvents,
    });

    console.log(newMonth);
  }

  handleNextMonthClicked() {
    const thisMonth = new Date();
    const newMonth = new Date(this.state.selectedMonth.getFullYear(), this.state.selectedMonth.getMonth() + 1);

    let newCalendarDays = this.calculareCalendarData(newMonth);
    let newFilteredCalendarEvents = this.state.calendarEvents.filter(
      (event) => event.datetime >= newMonth && event.datetime.getMonth() === newMonth.getMonth()
    );

    this.setState({
      ...this.state,
      calendarDays: newCalendarDays,
      selectedMonth: newMonth,
      isCurrentMonth:
        thisMonth.getFullYear() === newMonth.getFullYear() && thisMonth.getMonth() === newMonth.getMonth(),
      filteredCalendarEvents: newFilteredCalendarEvents,
    });

    console.log(newMonth);
  }

  handleTodayClicked() {
    const today = new Date();

    let newCalendarDays = this.calculareCalendarData(today);
    newCalendarDays = newCalendarDays.map((day, idx) => {
      day.isSelected = day.isToday;
      return day;
    });

    let newFilteredCalendarEvents = this.state.calendarEvents.filter(
      (event) => event.datetime >= today && event.datetime.getMonth() === today.getMonth()
    );

    this.setState({
      ...this.state,
      calendarDays: newCalendarDays,
      selectedMonth: today,
      isCurrentMonth: true,
      filteredCalendarEvents: newFilteredCalendarEvents,
    });

    console.log(this.state);
  }

  handleDayClicked(dayIdx: number) {
    console.log(`Selecting day with index ${dayIdx}`);
    console.log(this.state.calendarDays[dayIdx]);

    const selectedDay = new Date(this.state.calendarDays[dayIdx].date);
    console.log(selectedDay);

    if (this.state.calendarDays[dayIdx].isPrevMonth) {
      this.handlePrevMonthClicked();
    } else if (this.state.calendarDays[dayIdx].isNextMonth) {
      this.handleNextMonthClicked();
    } else {
      const newCalendarDays = this.state.calendarDays.map((day, idx) => {
        day.isSelected = idx === dayIdx;
        return day;
      });

      const firstEventAfterDay = this.state.filteredCalendarEvents.find((event) => event.datetime > selectedDay);

      if (firstEventAfterDay) {
        for (let idx = 0; idx < this.eventListRef.length; ++idx) {
          if (idx == firstEventAfterDay.id - 1) {
            this.eventListRef[idx].current?.classList.add("animate-focus-fade-out");
            this.eventListRef[idx].current?.scrollIntoView({
              behavior: "smooth",
              inline: "start",
              block: "nearest",
            });
          } else {
            this.eventListRef[idx].current?.classList.remove("animate-focus-fade-out");
          }
        }
      }

      this.setState({
        ...this.state,
        calendarDays: newCalendarDays,
      });
    }
  }

  handleShowDetailsClicked(eventIdx: number) {
    console.log(eventIdx);
    this.setState({
      ...this.state,
      selectedCalendarEvent: this.state.filteredCalendarEvents[eventIdx],
      showDetails: true,
    });
  }

  handleCloseClicked() {
    this.setState({
      showDetails: false,
    });
  }

  render() {
    return (
      <div className="flex flex-col h-sm m-6 md:mx-20 lg:mx-24">
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-16">
          {/* Calendar Widget */}
          <div className="mt-10 text-center lg:col-start-8 lg:col-end-13 lg:row-start-1 lg:mt-9 xl:col-start-9">
            <div className="flex items-center justify-between">
              <div className="font-semibold text-xl pl-4 waving-hand">
                {monthsToString[this.state.selectedMonth.getMonth() % 12]} {this.state.selectedMonth.getFullYear()}
              </div>
              <div className="flex justify-end items-center rounded-md shadow-sm md:items-stretch">
                <button
                  type="button"
                  className="flex items-center justify-center rounded-l-md border border-r-0 border-gray-300 bg-white py-2 pl-3 pr-4 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50 disabled:cursor-not-allowed"
                  disabled={this.state.isCurrentMonth}
                  onClick={this.handlePrevMonthClicked.bind(this)}
                >
                  <span className="sr-only">Vorheriger Monat</span>
                  <ChevronLeftIcon className="h-5 w-5 disabled:opacity-25" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  className="hidden border-t border-b border-gray-300 bg-white px-3.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:relative md:block"
                  onClick={this.handleTodayClicked.bind(this)}
                >
                  Heute
                </button>
                <span className="relative -mx-px h-5 w-px bg-gray-300 md:hidden" />
                <button
                  type="button"
                  className="flex items-center justify-center rounded-r-md border border-l-0 border-gray-300 bg-white py-2 pl-4 pr-3 text-gray-400 hover:text-gray-500 focus:relative md:w-9 md:px-2 md:hover:bg-gray-50"
                  onClick={this.handleNextMonthClicked.bind(this)}
                >
                  <span className="sr-only">Nächster Monat</span>
                  <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
              <div>Mo</div>
              <div>Di</div>
              <div>Mi</div>
              <div>Do</div>
              <div>Fr</div>
              <div>Sa</div>
              <div>So</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {this.state.calendarDays.map((day, dayIdx) => (
                <button
                  key={day.date.toString()}
                  type="button"
                  className={classNames(
                    "hover:bg-gray-100 focus:z-10",
                    day.isCurrentMonth ? "bg-white" : "bg-gray-50",
                    (day.isSelected || day.isToday) && "font-semibold",
                    day.isSelected && "text-white",
                    !day.isSelected && day.isCurrentMonth && !day.isToday && "text-gray-900",
                    !day.isSelected && !day.isCurrentMonth && !day.isToday && "text-gray-400",
                    day.isToday && !day.isSelected && "text-amber-500",
                    dayIdx === 0 && "rounded-tl-lg",
                    dayIdx === 6 && "rounded-tr-lg",
                    dayIdx === this.state.calendarDays.length - 7 && "rounded-bl-lg",
                    dayIdx === this.state.calendarDays.length - 1 && "rounded-br-lg",
                    "disabled:cursor-not-allowed",
                    "flex group"
                  )}
                  onClick={this.handleDayClicked.bind(this, dayIdx)}
                  disabled={
                    this.state.isCurrentMonth &&
                    ((day.date.getMonth() < this.state.selectedMonth.getMonth() &&
                      day.date.getFullYear() === this.state.selectedMonth.getFullYear()) ||
                      day.date.getFullYear() < this.state.selectedMonth.getFullYear())
                  }
                >
                  <div className="flex group bg-blue-00 relative w-full py-1.5 justify-center">
                    {this.state.calendarEvents.find(
                      (event) =>
                        !day.isSelected &&
                        event.datetime.getFullYear() === day.date.getFullYear() &&
                        event.datetime.getMonth() === day.date.getMonth() &&
                        event.datetime.getDate() === day.date.getDate()
                    ) && (
                      <span className="flex h-1 w-1 absolute bottom-[8px]">
                        <span className="animate-ping absolute group-hover:opacity-75 opacity-0 inline-flex h-full w-full rounded-full bg-amber-600 "></span>
                        <span className="relative inline-flex rounded-full h- w-3 bg-amber-400"></span>
                      </span>
                    )}
                    <time
                      dateTime={day.date.toString()}
                      className={classNames(
                        "mx-auto flex h-7 w-7 items-center justify-center rounded-full",
                        day.isSelected && day.isToday && "bg-amber-200",
                        day.isSelected && !day.isToday && "bg-gray-200"
                      )}
                    >
                      {day.date.getDate()}
                    </time>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Event List */}
          {this.state.filteredCalendarEvents.length == 0 ? (
            <div className="flex justify-center text-lg mt-4 max-w-96 lg:col-span-7 xl:col-span-8">
              Aktuell sind noch keine Termine für {monthsToString[this.state.selectedMonth.getMonth() % 12]}{" "}
              {this.state.selectedMonth.getFullYear()} geplant. Schau bald wieder vorbei.
            </div>
          ) : (
            <div className="mt-4 mx-auto max-w-96 lg:max-h-screen lg:overflow-y-auto lg:col-span-7 xl:col-span-8">
              <ol className="divide-y divide-gray-100 text-sm leading-6">
                {this.state.filteredCalendarEvents.map((event, idx) => (
                  <li
                    key={event.id}
                    ref={this.eventListRef[idx]}
                    className="relative flex space-x-6 py-6 xl:static cursor-pointer rounded-xl p-6 bg-white hover:bg-gray-100 focus:bg-gray-100"
                    onClick={() => {
                      this.handleShowDetailsClicked(idx);
                    }}
                  >
                    <img src={event.imageUrl} alt="" className="h-14 w-14 flex-none rounded-full" />
                    <div className="flex-auto">
                      <h3 className="pr-10 font-semibold text-gray-900 xl:pr-0">{event.name}</h3>
                      <dl className="mt-2 flex flex-col text-gray-500 xl:flex-row">
                        <div className="flex items-start space-x-3">
                          <dt className="mt-0.5">
                            <span className="sr-only">Date</span>
                            <CalendarIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </dt>
                          <dd>
                            <time dateTime={event.datetime.toString()}>
                              am {event.date} um {event.time} Uhr
                            </time>
                          </dd>
                        </div>
                        <div className="mt-2 flex items-start space-x-3 xl:mt-0 xl:ml-3.5 xl:border-l xl:border-gray-400 xl:border-opacity-50 xl:pl-3.5">
                          <dt className="mt-0.5">
                            <span className="sr-only">Location</span>
                            <MapPinIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </dt>
                          <dd>{event.location}</dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>

        <Transition appear show={this.state.showDetails} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-10"
            initialFocus={this.eventDetailHeadingRef}
            onClose={this.handleCloseClicked.bind(this)}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-gray-50 p-6 text-left align-middle shadow-xl transition-all">
                    <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                      <button
                        type="button"
                        className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={this.handleCloseClicked.bind(this)}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                    <Dialog.Title
                      as="h3"
                      ref={this.eventDetailHeadingRef}
                      className="text-xl font-bold leading-6 text-gray-900"
                    >
                      {this.state.selectedCalendarEvent && this.state.selectedCalendarEvent.name}
                    </Dialog.Title>
                    <div className="mt-2">
                      <div
                        className="markdown"
                        dangerouslySetInnerHTML={{
                          __html:
                            (this.state.selectedCalendarEvent && this.state.selectedCalendarEvent.description) || "",
                        }}
                      />
                    </div>

                    <div className="flex justify-center mt-4">
                      <button
                        type="button"
                        className="inline-flex justify-center rounded-md border border-transparent bg-amber-100 px-4 py-2 text-sm font-medium text-amber-900 hover:bg-amber-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                        onClick={this.handleCloseClicked.bind(this)}
                      >
                        Close
                      </button>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  }
}

export default Calendar;
