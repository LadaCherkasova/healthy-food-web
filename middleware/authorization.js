require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = async(req, res, next) => {
  try {
    const jwtToken = req.header("token");

    if (!jwtToken) {
      return res.status(403).send("Not Authorize");
    }

    const key = '-----BEGIN PUBLIC KEY-----\n' +
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

    // const key = '-----BEGIN PUBLIC KEY-----\n' +
    //   'MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAyvBmadg3UwZD5ZujWBvC\n' +
    //   'GGGnQpFfd3TsOj7nNxoLz7lWzoegPEa/dAcXfuCWqhdnme6cU5y7TVdonNOzD3gw\n' +
    //   'vf4Xiiou9YjyfV2Ja/ISX0TKIVTJ7yrhCCieUw2nePo6LmFelC8Klqgozra9jCVr\n' +
    //   'Exp7o6coqRExG9ZdBNh3WrkyWTzJEjWy1E1tu2u//nVnmJck3BWLgvrCG/LOcV0k\n' +
    //   '3ygP05pDftctcfpOjNtzGFCF/JqFpLjP/rKzV+18dttZizA0yYeyeEeDDi+pqpzj\n' +
    //   '6Y1FLV0DKUwEvSInXuVkrJ9Fa5uE6dIcDIgkV0WluHGT5frgYeAqngwSmCPJ+3RF\n' +
    //   '9Uuir7Br4MfEuCv05Xgn8YfMAhXcBWcm4dPaikcM/hInu9lFNfws2evtw170uqhr\n' +
    //   'SKrRwaDs7aNkloe1tRGwf770eAyvoT1gPAvSyfPu8SNq91O7oKV/125dzuZBDTIB\n' +
    //   'KU1BzaDTqCjhZd9bzCyVxG9HkJUAGOIINk9+gpar2uQkO2/yB9ad2NEiwVmcOZT/\n' +
    //   'S42Y0Sk6vUrqqUN2M77Jf9jow1GUhBQ11Kr46TCHbdNAir0gca9JFsxH9d9EWr3O\n' +
    //   'taH5Me0O5XU3ftmlCnuDtTPIwWYDI76W8jSXlEPSl0WJIOtj096gHYemfacq1xFi\n' +
    //   'pVS/ExZfSXXNSssQASpo2gUCAwEAAQ==\n' +
    //   '-----END PUBLIC KEY-----';

    const payload = jwt.verify(jwtToken, key, { algorithms: ['RS256']});
    req.user = payload.userUuid;

  } catch(error) {
    console.error(error.message);
    return res.status(403).send("Not Authorize");
  }

  next();
}
