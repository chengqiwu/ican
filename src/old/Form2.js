import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Tr from './Tr'
import 'css/form2.scss'

class Form2 extends Component {
    constructor() {
        super()
        this.state = {
            ha: true,
            mu: false,
            allin: [],
            bottom: []
        }
        this.allinClick = this.allinClick.bind(this)
        this.bottomClick = this.bottomClick.bind(this)
    }
    componentDidMount() {
        !this.allin.onclick && (this.allin.onclick = this.allinClick)
        !this.bottom.onclick && (this.bottom.onclick = this.bottomClick)
    }
    allinClick() {
        this.setState((prevState)=>{
            return {
                ...prevState,
                allin: [
                    ...prevState.allin,
                    1
                ]
            }
        })
    }
    bottomClick() {
        this.setState((prevState) => {
            return {
                ...prevState,
                bottom: [
                    ...prevState.bottom,
                    1
                ]
            }
        })
    }
    render() {
        return (
            <div className='planer'>
                <div className='plan-title'>
                    <h4>种植计划</h4>
                    <hr/>
                </div>
                <div className='content'>
                    <div className='unit'>
                        <label className={this.state.mu ? 'active' : 'no-active'}>公斤／亩</label>
                        <label>|</label>
                        <label className={this.state.ha ? 'active' : 'no-active'}>公斤／公顷</label>
                    </div>
                    <table className='gridtable fertilizer'>
                        <thead>
                            <tr>
                                <th>总肥料配方</th>
                                <th>公斤／亩</th>
                                <th>N％</th>
                                <th>P2O5％</th>
                                <th>K2O％</th>
                                <th>S％</th>
                                <th>Zn％</th>
                                <th>B％</th>
                                <th>N</th>
                                <th>P2O5</th>
                                <th>K2O</th>
                                <th>S</th>
                                <th>ZN</th>
                                <th>B</th>
                            </tr>
                           
                        </thead>
                        <tbody>
                            <Tr />
                            {
                                this.state.allin.map((item, index) => {
                                    console.log(index)
                                    return <Tr key={index}/>
                                })
                            }
                        </tbody>
                    </table>
                   
                    <div className='table-add'>
                        <button ref={allin => this.allin = allin}>+</button><label>增加一行</label>
                    </div>
                    <table className='gridtable fertilizer'>
                        <thead>
                            <tr>
                                <th>底肥</th>
                                <th>公斤／亩</th>
                                <th>N％</th>
                                <th>P2O5％</th>
                                <th>K2O％</th>
                                <th>S％</th>
                                <th>Zn％</th>
                                <th>B％</th>
                                <th>N</th>
                                <th>P2O5</th>
                                <th>K2O</th>
                                <th>S</th>
                                <th>ZN</th>
                                <th>B</th>
                            </tr>
                          
                        </thead>
                        <tbody>
                            {
                                this.state.bottom.map((item, index) => {
                                    console.log(index)
                                    return <Tr key={index} />
                                })
                            }
                        </tbody>
                    </table>
                    <div className='table-add'>
                        <button ref={bottom => this.bottom = bottom}>
                            <span>+</span>
                        </button><label>增加一行</label>
                    </div>
                </div>
                <div className='plan-form'>
                    <div className='plan-details'>
                        <h4 >方案详情</h4>
                    </div>
                    <div className='plan-message'>
                        <div>
                            <label>追肥计算：</label>水肥一体 + 叶面喷
                        </div>
                        <div>
                            <div>
                                <label>播种密度：</label>
                                <input type="text" /> 株/亩
                            </div>
                            <div>
                                <label>播种日期: </label>
                                <input type="date" />
                            </div>
                            <div>
                                <label>PH: </label>
                                <input />
                            </div>
                            <div>
                                <label>覆膜: </label>
                                <input />
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>滴灌出齐苗水+肥：</label>
                                <input /> m3/亩
                            </div>
                            <div>
                                <label>灌溉总量: </label>
                                <input /> m3/亩
                            </div>
                            <div>
                                <label>追肥 - 总氮: </label>
                                <input />
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                   
                    <table className='gridtable'>
                        <thead>
                            <tr>
                                <th>玉米生长阶段</th>
                                <th>六到七叶期</th>
                                <th>九到十叶期</th>
                                <th>十四叶期</th>
                                <th>开始抽雄</th>
                                <th>授粉中期</th>
                                <th>R2</th>
                                <th>Early R4</th>
                                <th>Early R5</th>
                                <th>总和</th>
                            </tr>
                           
                        </thead>
                        <tbody>
                            <tr>
                                <td>出苗后华氏GDDF</td>
                                <td>500</td>
                                <td>750</td>
                                <td>1000</td>
                                <td>1275</td>
                                <td>1450</td>
                                <td>1625</td>
                                <td>1850</td>
                                <td>2050</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>灌溉水％</td>
                                <td>7%</td>
                                <td>12%</td>
                                <td>14%</td>
                                <td>15.5%</td>
                                <td>15.5%</td>
                                <td>12%</td>
                                <td>10%</td>
                                <td>14%</td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>灌水量（m3/亩）</td>
                                <td>27.3</td>
                                <td>46.8</td>
                                <td>54.6</td>
                                <td>60.5</td>
                                <td>60.5</td>
                                <td>46.8</td>
                                <td>39.0</td>
                                <td>54.6</td>
                                <td>390</td>
                            </tr>
                            <tr>
                                <td>灌水量（cm）</td>
                                <td>4</td>
                                <td>7</td>
                                <td>8</td>
                                <td>9</td>
                                <td>9</td>
                                <td>7</td>
                                <td>6</td>
                                <td>6</td>
                                <td>59</td>
                            </tr>
                        </tbody>
                    
                    </table>
                   
                    <div className='plan-sub'>
                        <h4>施肥比例</h4>
                    </div>
                    <table className='gridtable'>
                        <tbody>
                            
                            <tr>
                                <td>N％</td>
                                <td>10%</td>
                                <td>20%</td>
                                <td>20%</td>
                                <td>20%</td>
                                <td>15%</td>
                                <td>10%</td>
                                <td>5%</td>
                                <td>0%</td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>P2O5％</td>
                                <td>0%</td>
                                <td>0%</td>
                                <td>30%</td>
                                <td>20%</td>
                                <td>20%</td>
                                <td>15%</td>
                                <td>15%</td>
                                <td>0%</td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>硫酸钾 - K2O％</td>
                                <td>0%</td>
                                <td>20%</td>
                                <td>25%</td>
                                <td>20%</td>
                                <td>20%</td>
                                <td>15%</td>
                                <td>0%</td>
                                <td>0%</td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>硫酸锌</td>
                                <td>50%</td>
                                <td>50%</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>100%</td>
                            </tr>
                            <tr>
                                <td>B％</td>
                                <td>50%</td>
                                <td>50%</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>100%</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='plan-sub'>
                        <h4>施肥量</h4>
                        <div className='unit'>
                            <label className={this.state.mu ? 'active' : 'no-active'}>公斤／亩</label>
                            <label>|</label>
                            <label className={this.state.ha ? 'active' : 'no-active'}>公斤／公顷</label>
                        </div>
                    </div>
                    <table className='gridtable'>
                        <tbody>
                            <tr>
                                <td>尿素</td>
                                <td>3.2</td>
                                <td>6.4</td>
                                <td>6.4</td>
                                <td>6.4</td>
                                <td>4.8</td>
                                <td>3.2</td>
                                <td>1.6</td>
                                <td>0.0</td>
                                <td>32</td>
                            </tr>
                            <tr>
                                <td>一铵</td>
                                <td>0</td>
                                <td>0</td>
                                <td>6</td>
                                <td>4</td>
                                <td>4</td>
                                <td>3</td>
                                <td>3</td>
                                <td>0</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>硫酸钾</td>
                                <td>0</td>
                                <td>2.2</td>
                                <td>2.75</td>
                                <td>2.2</td>
                                <td>2.2</td>
                                <td>1.65</td>
                                <td>0</td>
                                <td>0</td>
                                <td>11</td>
                            </tr>
                            <tr>
                                <td>硫酸锌（叶喷）</td>
                                <td>0.15</td>
                                <td>0.15</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0.3</td>
                            </tr>
                            <tr>
                                <td>硫酸钾</td>
                                <td>0.16</td>
                                <td>0.16</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0.32</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='plan-sub'>
                        <h4>具体实施计划</h4>
                    </div>
                    <table className='gridtable'>
                        <thead>
                            <tr>
                                <th>执行日期</th>
                                <th>类别</th>
                                <th>滴水时间</th>
                                <th>尿素</th>
                                <th>一铵</th>
                                <th>硫酸钾</th>
                                <th>磷酸二氢钾</th>
                                <th>硫酸锌</th>
                                <th>硼</th>
                                <th>说明</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>4/12/2018</td> 
                                <td>施种肥</td> 
                                <td></td> 
                                <td></td> 
                                <td>10 公斤/亩</td> 
                                <td></td> 
                                <td></td> 
                                <td></td> 
                                <td></td> 
                                <td></td> 
                            </tr>
                            <tr>
                                <td>4/16/2018</td>
                                <td>出苗水</td>
                                <td>5 - 7 小时</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>水峰到种子</td>
                            </tr>
                            <tr>
                                <td>4/16/2018</td>
                                <td>出苗水</td>
                                <td>5 - 7 小时</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>水峰到种子</td>
                            </tr>
                            <tr>
                                <td>4/26/2018</td>
                                <td>幼苗肥</td>
                                <td>2 小时</td>
                                <td>2</td>
                                <td>2</td>
                                <td>1</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>5/12/2018</td>
                                <td>清水</td>
                                <td>1.5小时</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>如果叶卷， 在早10点前，滴灌1.5 小时；没叶卷，不滴灌</td>
                            </tr>
                            <tr>
                                <td>5/15/2018</td>
                                <td>叶面肥</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>100 克/亩</td>
                                <td>150 克/亩</td>
                                <td></td>
                                <td>锌肥可不施</td>
                            </tr>
                            <tr>
                                <td>6/6/2018</td>
                                <td>叶面肥</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>100 克/亩</td>
                                <td>150 克/亩</td>
                                <td></td>
                                <td>锌肥可不施</td>
                            </tr>
                            <tr>
                                <td>6/12/2018</td>
                                <td>水 + 肥</td>
                                <td>6小时</td>
                                <td>4</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>6/19/2018</td>
                                <td>水 + 肥</td>
                                <td>6小时</td>
                                <td>5</td>
                                <td>3</td>
                                <td>2.2</td>
                                <td></td>
                                <td></td>
                                <td>80 克/亩</td>
                                <td>硼肥可不施</td>
                            </tr>
                            <tr>
                                <td>6/30/2018</td>
                                <td>水 + 肥</td>
                                <td>6小时</td>
                                <td>5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td>80 克/亩</td>
                                <td>硼肥可不施</td>
                            </tr>
                            <tr>
                                <td>7/6/2018</td>
                                <td>水 + 肥</td>
                                <td>7小时</td>
                                <td>7</td>
                                <td>2</td>
                                <td>2.2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>7/12/2018</td>
                                <td>水 + 肥</td>
                                <td>8小时</td>
                                <td>4.5</td>
                                <td></td>
                                <td>2.2</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>7/18/2018</td>
                                <td>水 + 肥</td>
                                <td>7小时</td>
                                <td>3</td>
                                <td>1.5</td>
                                <td>2.6</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>8/2/2018</td>
                                <td>水 + 肥</td>
                                <td>8小时</td>
                                <td>1.5</td>
                                <td>1.5</td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                    <div><button>保存方案</button></div>
                </div>
            </div>
        )
    }
}
Form2.propTypes = {
    name: PropTypes.string
}
export default Form2