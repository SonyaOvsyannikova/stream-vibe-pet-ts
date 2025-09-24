import {useEffect, useRef, useState} from "react"


export const useInputDebounce = (value, delay, callbackFunction) => {

    const startTimeRef = useRef(null)
    const timeOut = useRef(null)
    const [debounce, setDebounce] = useState(value)

    useEffect(() => {

        if(value !== '' && startTimeRef.current === null) {
            startTimeRef.current = Date.now()
        }

        if(timeOut.current) {
            clearTimeout(timeOut.current)
        }

        if(value === '') {
            setDebounce(value)
            startTimeRef.current = null;
            return;
        }

        timeOut.current = setTimeout(() => {
            const end = Date.now()
            const start = startTimeRef.current

            setDebounce(value)

            if(callbackFunction) {
                callbackFunction(value, start, end)
            }

            startTimeRef.current = null
        }, delay)

        return () => {
            clearTimeout(timeOut.current)
        }

    }, [value, delay, callbackFunction])
    return debounce
}