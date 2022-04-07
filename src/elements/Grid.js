import React from "react"
import styled from 'styled-components'

const Grid = (props) => {

    const { is_flex, width, padding, margin, bg, children, center, is_Wrap, changeForm, form, _onClick } = props

    const styles = {
        is_flex, width, padding, margin, bg, center, is_Wrap, changeForm, form, _onClick,
    }

    // console.log(_onClick)

    if (changeForm) {
        return (
            <ChangeGrid changeForm={changeForm}>
                <GridBox>
                    {children.find((v) => v.type.name === 'Image' || v.type.name === 'HC')}
                </GridBox>
                <GridBox margin='auto' padding='10px' width='480px'>
                    {children.find((v) => v.type.name === 'Input' || v.type.name === 'ZC')}
                </GridBox>
            </ChangeGrid>
        )
    }

    //PostList
    if (form) {
        return (
            <ShowChangeGrid form={form} onClick={_onClick}>
                {/* {console.log(children)} */}
                <GridBox>
                    {children.find((v) => { return v.type.name === 'Grid' || v.type.name === 'DC' })}
                </GridBox>
                <GridBox margin='10px' center>
                    {children.find((v) => { return v.type.name === 'Text' || v.type.name === 'KC' })}
                </GridBox>
            </ShowChangeGrid>
        )
    }

    return (
        <React.Fragment>
            <GridBox {...styles} onClick={_onClick}>{children}</GridBox>
        </React.Fragment>
    )
}

Grid.defaultProps = {
    children: null,
    is_flex: false,
    width: '100%',
    padding: false,
    margin: false,
    bg: false,
    center: false,
    is_Wrap: false,
    changeForm: false,
    form: null,
    _onClick: () => { },
}

const GridBox = styled.div`
    width: ${(props) => props.width};
    max-width: 800px;
    height: 100%;
    box-sizing: border-box;
    ${(props) => props.padding ? `padding: ${props.padding}` : ''};
    ${(props) => props.margin ? `margin: ${props.margin}` : ''};
    ${(props) => props.bg ? `background-color: ${props.bg}` : ''};
    ${(props) => props.is_flex ? `
    display: flex;
    align-items: center;
    justify-content: space-between;
    ` : ''};
    ${(props) => props.center ? `text-align: center` : ''};
    
    ${(props) => props.is_Wrap ? `
        margin: auto;
    ` : ''};
`

const ChangeGrid = styled.div`
    display: flex;
    padding: 10px;  
    
    ${(props) => props.changeForm === 'LEFT' ? `flex-direction: row;` :
        props.changeForm === 'RIGHT' ? `flex-direction: row-reverse;` : `flex-direction: column;`};

`

const ShowChangeGrid = styled.div`
    display: flex;
    padding: 10px;  

    ${(props) => props.form === 'LEFT' ? `flex-direction: row;` :
        props.form === 'RIGHT' ? `flex-direction: row-reverse;` : `flex-direction: column;`};
`

export default Grid;