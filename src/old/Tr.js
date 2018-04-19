import React, { Component } from 'react'
import PropTypes from 'prop-types' 

class Tr extends Component {
    constructor() {
        super()
        this.state = {
            value: 0,
            precent: {
                type: '0',
                np: 0.46,
                p2o5p: 0,
                k2op: 0,
                sp: 0,
                znp: 0,
                bp: 0
            }
        }
        this.selectChange = this.selectChange.bind(this)
        this.inputChange = this.inputChange.bind(this)
    }
    selectChange(e) {
        if (e.target.value === this.state.precent.type) {
            return
        }
        switch (e.target.value) {
        case '0':
            this.setState({
                precent: {
                    type: 0,
                    np: 0.46,
                    p2o5p: 0,
                    k2op: 0,
                    sp: 0,
                    znp: 0,
                    bp: 0
                }
            })
            break
        case '1':
            this.setState({
                precent: {
                    type: 1,
                    np: 0,
                    p2o5p: 0,
                    k2op: 0,
                    sp: 0,
                    znp: 0,
                    bp: 0
                }
            })
            break
        case '2':
            this.setState({
                precent: {
                    type: 2,
                    np: 0,
                    p2o5p: 0,
                    k2op: 0.5,
                    sp: 0.18,
                    znp: 0,
                    bp: 0
                }
            })
            break
        case '3':
            this.setState({
                precent: {
                    type: 3,
                    np: 0,
                    p2o5p: 0,
                    k2op: 0,
                    sp: 0.2,
                    znp: 0.4,
                    bp: 0
                }
            })
            break
        case '4':
            this.setState({
                precent: {
                    type: 4,
                    np: 0.11,
                    p2o5p: 0.44,
                    k2op: 0,
                    sp: 0,
                    znp: 0,
                    bp: 0
                }
            })
            break
        case '5':
            this.setState({
                precent: {
                    type: 5,
                    np: 0.18,
                    p2o5p: 0.46,
                    k2op: 0,
                    sp: 0,
                    znp: 0,
                    bp: 0
                }
            })
            break
        default:
            break
        }
    }
    inputChange(e) {
        // console.log(e.target.value)
        this.setState({
            value: e.target.value
        })
       
    }
    render() {
        const select = <select name="" id="" value={this.state.precent.type} onChange={this.selectChange}>
            <option value="0">尿素</option>
            <option value="1">磷酸二氢钾</option>
            <option value="2">硫酸钾</option>
            <option value="3">硫酸锌</option>
            <option value="4">一铵</option>
            <option value="5">二铵</option></select>
        return (
            <tr>
                <td>{select}</td>
                <td><input type="text" value={this.state.value} onChange={this.inputChange}/></td>
                {
                    ['np', 'p2o5p', 'k2op','sp','znp','bp'].map((value, index)=>{
                        {/* console.log(this.state.precent['n']) */}
                        return (<td key={index}>
                            {this.state.precent[value]}
                        </td>)
                    })
                }
                {
                    ['np', 'p2o5p', 'k2op', 'sp', 'znp', 'bp'].map((value, index) => {
                        let res = Number(this.state.precent[value])* Number(this.state.value)
                        if (res.toString().split('.')[1] && (res.toString().split('.')[1].length > 2)) {
                            res = res.toFixed(2)
                        } 
                        return (<td key={index}>
                            {res}
                        </td>)
                    })
                }
            </tr>
        )
    }
}
export default Tr