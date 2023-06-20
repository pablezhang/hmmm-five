import getPageTitle from '@/utils/get-page-title'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'
import { Message } from 'element-ui'
import { getToken } from './utils/auth'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
const whitePath = ['/login']
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  document.title = getPageTitle(to.meta.title)
  if (getToken()) {
    return next()
  }
  if (whitePath.includes(to.path)) {
    return next()
  }
  next('/login')
  Message.warning('请重新登录')
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
