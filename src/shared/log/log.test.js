import { expect } from 'chai';
import sinon from 'sinon';

import log from '../log';

describe('(Util) logging mechanism', () => {
  window.LOGGING = true;
  const sandbox = sinon.createSandbox();
  let info;
  let warn;
  let error;
  let clock; //eslint-disable-line

  beforeEach(() => {
    info = sandbox.stub(console, 'info');
    warn = sandbox.stub(console, 'warn');
    error = sandbox.stub(console, 'error');
    clock = sandbox.useFakeTimers(1);
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('Plain log', () => {
    log('test');
    expect(info).to.be.called;
    expect(info.getCall(0).args).to.be.deep.equal(['INFO: 00:00:00', 'test']);
  });

  it('Info log', () => {
    log('INFO: test 1');
    log('Info: test 2');
    expect(info).to.be.called;
    expect(info.getCall(0).args).to.be.deep.equal(['INFO: 00:00:00', 'test 1']);
    expect(info.getCall(1).args).to.be.deep.equal(['INFO: 00:00:00', 'test 2']);
  });

  it('Warn log', () => {
    log('WARN: test 1');
    log('warn: test 2');
    expect(warn).to.be.called;
    expect(warn.getCall(0).args).to.be.deep.equal(['WARN: 00:00:00', 'test 1']);
    expect(warn.getCall(1).args).to.be.deep.equal(['WARN: 00:00:00', 'test 2']);
  });

  it('Error log', () => {
    log('ERROR: test 1');
    log('error: test 2');
    expect(error).to.be.called;
    expect(error.getCall(0).args).to.be.deep.equal([
      'ERROR: 00:00:00',
      'test 1',
    ]);
    expect(error.getCall(1).args).to.be.deep.equal([
      'ERROR: 00:00:00',
      'test 2',
    ]);
  });

  it('Log called with multiple arguments', () => {
    log(
      1,
      2,
      {
        test: 123,
        hello: 'world',
      },
      'Love Monday Morning',
    );
    expect(info).to.be.called;
    expect(info.getCall(0).args).to.be.deep.equal([
      'INFO: 00:00:00',
      1,
      2,
      {
        test: 123,
        hello: 'world',
      },
      'Love Monday Morning',
    ]);
  });

  it('Log called with not known level', () => {
    log('NOTKNOWN: test');
    expect(info).to.be.called;
    expect(info.getCall(0).args).to.be.deep.equal(['INFO: 00:00:00', 'test']);
  });

  it('Logging mechanism is disabled', () => {
    window.LOGGING = false;
    log(
      1,
      2,
      {
        test: 123,
        hello: 'world',
      },
      'Love Monday Morning',
    );
    expect(info).not.to.be.called;
  });
});
