import styles from "./header.module.scss";
import Layout, { Content, Header } from "antd/es/layout/layout";
import logo from "../../styles/images/logo.png"
import { Avatar, Badge } from "antd";
import { AntDesignOutlined, BellOutlined } from '@ant-design/icons';
import { start } from "repl";



const CompanyHeader = () => {

    return (
        <>
            <Layout>
                <Header className={styles.header} >
                    <div className={styles.cmpylogo}>
                        <img src={logo}></img>
                    </div>
                    <div className={styles.profileAvtr}>
                        <Badge size="default" dot className="badges">
                            <Avatar size={48} shape="circle" 
                            icon={<BellOutlined />}/>
                        </Badge>
                        <Avatar
                            size={48}
                            icon={<AntDesignOutlined />}
                        />
                    </div>
                </Header>
            </Layout>
        </>
    )
};
export default CompanyHeader;