module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@": "./app",
            "@components": "./app/components",
            "@screens": "./app/screens",
            "@assets": "./app/assets",
            "@const": "./app/const",
            "@navigation": "./app/navigation",
          },
        },
      ],
    ],
  };
};
