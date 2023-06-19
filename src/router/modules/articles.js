
import Layout from '@/layout'

const articlesRouter = {
  path: '/articles',
  component: Layout,
  redirect: 'noRedirect',
  name: 'articles',
  meta: {
    title: '员工管理',
    icon: 'list'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/articles/list'),
      name: '面试技巧',
      meta: { title: '面试技巧', noCache: true }
    }
  ]
}

export default articlesRouter
