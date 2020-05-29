const fp = require('lodash/fp')

//数据
//horsepower 马力， dollar_value价格, in_stock库存
const cars = [
    {
        name: "Ferrari FF",
        horsepower: 660,
        dollar_value: 700000,
        in_stock: true
    },
    {
        name: "Spyker C12 Zagato",
        horsepower: 650,
        dollar_value: 648000,
        in_stock: false
    },
    {
        name: "Jaguar XKR-S",
        horsepower: 550,
        dollar_value: 132000,
        in_stock: false
    },
    {
        name: "Audi R8",
        horsepower: 525,
        dollar_value: 114200,
        in_stock: false
    },
    {
        name: "Aston Martin One-77",
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: true
    },
    {
        name: "Pagani Huayra",
        horsepower: 700,
        dollar_value: 1300000,
        in_stock: false
    },
]

//Exercise 1
//使用函数组合fp.flowRight()重新实现下面这个函数
// let isLastInStock = function(cars) {
//     //获取最后一条数据
//     let last_car = fp.last(cars)
//     //获取最后一条数据的 in_stock 属性值
//     return fp.prop('in_stock', last_car)
// }
let isLastInStock = fp.flowRight(fp.prop('in_stock'),fp.last)
console.log(isLastInStock(cars))



//Exercise 2
//使用fp.flowRight()、fp.prop()和fp.first()获取第一个car的name
let isFirstCarName = fp.flowRight(fp.prop('name'),fp.first)
console.log(isFirstCarName(cars))



//Exercise 3
//使用帮助函数_average重构averageDollarValue,使用函数组合的方式实现
let _average = function(xs){
    return fp.reduce(fp.add,0,xs) / xs.length
}
// let averageDollarValue = function(cars){
//     let dollar_values = fp.map(function(car){
//         return car.dollar_value
//     },cars)
//     return _average(dollar_values)
// }
let averageDollarValue = fp.flowRight(_average,fp.map(car => car.dollar_value))
console.log(averageDollarValue(cars))



//Exercise 4
//使用flowRight写一个sanitizeNames()函数，返回一个下划线连接的小写字符串，把数组中的name
//转换为这种形式： 例如： sanitizeNames(["Hello World"]) =>["hello_world"]
let _underscore = fp.replace(/\W+/g,'_')
let sanitizeNames = fp.map(fp.flowRight(fp.toLower,_underscore,car => car.name))
console.log(sanitizeNames(cars))