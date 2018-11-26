require('should');

const rpc2 = require('./index');
const methods = require('../methods');

describe('JSON RPC 2.0 테스트', _ => {
  const handler = new rpc2();
  Object.entries(methods).forEach(v => handler.register(...v))

  describe('rpc call with positional parameters', _ => {
    it('RPC 처리 결과 1 - 빼기 함수 테스트', done => {
      console.log(handler);
      done();
    });
  });
});