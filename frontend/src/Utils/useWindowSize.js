import { useLayoutEffect, useState } from 'react';

export const useWindowSize = () => {
    const [size, setSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight
    });

    useLayoutEffect(() => {
        const updateSize = () => {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener("resize", updateSize);
        updateSize(); // ✅ Set initial size on mount

        return () => {
            window.removeEventListener("resize", updateSize); // ✅ Cleanup event listener
        };
    }, []);

    return size; // ✅ Returns an object instead of an array (more readable)
};
