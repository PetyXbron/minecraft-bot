declare type PromiseCallbackResolve<T> = (value: T | PromiseLike<T>) => void;
declare type PromiseCallbackReject = (reason?: Error) => void;
declare type PromiseCallback<T> = (resolve: PromiseCallbackResolve<T>, reject: PromiseCallbackReject) => void;
/**
 * This timeout promise is meant to automatically resolve/reject after the specified timeout, with the ability to cancel it prematurely
 * @class
 */
declare class TimeoutPromise<T> {
    /**
     * The promise that will be executed on
     * @type {Promise<T>}
     */
    promise: Promise<T>;
    private timer;
    /**
     * Creates a new timeout promise
     * @param {number} timeout The timeout in milliseconds
     * @param {Error} reason The reason for the rejection when it times out
     */
    constructor(timeout: number, callback: PromiseCallback<T>);
    /**
     * Cancels the promise from rejecting after the specified time
     * @returns {void}
     */
    cancel(): void;
}
export default TimeoutPromise;
