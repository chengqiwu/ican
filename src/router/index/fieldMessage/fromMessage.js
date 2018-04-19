
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { setMessage } from '_redux/actions/message'
import { findCriosAndVarietiesList, findSoilList, findPestsByCropsId } from 'utils/Api'


class FromMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            season: [],
            crios: [],
            currVarieties: [],
            preVarieties: [],
            prevVarietiesName: '',
            soils: [],
            diseases: [],
            pests: [],
            soil: true,
            sow: false,
            fertilizer: false,
            foliar: false,
            harvest: false,
        }
        this.handleChange = this.handleChange.bind(this)
        this.sowChange = this.sowChange.bind(this)
        this.fertilizerChange = this.fertilizerChange.bind(this)
        this.foliarChange = this.foliarChange.bind(this)
        this.harvestChange = this.harvestChange.bind(this)
    }

    soliChange(e) {
        this.handleChange('soil', e.target.value)
    }
    sowChange(e) {
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
        if (this.state[state] !== type) {
            this.setState({
                [state]: type
            })
        }
    }
    componentDidMount() {
        !this.sowy.onchange && (this.sowy.onchange = this.sowChange)
        !this.sown.onchange && (this.sown.onchange = this.sowChange)

        !this.fertilizery.onchange && (this.fertilizery.onchange = this.fertilizerChange)
        !this.fertilizern.onchange && (this.fertilizern.onchange = this.fertilizerChange)

        !this.foliary.onchange && (this.foliary.onchange = this.foliarChange)
        !this.foliarn.onchange && (this.foliarn.onchange = this.foliarChange)

        !this.harvesty.onchange && (this.harvesty.onchange = this.harvestChange)
        !this.harvestn.onchange && (this.harvestn.onchange = this.harvestChange)
        this.handleCriosAndVarieties()
            .then(() => this.handelefindSoilList())
            .then(() => {
                const year = new Date().getFullYear()
                const season = ['春', '秋', '夏'].map(e => `${year}-${e}`)
                this.setState({
                    season
                })
            })
            .then(() => {
                console.log(this.state)
                const initialVaule = {
                    cropsId: this.state.crios[0].id,
                    varietiesId: this.state.currVarieties[0].id,
                    varietiesName: this.state.currVarieties[0].name,
                    plantingSeason: this.state.season[0],
                    commonPests: '无',
                    commonDisease: '无',
                    hasSample: '0',
                    weatherStations: '0',
                    topography: '0',
                    soilPreparation: '0',
                    commonNaturalDisasters: '0',
                    fertilizer: '0',
                    drill: '0',
                    ypfj: '0',
                    harvest: '0',
                    irrigation: '0'
                }
                this.props.getMessage(initialVaule)
            }) 
        
       
        
    }
    getMessage() {
        const { id } = this.props.feature

        if (!id) {
            return
        }
        return findReasonById({
            farmLandId: id,
            isNew: 1
        }).then(e => e.data)
            .then(data => {
                console.log(data)
                if (data.msg === '200') {
                    this.setState({
                        initial: data.result
                    })
                }
            })
    }
    handelefindSoilList() {
        return findSoilList().then(res => res.data).then(data => {
            if (data.msg === '200') {
                this.props.setMessage({
                    soilTypes: data.result
                })
                this.setState({
                    soils: data.result
                })
            }
        })
    }
    handleCriosAndVarieties() {
        return findCriosAndVarietiesList().then(res => res.data).then(data => {
            if (data.msg === '200') {
                this.props.setMessage({
                    criosAndVarietiesList: data.result
                })
                this.setState({
                    crios: data.result,
                    currVarieties: data.result[0].list,
                    preVarieties: data.result[0].list
                })
            }
            return data.result[0].id
        }).then(id => this.handlefindPestsByCropsId(id))
        
    }
    handlefindPestsByCropsId(id) {
        findPestsByCropsId(id).then(res => res.data).then(data => {
            if (data.msg === '200') {
                const { disease, pests } = data.result

                disease ?
                    pests ? 
                        this.setState({
                            diseases,
                            pests
                        }) : this.setState({
                            disease
                        })
                    : pests ?
                        this.setState({
                            pests
                        })
                        : null
            }
        })
    }
    currCriosChange(e) {
        const value = e.target.value
        for (let crio of this.state.crios) {
            if (crio.id === value) {
                this.setState({
                    currVarieties: crio.list
                })
                this.handlefindPestsByCropsId(crio.id)
                break
            }
        }
    }
    preCriosChange(e) {
        const value = e.target.value

        for (let crio of this.state.crios) {
            if (crio.id === value) {
                this.setState({
                    preVarieties: crio.list,
                })
                break
            }
        }
    }
    prevVarietiesChange(e) {
        const value = e.target.value
        this.setState({
            prevVarietiesName: value
        })
    }
    render() {
        
        return (
            <div className='first'>
                <div>
                    <div>
                        <div>
                            <Field name='quarterCropsId' component='input' type='hidden'/>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>种植季：</label>
                            <Field name="plantingSeason" component='select' required>
                                {
                                    this.state.season.map(sea => <option key={sea} value={sea}>{sea}</option> )
                                }
                            </Field>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>当季作物：</label>
                            <Field name="cropsId" component='select' onChange={this.currCriosChange.bind(this)} required>
                                {
                                    this.state.crios.map(crio => <option key={crio.id} value={crio.id}>{crio.name}</option>)
                                }
                            </Field>
                        </div>
                        <div>
                            <label>当季品种：</label>
                            <Field name="varietiesId" id="" component='select' required>
                                {
                                    this.state.currVarieties.map(variety => <option key={variety.id} value={variety.id}>{variety.name}</option>)
                                }
                            </Field>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>前季作物：</label>
                            <Field name="prevCropsId" component='select' onChange={this.preCriosChange.bind(this)}>
                                <option value='无'>无</option>
                                {
                                    this.state.crios.map(crio => <option key={crio.id} value={crio.id}>{crio.name}</option>)
                                }
                            </Field>
                        </div>
                        <div>
                            <label>前季品种：</label>
                            <Field name="prevVarietiesName" id="" component='select' onChange={this.prevVarietiesChange}>
                                <option value='无'>无</option>
                                {
                                    this.state.preVarieties.map(variety => <option key={variety.id} value={variety.id}>{variety.name}</option>)
                                }
                            </Field>
                            <Field name="prevVarietiesName" component='input' type='hidden' value={this.state.prevVarietiesName} />                            
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>
                                前季密度：
                            </label>
                            <Field name='prevDensity' component="input" type="text" />
                        </div>
                        <div>
                            <label>
                                前季产量：
                            </label>
                            <Field name='prevProduction' component="input" type="text" />
                        </div>
                    </div>
                    <div>
                        <div className='history'>
                            <label>历史产量（吨/公顷）：</label>
                            <div>
                                <Field component="input" type="number" name="maxProduction" id="" placeholder='最高产量' />
                                <Field component="input" type="number" name="minProduction" id="" placeholder='最低产量' />
                                <Field component="input" type="number" name="aveProduction" id="" placeholder='平均产量' />
                            </div>
                        </div>

                    </div>
                    <div>
                        <div>
                            <label>常见病害：</label>
                            <Field component='select' name="commonPests" id="" required>
                                <option value='无'>无</option>
                                {
                                    this.state.diseases.map(disease => <option key={disease.key} value={disease.value}>{disease.value}</option>)
                                }
                            </Field>
                        </div>
                        <div>
                            <label>常见虫害：</label>
                            <Field component='select' name="commonDisease" id="" required>
                                <option value='无'>无</option>
                                {
                                    this.state.pests.map(pest => <option key={pest.key} value={pest.value}>{pest.value}</option>)
                                }
                            </Field>
                        </div>
                    </div>
                </div>
                <div>
                    <div>
                        <div className='soil'>
                            <label>土壤样品：</label>
                            <div>
                                <Field component="input" type="radio" name="hasSample"  value='1' ref={soily => this.soily = soily} required/><span>有</span>
                                <Field component="input" type="radio" name="hasSample" value='0' ref={soiln => this.soiln = soiln} required/><span>无</span>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>上传土壤样品：</label>
                                <Field component="input" type="file" name="soilSamplesPath" id="" />
                            </div>
                        </div>
                    </div>


                    <div>
                        <div>
                            <label>土壤类型：</label>
                            <Field component="select" name="soilType" id="">
                                <option value='无'>无</option>
                                {
                                    this.state.soils.map(soil => <option key={soil.key} value={soil.value}>{soil.value}</option>)
                                }
                            </Field>
                        </div>
                        <div>
                            <label>地下1米刨面图：</label>
                            <Field component="input" type="file" name="profilePath" id="" />
                        </div>
                    </div>


                    <div>
                        <div>
                            <label>土壤酸碱度：</label>
                            <Field name='soilPh' component="input" type="text" />
                        </div>
                        <div>
                            <label>土壤有机质范围：</label>
                            <Field name='organicMatter' component="input" type="text" />
                        </div>
                    </div>
                </div>
                <div className='second'>
                    <div>
                        <div className='weather'>
                            <label>气象站：</label>
                            <div>
                                <Field component="input" type="radio" name='weatherStations' value='1' required /><span>有</span>
                                <Field component="input" type="radio" name='weatherStations' value='0' required /><span>无</span>
                            </div>
                        </div>
                        <div className='terrain'>
                            <label>地势：</label>
                            <div>
                                <Field component="input" type="radio" name='topography' value='0' required/><span>平地</span>
                                <Field component="input" type="radio" name='topography' value='1' required/><span>坡地</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>整地方式：</label>
                            <Field component="select" name="soilPreparation" id="" required>
                                <option value="0">免耕</option>
                                <option value="1">浅耕</option>
                                <option value="2">深耕</option>
                            </Field>
                        </div>
                        <div>
                            <label>常见自然灾害：</label>
                            <Field component="select" name="commonNaturalDisasters" id="" required>
                                <option value="0">强风</option>
                                <option value="1">冰雹</option>
                                <option value="2">倒春寒</option>
                                <option value="3">干旱</option>
                                <option value="4">暴雨</option>
                            </Field>
                        </div>
                    </div>
                    <div>
                        <div className='exact'>
                            <label>播种机：</label>
                            <div>
                                <Field component="input" type="radio" name='drill' value='1' ref={sowy => this.sowy = sowy} required/><span>有</span>
                                <Field component="input" type="radio" name='drill' value='0' ref={sown => this.sown = sown} required/><span>无</span>
                            </div>
                            {
                                this.state.sow ? <div className='exact-block'>
                                    <label>机型：</label>
                                    <Field name='drillModel' component="input" type="text" required/>
                                </div> : null
                            }
                            {
                                this.state.sow ? <div className='exact-block'>
                                </div> : null
                            }
                        </div>

                    </div>
                    <div>
                        <div className='exact'>
                            <label>追肥机：</label>
                            <div>
                                <Field component="input" type="radio" name='fertilizer' value='1' ref={fertilizery => this.fertilizery = fertilizery} required/><span>有</span>
                                <Field component="input" type="radio" name='fertilizer' value='0' ref={fertilizern => this.fertilizern = fertilizern} required/><span>无</span>
                            </div>
                            {
                                this.state.fertilizer ? <div className='exact-block'>
                                    <label>机型：</label>
                                    <Field name='fertilizerModel' component="input" type="text" required/>
                                </div> : null
                            }
                            {
                                this.state.fertilizer ? <div className='exact-block'>
                                    <label>高度限制：</label>
                                    <Field name='fertilizerHighLimit' component="input" type="text" required/>
                                </div> : null
                            }
                        </div>

                    </div>
                    <div>
                        <div className='exact'>
                            <label>叶喷肥机：</label>
                            <div>
                                <Field component="input" type="radio" name='ypfj' value='1' ref={foliary => this.foliary = foliary} required/><span>有</span>
                                <Field component="input" type="radio" name='ypfj' value='0' ref={foliarn => this.foliarn = foliarn} required/><span>无</span>
                            </div>
                            {
                                this.state.foliar ? <div className='exact-block'>
                                    <label>机型：</label>
                                    <Field name='ypfjModel' component="input" type="text" required/>
                                </div> : null
                            }
                            {
                                this.state.foliar ? <div className='exact-block'>
                                    <label>高度限制：</label>
                                    <Field name='ypfjHighLimit' component="input" type="text" required/>
                                </div> : null
                            }

                        </div>

                    </div>
                    <div>
                        <div className='exact'>
                            <label>收割机：</label>
                            <div>
                                <Field component="input" type="radio" name='harvest' value='1' ref={harvesty => this.harvesty = harvesty} required/><span>有</span>
                                <Field component="input" type="radio" name='harvest' value='0' ref={harvestn => this.harvestn = harvestn} required/><span>无</span>
                            </div>
                            {
                                this.state.harvest ? <div className='exact-block'>
                                    <label>机型：</label>
                                    <Field name='harvesterModel' component="input" type="text" required/>
                                </div> : null
                            }
                            {
                                this.state.harvest ? <div className='exact-block'>
                                </div> : null
                            }
                        </div>

                    </div>
                    <div>
                        <div>
                            <label>灌溉条件：</label>
                            <Field component="select" name='irrigation' id="" required>
                                <option value="0">无</option>                            
                                <option value="1">滴灌</option>
                                <option value="2">喷灌</option>
                                <option value="3">漫灌（ 随时）</option>
                                <option value="4">漫灌（何时有水不定）</option>
                            </Field>
                        </div>

                    </div>
                </div>


            </div>
            
        )
    }
}
FromMessage.propTypes = {
    feature: PropTypes.object,
    getMessage: PropTypes.func,
    setMessage: PropTypes.func
}
const mapStateToProps = (state) => {
    return {
        message: state.message
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        setMessage: function(action) {
            dispatch(setMessage(action))
        }
    }
}
export default connect(mapStateToProps, mapDispathToProps)(FromMessage)