// - TODO: Be more specific

module.exports = function(error, response) {
  if (error) {
    return response.send(500, { message: error.message });
  }
};