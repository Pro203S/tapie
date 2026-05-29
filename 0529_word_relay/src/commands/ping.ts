import type { Command, CommandCallbackArgs } from "@pro203s/discord";

export const command: Command = {
    "description": "핑",
    "type": "chatInput"
};

export const callback = async ({ interaction }: CommandCallbackArgs<"chatInput">) => {
    return await interaction.reply("퐁");
};