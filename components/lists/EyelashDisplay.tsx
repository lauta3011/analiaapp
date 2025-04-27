import React from 'react';
import { EYELASHES_MAP } from '@/constants/eyelashes';
import { ColorValue, Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';

type ImageKey = keyof typeof EYELASHES_MAP;

export const EyelashDisplay = (props: any) => {
    const selected: ImageKey = props.selected;
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ultimo trabajo</Text>
            <Text style={styles.text}>se muestra la informacion guardada de la ultia sesion con el cliente</Text>
            <Image
              style={styles.image}
              source={EYELASHES_MAP[selected]}
              resizeMode="contain"
            />
            {props.paths && <Svg>
                {props.paths.map(({path, color: c, stroke: s}: any, i: number) => {
                return (
                    <Path
                    key={i}
                    d={`${path.join(' ')}`}
                    fill="none"
                    strokeWidth={`${s}px`}
                    stroke={c as ColorValue}
                    />
                );
                })}
            </Svg>}
            <Button onPress={() => props.handleAddEyelash()} style={styles.button} mode='contained'>nuevo trabajo</Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    title: {
        fontSize: 26,
        textAlign: 'center',
        marginVertical: 5
    },
    text: {
        fontStyle: "italic", 
        textAlign: 'center',
        color: 'grey', 
        padding: 5
    },
    image: {
        marginVertical: 25
    },
    button: {
        width: '80%'
    }
})