import { Col } from 'antd';
import { Form } from 'antd';
import { Typography } from 'antd';
import { Row } from 'antd';
import React from 'react';

/**
 * 
 * @param {object} param
 * @param {() => void} param.onFinish
 * @param {import('react').ReactNode} param.children
 */
export default function AuthLayout({ children, onFinish }) {
    return (
        <>
            <Row justify="center" style={{ marginTop: 100 }}>
                <Col>
                    <Typography.Title style={{ fontFamily: 'Caligraphhy' }}>
                        찾 아 야 한 다
                    </Typography.Title>
                </Col>
            </Row>
            <Row justify="center">
                <Col>
                    <Form
                        name="normal_login"
                        style={{ width: 300, marginTop: 50 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                    >
                        {children}
                    </Form>
                </Col>
            </Row>
        </>
    )
}