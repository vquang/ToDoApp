import { eachDayOfInterval, endOfMonth, format, getDay, isToday, startOfMonth, } from 'date-fns'

const Calendar = ({ date, handlePickDate }) => {

    // state
    const WEEK_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const days = eachDayOfInterval({
        start: startOfMonth(date),
        end: endOfMonth(date),
    });
    const startDayIndex = getDay(startOfMonth(date));

    // handle
    const clickCalendar = (value) => {
        handlePickDate(value);
    };
    const equals = (value) => {
        if (date && value) {
            date.setHours(0, 0, 0, 0);
            value.setHours(0, 0, 0, 0);
            return date.getTime() === value.getTime();
        }
    };


    return (
        <div className="p-2
        flex flex-col gap-1 rounded border-2 border-sky-400
        shadow-lg shadow-sky-400">
            <div className="flex justify-center font-bold text-sky-900 text-lg">
                {date && date.toLocaleString('en-US', { month: 'long' })}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {WEEK_DAYS.map((d, index) =>
                (<div key={index} className="border-b-2 border-sky-900 text-sky-900 text-base
                flex justify-center">
                    {d}
                </div>))}
            </div>
            <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: startDayIndex }).map((_, index) => (
                    <div key={`empty-${index}`} className="rounded p-1 flex justify-center"></div>
                ))}

                {days.map((d, index) => (
                    <div key={index} className={`text-sky-900 text-base rounded p-1 
                        flex justify-center cursor-pointer
                    hover:bg-sky-900 hover:text-sky-100
                    ${equals(d) && 'bg-sky-900 text-white'}
                    ${isToday(d) && 'bg-rose-700 text-white'}`}
                        onClick={() => clickCalendar(d)}>
                        {format(d, 'd')}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Calendar;