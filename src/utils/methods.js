/**
 * 函数节流器
 * @param method
 * @param data
 * @param time
 */
export function throttleFun (method, data, time) { // 函数节流
  clearTimeout(method.throttle)
  method.throttle = setTimeout(function () {
    method(data)
  }, time || 500)
}

/**
 *
 * @param data  需要插入字段的对象数组
 * @param params 固定对象参数
 * @returns  data:[{name: 'name1'}, {name: 'name2'}]   params:{hotFix: true}  结果: [{name: 'name1', hotFix: true}, {name: 'name2', hotFix: true}]
 */
// 将独立对象合并至对象数组内
export function mergeObject (data, params) {
  let arr = []
  data.map(item => {
    arr.push({ ...item, ...params })
  })
  return arr
}
/**
 *
 * @param {*} fmt 指定格式化字符串
 * @param {*} date 需要被转换的日期Date对象
 */
export const formateDate = function (fmt, date) {
  var o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export const changeDateformat = function (today, type) { // 转换日期格式为 '2018-03-09' 格式
  let arr = []
  let year = today.getFullYear().toString()
  let month = (today.getMonth() + 1).toString()
  let date = today.getDate().toString()

  month = month.length === 1 ? '0' + month : month
  date = date.length === 1 ? '0' + date : date

  arr.push(year)
  arr.push(month)
  if (type !== 'month') {
    arr.push(date)
  }
  return arr.join('-')
}


// 递归删除某项元素
export const ListData = function (arr){
  if(arr.length > 0){
    for (let i in arr) {
      if(arr[i].children == 0){
        delete arr[i].children
      }else{
        ListData(arr[i].children)
      }
    }
  }
}

export const treeToList = function (tree, result = [], level = 0) {
  tree.forEach(node => {
    result.push(node)
    node.level = level + 1
    node.children && treeToList(node.children, result, level + 1)
  })
  return result
}

