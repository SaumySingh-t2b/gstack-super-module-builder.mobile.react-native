const {readFileSync, writeFileSync} = require('fs')
const path = require('path')
/**
 * @example
 * `yarn bump android major` To update the android version from app.json
 * `yarn bump ios minor` To update the ios version from app.json & write it to native file
 * `yarn bump all patch` To update the android & ios both version from app.json
 * `yarn bump ios internal native` To update the ios native file ONLY (project.pbxproj) version, and not the app.json file
 * TODO: add yarn bump sync (this will sync the ios version from native to json file)
 */

// Extract out the args
/**
 * Values can be - android, ios & all
 */
const platform = process.argv[2]
/**
 * Values can be - major, minor, patch & internal
 */
const buildType = process.argv[3]
/**
 * Can be of 2 values native or json
 */
const fileType = process.argv[4]

const SUPPORTED_VERSION_FILES = ['IOS_FILE', 'APP_JSON_FILE']

let versionSource = SUPPORTED_VERSION_FILES[1]

if (platform != 'android') {
  if (fileType == 'native') {
    versionSource = SUPPORTED_VERSION_FILES[0]
  } else if (fileType == 'json') {
    versionSource = SUPPORTED_VERSION_FILES[1]
  }
}

let oldBuildNumber = 1
let oldVersionNameArr = [1, 0, 0]

let newBuildNumber = oldBuildNumber
let newVersionNameArr = [...oldVersionNameArr]

// @ts-ignore
const updateVersions = (platform) => {
  newBuildNumber = oldBuildNumber
  newVersionNameArr = [...oldVersionNameArr]
  switch (buildType) {
    case 'major':
      newVersionNameArr[0] = newVersionNameArr[0] + 1
      newVersionNameArr[1] = 0
      newVersionNameArr[2] = 0
      if (platform == 'android') {
        newBuildNumber += 1
      } else if (platform == 'ios') {
        newBuildNumber = 1
      }
      break
    case 'minor':
      newVersionNameArr[1] = newVersionNameArr[1] + 1
      newVersionNameArr[2] = 0
      if (platform == 'android') {
        newBuildNumber += 1
      } else if (platform == 'ios') {
        newBuildNumber = 1
      }
      break
    case 'patch':
      newVersionNameArr[2] = newVersionNameArr[2] + 1
      if (platform == 'android') {
        newBuildNumber += 1
      } else if (platform == 'ios') {
        newBuildNumber = 1
      }
      break
    case 'internal':
      newBuildNumber = newBuildNumber + 1
      break
    default:
      console.warn(
        'Please mention the correct build type - major,minor,patch or internal',
      )
      break
  }
}

const printVersion = (source = versionSource) => {
  const readableOldVersion =
    oldVersionNameArr.join('.') + '(' + oldBuildNumber + ')'
  const readableNewVersion =
    newVersionNameArr.join('.') + '(' + newBuildNumber + ')'

  console.log(
    source,
    '->',
    buildType,
    '->',
    'Updated the version from',
    readableOldVersion,
    '->',
    readableNewVersion,
  )
}

const changeIosFileVersion = () => {
  const filePath = '../ios/modulebuilder.xcodeproj/project.pbxproj'
  const iosFilePath = path.join(__dirname, filePath)
  const iosFile = readFileSync(iosFilePath).toString('utf-8')

  const fileLines = iosFile.split('\n')

  const getMatchedLines = (value = '') => {
    const matchedLines = []

    for (let index = 0; index < fileLines.length; index++) {
      const item = fileLines[index]
      if (item.includes(value)) {
        matchedLines.push({index, item})
      }
    }
    return matchedLines
  }

  const buildNumLines = getMatchedLines('CURRENT_PROJECT_VERSION')
  const versionLines = getMatchedLines('MARKETING_VERSION')

  const getValueFromLine = (arr = [{}]) => {
    if (!arr.length) return ''
    // @ts-ignore
    const value = arr[0].item.split('=')[1].split(';')[0]
    return value.toString().trim()
  }

  oldBuildNumber = parseInt(getValueFromLine(buildNumLines))
  oldVersionNameArr = getValueFromLine(versionLines)
    .split('.')
    // @ts-ignore
    .map((value) => parseInt(value))

  if (versionSource == SUPPORTED_VERSION_FILES[0]) {
    updateVersions('ios')
  }

  for (const obj of buildNumLines) {
    obj.item = obj.item.replace(String(oldBuildNumber), String(newBuildNumber))
    fileLines[obj.index] = obj.item
  }

  for (const obj of versionLines) {
    obj.item = obj.item.replace(
      oldVersionNameArr.join('.'),
      newVersionNameArr.join('.'),
    )
    fileLines[obj.index] = obj.item
  }

  writeFileSync(iosFilePath, fileLines.join('\n'))
  printVersion(SUPPORTED_VERSION_FILES[0])
}

const changeAppJsonFileVersion = () => {
  const filePath = '../app.json'
  const appJsonPath = path.join(__dirname, filePath)
  const appJson = JSON.parse(readFileSync(appJsonPath).toString('utf-8'))

  const changeAndroid = () => {
    oldBuildNumber = parseInt(appJson.android.versionCode)
    oldVersionNameArr = appJson.android.versionName
      .split('.')
      // @ts-ignore
      .map((value) => parseInt(value))

    updateVersions('android')
    appJson.android.versionCode = newBuildNumber
    appJson.android.versionName = newVersionNameArr.join('.')
    printVersion('json -> android')
  }

  const changeIos = () => {
    oldBuildNumber = parseInt(appJson.ios.buildNumber)
    oldVersionNameArr = appJson.ios.version
      .split('.')
      // @ts-ignore
      .map((value) => parseInt(value))

    updateVersions('ios')
    printVersion('json -> ios')

    appJson.ios.buildNumber = newBuildNumber
    appJson.ios.version = newVersionNameArr.join('.')
  }

  if (platform == 'android') {
    changeAndroid()
  } else if (platform == 'ios') {
    changeIos()
  } else if (platform == 'all') {
    changeAndroid()
    changeIos()
  }

  writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2) + '\n')
}

if (versionSource == SUPPORTED_VERSION_FILES[0]) {
  changeIosFileVersion()
} else if (versionSource == SUPPORTED_VERSION_FILES[1]) {
  changeAppJsonFileVersion()
  if (platform != 'android') {
    changeIosFileVersion()
  }
}

// TODO add chaining version bump, commit, build
