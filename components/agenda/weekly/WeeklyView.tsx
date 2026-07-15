import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { DateNavigation } from '@/components/agenda/common/DateNavigation';
import { DayColumn } from './DayColumn';
import { COLORS, CALENDAR_LOCALE } from '@/constants';
import { Appointment } from '@/types';

interface WeeklyViewProps {
    currentDate: Date;
    selectedDate: string;
    items: Record<string, Appointment[]>;
    onPrevWeek: () => void;
    onNextWeek: () => void;
    onToday: () => void;
    onDeleteAppointment: (id: number, date: string) => void;
}

const SHORT_DAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTH_NAMES = CALENDAR_LOCALE.config.monthNames;

const getWeekStart = (date: Date): Date => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
};

const toDateStr = (d: Date): string => {
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const WeeklyView = ({
    currentDate,
    selectedDate,
    items,
    onPrevWeek,
    onNextWeek,
    onToday,
    onDeleteAppointment,
}: WeeklyViewProps) => {
    const todayStr = useMemo(() => toDateStr(new Date()), []);

    const weekDates = useMemo(() => {
        const start = getWeekStart(currentDate);
        const dates: Date[] = [];
        for (let i = 0; i < 7; i++) {
            const d = new Date(start);
            d.setDate(start.getDate() + i);
            dates.push(d);
        }
        return dates;
    }, [currentDate]);

    const weekLabel = useMemo(() => {
        const first = weekDates[0];
        const last = weekDates[6];
        const sameMonth = first.getMonth() === last.getMonth();
        if (sameMonth) {
            return `${first.getDate()} - ${last.getDate()} ${MONTH_NAMES[first.getMonth()]} ${first.getFullYear()}`;
        }
        return `${first.getDate()} ${MONTH_NAMES[first.getMonth()]} - ${last.getDate()} ${MONTH_NAMES[last.getMonth()]}`;
    }, [weekDates]);

    return (
        <View style={styles.container}>
            <DateNavigation
                label={weekLabel}
                onPrev={onPrevWeek}
                onNext={onNextWeek}
                onToday={onToday}
            />
            <View style={styles.columns}>
                {weekDates.map((date, index) => {
                    const dateStr = toDateStr(date);
                    return (
                        <DayColumn
                            key={index}
                            dayName={SHORT_DAYS[date.getDay()]}
                            dayNumber={date.getDate()}
                            date={dateStr}
                            isToday={dateStr === todayStr}
                            appointments={items[dateStr] || []}
                            onDeleteAppointment={onDeleteAppointment}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    columns: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 4,
    },
});
