import Vue from 'vue';

class Messager {
    public _show = false;
    private _message = '';
    private _color = '';
    private _timeout = 2000;
    private readonly DEFAULT_TIMEOUT = 2000;

    public get message(): string { return this._message; }
    public get color(): string { return this._color; }
    public get timeout(): number { return this._timeout; }
    public get show(): boolean { return this._show; }
    public set show(value: boolean) {
        this._show = value;
        if (!value) {
            this._timeout = this.DEFAULT_TIMEOUT;
        }
    }

    public info(message: string, timeout: number = this.DEFAULT_TIMEOUT) {
        this._message = message;
        this._color = 'info';
        this._timeout = timeout;
        this.show = true;
    }

    public success(message: string, timeout: number = this.DEFAULT_TIMEOUT) {
        this._message = message;
        this._color = 'success';
        this._timeout = timeout;
        this.show = true;
    }

    public error(message: string, timeout: number = this.DEFAULT_TIMEOUT) {
        this._message = message;
        this._color = 'error';
        this._timeout = timeout;
        this.show = true;
    }
}

const messager = new Messager();
Vue.prototype.$messager = messager;
export default messager;
