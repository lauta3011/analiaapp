import React from 'react';
import { EYELASHES_MAP } from '@/constants/eyelashes';
import { ColorValue, Image, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import Svg, { Path } from 'react-native-svg';

type ImageKey = keyof typeof EYELASHES_MAP;

export const EyelashDisplay = (props: any) => {
    const drawing = props.drawing;
    const selected: ImageKey = props.selected;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ultima sesion</Text>
            <Text style={styles.text}>de tener informacion guardada de la ultima sesion con el cliente se mostrara aqui y podras actualizarla o agregar nueva info en caso de ser la primera vez</Text>
            
            <View style={styles.innerContainer}>
                <View style={styles.imageWrapper}>
                    <Image
                    source={EYELASHES_MAP[selected]}
                    resizeMode="contain"
                    />
                    {drawing && <Svg style={{ position: 'absolute', width: '100%', height: 400 }}>
                        {drawing?.map(({path, color: c, stroke: s}: any, i: number) => {
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
                </View>
                
                <View>
                    <Button onPress={() => props.handleAddEyelash()} mode='contained'>actualizar dibujo</Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 25,
        padding: 8,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: 'lightgrey'
    },
    title: {
        fontSize: 26,
        marginVertical: 5
    },
    text: {
        fontStyle: "italic", 
        color: 'grey', 
        padding: 5
    },
    innerContainer: {
        display: 'flex',
        alignItems: 'center',
        width: '100%',
    },
    imageWrapper: {
        display:'flex', 
        justifyContent:'center', 
        alignItems: 'center', 
        height: 400, 
        width: 400, 
        padding: 15,
        position: 'relative' 
    },
    image: {
        marginVertical: 25
    },
})