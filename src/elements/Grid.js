import React from 'react'
import styled from 'styled-components'

const Grid = (props) => {

    const { is_flex, width, margin, padding, bg, children } = props;

    const style = {
        is_flex: is_flex,
        width: width,
        padding: padding,
        margin: margin,
        bg: bg
    }

    return (
        <React.Fragment>
            <GridBox {...style}>{children}</GridBox>
        </React.Fragment>
    )
}

export default Grid;


Grid.defaultProps = {
    children: null,
    is_flex: false,
    width: '100%',
    padding: false,
    margin: false,
    bg: false
}

const GridBox = styled.div`
    width: ${(props) => (props.width)};
    height: 100%;
    //넓이에 테두리 굵기나 패딩같은 속성을 포함
    box-sizing: border-box;
    ${(props) => props.padding ? `padding: ${props.padding}` : ''}
    ${(props) => props.margin ? `margin: ${props.margin}` : ''}
    ${(props) => props.bg ? `background-color: ${props.bg}` : ''}
    ${(props) =>
        props.is_flex ?
            `display: flex;
            align-items: center;
            justify-content: space-between`
             : ''}

`