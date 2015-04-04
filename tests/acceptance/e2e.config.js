var sauceUsername = process.env.SAUCE_USERNAME || require("../../credentials.json").username,
    sauceAccessKey = process.env.SAUCE_ACCESS_KEY || require("../../credentials.json").accesskey;