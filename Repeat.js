// LiteLoaderScript Dev Helper
/// <reference path="../HelperLib/src/index.d.ts"/>
/* eslint-disable no-await-in-loop */
/* global ll mc file */

const PLUGIN_NAME = 'Repeat'
/** @type {[number, number, number]} */
const PLUGIN_VERSION = [0, 1, 2]

const PLUGIN_DATA_PATH = `plugins/${PLUGIN_NAME}`
const PLUGIN_CONFIG_PATH = `${PLUGIN_DATA_PATH}/config.json`

/**
 * @typedef {Object} Config
 * @property {string[]} keywords
 */
/** @type {Config} */
let pluginConfig = {
  keywords: ['+1'],
}

let latestMsg = ''

function updateConfig() {
  file.writeTo(PLUGIN_CONFIG_PATH, JSON.stringify(pluginConfig, null, 2))
}

function loadConfig() {
  if (file.exists(PLUGIN_CONFIG_PATH)) {
    const res = file.readFrom(PLUGIN_CONFIG_PATH)
    if (res) pluginConfig = JSON.parse(res)
  }
  updateConfig()
}

loadConfig()

mc.listen('onChat', (player, msg) => {
  if (pluginConfig.keywords.includes(msg)) {
    player.talkAs(latestMsg)
    return false
  }

  latestMsg = msg
  return true
})

ll.registerPlugin(PLUGIN_NAME, '+1', PLUGIN_VERSION, {
  Author: 'student_2333',
  License: 'Apache-2.0',
})
