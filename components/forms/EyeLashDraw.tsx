import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  PanResponder,
  LayoutRectangle,
  findNodeHandle,
  UIManager,
  Text,
  Image,
} from 'react-native';
import Canvas from 'react-native-canvas';

export const EyeLashDraw = () => {
  const canvasRef = useRef<Canvas | null>(null);
  const containerRef = useRef<View>(null);
  const [layout, setLayout] = useState<LayoutRectangle | null>(null);
  const [lines, setLines] = useState<{ x: number; y: number }[][]>([]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (containerRef.current) {
      const handle = findNodeHandle(containerRef.current);
      if (handle) {
        UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
          setLayout({ x: pageX, y: pageY, width, height });
        });
      }
    }
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      setIsDrawing(true);
      setLines((prev) => [...prev, []]); // Nuevo trazo
    },
    onPanResponderRelease: () => setIsDrawing(false),
    onPanResponderMove: (e) => {
      if (isDrawing && layout) {
        const { pageX, pageY } = e.nativeEvent;
        const relativeX = pageX - layout.x;
        const relativeY = pageY - layout.y;
  
        setLines((prevLines) => {
          const updatedLines = [...prevLines];
          const currentLine = [...updatedLines[updatedLines.length - 1], { x: relativeX, y: relativeY }];
          updatedLines[updatedLines.length - 1] = currentLine;
          return updatedLines;
        });
      }
    },
  });
  

  const handleCanvas = async (canvas: Canvas) => {
    const context = canvas.getContext('2d');
    if (!context) return;
  
    canvas.width = 600;
    canvas.height = 100;
  
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.lineJoin = 'round';
  
    lines.forEach((line) => {
      if (line.length > 0) {
        context.beginPath();
        context.moveTo(line[0].x, line[0].y);
        line.forEach((point, i) => {
          if (i !== 0) {
            context.lineTo(point.x, point.y);
          }
        });
        context.stroke();
      }
    });
  };  

  useEffect(() => {
    if (canvasRef.current) {
      handleCanvas(canvasRef.current);
    }
  }, [lines]);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Dibuja en el canvas</Text>
      <View
        ref={containerRef}
        style={styles.drawingArea}
        onLayout={() => {
          const handle = findNodeHandle(containerRef.current);
          if (handle) {
            UIManager.measure(handle, (x, y, width, height, pageX, pageY) => {
              setLayout({ x: pageX, y: pageY, width, height });
            });
          }
        }}
        {...panResponder.panHandlers}
      >
        {/* Imagen de fondo */}
        <Image
          source={require('@/assets/images/eyelashes.png')}
          resizeMode="contain"
          style={styles.backgroundImage}
        />

        {/* Canvas encima */}
        <Canvas
          ref={canvasRef}
          style={styles.canvas}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  drawingArea: {
    width: 600,
    height: 100,
    position: 'relative', // clave para superposición
    backgroundColor: '#eee', // solo para ver bordes
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  canvas: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
  },
});