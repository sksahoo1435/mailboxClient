import { PASSWORD_RESET, LOGIN, SIGNUP } from "../data/loginOptions";

const useOption = (islogin, isPassReset) => {

    if(isPassReset){
        return PASSWORD_RESET
    }
    if(islogin){
        return LOGIN
    }
    return SIGNUP
    
};

export default useOption;
