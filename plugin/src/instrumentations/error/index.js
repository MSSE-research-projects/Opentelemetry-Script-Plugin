import { InstrumentationBase } from '@opentelemetry/instrumentation';
import { VERSION } from '@opentelemetry/core';

export class ErrorInstrumentation extends InstrumentationBase {
    component = 'js-error';
    version = VERSION;
    moduleName = this.component;

    defaultOnError = undefined;

    constructor() {
        super('js-error-instrumentation', VERSION, {});
    }

    enable() {
        this._diag.debug('applying patch to', this.moduleName, this.version);

        const trappedOnError = (func) => (message, source, lineno, colno, error) => {
            const span = this.tracer.startSpan(this.component, {
                attributes: {
                    event_type: this.component,
                    error_message: message,
                    error_source: source,
                    error_lineno: lineno,
                    error_colno: colno,
                    error: error ? error.toString() : undefined,
                    "http.url": window.location.href,
                    "http.user_agent": navigator.userAgent,
                },
            });

            span.end();

            if (func) {
                func(message, source, lineno, colno, error);
            }
        }

        if (!this.defaultOnError) {
            this.defaultOnError = onerror;
            window.onerror = trappedOnError(this.defaultOnError);
        }
    }

    disable() {
        window.onerror = this.defaultOnError;
        this.defaultOnError = undefined;
    }

    isEnabled() {
        return !!this.defaultOnError;
    }
}
