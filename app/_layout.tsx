import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Stack, useRouter, usePathname } from 'expo-router';
import { IconButton } from 'react-native-paper';
import { COLORS } from '@/constants';
import { AppModal } from '@/components/modals/AppModal';
import Toast from 'react-native-toast-message';
import ToastConfig from '@/components/atoms/ToastConfig';

const RootLayout = () => {
    const router = useRouter();
    const pathname = usePathname();

    const isIndex = pathname === '/';
    const isNames = pathname.startsWith('/names');
    const isDress = pathname.startsWith('/dress');

    return (
        <View style={styles.root}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={[styles.navButton, isIndex && styles.navButtonActive]}
                    onPress={() => router.push('/')}
                >
                    <View style={styles.iconWrapper}>
                        <IconButton
                            icon="calendar"
                            iconColor={isIndex ? '#fff' : COLORS.primaryLight}
                            size={28}
                            onPress={() => router.push('/')}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navButton, isNames && styles.navButtonActive]}
                    onPress={() => router.push('/names')}
                >
                    <View style={styles.iconWrapper}>
                        <IconButton
                            icon="account-group"
                            iconColor={isNames ? '#fff' : COLORS.primaryLight}
                            size={28}
                            onPress={() => router.push('/names')}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.navButton, isDress && styles.navButtonActive]}
                    onPress={() => router.push('/dress')}
                >
                    <View style={styles.iconWrapper}>
                        <IconButton
                            icon="hanger"
                            iconColor={isDress ? '#fff' : COLORS.primaryLight}
                            size={28}
                            onPress={() => router.push('/dress')}
                        />
                    </View>
                </TouchableOpacity>
            </View>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#fff' },
                }}
            />
            <AppModal />
            <Toast config={ToastConfig} visibilityTime={4000} />
        </View>
    );
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        backgroundColor: COLORS.primary,
        paddingVertical: 23,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    navButton: {
        borderRadius: 20,
    },
    navButtonActive: {
        backgroundColor: COLORS.primary,
    },
    iconWrapper: {
        paddingHorizontal: 12,
    },
});

export default RootLayout;
