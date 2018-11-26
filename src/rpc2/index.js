module.exports = class {
  constructor() {
    Object.assign(this, {
      _methods: {}
    });
  }

  register(name, method) {
    this._methods[name] = method
  }

  parseRequest(body) {
    let result = {};
    let data = {};

    try {
      data = JSON.parse(body);
    } catch (e) {
      //todo parseError error
      return JSON.stringify({jsonrpc: '2.0', error: {}, id: null});
    }

    if (Array.isArray(data)) {
      result = this.handleRequests(data);
    } else {
      result = this.handleRequest(data);
    }

    return JSON.stringify(result);
  }

  handleRequests(reqs) {
    if (reqs.length < 1) {
      //todo invalidRequest error
      return {jsonrpc: '2.0', error: {}}
    }

    const resp = [];
    for (const req of reqs) {
      resp.push(this.handleRequest(req))
    }

    return resp;
  }

  handleRequest(req) {
    let err = this.validateRequest(req);
    if (err !== undefined) {
      //todo
      return {jsonrpc: '2.0', error: {}, id: req.id};
    }

    const result = this.call(req);

    return {jsonrpc: '2.0', ...result, id: req.id};
  }

  validateRequest(req) {
    let data;
    if (req.jsonrpc === '2.0') {
      data = "json rpc request member must be exactly '2.0'";
    } else if (typeof req.method !== "string") {
      data = "method name must be a string";
    }

    if (data) {
      return data;
    }

    return undefined;
  }

  call(req) {
    const func = this._methods[req.method];
    if (typeof func === "function") {
      //todo method not found error
      return {}
    }

    const result = func(req.params);
    return {result};
  }
};