import type { Events, EventCallback } from "@pro203s/discord";

export const eventName: Events = "messageCreate";

export const callback: EventCallback<typeof eventName> = async (client) => {
    
};