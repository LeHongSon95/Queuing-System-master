import { Breadcrumb, Select } from 'antd';
import React, { Fragment, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Image } from '../../Util/variableImage';
import {Formik, useFormik, FormikProps, Form, Field} from 'formik';
import { MyParams } from '../../config/paramType';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State, thietBiCreator } from '../../Redux';
import { doc, updateDoc } from "firebase/firestore";
import { db } from '../../firebase/firebase.config';

interface formikFace {
    maThietBi: string,
    loaiThietBi: string,
    tenThietBi: string,
    tenDangNhap: string,
    diaChi: string,
    matKhau: string,
    dichVu: string[],
}

export const CapNhatThietBi = (props:any) => {

    const {id} = useParams<keyof MyParams>() as MyParams;

    const [infoThietBi,setInfoThietBi] = useState<any | undefined>({
        maThietBi: '',
        tenThietBi: '',
        loaiThietBi: '',
        dichVu: '',
        diaChi: '',
        tenDangNhap: '',
        matKhau: '',
    });

    const dispatch = useDispatch();

    const {LayDuLieu} = bindActionCreators(thietBiCreator, dispatch);

    useEffect(()=> {
        LayDuLieu(id);
        console.log(id);
      }, []);

    const thietBiInfo = useSelector((state: State) => state.thietBi);

    useEffect(()=> {
        const thietBi = thietBiInfo.thietBiInfo[0]._document.data.value.mapValue.fields;
        console.log(thietBi);
        setInfoThietBi({
          maThietBi: `${thietBi.maThietBi.stringValue}`,
          tenThietBi: `${thietBi.tenThietBi.stringValue}`,
          loaiThietBi: `${thietBi.loaiThietBi.stringValue}`,
          dichVu: `${thietBi.dichVu.stringValue}`,
          diaChi: `${thietBi.diaChi.stringValue}`,
          tenDangNhap: `${thietBi.tenDangNhap.stringValue}`,
          matKhau: `${thietBi.matKhau.stringValue}`,
        });
    }, [thietBiInfo]);

    const { Option } = Select;

    const navigate = useNavigate();

    const location = useLocation();

    const initialValues: formikFace = {
        maThietBi: `${infoThietBi.maThietBi}`,
        loaiThietBi: `${infoThietBi.loaiThietBi}`,
        tenThietBi: `${infoThietBi.tenThietBi}`,
        tenDangNhap: `${infoThietBi.tenDangNhap}`,
        diaChi: `${infoThietBi.diaChi}`,
        matKhau: `${infoThietBi.matKhau}`,
        dichVu: [`${infoThietBi.dichVu}`],
    }

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            const updateThietBi = async () => {
                const thietBiRef = doc(db, "thietBi", id);

                await updateDoc(thietBiRef, {
                    maThietBi: `${values.maThietBi}`,
                    loaiThietBi: `${values.loaiThietBi}`,
                    tenThietBi: `${values.tenThietBi}`,
                    tenDangNhap: `${values.tenDangNhap}`,
                    diaChi: `${values.diaChi}`,
                    matKhau: `${values.matKhau}`,
                    dichVu: [`${values.dichVu}`],
                })
            }
            updateThietBi();
        }
    })

    const breadCrumbView = () => {
        const {pathname} = location;
        const pathnames = pathname.split('/').filter((item) => item);
        return (
          <div>
            <Breadcrumb separator=''>
              {pathnames.length > 0 ? (
                <>
                  <Breadcrumb.Item>Thi???t b???</Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <img src={`${Image.separator}`}/>
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <a onClick={()=> {
                        navigate('/thietbi');
                    }}>Danh s??ch thi???t b???</a>
                  </Breadcrumb.Item>
                  <Breadcrumb.Separator>
                    <img src={`${Image.separator}`}/>
                  </Breadcrumb.Separator>
                  <Breadcrumb.Item>
                    <span>C???p nh???t thi???t b???</span>
                  </Breadcrumb.Item>
                </>
              ) : (
                <>
                  <Breadcrumb.Item>Thi???t b???</Breadcrumb.Item>
                  <Breadcrumb.Item>
    
                  </Breadcrumb.Item>
                </>
              )}
            </Breadcrumb>
          </div>
        )
      }

      const handleChangeLoaiThietBi = (e:any) => {
            formik.setFieldValue('loaiThietBi',e.value);
      }

      const handleChangeDichVu = (e:any) => {
            formik.setFieldValue('dichVu', e);
    }

  return (
    <Fragment>
        <div className='thietBi__breadcrumb'>
            {breadCrumbView()}
        </div>
        <div className='thietBi__content'>
            <h3 className='thietBi__content-heading'>
            Qu???n l?? thi???t b???
            </h3>
            <form className='thietBi__content-update' onSubmit={formik.handleSubmit}>
                <div className='content__update-top'>
                    <h3 className='content__update-heading'>
                        Th??ng tin thi???t b???
                    </h3>   
                    <div className='content__update-list'>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>M?? thi???t b???: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.maThietBi} name="maThietBi" onChange={formik.handleChange}/>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>Lo???i thi???t b???: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <Select
                                labelInValue
                                value={{ value: `${formik.values.loaiThietBi}` }}
                                style={{ width: 120 }}
                                onChange={handleChangeLoaiThietBi}
                                suffixIcon={<img src={`${Image.select}`}/>}
                                className="content__update-item-select"
                            >
                                <Option value="kiosk">kiosk</Option>
                                <Option value="Display counter">Display counter</Option>
                            </Select>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>T??n thi???t b???: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.tenThietBi} name="tenThietBi" onChange={formik.handleChange}/>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>T??n ????ng nh???p: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.tenDangNhap} name="tenDangNhap" onChange={formik.handleChange}/>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>?????a ch??? IP: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.diaChi} name="diaChi" onChange={formik.handleChange}/>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>M???t kh???u: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <input className='content__update-input' value={formik.values.matKhau} name="matKhau" onChange={formik.handleChange}/>
                        </div>
                        <div className='content__update-item'>
                            <div className='content__update-label'>
                                <span>D???ch v??? s??? d???ng: </span>
                                <img src={`${Image.chuY}`}/>
                            </div>
                            <Select
                                mode="multiple"
                                style={{ width: '100%' }}
                                placeholder="select one country"
                                value={{ value: `${formik.values.dichVu}` }}
                                onChange={handleChangeDichVu}
                                optionLabelProp="label"
                            >
                                <Option value="All" label="T???t c???">
                                    <div className="demo-option-label-item">
                                        T???t c???
                                    </div>
                                </Option>
                                <Option value="Kh??m tim m???ch" label="Kh??m tim m???ch">
                                    <div className="demo-option-label-item">
                                        Kh??m tim m???ch
                                    </div>
                                </Option>
                                <Option value="Kh??m s???n ph??? khoa" label="Kh??m s???n ph??? khoa">
                                    <div className="demo-option-label-item">
                                        Kh??m s???n ph??? khoa
                                    </div>
                                </Option>
                                <Option value="Kh??m r??ng h??m m???t" label="Kh??m r??ng h??m m???t">
                                    <div className="demo-option-label-item">
                                        Kh??m r??ng h??m m???t
                                    </div>
                                </Option>
                                <Option value="Kh??m tai m??i h???ng" label="Kh??m tai m??i h???ng">
                                    <div className="demo-option-label-item">
                                        Kh??m tai m??i h???ng
                                    </div>
                                </Option>
                                <Option value="Kh??m h?? h???p" label="Kh??m h?? h???p">
                                    <div className="demo-option-label-item">
                                        Kh??m h?? h???p
                                    </div>
                                </Option>
                                <Option value="Kh??m t???ng qu??t" label="Kh??m t???ng qu??t">
                                    <div className="demo-option-label-item">
                                        Kh??m t???ng qu??t
                                    </div>
                                </Option>
                            </Select>
                        </div>
                    </div>
                    <div className='content__update-warning'>
                        <img src={`${Image.chuY}`}/>
                        <span>L?? tr?????ng th??ng tin b???t bu???c</span>
                    </div>
                </div>
                <div className='content__update-bottom'>
                    <button type='button' className='content__update-btn-cancel' onClick={()=> {
                        navigate('/thietbi');
                    }}>H???y b???</button>
                    <button type='submit' className='content__update-btn-update'>C???p nh???t</button>
                </div>
            </form>  
        </div>
    </Fragment>
  )
}
