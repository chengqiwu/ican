
import React, { Component } from 'react'
import PropTypes  from 'prop-types'
import { connect } from 'react-redux'
import { findCriosAndVarietiesList, findSoilList, findPestsByCropsId } from 'utils/Api'


const arr = ['无', '滴灌', '喷灌', '漫灌（ 随时）', '漫灌（何时有水不定）']
let disease, pests
const getCropsName = (cropsId, criosAndVarietiesList) => {
    for (let item of criosAndVarietiesList) {
        if (item.id === cropsId) {
            return item['name']
        }
    }
    return ''
}

function handlePests(commonPests, pests) {
    if (!commonPests) {
        return '无'
    }
    let pestsTarget = commonPests.split(',')
    let res = ''
    for (let item of pestsTarget) {
        for (let i of pests) {
            if (i.key === item) {

                res += i.value
            }
        }
    }
    return res
}
function handleDisease(commonDisease, disease) {
    if (!commonDisease) {
        return '无'
    }
    let diseaseTarget = commonDisease.split(',')
    let res = ''
    for (let item of diseaseTarget) {
        for (let i of disease) {
            if (i.key === item) {

                res += i.value
            }
        }
    }
    return res
}

const getVarietiesName = (varietiesId, criosAndVarietiesList) => {
    console.log(varietiesId, criosAndVarietiesList)
    for (let item of criosAndVarietiesList) {
        for(let i of item.list) {
            if (i.id === varietiesId) {
                
                return i['name']
            }
        }
    }
    return ''
}
const getSoilType = (key, soilTypes) => {
    for (let item of soilTypes) {
        if (key === item.key) {
            return item['value']
        }
    }
    return ''
}
class ShowMessage extends React.Component {
    constructor() {
        super()
        this.state = {
            disease: [],
            pests: []
        }
    }
    getPestsAndDisease(cropsId, criosAndVarietiesList) {
        for (let item of criosAndVarietiesList) {
            if (item.id === cropsId) {
                findPestsByCropsId(cropsId).then(res => res.data).then(data => {
                    if (data.msg === '200') {

                        this.setState({
                            disease: data.result.disease || [],
                            pests: data.result.pests || []
                        })
                    }
                })
            }
        }
    }
    componentDidMount() {
        const defaultValue = this.props.fieldMessage.message
        console.log(defaultValue)
        const { criosAndVarietiesList, soilTypes } = this.props.message
        
        this.getPestsAndDisease(defaultValue.cropsId, criosAndVarietiesList)

    }
    render() {
        const defaultValue = this.props.fieldMessage.message
        const { criosAndVarietiesList, soilTypes } = this.props.message
        const feature = this.props.feature.feature
        return (
            <div className='next'>
                <div>
                    <div>
                        <div>
                            <div>
                                <label>种植季：</label>
                                <div>{defaultValue.plantingSeason}</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>当季作物：</label>
                                <div>{getCropsName(defaultValue.cropsId, criosAndVarietiesList)}</div>
                            </div>
                            <div>
                                <label>当季品种：</label>
                                <div>{getVarietiesName(defaultValue.varietiesId, criosAndVarietiesList)}</div>
                            </div>
                        </div>
                        <div>
                            <div>
                                <label>前季作物：</label>
                                <div>{getCropsName(defaultValue.prevCropsId, criosAndVarietiesList) || '-'}</div>
                            </div>
                            <div>
                                <label>前季品种：</label>
                                
                                <div>{getVarietiesName(defaultValue.prevVarietiesId, criosAndVarietiesList) || '-'}</div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <label>
                                    前季密度：
                                </label>
                                <div>{defaultValue.prevDensity}株/亩</div>
                            </div>
                            <div>
                                <label>
                                    前季产量：
                                </label>
                                <div>{defaultValue.prevProduction}</div>
                            </div>
                        </div>
                        <div>
                            <div className='history'>
                                <label>历史产量（吨/公顷）：</label>
                                <div>最高:{defaultValue.maxProduction},
                                最低:{defaultValue.minProduction},
                                平均:{defaultValue.minProduction && (defaultValue.aveProduction || (0).toFixed(1))}</div>
                            </div>

                        </div>
                        <div>
                            <div>
                                <label>常见病害：</label>
                                <div>{handleDisease(defaultValue.commonDisease,  this.state.disease)}
            
                                </div>
                            </div>
                            <div>
                                <label>常见虫害：</label>
                                <div>{handlePests(defaultValue.commonPests, this.state.pests)}</div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* <div>
                    <div className='soil'>
                        <label>土壤样品：</label>
                        <div>
                            <input type="radio" name="soil" value='soil-y' ref={soily => this.soily = soily} /><span>有</span>
                            <input type="radio" name="soil" value='soil-n' ref={soiln => this.soiln = soiln} /><span>无</span>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>上传土壤样品：</label>
                            <input type="file" name="" id="" />
                        </div>
                    </div>
                </div> */}


                        <div>
                            <div>
                                <label>土壤类型：</label>
                                <div>{getSoilType(defaultValue.soilType, soilTypes)}</div>
                            </div>
                            {/* <div>
                        <label>地下1米刨面图：</label>
                        <input type="file" name="" id="" />
                    </div> */}
                        </div>


                        <div>
                            <div>
                                <label>土壤酸碱度：</label>
                                <div>{defaultValue.soilPh || '-'}</div>
                            </div>
                            <div>
                                <label>土壤有机质范围：</label>
                                <div>{defaultValue.organicMatter || '-'}</div>
                            </div>
                        </div>
                    </div>
                    <div className='second'>
                        <div>
                            <div className='weather'>
                                <label>气象站：</label>
                                <div>
                                    {['无', '有'][defaultValue.weatherStations]}
                                </div>
                            </div>
                            <div className='terrain'>
                                <label>地势：</label>
                                <div>
                                    {['平地', '坡地'][defaultValue.topography]}
                                </div>
                            </div>
                        </div>

                        <div>
                            <div>
                                <label>整地方式：</label>
                                <div>
                                    {['免耕', '浅耕', '深耕'][defaultValue.soilPreparation]}
                                </div>
                            </div>
                            <div>
                                <label style={{ width: '91px' }}>常见自然灾害：</label>
                                <div>
                                    {['强风', '冰雹', '倒春寒', '干旱', '暴雨'][defaultValue.commonNaturalDisasters]}
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className='exact'>
                                <div>
                                    <label>播种机：</label>
                                    <div>
                                        {['无', '有'][defaultValue.drill]}
                                    </div>
                                </div>
                               
                                {
                                    defaultValue.drill == '1' ?
                                        <div className='exact-block'>
                                            <label>型号：</label>
                                            <div>
                                                {defaultValue.drillModel}
                                            </div>
                                        </div> : null
                                }
                                {
                                    defaultValue.drill == 1 ?
                                        <div className='exact-block exact-no-block'>
                                        </div> : null
                                }
                            </div>
                           
                        </div>
                        <div>
                            <div className='exact'>
                                <div>
                                    <label>追肥机：</label>
                                    <div>
                                        {['无', '有'][defaultValue.fertilizer]}
                                    </div>
                                </div>
                                {
                                    defaultValue.fertilizer == '1' ?
                                        <div className='exact-block'>
                                            <label>型号：</label>
                                            <div>
                                                {defaultValue.fertilizerModel}
                                            </div>
                                        </div> : null
                                }
                                {
                                    defaultValue.fertilizer == '1' ?
                                        <div className='exact-block exact-no-block'>
                                            <label>高度限制：</label>
                                            <div>
                                                {defaultValue.fertilizerHighLimit}
                                            </div>
                                        </div> : null
                                }
                            </div>
                           
                        </div>
                        <div>
                            <div className='exact'>
                                <div>
                                    <label>叶喷肥机：</label>
                                    <div>
                                        {['无', '有'][defaultValue.ypfj]}
                                    </div>
                                </div>
                                {
                                    defaultValue.ypfj == '1' ?
                                        <div className='exact-block'>
                                            <label>机型：</label>
                                            <div>
                                                {defaultValue.ypfjModel}
                                            </div>
                                        </div> : null
                                }
                                {
                                    defaultValue.ypfj == '1' ?
                                        <div className='exact-block exact-no-block'>
                                            <label>高度限制：</label>
                                            <div>
                                                {defaultValue.ypfjHighLimit}
                                            </div>
                                        </div> : null
                                }
                            </div>
                         
                        </div>
                        <div>
                            <div className='exact'>
                                <div>
                                    <label>收割机：</label>
                                    <div>
                                        {['无', '有'][defaultValue.harvester]}
                                    </div>
                                </div>
                               
                                {
                                    defaultValue.harvester == 1 ?
                                        <div className='exact-block'>
                                            <label>型号：</label>
                                            <div>
                                                {defaultValue.harvesterModel}
                                            </div>
                                        </div> : null
                                }
                                {
                                    defaultValue.harvester == 1 ?
                                        <div className='exact-block exact-no-block'>
                                        </div> : null
                                }
                            </div>
                           
                        </div>
                        <div>
                            <div>
                                <label>灌溉条件：</label>
                                <div>{arr[defaultValue.irrigation]}</div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
   
ShowMessage.propTypes = {
    fieldMessage: PropTypes.object,
    feature: PropTypes.object,
    message: PropTypes.object
}
const mapStateToProps = (state) => {
    return {
        feature: state.feature,
        fieldMessage: state.fieldMessage,
        message: state.message
    }
}


export default connect(mapStateToProps)(ShowMessage)