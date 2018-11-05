exports.invalidRequest = _ => {
  throw {"code": -32600, "message": "Invalid Request"};
};

exports.notFoundMethod = _ => {
  throw {"code": -32601, "message": "Method not found"};
};

exports.invalidParams = _ => {
  throw {"code": -32602, "message": "Invalid params"};
};

exports.parseError = _ => {
  throw {"code": -32700, "message": "Parse error"};
};