import React from 'react'
import PropTypes from 'prop-types'
const Content2 = (props) => {
    return (
        <form onSubmit={props.startHandle}>
            <div>
                <input type="text" name='name' value={props.name} onChange={props.changeInput} />
                <input type="button" value='修改' onClick={props.modifyHandle} />
            </div>
            <div>{props.content}</div>
            <input type='submit' value='开始种植'/>
        </form>
    )
}

Content2.propTypes = {
    startHandle: PropTypes.func,
    changeInput: PropTypes.func,
    name: PropTypes.string,
    content: PropTypes.string,
    modifyHandle: PropTypes.func

}
export default Content2