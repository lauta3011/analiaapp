import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { DateNavigation } from '@/components/agenda/common/DateNavigation';
import { WeekDayHeader } from '@/components/agenda/common/WeekDayHeader';
import { DayCell } from './DayCell';
import { COLORS, CALENDAR_LOCALE } from '@/constants';
import { Appointment } from '@/types';

interface MonthlyViewProps {
    currentDate: Date;
    selectedDate: string;
    items: Record<string, Appointment[]>;
    onPrevMonth: () => void;
    onNextMonth: () => void;
    onToday: () => void;
    onDayPress: (date: string) => void;
}

const MONTH_NAMES = CALENDAR_LOCALE.config.monthNames;

interface GridCell {
    day: number;
    year: number;
    month: number;
}

const generateMonthGrid = (year: number, month: number): (GridCell | null)[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const grid: (GridCell | null)[] = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevMonthYear = month === 0 ? year - 1 : year;
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        grid.push({ day: prevMonthLastDay - i, year: prevMonthYear, month: prevMonth });
    }

    for (let d = 1; d <= daysInMonth; d++) {
        grid.push({ day: d, year, month });
    }

    const nextMonth = month === 11 ? 0 : month + 1;
    const nextMonthYear = month === 11 ? year + 1 : year;
    const remaining = 42 - grid.length;
    for (let d = 1; d <= remaining; d++) {
        grid.push({ day: d, year: nextMonthYear, month: nextMonth });
    }

    return grid;
};

const toDateStr = (year: number, month: number, day: number): string => {
    const m = (month + 1).toString().padStart(2, '0');
    const d = day.toString().padStart(2, '0');
    return `${year}-${m}-${d}`;
};

export const MonthlyView = ({
    currentDate,
    selectedDate,
    items,
    onPrevMonth,
    onNextMonth,
    onToday,
    onDayPress,
}: MonthlyViewProps) => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const grid = useMemo(() => generateMonthGrid(year, month), [year, month]);

    const todayStr = useMemo(() => {
        const d = new Date();
        return toDateStr(d.getFullYear(), d.getMonth(), d.getDate());
    }, []);

    const weeks = useMemo(() => {
        const result: (GridCell | null)[][] = [];
        for (let i = 0; i < grid.length; i += 7) {
            result.push(grid.slice(i, i + 7));
        }
        return result;
    }, [grid]);

    return (
        <View style={styles.container}>
            <DateNavigation
                label={`${MONTH_NAMES[month]} ${year}`}
                onPrev={onPrevMonth}
                onNext={onNextMonth}
                onToday={onToday}
            />
            <WeekDayHeader />
            <View style={styles.grid}>
                {weeks.map((week, weekIndex) => (
                    <View key={weekIndex} style={styles.row}>
                        {week.map((cell, dayIndex) => {
                            if (cell === null) return <View key={dayIndex} style={styles.cell} />;

                            const isCurrentMonth = cell.year === year && cell.month === month;
                            const dateStr = toDateStr(cell.year, cell.month, cell.day);
                            const isToday = dateStr === todayStr;
                            const isSelected = dateStr === selectedDate;
                            const appointments = items[dateStr] || [];

                            return (
                                <DayCell
                                    key={dayIndex}
                                    day={cell.day}
                                    date={dateStr}
                                    isCurrentMonth={isCurrentMonth}
                                    isToday={isToday}
                                    isSelected={isSelected}
                                    appointments={appointments}
                                    onPress={onDayPress}
                                />
                            );
                        })}
                    </View>
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    grid: {
        paddingHorizontal: 8,
    },
    row: {
        flexDirection: 'row',
    },
    cell: {
        flex: 1,
    },
});
