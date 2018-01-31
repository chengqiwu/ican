import React, { Component } from 'react'
import PropTypes from 'prop-types'
import 'css/form.scss'
class Form extends Component {
    constructor() {
        super()
        this.state = {
            soil: true,
            sow: false,
            fertilizer: false,
            foliar: false,
            harvest: false
        }
        this.nextSubmit = this.nextSubmit.bind(this)
        this.soliChange = this.soliChange.bind(this)
        this.sowChange = this.sowChange.bind(this)
        this.fertilizerChange = this.fertilizerChange.bind(this)
        this.foliarChange = this.foliarChange.bind(this)
        this.harvestChange = this.harvestChange.bind(this)

    }
    componentDidMount() {
        !this.soily.onchange && (this.soily.onchange = this.soliChange)
        !this.soiln.onchange && (this.soiln.onchange = this.soliChange)
        
        !this.sowy.onchange && (this.sowy.onchange = this.sowChange)
        !this.sown.onchange && (this.sown.onchange = this.sowChange)
        
        !this.fertilizery.onchange && (this.fertilizery.onchange = this.fertilizerChange)
        !this.fertilizern.onchange && (this.fertilizern.onchange = this.fertilizerChange)
        
        !this.foliary.onchange && (this.foliary.onchange = this.foliarChange)
        !this.foliarn.onchange && (this.foliarn.onchange = this.foliarChange)
        
        !this.harvesty.onchange && (this.harvesty.onchange = this.harvestChange)
        !this.harvestn.onchange && (this.harvestn.onchange = this.harvestChange)
    }
    nextSubmit(e) {
        e.preventDefault()
    }
    soliChange(e) {
        this.handleChange('soil', e.target.value)
    }
    sowChange(e) {
        console.log(e.target.value)
        this.handleChange('sow', e.target.value)
    }
    fertilizerChange(e) {
        this.handleChange('fertilizer', e.target.value)
    }
    foliarChange(e) {
        this.handleChange('foliar', e.target.value)
    }
    harvestChange(e) {
       
        this.handleChange('harvest', e.target.value)
    }
    handleChange(state, value) {
        const type = value === `${state}-y`
        console.log(value === `${state}-y`, this.state[state])
        if (this.state[state] !== type) {
            this.setState({
                [state]: type
            })
        }
    }
    render() {
        return (
            <form onSubmit={this.nextSubmit} className='fill-form'>
                <div>{this.props.name}</div>
                <div className='first'>
                    <div>
                        <div>
                            <label>种植季：</label>
                            <select name="" id="">
                                <option value="201801">2018-春</option>
                                <option value="201802">2018-秋</option>
                                <option value="201803">2018-夏</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>当季作物：</label>
                            <select name="" id="">
                                <option value="春玉米" >春玉米</option>
                                <option value="春黄豆">春黄豆</option>
                                <option value="春小米">春小米</option>
                                <option value="春水稻">春水稻</option>
                                <option value="冬小麦">冬小麦</option>
                                <option value="夏玉米">夏玉米</option>
                            </select>
                        </div>
                        <div>
                            <label>当季品种：</label>
                            <select name="" id="">
                                <option value="农华101">农华101</option>
                                <option value="伟科702">伟科702</option>
                                <option value="联创808">联创808</option>
                                <option value="隆平208">隆平208</option>
                                <option value="大丰30">大丰30</option>
                                <option value="蠡玉88">蠡玉88</option>
                                <option value="先玉335">先玉335</option>
                                <option value="登海618">登海618</option>
                                <option value="宁玉507">宁玉507</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>前季作物：</label>
                            <select name="" id="">
                                <option value="春玉米" >春玉米</option>
                                <option value="春黄豆">春黄豆</option>
                                <option value="春小米">春小米</option>
                                <option value="春水稻">春水稻</option>
                                <option value="冬小麦">冬小麦</option>
                                <option value="夏玉米">夏玉米</option>
                            </select>
                        </div>
                        <div>
                            <label>前季品种：</label>
                            <select name="" id="">
                                <option value="农华101">农华101</option>
                                <option value="伟科702">伟科702</option>
                                <option value="联创808">联创808</option>
                                <option value="隆平208">隆平208</option>
                                <option value="大丰30">大丰30</option>
                                <option value="蠡玉88">蠡玉88</option>
                                <option value="先玉335">先玉335</option>
                                <option value="登海618">登海618</option>
                                <option value="宁玉507">宁玉507</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>
                                前季密度：
                            </label>
                            <input type="text" />
                        </div>
                        <div>
                            <label>
                                前季产量：
                            </label>
                            <input type="text" />
                        </div>
                    </div>
                    <div>
                        <div className='history'>
                            <label>历史产量（吨/公顷）：</label>
                            <input type="number" name="" id="" placeholder='最高产量' />
                            <input type="number" name="" id="" placeholder='最低产量' />
                            <input type="number" name="" id="" placeholder='平均产量' />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>常见病害：</label>
                            <select name="" id="">
                                <option value="">感冒</option>
                            </select>
                        </div>
                        <div>
                            <label>常见虫害：</label>
                            <select name="" id="">
                                <option value="">蝗虫</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>土壤样品：</label>
                            <div>
                                <input type="radio" name="soil" value='soil-y' ref={soily => this.soily = soily} /><label>有</label>
                            </div>
                            <div>
                                <input type="radio" name="soil" value='soil-n' ref={soiln => this.soiln = soiln} /><label>无</label>
                            </div>
                           
                        </div>
                      
                    </div>
                    
                    {
                        this.state.soil ? <div>
                            <div>
                                <label>上传土壤样品：</label>
                                <input type="file" name="" id="" />
                            </div>
                        </div> : 
                            <div>
                                <div>
                                    <label>土壤类型：</label>
                                    <select name="" id="">
                                        <option value="">沙土</option>
                                        <option value="">沙土</option>
                                    </select>
                                </div>
                                <div>
                                    <label>地下1米刨面图：</label>
                                    <input type="file" name="" id="" />
                                </div>
                            </div>
                    }
                  
                    <div>
                        <div>
                            <label>土壤酸碱度：</label>
                            <input type="text" />
                        </div>
                        <div>
                            <label>土壤有机质范围：</label>
                            <input type="text" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>气象站：</label>
                            <div>
                                <input type="radio" /><label>有</label>
                            </div>
                            <div>
                                <input type="radio" /><label>无</label>
                            </div>
                        </div>
                        <div>
                            <label>地势：</label>
                            <div>
                                <input type="radio" /><label>平地</label>

                            </div>
                            <div>
                                <input type="radio" /><label>坡地</label>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>整地方式：</label>
                            <select name="" id="">
                                <option value="">浅耕</option>
                            </select>
                        </div>
                        <div>
                            <label>常见自然灾害：</label>
                            <select name="" id="">
                                <option value="">强风</option>
                            </select>
                        </div>
                    </div>
                    <div className='exact'>
                        <div>
                            <label>播种机：</label>
                            <div>
                                <input type="radio" name='sow' value='sow-y' ref={sowy => this.sowy = sowy}  /><label>有</label>

                            </div>
                            <div>
                                <input type="radio" name='sow' value='sow-n' ref={sown => this.sown = sown} /><label>无</label>
                            </div>
                          
                        </div>
                        {
                            this.state.sow ? <div className='exact-block'>
                                <label>机型：</label>
                                <input type="text" />
                            </div> : null
                        }
                        {
                            this.state.sow ? <div className='exact-block'>
                            </div> : null
                        }
                    </div>
                    <div className='exact'>
                        <div>
                            <label>追肥机：</label>
                            <div>
                                <input type="radio" name='fertilizer' value='fertilizer-y' ref={fertilizery => this.fertilizery = fertilizery} /><label>有</label>

                            </div>
                            <div>
                                <input type="radio" name='fertilizer' value='fertilizer-n' ref={fertilizern => this.fertilizern = fertilizern}/><label>无</label>
                            </div>
                          
                        </div>
                        {
                            this.state.fertilizer ? <div className='exact-block'>
                                <label>机型：</label>
                                <input type="text" />
                            </div> : null
                        }
                        {
                            this.state.fertilizer ? <div className='exact-block'>
                                <label>高度限制：</label>
                                <input type="text" />
                            </div> : null
                        }
                    </div>
                    <div className='exact'>
                        <div>
                            <label>叶喷肥机：</label>
                            <div>
                                <input type="radio" name='foliar' value='foliar-y' ref={foliary => this.foliary = foliary}/><label>有</label>

                            </div>
                            <div>
                                <input type="radio" name='foliar' value='foliar-n'ref={foliarn => this.foliarn = foliarn}/><label>无</label>
                            </div>
                           
                        </div>
                        {
                            this.state.foliar ? <div className='exact-block'>
                                <label>机型：</label>
                                <input type="text" />
                            </div> : null
                        }
                        {
                            this.state.foliar ? <div className='exact-block'>
                                <label>高度限制：</label>
                                <input type="text" />
                            </div> : null
                        }
                        
                    </div>
                    <div className='exact'>
                        <div>
                            <label>收割机：</label>
                            <div>
                                <input type="radio" name='harvest' value='harvest-y' ref={harvesty => this.harvesty = harvesty}/><label>有</label>

                            </div>
                            <div>
                                <input type="radio" name='harvest' value='harvest-n' ref={harvestn => this.harvestn = harvestn}/><label>无</label>
                            </div>
                           
                        </div>
                        {   
                            this.state.harvest ? <div className='exact-block'>
                                <label>机型：</label>
                                <input type="text" />
                            </div> : null
                        }
                        {
                            this.state.harvest ? <div className='exact-block'>
                            </div> : null
                        }
                    </div>
                    <div>
                        <div>
                            <label>灌溉条件：</label>
                            <select name="" id="">
                                <option value="滴灌">滴灌</option>
                                <option value="喷灌">喷灌</option>
                                <option value="漫灌（ 随时）">漫灌（ 随时）</option>
                                <option value="漫灌（何时有水不定）">漫灌（何时有水不定）</option>
                                <option value="无">无</option>
                            </select>
                        </div>
                        
                    </div>
                </div>
                <div className='submit'>
                    <input type="submit" value="下一步" />                    
                </div>
            </form>
        )
    }
}
Form.propTypes = {
    name: PropTypes.string
}
export default Form