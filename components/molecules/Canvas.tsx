import React, {useState} from 'react';
import {ColorValue, StyleSheet, View} from 'react-native';
import { Button } from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';

const Canvas = (props: any) => {
  const [paths, setPaths] = useState<any>([]);
  const [color, setColor] = useState('#000');
  const [stroke, setStroke] = useState(2);

  const setNewPath = (x: number, y: number) => {
    setPaths((prev: any) => {
      const result = [...prev, {path: [`M${x} ${y}`], color, stroke}];
      return result;
    });
  };
  
  const updatePath = (x: number, y: number) => {
    setPaths((prev: any) => {
      const currentPath = paths[paths.length - 1];
      currentPath && currentPath.path.push(`L${x} ${y}`);
      return currentPath ? [...prev.slice(0, -1), currentPath] : prev;
    });
  };

  const formatPaths = (paths: any) => {
    const drawing = JSON.stringify(paths);
    props.handleAddEyelash(drawing);
  }

  return (
    <>
      <View
        style={styles.canvas}
        onStartShouldSetResponder={() => true}
        onMoveShouldSetResponder={() => true}
        onResponderStart={e => {
          setNewPath(e?.nativeEvent?.locationX, e?.nativeEvent?.locationY);
        }}
        onResponderMove={e => {
          updatePath(e?.nativeEvent?.locationX, e?.nativeEvent?.locationY);
        }}>
          {props.children}
        <Svg>
          {paths.map(({path, color: c, stroke: s}: any, i: number) => {
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
        </Svg>
      </View>
      <View style={styles.buttons}>
        <Button onPress={() => props.handleHide()} mode='text'>cancelar</Button>
        <Button onPress={() => formatPaths(paths)} mode='contained'>confirmar</Button>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  canvas: {
    flex: 1,
    width: '100%',
    height: 400,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#eee',
    margin: 10
  },
  buttons : {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '60%'
  }
});

export default Canvas;