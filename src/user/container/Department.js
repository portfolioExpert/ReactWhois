import { Button } from 'antd';
import { message } from 'antd';
import { Input } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../state';

export default function Department() {
    const [isEditDepartment, setIsEditDepartment] = useState(false);
    const [tempDepartment, setTempDepartment] = useState('');
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();

    function onSaveDepartment() {
        if (tempDepartment) {
            dispatch(actions.fetchUpdateUser({
                user,
                key: 'department',
                value: tempDepartment,
                fetchKey: 'department',
            }),
            );
            setIsEditDepartment(false);
        }
        else
            message.error('소속은 필수 값입니다.');
    }

    function onEditDepartment() {
        setIsEditDepartment(true);
        setTempDepartment(user.department);
    }
    return (
        <>
            {isEditDepartment && (
                <Input
                    autoFocus
                    //ref={ref => ref && ref.focus()}//한 번 클릭해도 자동으로 focus가 가는 것
                    value={tempDepartment}
                    onChange={e => setTempDepartment(e.target.value)}
                    onPressEnter={onSaveDepartment}
                    onBlur={() => setIsEditDepartment(false)}
                    style={{ width: '100%' }}
                />
            )}
            {!isEditDepartment && (
                <Button
                    type='text'
                    block
                    onClick={onEditDepartment}
                    style={{ textAlign: 'left', padding: 0 }}
                >
                    {user.department}
                </Button>
            )}
        </>
    );
}