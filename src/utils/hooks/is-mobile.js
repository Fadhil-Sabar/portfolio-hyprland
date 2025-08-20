import { useState, useEffect } from 'react';

const MOBILE_WIDTH_THRESHOLD = 768;

const isMobileDevice = () => {
    if (typeof window === 'undefined') {
        return false;
    }
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent) ||
        window.innerWidth <= MOBILE_WIDTH_THRESHOLD
    );
};

export const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(isMobileDevice());
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return isMobile;
};