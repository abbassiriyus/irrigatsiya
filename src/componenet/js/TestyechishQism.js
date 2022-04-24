import React, { useState } from "react";
import { Radio, Space, Button, Modal } from "antd";

export const TestyechishQism = () => {
  const [value, setValue] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center mt-3">Fan nomi</h1>
        <div className="col-lg-12 my-3">
          <div className="card p-5 my-4">
            <div>
              <h3>Ikki o'lchovli masalalarda tasvirlar ifodalanadi</h3>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={1}>Option A</Radio>
                  <Radio value={2}>Option B</Radio>
                  <Radio value={3}>Option C</Radio>
                  <Radio value={4}>Option C</Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
          <div className="card p-5 my-4">
            <div>
              <h1>Ikki o'lchovli masalalarda tasvirlar ifodalanadi</h1>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={1}>Option A</Radio>
                  <Radio value={2}>Option B</Radio>
                  <Radio value={3}>Option C</Radio>
                  <Radio value={4}>Option C</Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
          <div className="card p-5 my-4">
            <div>
              <h1>Ikki o'lchovli masalalarda tasvirlar ifodalanadi</h1>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={12}>Option A</Radio>
                  <Radio value={22}>Option B</Radio>
                  <Radio value={32}>Option C</Radio>
                  <Radio value={42}>Option C</Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
          <div className="card p-5 my-4">
            <div>
              <h1>Ikki o'lchovli masalalarda tasvirlar ifodalanadi</h1>
              <Radio.Group onChange={onChange} value={value}>
                <Space direction="vertical">
                  <Radio value={11}>Option A</Radio>
                  <Radio value={21}>Option B</Radio>
                  <Radio value={31}>Option C</Radio>
                  <Radio value={41}>Option C</Radio>
                </Space>
              </Radio.Group>
            </div>
          </div>
          <div className="d-flex justify-content-end mt-3">
            <Button type="primary" onClick={showModal}>
              Testni yakunlash
            </Button>
          </div>
        </div>
      </div>

      <Modal
        title="Testni rostan ham yakunlaysizmi"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Testni rostan ham yakunlaysizmi</p>
      </Modal>
    </div>
  );
};
