import * as React from 'react';
import {createContext, FunctionComponent, useContext, useEffect, useState} from 'react';
import * as serviceWorker from '../../serviceWorker';

export type ServiceWorker = {
    updated: boolean,
};

const context = createContext<ServiceWorker>({updated: false});

export const Provider: FunctionComponent = ({children}) => {
    const [updated, setUpdated] = useState(false);
    useEffect(() => {
        // If you want your app to work offline and load faster, you can change
        // unregister() to register() below. Note this comes with some pitfalls.
        // Learn more about service workers: https://bit.ly/CRA-PWA
        serviceWorker.register({
            onUpdate: () => setUpdated(true),
        });
    }, []);
    return (
        <context.Provider value={{updated}}>
            {children}
        </context.Provider>
    )
};

export const useServiceWorker = () => useContext(context);
