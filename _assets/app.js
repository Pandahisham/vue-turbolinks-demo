import Vue from 'vue'
import PostPreview from './vue/post-preview.vue'

import VueTurbolinks from './vue/mixins/vue-turbolinks.js'

Vue.mixin(VueTurbolinks)

let postPreviewEl = "#post-preview-app"

initPostPreview()

function initPostPreview() {

  if (window.isInitPostPreview) {
    return
  }
  window.isInitPostPreview = true

  let loadPostPreview = function(e) {
    if (!document.querySelector(postPreviewEl)) {
      return
    }
    if (e.type == 'pageshow' && window.postPreview && !window.postPreview._isDestroyed) {
      return
    }

    window.postPreview = new Vue({
      el: postPreviewEl,
      data: {
        posts: window.posts
      },
      components: {
        PostPreview
      }
    })
  }

  document.addEventListener("turbolinks:load", loadPostPreview)
  window.addEventListener("pageshow", loadPostPreview)

  document.addEventListener("turbolinks:before-cache", function() {
    if (!document.querySelector(postPreviewEl)) {
      return
    }
    if (window.postPreview) {
      window.postPreview.$destroy()
    }
  })
}
