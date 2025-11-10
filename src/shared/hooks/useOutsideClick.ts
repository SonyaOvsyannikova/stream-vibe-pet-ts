import {ChangeEvent, RefObject, useEffect, useRef} from "react";

export const useOutsideClick = (callback: () => void ): RefObject<HTMLDivElement> => {

    const ref = useRef<HTMLDivElement>(null)

    const savedCallback = useRef(callback)

    useEffect(() => {
        savedCallback.current = callback
    }, [callback]);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if(ref.current && e.target instanceof Node && !ref.current.contains(e.target)) {
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
