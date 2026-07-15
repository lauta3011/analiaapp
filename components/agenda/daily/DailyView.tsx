import React, { useMemo } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DateNavigation } from '@/components/agenda/common/DateNavigation';
import { HourRow } from './HourRow';
import { COLORS, HOURS_START, HOURS_END, CALENDAR_LOCALE } from '@/constants';
import { Appointment } from '@/types';

interface DailyViewProps {
    currentDate: Date;
    selectedDate: string;
    items: Record<string, Appointment[]>;
    onPrevDay: () => void;
    onNextDay: () => void;
    onToday: () => void;
    onDeleteAppointment: (id: number, date: string) => void;
    onAddAppointment: (hour: number) => void;
}

const DAY_NAMES = CALENDAR_LOCALE.config.dayNames;
const MONTH_NAMES = CALENDAR_LOCALE.config.monthNames;

export const DailyView = ({
    currentDate,
    selectedDate,
    items,
    onPrevDay,
    onNextDay,
    onToday,
    onDeleteAppointment,
    onAddAppointment,
}: DailyViewProps) => {
    const dayAppointments = useMemo(() => {
        return items[selectedDate] || [];
    }, [items, selectedDate]);

    const appointmentsByHour = useMemo(() => {
        const map: Record<number, Appointment[]> = {};
        for (let h = HOURS_START; h <= HOURS_END; h++) {
            map[h] = [];
        }
        dayAppointments.forEach((apt) => {
            if (apt.time) {
                const hour = parseInt(apt.time.substring(0, 2), 10);
                if (hour >= HOURS_START && hour <= HOURS_END && map[hour]) {
                    map[hour].push(apt);
                }
            }
        });
        return map;
    }, [dayAppointments]);

    const dayOfWeek = DAY_NAMES[currentDate.getDay()];
    const monthName = MONTH_NAMES[currentDate.getMonth()];
    const navLabel = `${dayOfWeek} ${currentDate.getDate()} ${monthName}`;

    const hours: number[] = [];
    for (let h = HOURS_START; h <= HOURS_END; h++) {
        hours.push(h);
    }

    return (
        <ScrollView style={styles.container}>
            <DateNavigation
                label={navLabel}
                onPrev={onPrevDay}
                onNext={onNextDay}
                onToday={onToday}
            />
            {hours.map((hour) => (
                <HourRow
                    key={hour}
                    hour={hour}
                    appointments={appointmentsByHour[hour]}
                    onDeleteAppointment={onDeleteAppointment}
                    onAddAppointment={onAddAppointment}
                />
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
