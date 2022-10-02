import React from 'react';
import { PageHeader, Col, Row } from 'antd';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { actions, Types } from '../state';
import { Descriptions } from 'antd';
import { Typography } from 'antd';
import useFetchInfo from '../../common/hook/useFetchInfo';
import Department from './Department';
import TagList from './TagList';
import History from '../../common/component/History';
import FetchLabel from '../component/FetchLabel';
import useNeedLogin from '../../common/hook/useNeedLogin';

/**
 * 
 * @param {object} param
 * @param {import('react-router').match} param.match
 */
export default function User({ match }) {
    useNeedLogin();
    const history = useHistory();
    const user = useSelector(state => state.user.user);
    const dispatch = useDispatch();
    const userHistory = useSelector(state => state.user.userHistory);

    const name = match.params.name;

    useEffect(() => {
        dispatch(actions.fetchUser(name));
        dispatch(actions.fetchUserHistory(name));
    }, [dispatch, name]);

    useEffect(() => {
        return () => dispatch(actions.initialize());
    }, [dispatch]);

    const { isFetched } = useFetchInfo(Types.FetchUser);

    return (
        <Row justify='center'>
            <Col xs={24} md={20} lg={14}>
                <PageHeader
                    onBack={() => history.push('/')}
                    title={
                        <FetchLabel label="사용자 정보" actionType={Types.FetchUser} />
                    }
                >
                    {user && (
                        <Descriptions layout="vertical" bordered column={1}>
                            <Descriptions.Item label="이름">
                                <Typography.Text>{user.name}</Typography.Text>
                            </Descriptions.Item>
                            <Descriptions.Item label={
                                <FetchLabel
                                    label="소속"
                                    actionType={Types.FetchUpdateUser}
                                    fetchKey="department"
                                />
                            }>
                                <Department />
                            </Descriptions.Item>
                            <Descriptions.Item label={
                                <FetchLabel
                                    label="태그"
                                    actionType={Types.FetchUpdateUser}
                                    fetchKey="tag"
                                />
                            }>
                                <TagList />
                            </Descriptions.Item>
                            <Descriptions.Item label="수정 내역">
                                <Typography.Text>
                                    <History items={userHistory} />
                                </Typography.Text>
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                    {!user && isFetched && (
                        <Typography.Text>존재하지 않는 사용자 입니다.</Typography.Text>
                    )}
                </PageHeader>
            </Col>
        </Row>
    );
}