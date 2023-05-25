declare interface String {
  START: string
  SUCCESS: string
  FAILURE: string
  toDouble: () => String
  roundNumber: () => String
  toInt: () => String
  isNumber: () => String
}

declare interface Number {
  toDouble: () => String
  roundNumber: () => String
  toInt: () => String
  isNumber: () => String
}
