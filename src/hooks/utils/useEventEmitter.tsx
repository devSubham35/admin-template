import eventEmitter from "@/services/event.emitter";
import { useEffect, useRef, useCallback } from "react";

type EventCallback<T = unknown> = (...args: T[]) => void;

const useEventEmitter = <T = unknown>(eventName: string, callback: EventCallback<T>) => {

    const callbackRef = useRef<EventCallback<T>>(callback);

    /// Always store the latest callback reference
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);


    /// Memoized event handler to prevent unnecessary re-renders
    const handleEvent = useCallback((...args: T[]) => {
        callbackRef.current?.(...args);
    }, []);


    /// Effect to subscribe & clean up event listeners
    useEffect(() => {
        if (!eventName) return;

        eventEmitter.on(eventName, handleEvent);

        return () => {
            eventEmitter.off(eventName, handleEvent);
        };
    }, [eventName, handleEvent]);


};

export default useEventEmitter;
