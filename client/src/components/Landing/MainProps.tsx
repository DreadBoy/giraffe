import {Create, Delete} from '@material-ui/icons';
import * as React from 'react';
import * as H from 'history';

export const paths = {
    set: '/boulders/set',
    demolish: '/boulders/demolish',
};

export const MainProps = (history: H.History) => ({
    section: 'boulders' as 'boulders',
    actions:
        [
            {
                icon: Delete,
                text: 'Podri star balvan',
                onClick: () => history.push(paths.demolish),
            },
            {
                icon: Create,
                text: 'Postavi nov balvan',
                onClick: () => history.push(paths.set),
            },
        ],
});
