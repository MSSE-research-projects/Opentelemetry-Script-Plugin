import { InstrumentationBase } from '@opentelemetry/instrumentation';
import { VERSION } from '@opentelemetry/core';
import { trace, context } from "@opentelemetry/api";

export class AlertInstrumentation extends InstrumentationBase {
    component = 'alert';
    version = VERSION;
    moduleName = this.component;

    defaultAlert = undefined;

    constructor() {
        super('alert-instrumentation', VERSION, {});
    }

    enable() {
        this._diag.debug('applying patch to', this.moduleName, this.version);

        const trappedAlert = (func) => (message) => {
            const spanStart = this.tracer.startSpan(this.component, {
                attributes: {
                    event_type: this.component,
                    alert_message: message,
                    "http.url": window.location.href,
                    "http.user_agent": navigator.userAgent,
                    alert_status: "start"
                },
            });

            spanStart.end();

            if (func) {
                func(message);
            }

            const spanEnd = this.tracer.startSpan(this.component, {
                attributes: {
                    event_type: this.component,
                    alert_message: message,
                    "http.url": window.location.href,
                    "http.user_agent": navigator.userAgent,
                    alert_status: "end"
                },
            }, trace.setSpan(context.active(), spanStart));

            spanEnd.end();
        }

        if (!this.defaultAlert) {
            this.defaultAlert = alert;
            window.alert = trappedAlert(this.defaultAlert);
        }
    }

    disable() {
        window.alert = this.defaultAlert;
        this.defaultAlert = undefined;
    }

    isEnabled() {
        return !!this.defaultAlert;
    }
}
