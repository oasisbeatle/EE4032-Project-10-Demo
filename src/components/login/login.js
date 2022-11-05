import './login.css';
import '../../global.css';
import logo from '../../images/back-it.gif';
import Button from 'react-bootstrap/Button';

export default function Login(props){

    const NoMetamask = () => {
        return (
            <div>
                <p>
                    No MetaMask detected.
                    <br></br>
                    Please install&nbsp;
                    <span className = "login-highlight">
                        METAMASK
                    </span>
                    &nbsp;to your browser to proceed.
                </p>
            </div>
        )
    }

    const LoginMetamask = () => {
        return (
            <div>
                <br/>
                <Button variant="secondary" className= "connectButton"
                  onClick = {props.connectTo} size="lg">
                  Connect With Metamask
                </Button>
            </div>
        )
    }

    return (
        <div className = "login">
            <img src = {logo} className = "login-logo" alt = "logo" />
            <h2>
                Get <br/>
                Backer.
                <br/>
            </h2>
            {
                props.isHaveMetamask ?
                <LoginMetamask /> :
                <NoMetamask />
            }
        </div>
    )
}
