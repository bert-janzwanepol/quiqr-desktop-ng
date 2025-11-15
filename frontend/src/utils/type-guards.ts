export const hasOpenAiApiKey = (config: unknown): config is { openAiApiKey: string } => {
  return Boolean(typeof config === "object" && "openAiApiKey" in config && typeof config.openAiApiKey === "string");
}

export const isValidPreviewConfiguration = (config: unknown): config is { enable: boolean, preview_url: string } => {
  return typeof config === "object" && "enable" in config && typeof config.enable === "boolean" && 'preview_url' in config && typeof config.preview_url === 'string';
}

// Maybe we dont need this. We can just use:
// if (isValidPreviewConfiguration(config) && config.enable)
export const hasPreviewCheckConfigurationEnabled = (config: unknown): config is { enable: true } => {
  return typeof config === "object" && "enable" in config && (typeof config.enable === "boolean" || config.enable === true || config.enable === "true");
}