
import React, { Component } from 'react'
import PropTypes  from 'prop-types'
import { connect } from 'react-redux'
const ShowMessage = (props) => {
    const {defaultValue} = props
    const feature = props.feature.feature
    const area = feature.get('area')
    return (
        <div className='next'>
            <div>
                <h3>
                    位置：{feature.get('position')}
                </h3>
                <h3>
                    面积：{area.acre} 亩 / {area.hectare} 公顷
                </h3>
            </div>
            <div>
                <div>
                    <div>
                        <div>
                            <label>种植季：</label>
                            <div>{defaultValue.plantingSeaon}</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>当季作物：</label>
                            <div>春玉米</div>
                        </div>
                        <div>
                            <label>当季品种：</label>
                            <div>农华101</div>
                        </div>
                    </div>
                    <div>
                        <div>
                            <label>前季作物：</label>
                            <div>春玉米</div>
                        </div>
                        <div>
                            <label>前季品种：</label>
                            <div>{defaultValue.prevVarietiesName}</div>
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
                            <div>最高 最低 平均</div>
                        </div>

                    </div>
                    <div>
                        <div>
                            <label>常见病害：</label>
                            <div>{defaultValue.commonDisease}</div>
                        </div>
                        <div>
                            <label>常见虫害：</label>
                            <div>{defaultValue.commonPests}</div>
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
                            <div>{defaultValue.soilType}</div>
                        </div>
                        {/* <div>
                        <label>地下1米刨面图：</label>
                        <input type="file" name="" id="" />
                    </div> */}
                    </div>


                    <div>
                        <div>
                            <label>土壤酸碱度：</label>
                            <div>{defaultValue.soilPh}</div>
                        </div>
                        <div>
                            <label>土壤有机质范围：</label>
                            <div>{defaultValue.organicMatter}</div>
                        </div>
                    </div>
                </div>
                <div className='second'>
                    <div>
                        <div className='weather'>
                            <label>气象站：</label>
                            <div>
                                {defaultValue.weatherStations}
                            </div>
                        </div>
                        <div className='terrain'>
                            <label>地势：</label>
                            <div>
                                {defaultValue.topography}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label>整地方式：</label>
                            <div>
                                {defaultValue.soilPreparation}
                            </div>
                        </div>
                        <div>
                            <label>常见自然灾害：</label>
                            <div>
                                {defaultValue.commonNaturalDisasters}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='exact'>
                            <label>播种机：</label>
                            <div>
                                {defaultValue.drill}
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className='exact'>
                            <label>追肥机：</label>
                            <div>
                                {defaultValue.fertilizer}
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className='exact'>
                            <label>叶喷肥机：</label>
                            <div>
                                {defaultValue.ypfj}
                            </div>
                        </div>

                    </div>
                    <div>
                        <div className='exact'>
                            <label>收割机：</label>
                            <div>
                                {defaultValue.harvester}
                            </div>
                        </div>

                    </div>
                    <div>
                        <div>
                            <label>灌溉条件：</label>
                            <div>{defaultValue.irrigation}</div>
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    )
        
}
ShowMessage.propTypes = {
    defaultValue: PropTypes.object,
    feature: PropTypes.object
}
const mapStateToProps = (state) => {
    return {
        feature: state.feature
    }
}


export default connect(mapStateToProps)(ShowMessage)