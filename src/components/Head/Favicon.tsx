import * as React from 'react';
import Helmet from 'react-helmet';
import appleTouchIcon from '../../assets/favicon/apple-touch-icon.png';
import favicon16 from '../../assets/favicon/favicon-16x16.png';
import favicon32 from '../../assets/favicon/favicon-32x32.png';
import webManifest from '../../assets/favicon/site.webmanifest';
import safari from '../../assets/favicon/safari-pinned-tab.svg';

export const Favicon: React.FunctionComponent = () => (
    <Helmet>
        <link rel="apple-touch-icon" sizes="144x144" href={appleTouchIcon}/>
        <link rel="icon" type="image/png" sizes="32x32" href={favicon16}/>
        <link rel="icon" type="image/png" sizes="16x16" href={favicon32}/>
        <link rel="manifest" href={webManifest}/>
        <link rel="mask-icon" href={safari} color="#394B59"/>
        <meta name="msapplication-TileColor" content="#394B59"/>
        <meta name="theme-color" content="#394B59"/>
    </Helmet>
);
