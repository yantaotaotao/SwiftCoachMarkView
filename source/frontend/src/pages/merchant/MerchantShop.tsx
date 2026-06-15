import React from 'react';
import { Card, Form, Input, Button, Typography, Upload, message, Divider } from 'antd';
import { PlusOutlined, SaveOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

const MerchantShop: React.FC = () => {
  const [form] = Form.useForm();

  const handleSave = () => {
    message.success('店铺信息已保存');
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-3xl mx-auto px-4">
        <Title level={4} className="!mb-6 !text-gray-800">店铺设置</Title>

        <Card
          className="rounded-xl shadow-sm mb-6"
          style={{ border: '1px solid #F0E0D8' }}
        >
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#D4380D] to-[#FF6B35] flex items-center justify-center text-white text-3xl font-bold">
              汉
            </div>
            <div>
              <Text strong className="text-lg">汉中至尊婚车租赁行</Text>
              <div className="text-sm text-gray-400">点击上方Logo区域可更换店铺Logo</div>
            </div>
          </div>

          <Form
            form={form}
            layout="vertical"
            initialValues={{
              shopName: '汉中至尊婚车租赁行',
              phone: '153XXXXXXXX',
              address: '汉台区滨江路XX号',
              description: '汉中本地专业婚车服务商，拥有多款豪华婚车，服务汉中及周边区县新人。',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Form.Item name="shopName" label="店铺名称" rules={[{ required: true }]}>
                <Input size="large" className="rounded-lg" />
              </Form.Item>
              <Form.Item name="phone" label="联系电话" rules={[{ required: true }]}>
                <Input size="large" className="rounded-lg" />
              </Form.Item>
              <Form.Item name="address" label="店铺地址" className="md:col-span-2">
                <Input size="large" className="rounded-lg" />
              </Form.Item>
              <Form.Item name="description" label="店铺简介" className="md:col-span-2">
                <Input.TextArea rows={4} className="rounded-lg" />
              </Form.Item>
            </div>

            <Divider />

            <Form.Item label="店铺封面">
              <Upload listType="picture-card" maxCount={1}>
                <div>
                  <PlusOutlined />
                  <div className="mt-1 text-xs">上传封面</div>
                </div>
              </Upload>
            </Form.Item>

            <Button type="primary" icon={<SaveOutlined />} size="large" className="rounded-lg" onClick={handleSave}>
              保存设置
            </Button>
          </Form>
        </Card>

        <Card
          title={<span className="text-base font-medium">资质认证</span>}
          className="rounded-xl shadow-sm"
          style={{ border: '1px solid #F0E0D8' }}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-[#FFF8F5] rounded-xl">
              <div>
                <Text strong>营业执照</Text>
                <div className="text-xs text-gray-400">上传营业执照照片</div>
              </div>
              <Upload>
                <Button className="rounded-lg">上传</Button>
              </Upload>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#FFF8F5] rounded-xl">
              <div>
                <Text strong>法人身份证</Text>
                <div className="text-xs text-gray-400">上传法人身份证正反面</div>
              </div>
              <Upload>
                <Button className="rounded-lg">上传</Button>
              </Upload>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default MerchantShop;