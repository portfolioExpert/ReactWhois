import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { AuthStatus } from "../../common/constant";

//이미 로그인했다면 로그인, 회원가입창으로 가는 것을 막는 것
export default function useBlockLoginUser() {
    const history = useHistory();
    const status = useSelector(state => state.auth.status);
    useEffect(() => {
        if (status === AuthStatus.Login) {
            history.replace('/');
        }
    }, [status, history]);
}