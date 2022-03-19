import {ReadableSpan, SpanExporter} from '@opentelemetry/sdk-trace-base';
import {ExportResult} from "@opentelemetry/core";

export class ServerExporter implements SpanExporter {

    url: string;
    sessionId: string;
    host: string;

    readonly ENDPOINT_SESSION = "/sessions";
    readonly ENDPOINT_SPAN = "/spans";

    constructor(url) {
        this.url = url;

        (async () => {
            await this._get_session();
        })();
    }

    _get_local_session() {
        return window.sessionStorage.getItem("ux-test-olap-session");
    }

    async _get_session() {
        const local_session = this._get_local_session();
        if (!local_session) {
            const res = await fetch(`${this.url}/${this.ENDPOINT_SESSION}`, {
                method: "POST",
                body: JSON.stringify({
                    host: this.host
                })
            }).then(response => response.json());
            this.sessionId = res._id;
        } else {
            this.sessionId = local_session;
        }
    }

    _send_spans(spans: ReadableSpan[]) {

    }


    export(spans: ReadableSpan[], resultCallback: (result: ExportResult) => void): void {
    }

    shutdown(): Promise<void> {
        return Promise.resolve(undefined);
    }

}
