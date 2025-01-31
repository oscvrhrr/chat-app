const baserUrl = "production" === process.env.NODE_ENV ? process.env.PROD_BASE_URL : process.env.DEV_BASE_URL;

export default baserUrl;