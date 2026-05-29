import type { Events, EventCallback } from "@pro203s/discord";

export const eventName: Events = "guildCreate";

export const callback: EventCallback<typeof eventName> = async (guild) => {
    await guild.leave();
};
