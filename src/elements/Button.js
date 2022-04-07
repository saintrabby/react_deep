import React from 'react';
import styled from 'styled-components'

const Button = (props) => {

    const { text, is_float, _onClick, children, margin, width } = props

    if (is_float)
        return (
            <React.Fragment>
                <FloatButton onClick={_onClick}>{text ? text : children}</FloatButton>
            </React.Fragment>
        )

    const styles = {
        margin,
        width,
    }

    return (
        <React.Fragment>
            <ELButton {...styles} onClick={_onClick}>{text ? text : children}</ELButton>
        </React.Fragment>
    )
}

Button.defaultProps = {
    children: null,
    text: false,
    is_float: false,
    margin: false,
    width: '100%',
    _onClick: () => { }
}

const ELButton = styled.button`
    width: ${(props) => props.width};
    ${(props) => (props.margin ? `margin: ${props.margin}` : '')};
    background-color: #212121;
    color: #fff;
    padding: 12px 0px;
    box-sizing: border-box;
    border: none;
    border-radius: 10px;
    :hover {
        background-color: #666;
        cursor: pointer;
    }
`

const FloatButton = styled.button`
    width: 50px;
    height: 50px;
    background-color: #212121;
    color: #fff;
    /* padding: 16px; */
    box-sizing: border-box;
    font-size: 36px;
    font-weight: 800;
    position: fixed;
    bottom: 50px;
    right: 16px;
    border: none;
    border-radius: 50px;
    /* text-align: center;
    vertical-align: middle; */
    display: flex;
    align-items: center;
    justify-content: center;

    :hover {
        background-color: #666;
        cursor: pointer;
    }
`

export default Button;