import Mock from 'mockjs'
// /^http:\/\/localhost:9528\/api\/users$/
const data = Mock.mock({
  'users|40': [{
    'id': 'c55020241158074413524',
    'questionType': '多选',
    'questionIDs': 'x69334807771671251818w39863258234291535539',
    'addTime': '2023-06-20 12:26:11',
    'totalSeconds': '2373',
    'accuracyRate': '68%',
    'userName': '@cname'
  }
  ],
  'pages': 40,
  'pagesize': 10,
  'page': 1
})
Mock.mock(/\/api\/users\?page=\d+&pagesize=\d+/, 'get',
  function(options) {
    const url = options.url // 获取完整的 URL，例如：'/api/users?page=1&pageSize=10'
    const index = url.indexOf('?') // 获取 '?' 字符的索引位置
    const queryString = url.substring(index + 1) // 获取查询字符串部分，例如：'page=1&pageSize=10'
    const queryObj = queryString.split('&').reduce((obj, query) => {
      const [key, value] = query.split('=')
      if (key && value) {
        obj[key] = value
      }
      return obj
    }, {}) // 将查询字符串转换成对象格式，例如：{"page": "1", "pageSize": "10"}

    // console.log(queryObj) // 输出请求参数，例如：{"page": "1", "pageSize": "10"}
    const users = data.users.slice((+queryObj.page - 1) * +queryObj.pagesize, +queryObj.page * +queryObj.pagesize)
    const pages = data.pages
    return {
      users,
      pages
    }
  }

)

Mock.mock(/\/api\/users/, 'delete', (option) => {
  console.log(option)
  if (option.id) {
    return {
      success: true
    }
  } else {
    return {
      success: false
    }
  }
})

Mock.mock(/\/api\/users\/yy/, 'get', (option) => {
  console.log(option)
  return []
})
