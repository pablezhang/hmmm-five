
import Layout from '@/layout'

const questionsRouter = {
  path: '/questions',
  component: Layout,
  redirect: 'noRedirect',
  name: 'questions',
  meta: {
    title: '题库管理',
    icon: 'form'
  },
  children: [
    {
      path: 'list',
      component: () => import('@/views/questions/list'),
      name: '基础题库',
      meta: { title: '基础题库', noCache: true }
    },
    {
      path: 'choice',
      component: () => import('@/views/questions/choice'),
      name: '精选题库',
      meta: { title: '精选题库', noCache: true }
    },
    {
      path: 'new/:id?',
      component: () => import('@/views/questions/new'),
      name: '试题录入',
      meta: { title: '试题录入', noCache: true }
    },
    {
      path: 'randoms',
      component: () => import('@/views/questions/randoms'),
      name: '组题列表',
      meta: { title: '组题列表', noCache: true }
    }
  ]
}

export default questionsRouter
