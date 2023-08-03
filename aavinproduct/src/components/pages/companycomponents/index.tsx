// CompanyList\

import { AreaChartOutlined, BankOutlined, DollarOutlined, HomeOutlined, SettingOutlined, WarningOutlined } from "@ant-design/icons";
import { Tabs, TabsProps } from "antd";
import CompanyHeader from "../../layout/header";
import styles from "./companycomponent.module.scss";
import CompanyListScreen from "./companylistScreen";


const HomeScreen = () => {
    const onChange = (key: string) => {

    };
    const items: TabsProps['items'] = [

        {
            key: '1',
            label: (
                <span>
                    <HomeOutlined />Dashboard
                </span>
            ),
            // children: `Content of Tab Pane 1`,
        },
        {
            key: '2',
            label: (<span>
                <BankOutlined />Companies
            </span>),
            children: (
                <CompanyListScreen />
            ),
        },
        {
            key: '3',
            label: (<span>
                <AreaChartOutlined />Reports
            </span>),
            // children: `Content of Tab Pane 3`,
        },
        {
            key: '4',
            label: (<span>
                <DollarOutlined />Rate Chart
            </span>),
            // children: `Content of Tab Pane 1`,
        },
        {
            key: '5',
            label: (<span>
                <WarningOutlined />Issues
            </span>),
            // children: `Content of Tab Pane 2`,
        },
        {
            key: '6',
            label: (<span>
                <SettingOutlined /> Settings
            </span>),
            // children: `Content of Tab Pane 3`,
        },
    ];

    return (
        <>
            <div className={styles.tabnavlist}>
                <Tabs className='tabiconposi' defaultActiveKey="2" items={items} onChange={onChange} />
            </div>
        </>
    )
};
export default HomeScreen;