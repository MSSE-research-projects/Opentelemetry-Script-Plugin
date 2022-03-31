import { InstrumentationBase } from '@opentelemetry/instrumentation';
import { VERSION } from '@opentelemetry/core';
import debounce from "lodash/debounce";

export class ScrollInstrumentation extends InstrumentationBase {
    component = 'window-scroll';
    version = VERSION;
    moduleName = this.component;

    defaultOnScroll = undefined;

    constructor() {
        super('window-scroll-instrumentation', VERSION, {});
    }

    enable() {
        this._diag.debug('applying patch to', this.moduleName, this.version);

        const trappedOnScroll = (func) => (event) => {
            const span = this.tracer.startSpan(this.component, {
                attributes: {
                    event_type: this.component,
                    "http.url": window.location.href,
                    "http.user_agent": navigator.userAgent,
                },
            });

            span.end();

            if (func) {
                func(event);
            }
        }

        if (!this.defaultOnScroll) {
            this.defaultOnScroll = onscroll;
            window.onscroll = debounce(trappedOnScroll(this.defaultOnScroll), 500);
        }
    }

    disable() {
        window.onscroll = this.defaultOnScroll;
        this.defaultOnScroll = undefined;
    }

    isEnabled() {
        return !!this.defaultOnScroll;
    }
}
