export const hasOpenAiApiKey = (config: unknown): config is { openAiApiKey: string } => {
  return Boolean(typeof config === "object" && "openAiApiKey" in config && typeof config.openAiApiKey === "string");
}

type PreviewConfig = { enable: boolean, preview_url: string }

export const isValidPreviewConfiguration = (config: unknown): config is PreviewConfig => {
  return typeof config === "object" && "enable" in config && typeof config.enable === "boolean" && 'preview_url' in config && typeof config.preview_url === 'string';
}