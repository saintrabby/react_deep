import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid, Text, Button } from "../elements";
import { actionCreators as userActions } from "../redux/modules/user";
import { deleteCookie, getCookie, setCookie } from "../shared/Cookie";


const Header = () => {
    const is_login = useSelector((state) => state.user.is_login)

    const dispatch = useDispatch()

    // const [is_login, setIsLogin] = React.useState(false)

    if (is_login) {
        return (
            <React.Fragment>
                <Grid is_flex >
                    <Grid>
                        <Text margin='0px' size='24px' bold>헬로</Text>
                    </Grid>

                    <Grid is_flex>
                        <Button text='내정보'></Button>
                        <Button text='알림'></Button>
                        <Button text='로그아웃' _onClick={() => {
                            dispatch(userActions.logOut({}))
                        }}></Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }

    else {
        return (
            <React.Fragment>
                <Grid is_flex >
                    <Grid>
                        <Text margin='0px' size='24px' bold>헬로</Text>
                    </Grid>

                    <Grid is_flex >
                        <Button text='로그인' _onClick={() => {
                            setCookie('user_id', 'name')
                            setCookie('user_pw', 'pppp')
                        }}></Button>
                        <Button text='회원가입'></Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

Header.defaultProps = {

}


export default Header;