import React, { Component } from 'react'
import PropTypes from 'prop-types' 

class Tr extends Component {
    constructor() {
        super()
        this.state = {
            np: null,
            p2o5p: null,
            k2op: null,
            sp: null,
            znp: null,
            bp: null,
            // n: null,
            // p2o5: null,
            // k2o: null,
            // s: null,
            // zn: null,
            // b: null,
        }
    }
    render() {
        const select = <select name="" id="">
            <option value="尿素">尿素</option>
            <option value="磷酸二氢钾">磷酸二氢钾</option>
            <option value="硫酸钾">硫酸钾</option>
            <option value="硫酸锌">硫酸锌</option>
            <option value="一铵">一铵</option>
            <option value="二铵">二铵</option></select>
        return (
            <tr>
                <td>{select}</td>
            </tr>
        )
    }
}
export default Tr