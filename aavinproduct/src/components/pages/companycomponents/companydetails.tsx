// CompanyDetails edit company

import { Button, Input } from "antd";
import React, { useEffect } from "react";
import { ApiServices } from "../../../service";
import styles from "./companycomponent.module.scss";
import aavin from "../../../styles/images/aavin.jpg";
import { useSelector } from "react-redux";
import { EditOutlined, MailOutlined, PhoneOutlined, PushpinOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const CompanyDetails = () => {


    const { updateArray }: any = useSelector((state: any) => state.companyUpadte);

    useEffect(() => {
        updateCompanyINfo();
    }, [])

    const navigator: any = useNavigate();


    const navigateToEdit = () => {
        navigator("/companycreate");
    }

    const updateCompanyINfo = () => {

        let payload: any = {
            "name": updateArray["Name"],
            "email": updateArray["E-Mail"],
            "map": updateArray["Map"],
            "pincode": updateArray["PinCode"],
            "address": updateArray["Address"],
            "state_id": updateArray["State"],
            "district_id": updateArray["District"],
            "brand_name": updateArray["Brand Name"],
            "unique_id": updateArray["UniqueId"],
            "picture": updateArray["Picture"]
        }
        let endpoint: any = "AG123";
        ApiServices.patch(payload, endpoint).then((data: any) => {

        }).catch((err: any) => {

        })
    }
    return (
        <>
            <div className={styles.detailsScreen}>
                <div className={styles.detailsTop}>
                    <div className={styles.searchBar}>
                        <Input placeholder="Search" />
                    </div>
                    <div className={styles.detailsHeader}>
                        <div className={styles.headerContent}>
                            <div className={styles.progileLogo}>
                                <img src={aavin} alt="" />
                                <div className={styles.addressArea}>
                                    <div className={styles.address}>
                                        <b>{updateArray["Address"] || "Aavin, Chennai"}</b>
                                        <span>NO 3, TURNBULLS RD, RATHNA NAGAR, </span>
                                        <span>NANDANAM</span>
                                    </div>
                                    <div className={styles.phone}>
                                        <span>  <PhoneOutlined />Phone</span>
                                        <span>+91 98456 54762</span>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.companyEmail}>
                                <span><MailOutlined /> Email</span>
                                <span>{updateArray["E-Mail"] || "abcd@gmail.com"}</span>
                            </div>
                            <div className={styles.companyLocation}>
                                <span><PushpinOutlined /> <a target="_blank" href={updateArray["Map"]}>View Loction</a></span>
                            </div>
                            <div className={styles.editSection}>
                                <Button className="editBtn" onClick={() => navigateToEdit()}><EditOutlined /> Edit</Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.detailsRow}>
                    <div className={styles.detailsArea}>
                        <span>Managing Director</span>
                        <span>Dr. N. Subbaiyan I.A.S.,</span>
                    </div>
                    <div className={styles.detailsArea}>
                        <span>Managing Director</span>
                        <span>Dr. N. Subbaiyan I.A.S.,</span>
                    </div>
                    <div className={styles.detailsArea}>
                        <span>Managing Director</span>
                        <span>Dr. N. Subbaiyan I.A.S.,</span>
                    </div>
                    <div className={styles.detailsArea}>
                        <span>Managing Director</span>
                        <span>Dr. N. Subbaiyan I.A.S.,</span>
                    </div>
                </div>
            </div>
        </>
    )
};
export default CompanyDetails;