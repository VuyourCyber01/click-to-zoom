"use strict";
const dates = [
    {
        day: 30,
        full: "2022-01-30"
    },
    {
        day: 31,
        full: "2022-01-31"
    },
    {
        day: 1,
        full: "2022-02-01",
        title: "Dark Chocolate Day"
    }, {
        day: 2,
        full: "2022-02-02",
        title: "Groundhog Day",
    }, {
        day: 3,
        full: "2022-02-03",
        title: "Carrot Cake Day",
    }, {
        day: 4,
        full: "2022-02-04",
        title: "Wear Red Day",
    }, {
        day: 5,
        full: "2022-02-05",
        title: "Weatherperson's Day",
    }, {
        day: 6,
        full: "2022-02-06",
        title: "Chopsticks Day",
    }, {
        day: 7,
        full: "2022-02-07",
        title: "Periodic Table Day",
    }, {
        day: 8,
        full: "2022-02-08",
        title: "Kite Flying Day",
    }, {
        day: 9,
        full: "2022-02-09",
        title: "Pizza Day",
    }, {
        day: 10,
        full: "2022-02-10",
        title: "Umbrella Day",
    }, {
        day: 11,
        full: "2022-02-11",
        title: "Inventor's Day",
    }, {
        day: 12,
        full: "2022-02-12",
        title: "Global Movie Day",
    }, {
        day: 13,
        full: "2022-02-13",
        title: "Tortellini Day",
    }, {
        day: 14,
        full: "2022-02-14",
        title: "Valentine's Day",
    }, {
        day: 15,
        full: "2022-02-15",
        title: "Gumdrop Day",
    }, {
        day: 16,
        full: "2022-02-16",
        title: "Do a Grouch a Favor Day",
    }, {
        day: 17,
        full: "2022-02-17",
        title: "Cabbage Day",
    }, {
        day: 18,
        full: "2022-02-18",
        title: "Battery Day",
    }, {
        day: 19,
        full: "2022-02-19",
        title: "Chocolate Mint Day",
    }, {
        day: 20,
        full: "2022-02-20",
        title: "Love Your Pet Day",
    }, {
        day: 21,
        full: "2022-02-21",
        title: "President's Day",
    }, {
        day: 22,
        full: "2022-02-22",
        title: "Cook a Sweet Potato Day",
    }, {
        day: 23,
        full: "2022-02-23",
        title: "Tile Day",
    }, {
        day: 24,
        full: "2022-02-24",
        title: "Toast Day",
    }, {
        day: 25,
        full: "2022-02-25",
        title: "Clam Chowder Day",
    }, {
        day: 26,
        full: "2022-02-26",
        title: "Pistachio Day",
    }, {
        day: 27,
        full: "2022-02-27",
        title: "Polar Bear Day",
    }, {
        day: 28,
        full: "2022-02-28",
        title: "Tooth Fairy Day",
    },
    {
        day: 1,
        full: "2022-03-01"
    }, {
        day: 2,
        full: "2022-03-02"
    }, {
        day: 3,
        full: "2022-03-03"
    }, {
        day: 4,
        full: "2022-03-04"
    }, {
        day: 5,
        full: "2022-03-05"
    }
].map((date, index) => (Object.assign(Object.assign({}, date), { index })));
const weekdays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday"
];
const DateUtility = {
    getAllDates: () => dates,
    getDayOfWeek: (day) => DateUtility.getWeekdays()[day],
    getWeekdays: () => weekdays
};
const TransformUtility = {
    calculateX: (index, calendarWidth, boxSize, scale, gridGap) => {
        const startingColumnIndex = 3, startingXPercent = -50;
        const columnIndex = index % 7, columnIndexDiff = columnIndex - startingColumnIndex;
        const xPaddingPercent = ((gridGap * columnIndexDiff) / calendarWidth) * 100, xWidthPercent = ((columnIndexDiff * boxSize) / calendarWidth) * 100, xPercent = xPaddingPercent + xWidthPercent;
        return startingXPercent - (xPercent * scale);
    },
    calculateY: (index, calendarHeight, boxSize, scale, gridGap) => {
        const startingRowIndex = 2, startingYPercent = -50;
        const rowIndex = Math.floor(index / 7), rowIndexDiff = rowIndex - startingRowIndex;
        const yPaddingPercent = ((gridGap * rowIndexDiff) / calendarHeight) * 100, yHeightPercent = ((rowIndexDiff * boxSize) / calendarHeight) * 100, yPercent = yPaddingPercent + yHeightPercent;
        return startingYPercent - (yPercent * scale);
    },
    getGridGap: () => {
        const calendar = document.getElementById("calendar-dates");
        if (calendar) {
            const style = window.getComputedStyle(calendar);
            return style.getPropertyValue("gap");
        }
    }
};
const DateBox = (props) => {
    const today = new Date("2022-02-01T12:00:00"), date = new Date(`${props.full}T12:00:00`);
    const activeMonth = today.getMonth() === date.getMonth(), activeDay = activeMonth && today.getDate() === date.getDate();
    const getTitle = () => {
        if (props.title) {
            return (React.createElement("div", { className: "date-title" },
                React.createElement("div", { className: "date-title-dot" }),
                React.createElement("h2", null, props.title)));
        }
    };
    const getActiveDayIndicator = () => {
        if (activeDay) {
            return (React.createElement("div", { className: "active-day-indicator" }));
        }
    };
    const getClasses = () => {
        return classNames("date-wrapper", {
            "active-day": activeDay,
            "active-month": activeMonth
        });
    };
    const id = `date-${props.full}`;
    return (React.createElement("button", { id: id, className: getClasses(), disabled: !activeMonth, onClick: props.select },
        React.createElement("div", { className: "date" },
            React.createElement("div", { className: "date-day" },
                React.createElement("h2", { className: "date-day-of-month" }, date.getDate()),
                React.createElement("h2", { className: "date-day-of-week" }, DateUtility.getDayOfWeek(date.getDay()).substring(0, 3))),
            getTitle()),
        getActiveDayIndicator()));
};
const Calendar = () => {
    const [state, setStateTo] = React.useState({
        boxSize: null,
        calendarSize: null,
        selectedDate: null,
        windowSize: null
    });
    const ref = React.useRef(null);
    const setBoxSizeTo = (boxSize) => {
        setStateTo(Object.assign(Object.assign({}, state), { boxSize }));
    };
    const setCalendarSizeTo = (calendarSize) => {
        setStateTo(Object.assign(Object.assign({}, state), { calendarSize }));
    };
    const setSelectedDateTo = (selectedDate) => {
        setStateTo(Object.assign(Object.assign({}, state), { selectedDate }));
    };
    React.useEffect(() => {
        if (ref) {
            const box = document.getElementById("date-2022-02-01");
            const boxSize = {
                height: box.clientHeight,
                width: box.clientWidth
            };
            const calendarSize = {
                height: ref.current.clientHeight,
                width: ref.current.clientWidth
            };
            setStateTo(Object.assign(Object.assign({}, state), { boxSize, calendarSize }));
        }
    }, [state.windowSize]);
    React.useEffect(() => {
        const handleOnResize = () => {
            const windowSize = {
                height: window.innerHeight,
                width: window.innerWidth
            };
            setStateTo(Object.assign(Object.assign({}, state), { selectedDate: null, windowSize }));
        };
        handleOnResize();
        window.addEventListener("resize", handleOnResize);
        return () => {
            window.removeEventListener("resize", handleOnResize);
        };
    }, []);
    const selectDate = (date) => {
        if (state.windowSize && state.windowSize.width > 1000) {
            if (state.selectedDate && state.selectedDate.full === date.full) {
                setSelectedDateTo(null);
            }
            else {
                setSelectedDateTo(date);
            }
        }
    };
    const getDates = () => {
        return dates.map((date) => {
            return (React.createElement(DateBox, { key: date.full, day: date.day, full: date.full, title: date.title, selected: state.selectedDate && state.selectedDate.full === date.full, select: () => selectDate(date) }));
        });
    };
    const getStyles = () => {
        const styles = {};
        const { calendarSize, boxSize, selectedDate } = state;
        if (calendarSize && boxSize && selectedDate) {
            const scale = 4, gridGap = parseInt(TransformUtility.getGridGap());
            const x = TransformUtility.calculateX(selectedDate.index, calendarSize.width, boxSize.width, scale, gridGap), y = TransformUtility.calculateY(selectedDate.index, calendarSize.height, boxSize.height, scale, gridGap);
            styles.transform = `translate(${x}%, ${y}%) scale(${scale})`;
        }
        return styles;
    };
    return (React.createElement("div", { id: "calendar" },
        React.createElement("div", { ref: ref, id: "calendar-dates", style: getStyles() }, getDates())));
};
const Background = () => {
    return (React.createElement("div", { id: "calendar-background-wrapper" },
        React.createElement("div", { id: "calendar-background" })));
};
const App = () => {
    return (React.createElement("div", { id: "app" },
        React.createElement(Background, null),
        React.createElement(Calendar, null)));
};
ReactDOM.render(React.createElement(App, null), document.getElementById("root"));