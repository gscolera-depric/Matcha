module.exports = {
  baseUrl: 'http://localhost:8080',
  uploadFolder: __dirname + '/uploads',
  port: 3000,
  mongoURI: "mongodb://gscolera:12345@127.0.0.1:27017/Matcha?authSource=admin",
  secret: "matcha",
  accessLifetime: 900, // 15 minutes
  refreshLifetime: 2592000, // ~month
  smtp: {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'camagruapp@gmail.com',
      pass: 'Matcha12345'
    }
  }
};
