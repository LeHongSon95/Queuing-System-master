import React, { useEffect } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { isBuffer } from 'util';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { State, taiKhoanCreator } from '../Redux';

type EventTypes = {
    username: string,
    password: string
}

export const Login = () => {

    const navigate = useNavigate();

    const dispatch = useDispatch();
    
    const {LoadDuLieu, DangNhap} = bindActionCreators(taiKhoanCreator, dispatch);

    useEffect(()=> {
        LoadDuLieu();
    }, [])

    const {statusLogin} = useSelector((state:State)=> state.taiKhoan);

    useEffect(()=> {
        if(statusLogin === true) {
            // navigate(-1);
            window.location.replace('/dashboard');
        }else {
            return;
        }
    }, [statusLogin])


    const onFinish = (e: EventTypes) => {
        console.log('Success:', e);
        DangNhap(e.username, e.password);
    };


  return (
    <div className='layout'>
        <div className='container-fuild h-100'>
            <div className='row login'>
                <div className='col-5 login__left'>
                    <div className='login__left-logo'>
                        <img src="./img/logo.png" className='login__left-img'/>
                    </div>
                    <Form
                        name="basic"
                        onFinish={onFinish}
                        className='login__left-form'
                        >
                        <Form.Item
                            label=""
                        >
                            <p>Tên đăng nhập *</p>
                            <Form.Item name="username">
                                <Input className='login__left-input' required/>
                            </Form.Item>
                        </Form.Item>

                        <Form.Item
                            label=""
                        >
                            <p>Mật khẩu *</p>
                            <Form.Item name="password">
                                <Input.Password className='login__left-input' name="password"  required/>
                            </Form.Item>
                        </Form.Item>

                        <NavLink to='/confirmEmail' style={{color: 'red', margin: '0 0 19px 0', display: 'block'}}>
                            Quên mật khẩu ?
                        </NavLink>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" className='login__left-btn'>
                                <span style={{fontWeight: '500'}}>Đăng nhập</span>
                            </Button>
                        </Form.Item>
                        </Form>
                </div>
                <div className='col-7 login__right'>
                    <img src='img/banner.png' className='login__right-img'/>
                    <div className='login__right-title'>
                        <p>Hệ thống</p>
                        <h1>QUẢN LÝ XẾP HÀNG</h1>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
