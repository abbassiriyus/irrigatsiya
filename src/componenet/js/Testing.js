import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
const Testing = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values, any) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo, any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <div className="container">
        <div className="row my-5">
          <div className="col-lg-6">
            <div className="card p-4">
              <h4>Elektironikaning nazariy asoslari </h4>
              <h4 className="text-right">
                <Button
                  type="primary "
                  className="text-center"
                  onClick={showModal}
                >
                  Test yechish
                </Button>
              </h4>
            </div>
          </div>
        </div>
      </div>

      <Modal
        title="Formani to'ldiring talabalar"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          name="Students"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Last name"
            name="Last name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="First name"
            name="First name"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Group"
            name="Group"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item> */}
        </Form>
      </Modal>
    </>
  );
};

export default Testing;
