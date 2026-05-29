import type { Command, CommandCallbackArgs } from "@pro203s/discord";

export const command: Command = {
    "description": "끝말잇기를 시작해요.",
    "type": "chatInput"
};

export const callback = async ({ interaction }: CommandCallbackArgs<"chatInput">) => {
    return await interaction.reply("퐁");
};