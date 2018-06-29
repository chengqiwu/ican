class FarmlandLogVo {
    constructor(quarterCropsId, landId, date, content, id ) {
        this.quarterCropsId = quarterCropsId
        this.landId = landId
        this.date = date
        this.content = content
        this.id = id
    }
    toString() {
        console.log(this.date)
        const farmlandLogVo = {
            quarterCropsId: this.quarterCropsId,
            landId: this.landId,
            date: this.date,
            content: this.content
        }
        if (this.id) {
            farmlandLogVo.id = this.id
        }
        return JSON.stringify(farmlandLogVo)
    }
}

export default FarmlandLogVo