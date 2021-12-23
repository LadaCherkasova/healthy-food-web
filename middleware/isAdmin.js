require("dotenv").config();
const jwt = require("jsonwebtoken");

const publicKey = '-----BEGIN PUBLIC KEY-----\n' +
  'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA+7z3gV/FrMw3Ap+ipsZ9\n' +
  'PvJGzUjosr/EGMqd85N7PnpmS7IKUvH5yXdBn2EVZtLJUq0/ujNJ6PdFYp5LlO2o\n' +
  'AIqI1tOJSvZdXHU4YjWo0g2SN/ZllK7T7hVzX3HR35i29u+q/gzW3whK39nPh0bT\n' +
  'jr/GNPJb35qw4SGUQzcWELXZ1ejDYWQTwLy1ueDnFCde6BTyVneRhARkXmPD1b57\n' +
  'dkm1w0ySDaJXmw45V3WuUkXGn6HOAFOwstFjFUYWRqnr6qknKY6UsFa7W+6NfHnt\n' +
  'GtZj/rY3EqPFlnvNtNK5VDmWZBnSxddpQVoCq1ln2eC89lCBBg9VX4hVpx6TfWiz\n' +
  'CK4B8hukHox2Q7W2Xp7Ayr5Oc60no+K5eyDE0o5/MLEEi7KLhDYZzzBUYBHxE+fD\n' +
  'Hw1s8oGr+uYW9DoXr4T2QYjE+rxt81xExCThEHygexACL/D9HZfjHQHF7svkenWa\n' +
  'lvb2y/0QlIybsfvM1ULLwtOPXrBjte0CUGiA4LguHBJvox6DVN8tI2z8eBgRTnO/\n' +
  'QhNM1pnvzhrBg45JK3p+rxJohUraS/3HnccnDUfRuqj7eCJRBY5888b7rOsbmOCR\n' +
  'VJNg38A88k7YCF+1JnkEjAdkNTdsMTVaOMdPRFYMUeVUbYguK38qV4EUnL3lsrNb\n' +
  'H1qA/mThwRwBFKuoyCgnxacCAwEAAQ==\n' +
  '-----END PUBLIC KEY-----';

module.exports = async(req, res, next) => {
  let userUuid;

  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).send("Not Authorize");
    }

    const payload = jwt.verify(
      jwtToken,
      publicKey,
      { algorithms: ['RS256']}
    );
    userUuid = payload.userUuid;

  } catch(error) {
    console.error(error.message);
    return res.status(403).send("Not Authorize");
  }

  if (process.env.adminUserUuid === userUuid) {
    next();
  }
}
