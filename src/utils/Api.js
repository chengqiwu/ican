import axios from 'axios'

// data 
//  {
//         username: 'zhangshan',
//         password: '123455',
//         verifyWay:  0,           ///0是手机 1是邮箱
//         verify: '18349320983/9527'
//     }
export function userRegister(data) {
    console.log(data)
    return axios.post('api/user/register',data).then(function (response) {
        console.log(response)
    }).catch(function (error) {
        console.log(error)
    })
    /*
    .then(res=> {
        cb(res)
        {
            msg: 200,
            result: {
                token: '',
                username: 'zhangsan',
                farmList: [],
                role: 0, // 0: 农场主 1: 种植户
                icon: '',
                sex: 'm',
                age: 40,
                iphone: '13900000000',
                address: '庞各庄',
                email: 'zhangsan@email.com'
            }
        }
    })
    */
    
}
