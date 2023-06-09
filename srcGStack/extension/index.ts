// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable no-extend-native */
// Event extensions
Object.defineProperty(String.prototype, 'START', {
  get: function () {
    return this + '_START'
  },
})
Object.defineProperty(String.prototype, 'SUCCESS', {
  get: function () {
    return this + '_SUCCESS'
  },
})
Object.defineProperty(String.prototype, 'FAILURE', {
  get: function () {
    return this + '_FAILURE'
  },
})

// ----- Start of String Extensions -----

String.prototype.toDouble = function () {
  return Number(this)
}

String.prototype.roundNumber = function () {
  return Math.round((Number(this) + Number.EPSILON) * 100) / 100
}

String.prototype.toInt = function () {
  return Math.round(this)
}

String.prototype.isNumber = function () {
  return !isNaN(parseFloat(this)) && isFinite(this)
}

// ----- End of String Extensions -----

// ----- Start of String Extensions -----

Number.prototype.toDouble = function () {
  return Number(this)
}

Number.prototype.roundNumber = function () {
  return Math.round((Number(this) + Number.EPSILON) * 100) / 100
}

Number.prototype.toInt = function () {
  return Math.round(this)
}

Number.prototype.isNumber = function () {
  return !isNaN(parseFloat(this)) && isFinite(this)
}

// ----- End of String Extensions -----

export {}
