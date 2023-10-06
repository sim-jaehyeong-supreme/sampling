/** @type { import('@storybook/vue3-vite').StorybookConfig } */
const config = {
  stories: ["../storybook-chromatic-sample/src/**/*.mdx", "../storybook-chromatic-sample/src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};
export default config;
