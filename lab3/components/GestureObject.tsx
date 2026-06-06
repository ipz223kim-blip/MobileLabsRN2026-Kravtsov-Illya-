import React, {useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';
import {
  Directions,
  FlingGestureHandler,
  LongPressGestureHandler,
  PanGestureHandler,
  PinchGestureHandler,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';

type Props = {
  onSingleTap: () => void;
  onDoubleTap: () => void;
  onLongPress: () => void;
  onPan: () => void;
  onFlingRight: () => void;
  onFlingLeft: () => void;
  onPinch: () => void;
};

export default function GestureObject(props: Props) {
  const {
    onSingleTap, onDoubleTap, onLongPress,
    onPan, onFlingRight, onFlingLeft, onPinch,
  } = props;

  // Animated values
  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  // Refs для взаємодії жестів
  const doubleTapRef = useRef<TapGestureHandler>(null);
  const singleTapRef = useRef<TapGestureHandler>(null);
  const longPressRef = useRef<LongPressGestureHandler>(null);
  const panRef = useRef<PanGestureHandler>(null);
  const flingRightRef = useRef<FlingGestureHandler>(null);
  const flingLeftRef = useRef<FlingGestureHandler>(null);
  const pinchRef = useRef<PinchGestureHandler>(null);

  // Подія пану в реальному часі
  const onPanEvent = Animated.event(
    [{nativeEvent: {translationX: translateX, translationY: translateY}}],
    {useNativeDriver: true}
  );
  // Коли пан закінчився — фіксуємо бали
  const onPanStateChange = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      onPan();
    }
  };

  // Подія піночка в реальному часі
  const onPinchEvent = Animated.event(
    [{nativeEvent: {scale}}],
    {useNativeDriver: true}
  );
  const onPinchStateChange = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      onPinch();
      // після бонусу можна “скинути” масштаб, якщо треба
      Animated.spring(scale, {toValue: 1, useNativeDriver: true}).start();
    }
  };

  return (
    <TapGestureHandler
      ref={doubleTapRef}
      numberOfTaps={2}
      onActivated={onDoubleTap}
    >
      <TapGestureHandler
        ref={singleTapRef}
        waitFor={doubleTapRef}
        numberOfTaps={1}
        onActivated={onSingleTap}
      >
        <LongPressGestureHandler
          ref={longPressRef}
          minDurationMs={3000}
          onActivated={onLongPress}
        >
          <PanGestureHandler
            ref={panRef}
            onGestureEvent={onPanEvent}
            onHandlerStateChange={onPanStateChange}
            simultaneousHandlers={[pinchRef, flingRightRef, flingLeftRef]}
          >
            <FlingGestureHandler
              ref={flingRightRef}
              direction={Directions.RIGHT}
              onActivated={onFlingRight}
            >
              <FlingGestureHandler
                ref={flingLeftRef}
                direction={Directions.LEFT}
                onActivated={onFlingLeft}
              >
                <PinchGestureHandler
                  ref={pinchRef}
                  onGestureEvent={onPinchEvent}
                  onHandlerStateChange={onPinchStateChange}
                  simultaneousHandlers={[panRef]}
                >
                  <Animated.View
                    style={[
                      styles.box,
                      {
                        transform: [
                          {translateX},
                          {translateY},
                          {scale},
                        ],
                      },
                    ]}
                  />
                </PinchGestureHandler>
              </FlingGestureHandler>
            </FlingGestureHandler>
          </PanGestureHandler>
        </LongPressGestureHandler>
      </TapGestureHandler>
    </TapGestureHandler>
  );
}

const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    margin: 20,
  },
});
