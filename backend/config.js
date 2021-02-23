export default{
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/shop_app',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret',
    RESET_PASSWORD_KEY:'somethingsecret'
}