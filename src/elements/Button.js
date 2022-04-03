import React from 'react';
import styled from 'styled-components'

const Button = (props) => {

    const { text, _onClick } = props

    return (
        <React.Fragment>
            <ELButton onClick={_onClick}>{text}</ELButton>
        </React.Fragment>
    )
}

Button.defaultProps = {
    text: '텍스트',
    _onClick: () => { }
}

const ELButton = styled.button`
    width: 100%;
    background-color: #212121;
    color: #fff;
    padding: 12px 0px;
    box-sizing: border-box;
    border: none;
    :hover {
        background-color: #666;
        cursor: pointer;
    }
`

export default Button;