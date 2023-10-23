// import React, { useEffect } from 'react';
// import { Modal, Form, Input, message } from 'antd';
// import { useDispatch, useSelector } from 'react-redux';
// import { SetLoader } from '../../redux/loadersSlice';
// import { PlaceNewBid } from '../../apicalls/products';
// import { AddNotification } from '../../apicalls/notifications';

// function BidModal({ showBidsModal, setShowBidsModal, product, reloadData, selectedBid }) {
//   const { user } = useSelector((state) => state.users);
//   const rules = [
//     {
//       required: true,
//       message: 'required',
//     },
//   ];
//   const dispatch = useDispatch();
//   const onFinish = async (values) => {
//     try {
//       dispatch(SetLoader(true));
//       const response = await PlaceNewBid({
//         ...values,
//         product: product._id,
//         seller: product.seller._id,
//         buyer: user._id,
//       });
//       dispatch(SetLoader(false));
//       if (response.success) {
//         message.success('Bid Added successfully');

//         // send notification to seller
//         await AddNotification({
//           title: 'A new Bid has been placed',
//           message: `A new bid has been placed for your product ${product.name} by ${user.name} for ₹ ${values.bidAmount}`,
//           user: product.seller._id,
//           onClick: '/profile',
//           read: false,
//         });
//         reloadData();
//         setShowBidsModal(false);
//       } else {
//         throw new Error(response.message);
//       }
//     } catch (error) {
//       message.error(error.message);
//       dispatch(SetLoader(false));
//     }
//   };

//   const formRef = React.useRef(null);

//   useEffect(() => {
//     if (selectedBid ) {
//       formRef.current.setFieldsValue(selectedBid);
//     }
//   }, [selectedBid]);

//   return (
//     <Modal
//       onCancel={() => setShowBidsModal(false)}
//       open={showBidsModal}
//       centered
//       width={600}
//       onOk={() => formRef.current.submit()}
//     >
//       <div className="flex flex-col gap-5 mb-5">
//       <h1 className="text-2xl font-semibold text-orange-900 text-center">
//           {selectedBid? "Edit Bid" : "New Bid"}
//         </h1>
       
//         <h1 className="text-2xl font-semibold text-orange-900 text-center">New Bid</h1>
//         {/* <h1 className="text-primary text-2xl text-center font-semibold uppercase">
//           {selectedBid ? "Edit Bid" : "New Bid"}
//         </h1> */}
//         <Form layout="vertical" ref={formRef} onFinish={onFinish}>
//           <Form.Item label="Bid Amount" name="bidAmount" rules={rules}>
//             <Input />
//           </Form.Item>
//           <Form.Item label="Message" name="message" rules={rules}>
//             <Input.TextArea />
//           </Form.Item>
//           <Form.Item label="Mobile" name="mobile" rules={rules}>
//             <Input type="number" />
//           </Form.Item>
//         </Form>
//       </div>
//     </Modal>
//   );
// }

// export default BidModal;




import React from 'react'
import { Modal, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { SetLoader } from '../../redux/loadersSlice'
import { PlaceNewBid } from '../../apicalls/products'
import { AddNotification } from '../../apicalls/notifications'

function BidModal({ showBidsModal, setShowBidsModal, product,
    reloadData }) {
    const { user } = useSelector((state) => state.users)
    const formRef = React.useRef(null)
    const rules = [
        {
            required: true,
            message: "required",
        },
    ];
    const dispatch = useDispatch();
    const onFinish = async (values) => {
        try {
            dispatch(SetLoader(true));
            const response = await PlaceNewBid({
                ...values,
                product: product._id,
                seller: product.seller._id,
                buyer: user._id
            });
            dispatch(SetLoader(false));
            if (response.success) {
                message.success('Bid Added successfully')

                //send notification to seller
                await AddNotification({
                    title: "A new Bid has been placed",
                    message: `A new bid has been placed for your product ${product.name} by ${user.name} for  ₹ ${values.bidAmount}`,
                    user: product.seller._id,
                    onClick: '/profile',
                    read: false
                });
                reloadData();
                setShowBidsModal(false);
            } else {
                throw new Error(response.message)
            }
        } catch (error) {
            message.error(error.message)
            dispatch(SetLoader(false))
        }
    }
    return (
        <Modal
            onCancel={() => setShowBidsModal(false)}
            open={showBidsModal}
            centered
            width={600}
            onOk={() => formRef.current.submit()}>
            <div className='flex flex-col gap-5 mb-5'>
                <h1 className='text-2xl font-semibold text-orange-900 text-center'>New Bid</h1>
                <Form layout='vertical'
                    ref={formRef}
                    onFinish={onFinish}
                >
                    <Form.Item label='Bid Amount' name='bidAmount' rules={rules}>
                        <Input />
                    </Form.Item>
                    <Form.Item label='Message' name='message' rules={rules}>
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label='Mobile' name='mobile' rules={rules}>
                        <Input type='number' />
                    </Form.Item>

                </Form>
            </div>
        </Modal>
    )
}

export default BidModal;