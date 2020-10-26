import {MutableRefObject, useCallback, useEffect, useState} from 'react';

export function useObserver(
    element: MutableRefObject<HTMLElement | null>,
    callback?: () => void,
) {
    const [visible, setVisible] = useState<boolean>(false);

    const onVisible = useCallback((
        entries: IntersectionObserverEntry[],
    ) => {
        const isVisible = entries.length >= 0 && entries[0].isIntersecting;

        setVisible(isVisible);
        if (isVisible) {
            callback && callback();
        }
    }, [callback]);

    useEffect(() => {
        if (!element.current)
            return;

        const observer = new IntersectionObserver(onVisible, {
            root: null,
            rootMargin: '500px',
            threshold: 0,
        });

        observer.observe(element.current);

        return () => observer.disconnect()
    }, [element, onVisible]);

    return {isVisible: visible};
}
