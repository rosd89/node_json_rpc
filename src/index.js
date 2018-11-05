const http = require('http');

const methods = require('./methods');
const {error} = require('./lib');

const executeMethod = ({method, params}) => {
  if (methods[method] === undefined) error.notFoundMethod();
  return methods[method](params);
};

const execute = param => {
  const data = {jsonrpc: '2.0', id: null, isNotify: false};
  try {
    const {method = error.invalidParams(), params, id = null} = param;

    if (id === null) data.isNotify = true;
    data.id = id;

    const result = executeMethod({method, params});
    if (result) {
      data.result = result;
    } else {
      error.parseError();
    }
  } catch (e) {
    data.error = e;
  }

  return data;
};

const app = http.createServer((req, res) => {
  let resBody;
  if (req.method.toUpperCase() === 'POST' && req.url === '/') {
    req.on('data', data => {
      try {
        const param = JSON.parse(data + '');
        if (Array.isArray(param)) {
          if (param.length === 0) error.parseError();
          resBody = param.reduce((p, c) => (p.push(execute(c)), p), []);
        } else {
          resBody = execute(param);
        }
      } catch (e) {
        if (resBody === undefined) resBody = {jsonrpc: '2.0', id: null, isNotify: false};

        if (e.message.startsWith('Unexpected token')) {
          resBody.error = {code: -32700, message: "Parse error"}
        }
        else {
          resBody.error = e;
        }
      }
    });

  } else {
    res.writeHead(404, {});
    res.end(null);
  }

  req.on('end', _ => {
    if (Array.isArray(resBody)) {
      const result = resBody.reduce((p, {jsonrpc, result, id, error, isNotify}) => {
        if (!isNotify) {
          p.push({jsonrpc, result, error, id})
        }
        return p;
      }, []);
      res.end(result.length > 0 ? JSON.stringify(result) : null);
    } else {
      const {jsonrpc, result, error, id, isNotify} = resBody;
      res.end(isNotify ? null : JSON.stringify({jsonrpc, result, error, id}));
    }
  });
});

module.exports = app;