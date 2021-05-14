import Cookies from "vue-cookies";
import store from '@/store'

/**
 * 获取字典数据列表
 * @param dictType  字典类型
 */
export function getDictDataList(dictType) {
    let dictList = sessionStorage.getItem('dictList')
    const type = JSON.parse(dictList).find((element) => (element.dictType === dictType))
    if (type) {
        return type.dataList
    } else {
        return []
    }
}

/**
 * 获取字典名称
 * @param dictType  字典类型
 * @param dictValue  字典值
 */
export function getDictLabel(dictType, dictValue) {
    let dictList = sessionStorage.getItem('dictList')
    const type = JSON.parse(dictList).find((element) => (element.dictType === dictType))
    if (type) {
        const val = type.dataList.find((element) => (element.dictValue === dictValue + ''))
        if (val) {
            return val.dictLabel
        } else {
            return dictValue
        }
    } else {
        return dictValue
    }
}

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
    store.commit('resetStore')
    Cookies.remove('token')
}

/**
 * 树形数据转换
 * @param {*} data
 * @param {*} id
 * @param {*} pid
 */
export function treeDataTranslate(data, id = 'id', pid = 'pid') {
    var res = []
    var temp = {}
    for (var i = 0; i < data.length; i++) {
        temp[data[i][id]] = data[i]
    }
    for (var k = 0; k < data.length; k++) {
        if (!temp[data[k][pid]] || data[k][id] === data[k][pid]) {
            res.push(data[k])
            continue
        }
        if (!temp[data[k][pid]]['children']) {
            temp[data[k][pid]]['children'] = []
        }
        temp[data[k][pid]]['children'].push(data[k])
        data[k]['_level'] = (temp[data[k][pid]]._level || 0) + 1
    }
    return res
}

export function throttleFun(method, data, time) { // 函数节流
    clearTimeout(method.throttle)
    method.throttle = setTimeout(function () {
        method(data)
    }, time || 500)
}

// 以：年月日 时分秒的形式返回当前时间
export function timeFormate(type) {
    const date = new Date()
    let myddy = date.getDay()
    let weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    let month = date.getMonth() + 1
    let dateVal = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    let seconds = date.getSeconds()
    let year = `${date.getFullYear()}年 ${pad(month)}月 ${pad(dateVal)}日`
    switch (type) {
        case 'date' :
            return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
        case 'month' :
            return `${pad(month)}月${pad(dateVal)}日`
        case 'weekday' :
            return `${weekday[myddy]}`
        case 'title' :
            return `${date.getFullYear()} - ${pad(month)} - ${pad(dateVal)}  ${weekday[myddy]}`
        case 'yearMonthDate' :
            return `${date.getFullYear()}-${pad(month)}-${pad(dateVal)}`
        case 'all' :
            return `${date.getFullYear()}-${pad(month)}-${pad(dateVal)} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
        case 'yearMonthDateMinutesSeconds' :
            return `${date.getFullYear()}${pad(month)}${pad(dateVal)}${pad(hours)}${pad(minutes)}${pad(seconds)}`
        default :
            return `${year} ${weekday[myddy]} ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
    }
}

function pad(number) {
    return ('0' + number).substr(-2)
}

export function formatter(value) {
    return value.toFixed(3) + unit + title;
}
