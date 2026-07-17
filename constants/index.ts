export const ALLERGY_INFO = {
    TITLE: 'Alergias',
    SUB_TEXT: 'ya sea a productos basado en experiencias pasadas o reacciones alergicas que consideres relevantes',
    TYPE: 'allergy',
    LABEL: 'alergia'
}
export const  CHARACTERISTIC_INFO = {
    TITLE: 'Caracteristicas',
    SUB_TEXT: 'uso de lentes, productos para los ojo, medicacion especial o cualquier cosa que sea importante saber',
    TYPE: 'characteristic',
    LABEL: 'caracteristica'
}

export const CALENDAR_LOCALE = {
    code: 'es',
    config: {
        monthNames: [
            'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
            'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
        ],
        monthNamesShort: [
            'Ene.', 'Feb.', 'Mar.', 'Abr.', 'May.', 'Jun.',
            'Jul.', 'Ago.', 'Sep.', 'Oct.', 'Nov.', 'Dic.'
        ],
        dayNames: [
            'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'
        ],
        dayNamesShort: ['Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.'],
        today: 'Hoy'
    }
}

export const CALENDAR_THEME = {
    agendaDayTextColor: '#c8778a',
    agendaDayNumColor: '#c8778a',
    agendaTodayColor: '#c73e3e',
    agendaKnobColor: '#c8778a',
    dotColor: '#c8778a',
    selectedDayBackgroundColor: '#c8778a',
    todayTextColor: '#c73e3e',
    arrowColor: '#c8778a',
}

export const COLORS = {
    primary: '#c8778a',
    primaryLight: '#f2d5da',
    primaryDark: '#e8b6c2',
    error: '#c73e3e',
    success: '#3cba9f',
    text: '#8a5060',
    textSecondary: '#666',
    textMuted: '#888',
    background: '#fdf0f3',
}

export const PINK_GRADIENT = [
    '#fff',
    '#f9e4ea',
    '#f2d5da',
    '#e8b6c2',
    '#d9979e',
    '#c8778a',
];

export const HOURS_START = 6;
export const HOURS_END = 22;

export const VIEW_MODES = {
    DAILY: 'daily',
    WEEKLY: 'weekly',
    MONTHLY: 'monthly',
} as const;

export const DRESS_SWITCH_MODES = {
    ALL: 'all',
    RENTED: 'rented',
} as const;