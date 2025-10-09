import {useEffect, useRef} from "react";

export const useOutsideClick = (callback) => {

    const ref = useRef(null)

    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback]);

    useEffect(() => {
        const handleClick = (e) => {
            if(ref.current && !ref.current.contains(e.target)) {
                savedCallback.current()
            }
        }
        document.addEventListener("mousedown", handleClick)
        return () => {
            document.removeEventListener("mousedown", handleClick)
        }
    }, [ref])
    return ref
}
