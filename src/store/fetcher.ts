import {action, computed, observable} from 'mobx';
import {AxiosPromise, AxiosResponse} from 'axios';

export type Silent = 'silent' | undefined;

export class Fetcher<T extends APIResponse<U>, U extends object = object> {
    @observable private _loading: boolean = false;
    @observable private _silent: boolean = false;
    @observable public error: Error | null = null;
    @observable public uuid: string | null = null;
    @observable public data: T | null = null;

    @computed
    get loading() {
        return this._loading && !this._silent;
    }

    @action
    public async fetch(request: AxiosPromise<T>, uuid: string, silent?: Silent) {
        this.uuid = uuid;
        this._loading = true;
        this._silent = silent === 'silent';
        if (!this._silent) {
            this.data = null;
            this.error = null;
        }
        let response: AxiosResponse<T> | null = null;
        let error: Error | null = null;
        try {
            response = await request;
        } catch (e) {
            error = e;
            if (e.response && e.response.data)
                error = e.response.data;
        }
        if (response !== null && response.data.success)
            this.data = response.data;
        if (uuid === this.uuid) {
            this.error = error;
            this._loading = false;
            this._silent = false;
        }
    }

    @action
    public reset() {
        this.uuid = null;
        this.data = null;
        this.error = null;
    }
}
