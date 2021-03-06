import { Breadcrumb, Checkbox } from 'antd';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { MyParams } from '../../../config/paramType';
import { nguoiDungCreator, State } from '../../../Redux';
import { Image } from '../../../Util/variableImage';

interface formikFace {
    tenVaiTro: string,
    moTa: string,
    soNguoiDung: string,
}

export const CapNhatVaiTro = () => {

    const location = useLocation();

    const navigate = useNavigate();

    const [vaiTro, setVaiTro] = useState<any>({
      tenVaiTro: '',
      soNguoiDung: '',
      moTa: ''
  })

    const {id} = useParams<keyof MyParams>() as MyParams;
  
    const dispatch = useDispatch();

    const {LayDuLieu} = bindActionCreators(nguoiDungCreator, dispatch);

    useEffect(()=> {
        LayDuLieu(id);
    }, []);

    
    const vaiTroInfo = useSelector((state: State) => state.vaiTro);

    useEffect(()=> {
        const vaiTroData = vaiTroInfo.vaiTroInfo[0]._document.data.value.mapValue.fields;
        setVaiTro({
            tenVaiTro: `${vaiTroData.tenVaiTro.stringValue}`,
            soNguoiDung: `${vaiTroData.soNguoiDung.stringValue}`,
            moTa: `${vaiTroData.moTa.stringValue}`,
        })
    }, [vaiTroInfo]);

    const initialValues: formikFace = {
        tenVaiTro: `${vaiTro.tenVaiTro}`,
        soNguoiDung: `${vaiTro.soNguoiDung}`,
        moTa: `${vaiTro.moTa}`,
    }

    const formik = useFormik({
        initialValues,
        enableReinitialize: true,
        onSubmit: (values) => {
            console.log(JSON.stringify(values));
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
                <Breadcrumb.Item>C??i ?????t h??? th???ng</Breadcrumb.Item>
                <Breadcrumb.Separator>
                  <img src={`${Image.separator}`}/>
                </Breadcrumb.Separator>
                <Breadcrumb.Item>
                  <a onClick={()=> {
                        navigate('/qlVaiTro');
                    }}>Qu???n l?? vai tr??</a>
                </Breadcrumb.Item>
                <Breadcrumb.Separator>
                  <img src={`${Image.separator}`}/>
                </Breadcrumb.Separator>
                <Breadcrumb.Item>C???p nh???t vai tr??</Breadcrumb.Item>
              </>
            ) : (
              <>
                <Breadcrumb.Item>C??i ?????t h??? th???ng</Breadcrumb.Item>
                <Breadcrumb.Item>
  
                </Breadcrumb.Item>
              </>
            )}
          </Breadcrumb>
        </div>
      )
    }

    function onChange(e:any) {
      console.log(`checked = ${e.target.checked}`);
    }
  return (
    <div>
        <div className='vaiTro__breadcrumb'>
          {breadCrumbView()}
        </div>
        <div className='vaiTro__content'>
          <h3 className='vaiTro__content-heading'>
            Danh s??ch vai tr??
          </h3>
          <form className='vaiTro__content-form' onSubmit={formik.handleSubmit}>
            <div className='vaiTro__content-form-top'>
              <h5 className='content__form-top-heading'>
                Th??ng tin vai tr??
              </h5>
              <div className='content__form-top-list'>
                <div className='content__form-top-list-left'>
                  <div className='content__form-top-item'>
                    <div className='content__form-top-title'>
                      <span>T??n vai tr??:</span> <img src={Image.chuY}/>
                    </div>
                    <input placeholder='Nh???p t??n vai tr??' name='tenVaiTro' defaultValue={formik.values.tenVaiTro}/>
                  </div>
                  <div className='content__form-top-item'>
                    <div className='content__form-top-title'>
                      <span>M?? t???:</span>
                    </div>
                    <textarea placeholder='Nh???p m?? t???'  defaultValue={formik.values.moTa}/>
                  </div>
                  <div className='content__form-top-item'>
                    <div className='content__form-top-item-warning'>
                      <img src={Image.chuY}/>
                      <span>L?? tr?????ng th??ng tin b???t bu???c</span>
                    </div>
                  </div>
                </div>
                <div className='content__form-top-list-right'>
                  <div className='content__form-top-item'>
                    <div className='content__form-top-item-title'>
                      <span>Ph??n quy???n ch???c n??ng: </span>
                      <img src={Image.chuY}/>
                    </div>
                    <div className='content__form-top-item-wrap'>
                        <div className='item__wrap-item'>
                          <h5 className='item__wrap-title'>Nh??m ch???c n??ng A</h5>
                          <div className='item__wrap-check'>
                            <Checkbox onChange={onChange}>T???t c???</Checkbox>
                            <Checkbox onChange={onChange}>Ch???c n??ng x</Checkbox>
                            <Checkbox onChange={onChange}>Ch???c n??ng y</Checkbox>
                            <Checkbox onChange={onChange}>Ch???c n??ng z</Checkbox>
                          </div>
                        </div>
                        <div className='item__wrap-item'>
                          <h5 className='item__wrap-title'>Nh??m ch???c n??ng B</h5>
                          <div className='item__wrap-check'>
                            <Checkbox onChange={onChange}>T???t c???</Checkbox>
                            <Checkbox onChange={onChange}>Ch???c n??ng x</Checkbox>
                            <Checkbox onChange={onChange}>Ch???c n??ng y</Checkbox>
                            <Checkbox onChange={onChange}>Ch???c n??ng z</Checkbox>
                          </div>
                        </div>
                        <div className='item__wrap-item'>
                          <h5 className='item__wrap-title'>Nh??m ch???c n??ng C</h5>
                          <div className='item__wrap-check'>
                            <Checkbox onChange={onChange}>T???t c???</Checkbox>
                            <Checkbox onChange={onChange}>Ch???c n??ng x</Checkbox>
                            <Checkbox onChange={onChange}>Ch???c n??ng y</Checkbox>
                            <Checkbox onChange={onChange}>Ch???c n??ng z</Checkbox>
                          </div>
                        </div>
                        <div className='item__wrap-item'>
                          <h5 className='item__wrap-title'>Nh??m ch???c n??ng D</h5>
                          <div className='item__wrap-check'>
                            <Checkbox onChange={onChange}>T???t c???</Checkbox>
                            <Checkbox onChange={onChange}>Ch???c n??ng x</Checkbox>
                            <Checkbox onChange={onChange}>Ch???c n??ng y</Checkbox>
                            <Checkbox onChange={onChange}>Ch???c n??ng z</Checkbox>
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='vaiTro__content-form-bottom'>
              <button className='content__form-bottom-cancel' type='button' onClick={()=> {
                navigate('/qlVaiTro');
              }}>H???y b???</button>
              <button className='content__form-bottom-add' type='button' onClick={()=> {
                navigate('/qlVaiTro');
              }}>C???p nh???t</button>
            </div>
          </form>
        </div>
      </div>
  )
}
