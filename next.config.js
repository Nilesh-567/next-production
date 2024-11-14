// next.config.js

module.exports = {
    reactStrictMode: true,
    env: {
      DATABASE_URL: process.env.DATABASE_URL || "postgresql://myuser:uSfub3pbJM4MGK58DQkcW0oqG73hxG1Y@dpg-csq3ic9u0jms73fmoeig-a/mydb_hswv", // Make sure the environment variable is accessible
    },
  };
  
