import {Link} from 'react-router-dom';
import Auth from '../../utils/auth';

const Header = () => {
    const logout = (event) => {
        event.preventdefault();
        Auth.logout();
    };
    return (

    );
};

export default Header;