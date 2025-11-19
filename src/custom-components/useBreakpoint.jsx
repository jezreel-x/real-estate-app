import { useState, useEffect } from 'react';

const useBreakpoint = () => {

    const getBreakpoint = (width) => {
        if (width < 550) return 'mobile'; // Small screens
        if (width >= 550 && width < 1000) return 'tablet'; // Medium screens
        if (width >= 1000 && width < 1360) return 'laptop'; // Large screens
        return 'desktop'; // Extra large screens
    };

    const [breakpoint, setBreakpoint] = useState(getBreakpoint(window.innerWidth));

    useEffect(() => {
        const handleResize = () => {
            setBreakpoint(getBreakpoint(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return breakpoint;
};

export default useBreakpoint;