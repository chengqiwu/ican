import React from 'react'
import PropTypes from 'prop-types' 
const Content1 = (props) => {
    return (
        <form onSubmit={props.submitHandle} >
            <div>
                <input type="text" name='name' value={props.name} onChange={props.changeInput} />
                <input type="submit" value='保存' />
            </div>
            <div>{props.content}</div>
        </form>
    )
}

Content1.propTypes = {
    submitHandle: PropTypes.func,
    changeInput: PropTypes.func,
    name: PropTypes.string,
    content: PropTypes.string

}
export default Content1