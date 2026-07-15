import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useAppointmentStore } from '@/store/appointments';
import FloatingButton from '@/components/atoms/FloatingButton';
import Toast from 'react-native-toast-message';
import ToastConfig from '@/components/atoms/ToastConfig';
import { ModalForm } from '@/components/forms/ModalForm';
import { AppointmentForm } from '@/components/forms/AppointmentForm';
import { COLORS, VIEW_MODES } from '@/constants';

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

export default function AgendaScreen() {
    const items = useAppointmentStore((s) => s.items);
    const selected = useAppointmentStore((s) => s.selected);
    const loadItemsForMonth = useAppointmentStore((s) => s.loadItemsForMonth);
    const loadItemsForDateRange = useAppointmentStore((s) => s.loadItemsForDateRange);
    const deleteAppointment = useAppointmentStore((s) => s.deleteAppointment);
    const setSelected = useAppointmentStore((s) => s.setSelected);

    const [modalVisible, setModalVisible] = useState(false);
    const [activeView, setActiveView] = useState<ViewMode>(VIEW_MODES.DAILY);
    const [currentDate, setCurrentDate] = useState(() => new Date());

    const getWeekStart = (date: Date): Date => {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1);
        d.setDate(diff);
        d.setHours(0, 0, 0, 0);
        return d;
    };

    const initialLoadDone = useRef(false);

    useEffect(() => {
        if (!initialLoadDone.current) {
            initialLoadDone.current = true;
            const now = new Date();
            loadItemsForMonth(now.getFullYear(), now.getMonth() + 1);
        }
    }, []);

    useEffect(() => {
        const now = new Date();
        const currentMonth = now.getMonth() + 1;
        const currentYear = now.getFullYear();

        if (activeView === VIEW_MODES.MONTHLY) {
            loadItemsForMonth(currentDate.getFullYear(), currentDate.getMonth() + 1);
        } else if (activeView === VIEW_MODES.WEEKLY) {
            const weekStart = getWeekStart(currentDate);
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekEnd.getDate() + 6);
            loadItemsForDateRange(toDateStr(weekStart), toDateStr(weekEnd));
        }
    }, [activeView, currentDate]);

    const handleDayPress = useCallback((date: string) => {
        setSelected(date);
        setCurrentDate(new Date(date + 'T12:00:00'));
        setActiveView(VIEW_MODES.DAILY);
    }, []);

    const handleDelete = useCallback(async (id: number, date: string) => {
        deleteAppointment(id, date);
    }, []);

    const handleAddAtHour = useCallback((hour: number) => {
        const time = `${hour.toString().padStart(2, '0')}:00`;
        setModalVisible(true);
    }, []);

    const goToToday = useCallback(() => {
        setCurrentDate(new Date());
        setSelected(toDateStr(new Date()));
    }, []);

    const goToPrevMonth = useCallback(() => {
        setCurrentDate((prev) => {
            const d = new Date(prev);
            d.setMonth(d.getMonth() - 1);
            return d;
        });
    }, []);

    const goToNextMonth = useCallback(() => {
        setCurrentDate((prev) => {
            const d = new Date(prev);
            d.setMonth(d.getMonth() + 1);
            return d;
        });
    }, []);

    const goToPrevDay = useCallback(() => {
        setCurrentDate((prev) => {
            const d = new Date(prev);
            d.setDate(d.getDate() - 1);
            setSelected(toDateStr(d));
            return d;
        });
    }, []);

    const goToNextDay = useCallback(() => {
        setCurrentDate((prev) => {
            const d = new Date(prev);
            d.setDate(d.getDate() + 1);
            setSelected(toDateStr(d));
            return d;
        });
    }, []);

    const goToPrevWeek = useCallback(() => {
        setCurrentDate((prev) => {
            const d = new Date(prev);
            d.setDate(d.getDate() - 7);
            return d;
        });
    }, []);

    const goToNextWeek = useCallback(() => {
        setCurrentDate((prev) => {
            const d = new Date(prev);
            d.setDate(d.getDate() + 7);
            return d;
        });
    }, []);

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
                <FloatingButton handleAction={() => setModalVisible(true)} />
            </View>

            {modalVisible && (
                <ModalForm handleHide={() => setModalVisible(false)}>
                    <AppointmentForm
                        handleHide={() => setModalVisible(false)}
                        selectedDate={selected}
                    />
                </ModalForm>
            )}

            <Toast config={ToastConfig} visibilityTime={4000} />
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
