export const hasOpenAiApiKey = (config: unknown): config is { openAiApiKey: string } => {
  return Boolean(typeof config === "object" && "openAiApiKey" in config && typeof config.openAiApiKey === "string");
}