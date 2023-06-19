
import Layout from '@/layout'

const subjectsRouter = {
  path: '/subjects',
  component: Layout,
  redirect: 'noRedirect',
  name: 'subjects',
  meta: {
    title: '学科管理',
    icon: 'table'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/subjects/list'),
      name: '学科',
      meta: { title: '学科', noCache: true }
    },
    {
      path: 'directorys',
      component: () => import('@/views/subjects/directorys'),
      name: '目录',
      meta: { title: '目录', noCache: true }
    },
    {
      path: 'tags',
      component: () => import('@/views/subjects/tags'),
      name: '标签',
      meta: { title: '标签', noCache: true }
    }
  ]
}

export default subjectsRouter
