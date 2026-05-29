/** 유저ID가 키 값 */
type WordRelayStateType = Record<string, {
    /** 게임이 진행중인 길드 */
    "guild"?: string,
    /** 게임이 진행중인 채널 */
    "channel": string,
    /** 유저가 마지막으로 보낸 워드 */
    "userLastWord": string,
    /** 봇이 마지막으로 보낸 워드 */
    "botLastWord": string
}>;

export const wordRelayState: WordRelayStateType = {};
