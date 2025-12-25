import {createRootRoute, createRoute, createRouter} from '@tanstack/react-router';
import {Landing} from './components/Landing/Landing';
import {PostDetail} from './components/PostDetail/PostDetail';
import {ExtractRedirect} from './components/PostDetail/ExtractRedirect';

const rootRoute = createRootRoute();

const indexRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: Landing,
});

const postDetailRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/post/$id',
    component: PostDetail,
});

type ExtractSearch = {
    url: string;
};

const extractRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: '/post/extract',
    component: ExtractRedirect,
    validateSearch: (search: Record<string, unknown>): ExtractSearch => {
        return {
            url: (search.url as string) || '',
        };
    },
});

const routeTree = rootRoute.addChildren([
    indexRoute,
    postDetailRoute,
    extractRoute,
]);

export const router = createRouter({
    routeTree,
    basepath: '/giraffe',
});

declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}
