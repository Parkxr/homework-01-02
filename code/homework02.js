const fp = require('lodash/fp')
const {Container, Maybe} = require('./support')

//Exercise 1
//使用fp.add(x,y)和fp.map(f,x)创建一个能让functor里的值增加的函数ex1
let maybe = Maybe.of([5,6,1])
let ex1 = x => fp.map(fp.add(1),x)
let r1 = maybe.map(x => ex1(x))
console.log(r1)

//Exercise 2
//实现一个函数ex2， 能够使用fp.first获取列表的第一个元素
let xs = Container.of(['do','ray','me','fa','so','la','ti','do'])
let ex2 = x => fp.first(x)
let r2 = xs.map(x => ex2(x))
console.log(r2)



//Exercise 3
//实现一个函数ex3, 使用safeProp和fp.first找到user的名字的首字母
let safeProp = fp.curry(function (x,o){
    return Maybe.of(o[x])
})
let user = {id:2, name: 'Albert'}
let r3 = x => safeProp(x)(user)
let ex3 =  val => r3(val).map(x => fp.first(x))
console.log(ex3('name'))


//Exercise 4
//使用Maybe 重写 ex4, 不要有if语句
// let ex4 =  function (n){
//     if(n){
//         return parseInt(n)
//     }
// }
let ex4 = x => Maybe.of(x).map(x => parseInt(x))
console.log(ex4('123991abc'))

