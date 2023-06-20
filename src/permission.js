import getPageTitle from '@/utils/get-page-title'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import router from './router'

NProgress.configure({ showSpinner: false }) // NProgress Configuration
// const whitePath = ['/login']
router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  // if (whitePath.includes(to.path)) {
  //   next()
  //   return
  // }
  // if (getToken()) {
  //   next()
  //   return
  // }
  // next('/login')
  // Message.warning('网络异常,请稍后重试')
  next(0)
  // determine whether the user has logged in
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
