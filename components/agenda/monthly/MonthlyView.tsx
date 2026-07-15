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

const generateMonthGrid = (year: number, month: number): (number | null)[] => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const grid: (number | null)[] = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
        grid.push(prevMonthLastDay - i);
    }

    for (let d = 1; d <= daysInMonth; d++) {
        grid.push(d);
    }

    const remaining = 42 - grid.length;
    for (let d = 1; d <= remaining; d++) {
        grid.push(d);
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
        const result: (number | null)[][] = [];
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
                        {week.map((day, dayIndex) => {
                            if (day === null) return <View key={dayIndex} style={styles.cell} />;

                            const isCurrentMonth = day >= 1 && day <= new Date(year, month + 1, 0).getDate();
                            const dateStr = toDateStr(year, month, day);
                            const isToday = dateStr === todayStr;
                            const isSelected = dateStr === selectedDate;
                            const appointments = items[dateStr] || [];

                            return (
                                <DayCell
                                    key={dayIndex}
                                    day={day}
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
