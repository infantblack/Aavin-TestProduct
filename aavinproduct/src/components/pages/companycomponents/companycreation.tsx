// CompanyCreation

import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Dropdown, Form, Input, InputNumber, notification, Row, Select, Space, Upload } from "antd";
import { useEffect, useState } from "react";
import styles from "./companycomponent.module.scss";
import profile from "../../../styles/images/profile.png"
import { useNavigate } from "react-router";
import { ApiServices } from "../../../service";
import { v4 as uuidv4 } from "uuid";
import { useSelector } from "react-redux";

type FieldType = {
    company?: string;
    Phone?: string;
    Email?: string;
    Address?: string;
    Pincode?: string;
    District?: number;
    State?: number;
};

const CompanyCreation = () => {

    const [file, setFile] = useState<any>(false)
    const navigator: any = useNavigate();
    const { updateArray, updateUniqueId }: any = useSelector((state: any) => state.companyUpadte);

    const [inputValue, setInputValue] = useState<any>({
        cmpyName: "", phone: "", eMail: "", addr: "", state: "", district: "", pinCode: ""
    });
    const [selectedImage, setSelectedImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const id: any = uuidv4()

    const uploadButton = (
        <div>
            <PlusOutlined />
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    const backButton = () => {
        navigator("/home");
        setInputValue({ ...inputValue, cmpyName: "", pinCode: "", phone: "", eMail: "", addr: "", district: "", state: "" })
    }
    useEffect(() => {
        if (updateUniqueId) {
            setInputValue({
                cmpyName: updateArray["Name"], phone: "", eMail: updateArray["E-Mail"],
                addr: updateArray["Address"], state: updateArray["State"], district: updateArray["District"], pinCode: updateArray["PinCode"]
            });
        }
    }, [updateUniqueId])


    const onChangeCmpyName = (event: any) => {
        const companyName: any = event.target.value;
        setInputValue({ ...inputValue, cmpyName: companyName })
    }
    const onChangePhe = (number: any) => {
        setInputValue({ ...inputValue, phone: number })
    }
    const onChangeEmail = (event: any) => {
        const emailValue: any = event.target.value;
        setInputValue({ ...inputValue, eMail: emailValue })
    }
    const onChangeAddr = (event: any) => {
        const addrValue: any = event.target.value;
        setInputValue({ ...inputValue, addr: addrValue })
    }
    const selecteDistr = (data: any, key: any) => {
        const districtValue: any = data;
        setInputValue({ ...inputValue, district: districtValue })
    };
    const selecteState = (data: any, key: any) => {
        const stateValue: any = data;
        setInputValue({ ...inputValue, state: stateValue })
    }
    const onChangePincde = (pinCd: any) => {
        setInputValue({ ...inputValue, pinCode: pinCd })
    }
    const handleImageChange = (event: any) => {
        const file = event.target.files[0];

        if (file) {
            setSelectedImage(file);
            const reader = new FileReader();
            reader.onloadend = (url: any) => {
                setPreviewUrl(url.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const MAP: any = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15556.0937638847!2d79.12164970266491!3d12.9062141976085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bad38ddfe64a1ed%3A0xf42eadb44905a425!2sChinnallapuram%2C%20Tamil%20Nadu%20632001!5e0!3m2!1sen!2sin!4v1690981369748!5m2!1sen!2sin"

    const createApi = async () => {
        let payLoad: any = {
            "name": inputValue.cmpyName,
            "email": inputValue.eMail,
            "map": 'https://www.google.com/maps/',
            "pincode": inputValue.pinCode,
            "address": inputValue.addr,
            "state_id": Math.floor(Math.random() * 10) + 10,
            "district_id": Math.floor(Math.random() * 10) + 10,
            "brand_name": "Welcome",
            "unique_id": id.toString(),
            "picture": 43
        }
        const urlApi: any = "https://stage.maapay.io/api/company";
        try {
            ApiServices.post(urlApi, JSON.stringify(payLoad)).then((list: any) => {
                if (list.status === 200) {

                } else if (list.response.status === 500) {

                }

            }).catch(err => {
                console.log(err, "Failed Api");
                notification.error({
                    message: 'Somthing went wrong can not create company now',
                    placement: "topRight",
                    className: "toastNotification success",
                    icon: <span className="icon__Success24" />,
                    closeIcon: <span className="icon__IconCloseNew16" />,
                    duration: 5
                });
                backButton();
            })
        } catch (err: any) {
            setInputValue({
                cmpyName: "", phone: "", eMail: "", addr: "",
                state: "", district: "", pinCode: 0
            });
            console.log("Not Getting Api")
        }
    }
    const updateApi = async () => {
        try {
            let payLoad: any = {
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
            const endPoint: any = updateArray["UniqueId"];
            if (inputValue.phone !== "") {
                await ApiServices.patch(endPoint, JSON.stringify(payLoad)).then((list: any) => {

                    if (list.status === 200) {
                        notification.info({
                            message: `${updateArray["Name"]} updated Successfully `,
                            placement: "topRight",
                            className: "toastNotification success",
                            icon: <span className="icon__Success24" />,
                            closeIcon: <span className="icon__IconCloseNew16" />,
                            duration: 2
                        });
                        backButton();
                    }
                }).catch(err => (console.log(err, "Failed Api test")))
            }
        } catch (err: any) {
            console.log("Not Getting Api")
        }
    }

    const saveUpdateBtn = () => {
        if (updateUniqueId) {
            updateApi();
        } else {
            createApi()
        }
    }

    return (
        <>
            <div className={styles.overallSec}>
                <Row>
                    <Col span={14} className={styles.cmpycrtn}>
                        <Form>
                            <Space direction="vertical">
                                <span className={styles.arrowbck} onClick={backButton}><ArrowLeftOutlined /></span>
                                <Form.Item
                                    name="company"
                                    initialValue={updateArray["Name"]}
                                    rules={[{ required: true, message: 'Please input your username!' }]}
                                >
                                    <Input value={updateArray["Name"]} className="inputsze" placeholder="Company name" onChange={(e: any) => onChangeCmpyName(e)} />
                                </Form.Item>
                                <Form.Item
                                    name="Phone"
                                    initialValue={updateArray["Phone"]}
                                    rules={[{ required: true, message: 'Please input your Phone Number!' }]}
                                >
                                    <InputNumber value={inputValue.phone} className="inputsze" placeholder="Phone" controls={false} onChange={(e: any) => onChangePhe(e)} />
                                </Form.Item>
                                <Form.Item
                                    name="Mail"
                                    initialValue={updateArray["E-Mail"]}
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please input your E-mail!',
                                        },
                                    ]}
                                >
                                    <Input value={inputValue.eMail} className="inputsze" placeholder="Email" onChange={(e: any) => onChangeEmail(e)} />
                                </Form.Item>
                                <Form.Item
                                    name="Address"
                                    initialValue={updateArray["Address"]}
                                    rules={[{ required: true, message: 'Please input your Address!' }]}
                                ><Input value={inputValue.addr} className="inputsze" placeholder="Address" onChange={(e: any) => onChangeAddr(e)} />

                                </Form.Item>
                                <Form.Item
                                    name="District"
                                    initialValue={updateArray["District"]}
                                    rules={[{ required: true, message: 'Please input your District!' }]}
                                >
                                    <Select
                                        className='inputsze'
                                        // getPopupContainer={(trigger) => trigger.parentNode}
                                        placeholder="District"

                                        // suffixIcon={<span className="icon__Downarrow16"></span>}
                                        onChange={(e: any, key: any) => selecteDistr(e, key)}
                                    >

                                        {["chennai", "trichy", "cuddalor", "pudk"].map((data: any, index: any) => {
                                            if (data !== "") {
                                                return (
                                                    <Select.Option value={data} key={index}>
                                                        {updateUniqueId ? inputValue.district : data}
                                                    </Select.Option>
                                                );
                                            }
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="state"
                                    initialValue={updateArray["State"]}
                                    rules={[{ required: true, message: 'Please input your State!' }]}
                                >
                                    <Select
                                        className='inputsze'
                                        // getPopupContainer={(trigger) => trigger.parentNode}
                                        placeholder="State"
                                        // suffixIcon={<span className="icon__Downarrow16"></span>}
                                        onChange={(e: any, key: any) => selecteState(e, key)}
                                    >

                                        {["TN", "KA", "KR", "GU"].map((data: any, index: any) => {
                                            if (data !== "") {
                                                return (
                                                    <Select.Option value={data} key={index}>
                                                        {updateUniqueId ? inputValue.state : data}
                                                    </Select.Option>
                                                );
                                            }
                                        })}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="Pincode"
                                    initialValue={updateArray["PinCode"]}
                                    rules={[{ required: true, message: 'Please input your Pincode!' }]}>
                                    <InputNumber value={inputValue.pinCode} className="inputsze" controls={false} placeholder="Pincode" onChange={(e: any) => onChangePincde(e)} />
                                </Form.Item>
                                {/* {inputValue.pinCode === "" ? <span>{error.errPC}</span> : ""} */}

                                <p className={styles.title3}>Google Location</p>
                                <div className={styles.mapArea}>
                                    <iframe src={MAP}
                                        width="700" height="200" loading="lazy" ></iframe>
                                </div>
                                <Button className="greenBtn alignRight" htmlType="submit" onClick={saveUpdateBtn}>{updateUniqueId ? "Update" : "Save"}</Button>
                            </Space>
                        </Form>

                    </Col>
                    <Col span={10} className={styles.proUpld}>

                        <div className={styles.uploadArea}>
                            {previewUrl ? <img src={previewUrl} alt="Profile Preview" className={styles.imgdfut} /> :
                                <img src={profile} alt="Profile Preview" className={styles.imgdfut} ></img>}
                            <h1 className={styles.textal}>Upload Company Picture</h1>
                        </div>

                        <div className={styles.buttoncontainer}>
                            <label htmlFor="file-upload" className="custom-file-upload">
                                Browser File
                            </label>
                            <input type="file" id="file-upload" accept="image/*" className={styles.button2} onChange={handleImageChange} />
                        </div>
                        
                    </Col>
                </Row>
            </div>
        </>
    )
};
export default CompanyCreation;

/* accept="image/*" type="file"  */

/* */