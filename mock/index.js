import Mock from 'mockjs'

Mock.mock('/mock/users', 'get', {
  'list|10': [{
    'id|+1': 1,
    'name|1': '@cname',
    'age|18-35': 18,
    'state|1': false
  }]
})

// 新增
Mock.mock('/mock/users/add', 'post', (option) => {
  return {
    success: true
  }
})

// 删除
Mock.mock(`/mock/users/delete/:id`, 'delete', (option) => {
  const res = option
  console.log('res  ----->  ', res)
  console.log('option  ----->  ', option)
  if (option.params.id) {
    return {
      success: true
    }
  } else {
    return {
      success: false
    }
  }
})

