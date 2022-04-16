import {ReadableSpan, SpanExporter} from '@opentelemetry/sdk-trace-base';
import {ExportResult, ExportResultCode} from "@opentelemetry/core";

export class ServerExporter implements SpanExporter {

    url: string;
    sessionId: string;
    host: string;
    private appId: string;

    readonly ENDPOINT_SESSION = "/sessions";
    readonly ENDPOINT_ROOT = "/api"
    readonly ENDPOINT_SPAN = "/spans";

    constructor(url, appId) {
        this.url = url;
        this.appId = appId;

        this.host = window.location.host;

        (async () => {
            await this._get_session();
        })();
    }

    _get_local_session() {
        return window.sessionStorage.getItem("ux-test-olap-session");
    }

    _set_local_session() {
        window.sessionStorage.setItem("ux-test-olap-session", this.sessionId);
    }

    async _get_session() {
        const local_session = this._get_local_session();
        if (!local_session || local_session === "undefined") {
            const res = await fetch(`http://${this.url}${this.ENDPOINT_ROOT}${this.ENDPOINT_SESSION}`, {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    host: this.host,
                    appId: this.appId
                })
            }).then(response => response.json());
            this.sessionId = res.id;
            this._set_local_session();
        } else {
            this.sessionId = local_session;
        }

    }

    _send_spans(spans: ReadableSpan[]) {
        return fetch(`http://${this.url}${this.ENDPOINT_ROOT}${this.ENDPOINT_SPAN}`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                session: this.sessionId,
                spans
            })
        })
    }


    export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {
        this._send_spans(spans)
            .then(_ => resultCallback({ code: ExportResultCode.SUCCESS }))
            .catch(error => resultCallback({ code: ExportResultCode.FAILED, error }));
    }

    shutdown(): Promise<void> {
        return Promise.resolve(undefined);
    }

}
