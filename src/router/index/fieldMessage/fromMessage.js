
import React, { Component } from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import Select from 'react-select'
import 'css/react-select.scss'
import { connect } from 'react-redux'
import { setMessage } from '_redux/actions/message'
import { findCriosAndVarietiesList, findSoilList, findPestsByCropsId } from 'utils/Api'
import { setFieldMessage, showFieldMessage, startFieldMessage } from '_redux/actions/fieldMessage'
import { findReasonById, saveSeasonInfo } from 'utils/Api'
// const FileInput = ({ input, resetKey }) => {
//     const { value, ...inputProps } = input

//     const handleChange = (e) => {
//         input.onChange(e.target.files[0])
//     }

//     return (
//         <input {...inputProps} key={resetKey} type="file" onChange={handleChange} onBlur={() => { }} />
//     )
// }
// FileInput.propTypes = {
//     input: PropTypes.object,
//     resetKey: PropTypes.string
// } 
class FromMessage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            season: [], // 季节信息
            crios: [],  // 作物
            currVarieties: [], // 当前品种
            preVarieties: [],  // 之前品种
            soils: [], //土壤
            disease: [], // 病害
            pests: [], // 虫害
            commonPests: '',
            commonDisease: '',
            hasSample: 0, //土壤样品
            weatherStations: 0,
            topography: 0,
            soilPreparation: 0,
            commonNaturalDisasters: 0,
            drill: 0,
            fertilizer: 0,
            ypfj: 0,
            harvester: 0,
            irrigation: 0,

        }
        this.nextSubmit = this.nextSubmit.bind(this)
        this.radioChange = this.radioChange.bind(this)
    }
    componentDidMount() {
        this.handleCriosAndVarieties()
            .then(() => this.handelefindSoilList())
            .then(() => {
                const year = new Date().getFullYear()
                const season = ['2016-春', '2017-春']
                for( let y = 2018; y <= year; y ++) {
                    season.push(...['春', '夏', '秋'].map(e => `${year}-${e}`))
                }
                this.setState({
                    season
                })
            })
            .then(() => {
                const initialVaule = {
                    cropsId: this.state.crios[0].id,
                    varietiesId: this.state.currVarieties[0] ? this.state.currVarieties[0].id : undefined,
                    // varietiesName: this.state.currVarieties[0].name,
                    plantingSeason: this.state.season[0],
                    // prevCropsId: this.state.crios[0].id,
                    // prevVarietiesId: this.state.currVarieties[0].id,
                    // prevProduction: '0.0',
                    // prevDensity: '0.0',
                    commonPests: [],
                    commonDisease: [],
                    soilType: [],
                    // soilSamplesPath: '',
                    hasSample: '0',
                    // profilePath: '',
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
        const id = this.props.feature.feature.getId()
        const isNew = this.props.feature.feature.get('status')

        if (!id) {
            return
        }
        return findReasonById({
            farmLandId: id,
            isNew,
        }).then(e => e.data)
            .then(data => {
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
                
                const result = data.result.filter(res => res.list)
                console.log(result)
                this.props.setMessage({
                    criosAndVarietiesList: result
                })
                this.setState({
                    crios: result,
                    currVarieties: result[0].list || [],
                    preVarieties: result[0].list || []
                })
                return result[0].id
            }
            
        }).then(id => this.handlefindPestsByCropsId(id))
        
    }
    handlefindPestsByCropsId(id) {

        findPestsByCropsId(id).then(res => res.data).then(data => {
            if (data.msg === '200') {
                const { disease, pests } = data.result
                disease ?
                    pests ? 
                        this.setState({
                            disease,
                            pests
                        }) : this.setState({
                            disease,
                            pests: []
                        })
                    : pests ?
                        this.setState({
                            pests,
                            disease: []
                        })
                        : this.setState({
                            pests: [],
                            disease: []
                        })
            }
        })
    }
    currCriosChange(e) {
        const value = e.target.value
        console.log(value)
        for (let crio of this.state.crios) {
            if (crio.id === value) {
                this.setState({
                    currVarieties: crio.list || []
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
    radioChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    nextSubmit(e) {
        e.preventDefault()
        const submitData = {}

        !!this.quarterCropsId.value && (submitData['quarterCropsId'] = this.quarterCropsId.value)

        submitData['plantingSeason'] = this.plantingSeason.value

        submitData['cropsId'] = this.cropsId.value

        this.varietiesId.value.length !==0 && (submitData['varietiesId'] = this.varietiesId.value)
        // !this.varietiesName.value && (submitData['varietiesName'] = this.varietiesName.value)
        
        !!this.prevCropsId.value && (submitData['prevCropsId'] = this.prevCropsId.value)
        !!this.prevVarietiesId.value && (submitData['prevVarietiesId'] = this.prevVarietiesId.value)
        // !this.prevVarietiesName.value && (submitData['prevVarietiesName'] = this.prevVarietiesName.value)

        !!this.prevProduction.value && (submitData['prevProduction'] = this.prevProduction.value)
        !!this.prevDensity.value && (submitData['prevDensity'] = this.prevDensity.value)

        !!this.maxProduction.value && (submitData['maxProduction'] = this.maxProduction.value)
        !!this.minProduction.value && (submitData['minProduction'] = this.minProduction.value)
        !!this.aveProduction.value && (submitData['aveProduction'] = this.aveProduction.value)
        
        // submitData['commonPests'] = this.commonPests.value.toString()
        // submitData['commonDisease'] = this.commonPests.value.toString()
        
        submitData['hasSample'] = this.state.hasSample

        this.state.hasSample != 1 && !!this.soilType.value && (submitData['soilType'] = this.soilType.value)
        
        
        this.state.hasSample != 1 &&!!this.soilPh.value && (submitData['soilPh'] = this.soilPh.value)
        this.state.hasSample != 1 &&!!this.organicMatter.value && (submitData['organicMatter'] = this.organicMatter.value)
        const commonDisease = this.state.commonDisease
        if (!!commonDisease && commonDisease.length !== 0) {
            let disease = '' + commonDisease[0].value
            for (let i = 1; i < commonDisease.length; i++) {
                disease += (',' + commonDisease[i].value)
            }
            submitData['commonDisease'] = disease

        }
        const commonPests = this.state.commonPests
        console.log(commonPests)
        if (!!commonPests && commonPests.length !== 0) {
            let pest = '' + commonPests[0].value
            for (let i = 1; i < commonPests.length; i++) {
                pest += (',' + commonPests[i].value)
            }
            submitData['commonPests'] = pest

        }
        
        submitData['weatherStations'] = this.state.weatherStations
        submitData['topography'] = this.state.topography

        submitData['soilPreparation'] = this.soilPreparation.value
        submitData['commonNaturalDisasters'] = this.commonNaturalDisasters.value
        
        submitData['drill'] = this.state.drill
        this.state.drill == 1 && !!this.drillModel.value && (submitData['drillModel'] = this.drillModel.value)
        
        submitData['fertilizer'] = this.state.fertilizer
        this.state.fertilizer == 1 && !!this.fertilizerModel.value && (submitData['fertilizerModel'] = this.fertilizerModel.value)
        this.state.fertilizer == 1 && !!this.fertilizerHighLimit.value && (submitData['fertilizerHighLimit'] = this.fertilizerHighLimit.value)
        
        submitData['ypfj'] = this.state.ypfj
        this.state.ypfj == 1 && !!this.ypfjModel.value && (submitData['ypfjModel'] = this.ypfjModel.value)
        this.state.ypfj == 1 && !!this.ypfjHighLimit.value && (submitData['ypfjHighLimit'] = this.ypfjHighLimit.value)
        
        submitData['harvester'] = this.state.harvester
        this.state.harvester == 1 && !!this.harvesterModel.value && (submitData['harvesterModel'] = this.harvesterModel.value)
        
        submitData['irrigation'] = this.irrigation.value

        console.log(submitData)
        var fd = new FormData()
        const feature = this.props.feature


        fd.append('landInfo', JSON.stringify({
            ...submitData,
            landId: feature.getId().replace('tb_farmland.', '')
        }))
        
        this.state.hasSample == 0 && this.profilePath.length     !== 0 && fd.append('profilePath',     this.profilePath.files[0])
        this.state.hasSample == 1 && this.soilSamplesPath.length !== 0 && fd.append('soilSamplesPath', this.soilSamplesPath.files[0])
        
        saveSeasonInfo(fd).then(e => e.data).then(data => {
            if (data.msg === '200') {
                feature.set('status', '0')
                this.props.setFieldMessage(submitData)
                this.props.showFieldMessage(true)
                
            }
        })
    }
    diseaseChange = (commonDisease) => {
        console.log(commonDisease)
        
        this.setState({ commonDisease: commonDisease })
    }
    pestChange = (commonPests) => {
        console.log(commonPests)

        this.setState({ commonPests })
    }
    render() {
        return (
            <form onSubmit={this.nextSubmit.bind(this)} encType="multipart/form-data">

                <div className='first'>
                    <div>
                        <div>
                            <div>
                                <input type="hidden" ref={quarterCropsId => this.quarterCropsId = quarterCropsId}/>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>种植季：</label>
                                <select ref={plantingSeason => this.plantingSeason = plantingSeason} required>
                                    <option value="" selected="true" disabled="true">选择类型</option>
                                    {
                                        this.state.season.map(sea => <option key={sea} value={sea}>{sea}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>当季作物：</label>
                                <select ref={cropsId => this.cropsId = cropsId} required onChange={this.currCriosChange.bind(this)}>
                                    <option value="" selected="true" disabled="true" >选择类型</option>                          
                                    {
                                        this.state.crios.map(crio => <option key={crio.id} value={crio.id}>{crio.name}</option>)
                                    }
                                </select>
                            </div>
                            <div>
                                <label>当季品种：</label>
                                <select ref={varietiesId => this.varietiesId = varietiesId} disabled={this.cropsId && !this.cropsId.value}>
                                    <option value="" selected="true" disabled="true">选择类型</option>
                                    {
                                        this.state.currVarieties.map(variety => <option key={variety.id} value={variety.id}>{variety.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>前季作物：</label>
                                <select ref={prevCropsId => this.prevCropsId = prevCropsId} onChange={this.preCriosChange.bind(this)}>
                                    <option value="" selected="true" disabled="true">选择类型</option>
                                    {
                                        this.state.crios.map(crio => <option key={crio.id} value={crio.id}>{crio.name}</option>)
                                    }
                                </select>
                            </div>
                            <div>
                                <label>前季品种：</label>
                                <select ref={prevVarietiesId => this.prevVarietiesId = prevVarietiesId} disabled={this.prevCropsId && !this.prevCropsId.value}>
                                    <option value="" selected="true" disabled="true">选择类型</option>
                                    {
                                        this.state.preVarieties.map(variety => <option key={variety.id} value={variety.id}>{variety.name}</option>)
                                    }
                                </select>
                            </div>
                        </div>

                        <div>
                            <div>
                                <label>
                                    前季密度：
                                </label>
                                <input name='prevDensity' ref={prevDensity => this.prevDensity = prevDensity} type="text" />
                            </div>
                            <div>
                                <label>
                                    前季产量：
                                </label>
                                <input name='prevProduction' ref={prevProduction => this.prevProduction = prevProduction} type="text" />
                            </div>
                        </div>
                        <div>
                            <div className='history'>
                                <label>历史产量（吨/公顷）：</label>
                                <div>
                                    <input name='maxProduction' ref={maxProduction => this.maxProduction = maxProduction}  type="text" placeholder='最高产量'/>
                                    <input name='minProduction' ref={minProduction => this.minProduction = minProduction}  type="text" placeholder='最低产量'/>
                                    <input name='aveProduction' ref={aveProduction => this.aveProduction = aveProduction}  type="text" placeholder='平均产量'/>
                                    <span>（最高|最低|平均）</span>
                                </div>
                            </div>

                        </div>
                        <div>
                                    
                            <div className='Select'>
                                <label>常见病害：</label>
                                {/* <select name="commonPests" ref={commonPests => this.commonPests = commonPests} multiple='true' required>
                                    <option value="" selected="true" disabled="true">选择类型</option>
                                    {
                                        this.state.disease.map(disease => <option key={disease.key} value={disease.value}>{disease.value}</option>)
                                    }
                                </select> */}
                                <Select  ref={select => this.select = select}
                                    name='commonDisease' multi={true}
                                    value={this.state.commonDisease}
                                    placeholder='选择类型'
                                    noResultsText='无'
                                    // required={this.state.disease.length !== 0}
                                    onChange={this.diseaseChange}
                                    options={
                                        this.state.disease.map(disease => ({
                                            value: disease.key,
                                            label: disease.value
                                        }))
                                    }>
                                </Select>
                            </div>
                            <div className='Select'>
                                <label>常见虫害：</label>
                                {/* <select name="commonDisease" ref={commonDisease => this.commonDisease = commonDisease} multiple='true' required>
                                    <option value="" selected="true" disabled="true">选择类型</option>
                                    {
                                        this.state.pests.map(pest => <option key={pest.key} value={pest.value}>{pest.value}</option>)
                                    }
                                </select>
                                */}
                                <Select ref={select => this.select = select}
                                    name='commonPests' multi={true}
                                    value={this.state.commonPests}
                                    placeholder='选择类型'
                                    noResultsText='无'
                                    // required={this.state.pests.length !== 0}
                                    onChange={this.pestChange}
                                    options={
                                        this.state.pests.map(pest => ({
                                            value: pest.key,
                                            label: pest.value
                                        }))
                                    }>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='soil'>
                                <label>土壤样品：</label>
                                <div>
                                    <input type="radio" name="hasSample" value='1' onChange={this.radioChange} required checked={this.state.hasSample == 1 ? true : false} /><span>有</span>
                                    <input type="radio" name="hasSample" value='0' onChange={this.radioChange} required checked={this.state.hasSample == 0 ? true : false} /><span>无</span>
                                </div>
                            </div>
                            {
                                this.state.hasSample == 1
                                    ? <div>
                                        <div>
                                            <label>上传土壤样品：</label>
                                            <input type="file" name="soilSamplesPath" ref={soilSamplesPath => this.soilSamplesPath = soilSamplesPath} />
                                        </div>
                                    </div>
                                    :
                                    null
                            }
                          
                        </div>

                        {
                            this.state.hasSample != 1
                                ?
                                <div>
                                    <div>
                                        <label>土壤类型：</label>
                                        <select name="soilType" ref={soilType => this.soilType = soilType} defaultValue='select'>
                                            <option value="" selected="true" disabled="true">选择类型</option>
                                            {
                                                this.state.soils.map(soil => <option key={soil.key} value={soil.key}>{soil.value}</option>)
                                            }
                                        </select>
                                    </div>
                                    <div>
                                        <label>地下1米刨面图：</label>
                                        <input type="file" name="profilePath" ref={profilePath => this.profilePath = profilePath} />
                                    </div>
                                </div>
                                :
                                null
                        }
                        
                        {
                            this.state.hasSample != 1
                                ?
                                <div>
                                    <div>
                                        <label>土壤酸碱度：</label>
                                        <input type="text" name="soilPh" ref={soilPh => this.soilPh = soilPh} />
                                    </div>
                                    <div>
                                        <label>土壤有机质范围：</label>
                                        <input type="text" name="organicMatter" ref={organicMatter => this.organicMatter = organicMatter} />
                                    </div>
                                </div>
                                :
                                null
                        }

                       
                    </div>
                    <div className='second'>
                        <div>
                            <div className='weather'>
                                <label>气象站：</label>
                                <div>
                                    <input type="radio" name='weatherStations' value='1' required onChange={this.radioChange} checked={this.state.weatherStations == 1 ? true : false}/><span>有</span>
                                    <input type="radio" name='weatherStations' value='0' required onChange={this.radioChange} checked={this.state.weatherStations == 0 ? true : false}/><span>无</span>
                                </div>
                            </div>
                            <div className='terrain'>
                                <label>地势：</label>
                                <div>
                                    <input type="radio" name='topography' value='0' required onChange={this.radioChange} checked={this.state.topography == 0 ? true : false}/><span>平地</span>
                                    <input type="radio" name='topography' value='1' required onChange={this.radioChange} checked={this.state.topography == 1 ? true : false}/><span>坡地</span>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                
                                <label>整地方式：</label>
                                <select name="soilPreparation" ref={soilPreparation => this.soilPreparation = soilPreparation} required>
                                    <option value="0">免耕</option>
                                    <option value="1">浅耕</option>
                                    <option value="2">深耕</option>
                                </select>
                            </div>
                            <div>
                                
                                <label style={{width: '91px'}}>常见自然灾害：</label>
                                <select name="commonNaturalDisasters" ref={commonNaturalDisasters => this.commonNaturalDisasters = commonNaturalDisasters}  required>
                                    <option value="0">强风</option>
                                    <option value="1">冰雹</option>
                                    <option value="2">倒春寒</option>
                                    <option value="3">干旱</option>
                                    <option value="4">暴雨</option>
                                </select>
                            </div>
                        </div>
                        <div className='exact'>
                            <div>
                                <label>播种机：</label>
                                <div>
                                    <input type="radio" name='drill' value='1' 
                                        checked={this.state.drill == 1 ? true : false}
                                        onChange={this.radioChange} ref={sowy => this.sowy = sowy} required/><span>有</span>
                                    <input type="radio" name='drill' value='0' 
                                        checked={this.state.drill == 0 ? true : false}
                                        onChange={this.radioChange} ref={sown => this.sown = sown} required/><span>无</span>
                                </div>
                            
                            </div>
                            {
                                this.state.drill == 1 ? <div className='exact-block'>
                                    <label>机型：</label>
                                    <input name='drillModel' ref={drillModel => this.drillModel = drillModel}  type="text" required />
                                </div> : null
                            }
                            {
                                this.state.drill == 1 ? <div className='exact-block exact-no-block'>
                                </div> : null
                            }
                        </div>
                        <div className='exact'>
                            <div >
                                <label>追肥机：</label>
                                <div>
                                    <input type="radio" name='fertilizer' 
                                        checked={this.state.fertilizer == 1 ? true : false}
                                        onChange={this.radioChange} value='1'  required/><span>有</span>
                                    <input type="radio" name='fertilizer' 
                                        checked={this.state.fertilizer == 0 ? true : false}
                                        onChange={this.radioChange} value='0' required/><span>无</span>
                                </div>
                            
                            </div>
                            {
                                this.state.fertilizer == 1 ? <div className='exact-block'>
                                    <label>机型：</label>
                                    <input name='fertilizerModel' ref={fertilizerModel => this.fertilizerModel = fertilizerModel} type="text" required />
                                </div> : null
                            }
                            {
                                this.state.fertilizer == 1 ? <div className='exact-block'>
                                    <label>高度限制：</label>
                                    <input name='fertilizerHighLimit' ref={fertilizerHighLimit => this.fertilizerHighLimit = fertilizerHighLimit}  type="text" required />
                                </div> : null
                            }

                        </div>
                        <div className='exact'>
                            <div>
                                <label>叶喷肥机：</label>
                                <div>
                                    <input type="radio" name='ypfj' value='1' 
                                        checked={this.state.ypfj == 1 ? true : false}
                                        onChange={this.radioChange}  required/><span>有</span>
                                    <input type="radio" name='ypfj' value='0' 
                                        checked={this.state.ypfj == 0 ? true : false}
                                        onChange={this.radioChange}  required/><span>无</span>
                                </div>
                            

                            </div>
                            {
                                this.state.ypfj == 1 ? <div className='exact-block'>
                                    <label>机型：</label>
                                    <input name='ypfjModel' ref={ypfjModel => this.ypfjModel = ypfjModel}  type="text" required />
                                </div> : null
                            }
                            {
                                this.state.ypfj == 1 ? <div className='exact-block'>
                                    <label>高度限制：</label>
                                    <input name='ypfjHighLimit' ref={ypfjHighLimit => this.ypfjHighLimit = ypfjHighLimit}  type="text" required />
                                </div> : null
                            }
                        </div>
                        <div className='exact'>
                            <div>
                                <label>收割机：</label>
                                <div>
                                    <input type="radio" name='harvester' value='1' required
                                        checked={this.state.harvester == 1 ? true : false}
                                        onChange={this.radioChange}/><span>有</span>
                                    <input type="radio" name='harvester' onChange={this.radioChange} value='0' 
                                        checked={this.state.harvester == 0 ? true : false}
                                        required/><span>无</span>
                                </div>
                            
                            </div>
                            {
                                this.state.harvester == 1? <div className='exact-block'>
                                    <label>机型：</label>
                                    <input name='harvesterModel' ref={harvesterModel => this.harvesterModel = harvesterModel}  type="text" required />
                                </div> : null
                            }
                            {
                                this.state.harvester == 1 ? <div className='exact-block exact-no-block'>
                                </div> : null
                            }
                        </div>
                        <div>
                            <div>
                                <label>灌溉条件：</label>
                                <select name="irrigation" ref={irrigation => this.irrigation = irrigation} >
                                    <option value="0">无</option>
                                    <option value="1">滴灌</option>
                                    <option value="2">喷灌</option>
                                    <option value="3">漫灌（ 随时）</option>
                                    <option value="4">漫灌（何时有水不定）</option>
                                </select>
                            </div>

                        </div>
                    </div>


                </div>
                <div className='submit'>
                    <button type="submit">保存</button>
                </div>
            </form>
        )
    }
}
FromMessage.propTypes = {
    feature: PropTypes.object,
    getMessage: PropTypes.func,
    setMessage: PropTypes.func,
    fields: PropTypes.object,
    setFieldMessage: PropTypes.func,
    showFieldMessage: PropTypes.func,
}
const mapStateToProps = (state) => {
    return {
        message: state.message,
        fieldMessage: state.fieldMessage
    }
}
const mapDispathToProps = (dispatch) => {
    return {
        setMessage: function(action) {
            dispatch(setMessage(action))
        },
        setFieldMessage: (message) => {
            dispatch(setFieldMessage(message))
        },
        showFieldMessage: (show) => {
            dispatch(showFieldMessage(show))
        }
    }
}
export default connect(mapStateToProps, mapDispathToProps)(FromMessage)