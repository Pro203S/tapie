import type { Events, EventCallback } from "@pro203s/discord";
import { wordRelayState } from "../shared/wordRelayState.ts";

export const eventName: Events = "messageCreate";

export const callback: EventCallback<typeof eventName> = async (client) => {
    void client;
    void wordRelayState;
};
