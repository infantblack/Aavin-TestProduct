// CompanyList\

import Icon, { EditOutlined, EyeOutlined, PlusCircleOutlined, SyncOutlined } from "@ant-design/icons";
import { Breadcrumb, Button } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import styles from "./companycomponent.module.scss";
import { Input } from 'antd';
import { useNavigate } from "react-router";
import CompanyHeader from "../../layout/header";
import { useEffect, useState } from "react";
import { ApiServices } from "../../../service";
import CompanyDetails from "./companydetails";
import { useDispatcher } from "../../../stored/redux";
import { companyupdate } from "../../../stored/slices/companySlice";

interface Type {
    key: string;
    name: string;
    email: string;
    address: string;
    pincode: number;
    map: string;
    brandname: string;
}

const CompanyListScreen = () => {

    const navigator: any = useNavigate();
    const { Search } = Input;
    const columnList: any = ["Name", 'E-Mail', 'Brand Name', 'Avg SNF', 'Avg FAT', 'Address', 'PinCode', 'Map', "Edit", "View"];
    const [productList, setProductList] = useState<any>([])

    const [loader, setLoader] = useState<any>(false)
    const [view, setView] = useState<any>(false)
    const dispatch = useDispatcher();

    useEffect(() => {
        setView(false)
        getApi();
        dispatch(
            companyupdate.companyUpdateInfo({
                updateArray: [],
                updateUniqueId: ""
            })
        );
    }, [])




    const navigateToEdit = (text: any, record: any) => {
        navigator("/companycreate");
        dispatch(
            companyupdate.companyUpdateInfo({
                updateArray: record || [],
                updateUniqueId: record.UniqueId
            })
        );
    }
    const navigateToView = (text: any, record: any) => {
        setView(!view)
        dispatch(
            companyupdate.companyUpdateInfo({
                updateArray: record || [],
                updateUniqueId: record.UniqueId
            })
        );

    }
    const getApi = async () => {
        try {
            let tempArr: any = [];
            setLoader(true)

            ApiServices.get().then((list: any) => {
                if (list.status === 200) {
                    setLoader(false);
                    let productDetailsTable: any = list.data.data;
                    productDetailsTable.map((data: any) => {
                        let obj: any = {
                            "Name": data.name ?? "-",
                            'E-Mail': data.email ?? "-",
                            'Brand Name': data.brand_name ?? "-",
                            'Address': data.address ?? "-",
                            'PinCode': data.pincode ?? "-",
                            'Map': data.map ?? "-",
                            "UniqueId": data.unique_id ?? "-",
                            "State": data.state_id ?? "-",
                            "Picture": data.picture ?? "-",
                            "District": data.district_id ?? "-",
                            'Avg FAT': data.avg_fat ?? '-',
                            'Avg SNF': data.avg_snf ?? '-',
                            "Edit": <a><EditOutlined /></a>,
                            "View": <a><EditOutlined /></a>
                        }
                        tempArr.push(obj)
                    })
                    dispatch(
                        companyupdate.companyUpdateInfo({
                            updateArray: tempArr,
                            updateUniqueId: ""
                        })
                    );
                    setProductList(tempArr)
                }
            }).catch(err => (console.log("Failed Api")))
        } catch (err: any) {
            console.log("Not Getting Api")
        }
    }


    const columnsList: any = columnList.map((column: any) => ({
        title: column,
        dataIndex: column,
        key: column,
        render: (text: any, record: any) => {
            return (
                <>
                    {column === "Edit" ? <a className={"linkText"} onClick={() => navigateToEdit(text, record)}>
                        {text || "Default Callflow Name"}
                    </a> : column === "View" ? <span className="tableStatus active"> <span><a onClick={() => navigateToView(text, record)}><EyeOutlined /></a></span> </span> :
                        <span>
                            {text || "Default Callflow Name"}
                        </span>
                    }
                </>
            );
        }
    }))

    const newCompanyCreation = () => {
        navigator("/companycreate")
    }
    const globalSearch = (e: any) => {
        // const searchText = e.target.value?.toLowerCase();
        // const response: any = productList.filter( function (data: any) {
        // console.log(data,"onSearchCmpny");
        //     dispatch(
        //         companyupdate.companyUpdateInfo({
        //             updateArray: response,
        //             updateUniqueId: ""
        //         })
        //     );
        // });
    }


    return (
        <>
            <CompanyHeader />
            <div className={styles.listscrn}>
                <div className="listscrn1">
                    <Breadcrumb
                        separator=">"
                        items={[
                            {
                                title: 'Dashboard',
                            },
                            {
                                title: view ? 'Company' : "Aavin",
                                href: '',
                            }
                        ]}
                    />

                </div>
                {!view ? <div className='tableCust'>
                    <div className={styles.tabletitle}>
                        <span className={styles.companyTitle}>
                            Company List
                        </span>
                        <Button className={styles.createbtn} onClick={newCompanyCreation}>
                            <span className={styles.createtext}>
                                <PlusCircleOutlined /> Create
                            </span>
                        </Button>
                        <span>
                            <Search onChange={(e: any) => globalSearch(e)}></Search>
                        </span>
                    </div>
                    <Table
                        columns={columnsList}
                        dataSource={productList}
                        loading={loader}
                    >
                    </Table>
                </div>
                    :
                    <CompanyDetails></CompanyDetails>
                }


            </div>
        </>
    )
};
export default CompanyListScreen;