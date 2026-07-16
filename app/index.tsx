import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppointmentStore } from '@/store/appointments';
import FloatingButton from '@/components/atoms/FloatingButton';
import { COLORS, VIEW_MODES } from '@/constants';
import { useModalStore } from '@/store/modal';

type ViewMode = typeof VIEW_MODES[keyof typeof VIEW_MODES];
import { ViewSwitcher } from '@/components/agenda/common/ViewSwitcher';
import { MonthlyView } from '@/components/agenda/monthly/MonthlyView';
import { DailyView } from '@/components/agenda/daily/DailyView';
import { WeeklyView } from '@/components/agenda/weekly/WeeklyView';

const toDateStr = (d: Date): string => {
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
};

const offsetDate = (dateStr: string, days: number): string => {
    const d = new Date(dateStr + 'T12:00:00');
    d.setDate(d.getDate() + days);
    return toDateStr(d);
};

const offsetMonth = (dateStr: string, months: number): string => {
    const d = new Date(dateStr + 'T12:00:00');
    d.setMonth(d.getMonth() + months);
    return toDateStr(d);
};

const getWeekStart = (dateStr: string): Date => {
    const d = new Date(dateStr + 'T12:00:00');
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    d.setDate(diff);
    d.setHours(0, 0, 0, 0);
    return d;
};

export default function AgendaScreen() {
    const items = useAppointmentStore((s) => s.items);
    const selected = useAppointmentStore((s) => s.selected);
    const loadItemsForMonth = useAppointmentStore((s) => s.loadItemsForMonth);
    const loadItemsForDateRange = useAppointmentStore((s) => s.loadItemsForDateRange);
    const deleteAppointment = useAppointmentStore((s) => s.deleteAppointment);
    const setSelected = useAppointmentStore((s) => s.setSelected);

    const openModal = useModalStore((s) => s.openModal);

    const [activeView, setActiveView] = useState<ViewMode>(VIEW_MODES.DAILY);

    const currentDate = useMemo(() => new Date(selected + 'T12:00:00'), [selected]);

    const initialLoadDone = useRef(false);

    useEffect(() => {
        if (!initialLoadDone.current) {
            initialLoadDone.current = true;
            const now = new Date();
            loadItemsForMonth(now.getFullYear(), now.getMonth() + 1);
        }
    }, []);

    useEffect(() => {
        if (activeView === VIEW_MODES.MONTHLY || activeView === VIEW_MODES.DAILY) {
            loadItemsForMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
        } else if (activeView === VIEW_MODES.WEEKLY) {
            const weekStart = getWeekStart(selected);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            loadItemsForDateRange(toDateStr(weekStart), toDateStr(weekEnd));
        }
    }, [activeView, currentDate]);

    const handleDayPress = useCallback((date: string) => {
        if (date === selected) {
            setActiveView(VIEW_MODES.DAILY);
        } else {
            setSelected(date);
        }
    }, [selected]);

    const handleDelete = useCallback(async (id: number, date: string) => {
        deleteAppointment(id, date);
    }, []);

    const handleAddAtHour = useCallback((hour: number) => {
        openModal('appointment-form', { selectedDate: selected, initialHour: hour });
    }, [selected]);

    const goToToday = useCallback(() => {
        setSelected(toDateStr(new Date()));
    }, []);

    const goToPrevMonth = useCallback(() => {
        setSelected(offsetMonth(selected, -1));
    }, [selected]);

    const goToNextMonth = useCallback(() => {
        setSelected(offsetMonth(selected, 1));
    }, [selected]);

    const goToPrevDay = useCallback(() => {
        setSelected(offsetDate(selected, -1));
    }, [selected]);

    const goToNextDay = useCallback(() => {
        setSelected(offsetDate(selected, 1));
    }, [selected]);

    const goToPrevWeek = useCallback(() => {
        setSelected(offsetDate(selected, -7));
    }, [selected]);

    const goToNextWeek = useCallback(() => {
        setSelected(offsetDate(selected, 7));
    }, [selected]);

    return (
        <View style={styles.container}>
            <ViewSwitcher activeView={activeView} onViewChange={setActiveView} />

            <View style={styles.content}>
                {activeView === VIEW_MODES.MONTHLY && (
                    <MonthlyView
                        currentDate={currentDate}
                        selectedDate={selected}
                        items={items}
                        onPrevMonth={goToPrevMonth}
                        onNextMonth={goToNextMonth}
                        onToday={goToToday}
                        onDayPress={handleDayPress}
                    />
                )}

                {activeView === VIEW_MODES.DAILY && (
                    <DailyView
                        currentDate={currentDate}
                        selectedDate={selected}
                        items={items}
                        onPrevDay={goToPrevDay}
                        onNextDay={goToNextDay}
                        onToday={goToToday}
                        onDeleteAppointment={handleDelete}
                        onAddAppointment={handleAddAtHour}
                    />
                )}

                {activeView === VIEW_MODES.WEEKLY && (
                    <WeeklyView
                        currentDate={currentDate}
                        selectedDate={selected}
                        items={items}
                        onPrevWeek={goToPrevWeek}
                        onNextWeek={goToNextWeek}
                        onToday={goToToday}
                        onDeleteAppointment={handleDelete}
                    />
                )}
            </View>

            <View style={styles.fabContainer}>
                <FloatingButton handleAction={() => openModal('appointment-form', { selectedDate: selected, initialHour: null })} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    content: {
        flex: 1,
    },
    fabContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
});
