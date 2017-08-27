module.exports = exports = require('./schema');
const { User } = exports;

exports.retrieveUser = function retrieveUser(user_id) {
  return User.find({ user_id }).exec()
    .then(results => results[0]);
};

exports.retrieveUserSubDocs = function retrieveUserSubDocs(userId, subDocName) {
  return exports.retrieveUser(userId)
    .then(result => subDocName ? result[subDocName] : result)
};

exports.postUserSubDoc = function postUserSubDoc(userId, subDocName, body, res, isArray = true) {
  let index = 0;
    return exports.retrieveUser(userId)
      .then((user) => {
        if (isArray) {
          index = user[subDocName].push(body) - 1;
        } else {
          user[subDocName] = body;
        }
        return user.save();
      })
      .then(user => isArray ? user[subDocName][index] : user[subDocName]); 
};
