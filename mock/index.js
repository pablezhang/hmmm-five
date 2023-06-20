import Mock from 'mockjs'

Mock.mock('/api/users', 'get', {
  'list|10': [{
    'id|+1': 1,
    'name|1': '@cname',
    'age|18-35': 18,
    'state|1': false
  }]
})
