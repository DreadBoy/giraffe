import * as React from 'react';
import {render} from 'react-dom';
import {Root} from './components/Root';

// Hot Module Replacement API
declare let module: { hot: any };

(() => {
    const rootEl = document.getElementById('root');

    render(
        <Root/>,
        rootEl,
    );

    if (module.hot)
        module.hot.accept('./components/Root', () =>
            render(
                <Root/>,
                rootEl,
            ),
        );
})();
