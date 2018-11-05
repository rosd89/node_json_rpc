module.exports = params => {
  if (Array.isArray(params)) {
    return params[0] - params[1];
  } else {
    return params.minuend - params.subtrahend
  }
};