import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { deleteCookie, getCookie, setCookie } from "../shared/Cookie";

import { history } from '../redux/configStore'
import { apiKey } from "../shared/firebase";
import Permit from "../shared/Permit";

const Header = () => {
    const is_login = useSelector((state) => state.user.is_login)

    const session_key = `firebase:authUser:${apiKey}:[DEFAULT]`
    const is_session = sessionStorage.getItem(session_key) ? true : false

    // console.log(sessionStorage.getItem(session_key))

    const dispatch = useDispatch()

    // const [is_login, setIsLogin] = React.useState(false)



    if (is_login && is_session) {
        return (
            <React.Fragment>
                <Grid is_flex padding='16px' >
                    <Grid>
                        <Text margin='0px' size='24px' bold>헬로</Text>
                    </Grid>

                    <Grid is_flex>
                        <Button margin='0px 2px' text='내정보'></Button>
                        <Button margin='0px 2px' text='알림'></Button>
                        <Button margin='0px 2px' text='로그아웃' _onClick={() => {
                            dispatch(userActions.logoutFB())
                        }}></Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Grid is_flex >
                <Grid>
                    <Text margin='0px' size='24px' bold>헬로</Text>
                </Grid>

                <Grid is_flex >
                    <Button text='로그인' _onClick={() => {
                        history.push('/login')
                    }}></Button>
                    <Button text='회원가입' _onClick={() => {
                        history.push('/signup')
                    }}></Button>
                </Grid>
            </Grid>
        </React.Fragment>
    )

}

Header.defaultProps = {

}


export default Header;