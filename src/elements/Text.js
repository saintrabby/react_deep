import React from "react"
import styled from 'styled-components'


const Text = (props) => {

    const { bold, color, size, margin, children } = props

    const styles = { bold, color, size, margin }

    return (
        <React.Fragment>
            <P {...styles}>{children}</P>
        </React.Fragment>
    )
}

Text.defaultProps = {
    children: null,
    margin: false,
    bold: false,
    color: '#222831',
    size: '14px'
}

const P = styled.p`
    color: ${(props) => props.color};
    font-size: ${(props) => props.size};
    ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
    font-weight: ${(props) => props.bold ? '600' : '400'};
`

export default Text;