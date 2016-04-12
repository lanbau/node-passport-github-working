var mongoose = require('mongoose')

module.exports = mongoose.model('User', {
  oauthID: Number,
  name: String,
  avatar_url: String,
  created: Date
})
