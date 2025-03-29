import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    getSupportRequests,
    deleteSupportRequest,
    respondToSupportRequest
} from '/store/common/common-slice/index.js'; // điều chỉnh đường dẫn theo dự án của bạn
import { Button } from '@/components/ui/button';
import './../../css/supCustomer.css/';

function SupportCustomer() {
    const dispatch = useDispatch();
    const { supportRequestList, isSupportLoading } = useSelector((state) => state.commonFeature);
    const [responses, setResponses] = useState({});

    useEffect(() => {
        dispatch(getSupportRequests());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteSupportRequest(id));
    };

    const handleResponseChange = (id, value) => {
        setResponses({ ...responses, [id]: value });
    };

    const handleSendResponse = (id) => {
        const response = responses[id];
        if (response && response.trim() !== '') {
            dispatch(respondToSupportRequest({ id, response }));
            setResponses({ ...responses, [id]: '' });
        }
    };

    return (
        <div className="support-customer-container">
            <h1 className="text-4xl leading-8 text-[#A67C6D] font-bold text-center my-5 uppercase tracking-wide mb-10">
                Yêu cầu hỗ trợ
            </h1>

            {isSupportLoading ? (
                <p className="text-center">Đang tải dữ liệu...</p>
            ) : (
                <table className="support-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                            <th>Created At</th>
                            <th>Response</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {supportRequestList.map((request) => (
                            <tr key={request._id}>
                                <td>{request.name}</td>
                                <td>{request.email}</td>
                                <td>{request.message}</td>
                                <td>{new Date(request.createdAt).toLocaleString()}</td>
                                <td>
                                    {request.response ? (
                                        <div>
                                            <p className="text-green-700">{request.response}</p>
                                            <p className="text-sm text-gray-500">
                                                {new Date(request.respondedAt).toLocaleString()}
                                            </p>
                                        </div>
                                    ) : (
                                        <div>
                                            <textarea
                                                placeholder="Phản hồi..."
                                                value={responses[request._id] || ''}
                                                onChange={(e) =>
                                                    handleResponseChange(request._id, e.target.value)
                                                }
                                                rows={2}
                                                className="border rounded p-2 w-full"
                                            />
                                            <Button
                                                onClick={() => handleSendResponse(request._id)}
                                                className="mt-1"
                                            >
                                                Gửi phản hồi
                                            </Button>
                                        </div>
                                    )}
                                </td>
                                <td>
                                    <Button onClick={() => handleDelete(request._id)} className="btn">
                                        Xoá
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

export default SupportCustomer;
