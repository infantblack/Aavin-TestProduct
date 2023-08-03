import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import styles from "./welcome.module.scss";

const WelcomePage = () => {
    const navigator:any = useNavigate();
    const goToPage = () =>{
        navigator("/home")
    }

    return (
        <div className={styles.welcomeSection}>
            <p>Hi, Welcome</p>
            <Button className="greenBtn" onClick={goToPage}> Enter</Button>
        </div>
    )
};
export default WelcomePage