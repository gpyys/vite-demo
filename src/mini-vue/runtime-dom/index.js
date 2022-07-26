import {
  createRenderer
} from "../runtime-core"

let renderer

const rendererOptions = {
  querySelector(selector) {
    return document.querySelector(selector)
  },
  insert(child, parent, anchor) {
    parent.insertBefore(child, anchor || null)
  }
}

function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions))
}

export function createApp(rootComponent) {
  return ensureRenderer().createApp(rootComponent)
}