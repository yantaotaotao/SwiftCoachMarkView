import React, { useState } from 'react';
import { Card, Row, Col, Button, Typography, Steps, Form, Input, Select, DatePicker, TimePicker, Radio, Divider, Tag, Space, message, InputNumber } from 'antd';
import { RightOutlined, CarOutlined, SafetyOutlined, GiftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

const { Title, Text } = Typography;

const PACKAGES = [
  { key: 'half_day', name: '半天套餐', desc: '4小时 / 50km内', price: 1888 },
  { key: 'full_day', name: '全天套餐', desc: '8小时 / 100km内', price: 3288 },
  { key: 'fleet', name: '车队套餐', desc: '主婚车+跟车×3', price: 6666 },
];

const FOLLOW_COUNTS = [1, 3, 5, 7];

const OrderCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedPkg, setSelectedPkg] = useState('half_day');
  const [followCount, setFollowCount] = useState(3);
  const [loading, setLoading] = useState(false);

  const packageDetail = PACKAGES.find(p => p.key === selectedPkg);
  const basePrice = packageDetail?.price ?? 1888;
  const deposit = Math.round(basePrice * 0.3);
  const balance = basePrice - deposit;

  const handleSubmit = async () => {
    try {
      await form.validateFields();
      setLoading(true);
      // Mock submit
      await new Promise(resolve => setTimeout(resolve, 1000));
      message.success('订单提交成功！');
      navigate('/order/pay/ORDER20260615001');
    } catch (error) {
      if (error instanceof Error) {
        message.error('请完善订单信息');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF9F6] py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* 步骤条 */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm border border-[#F0E0D8]">
          <Steps
            current={currentStep}
            items={[
              { title: '选择服务', description: '用车信息' },
              { title: '费用明细', description: '确认金额' },
              { title: '提交支付', description: '完成预订' },
            ]}
          />
        </div>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            {/* Step 1: 选择服务信息 */}
            <Card
              title={
                <Space>
                  <span className="w-6 h-6 rounded-full bg-[#D4380D] text-white text-xs flex items-center justify-center">1</span>
                  <span className="text-base font-medium">选择服务信息</span>
                </Space>
              }
              className="rounded-xl shadow-sm mb-6"
              style={{ border: '1px solid #F0E0D8' }}
            >
              <Form
                form={form}
                layout="vertical"
                initialValues={{ service_date: dayjs() }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Form.Item
                    name="service_date"
                    label="用车日期"
                    rules={[{ required: true, message: '请选择日期' }]}
                  >
                    <DatePicker className="w-full rounded-lg" size="large" />
                  </Form.Item>

                  <Form.Item
                    name="pickup_time"
                    label="接亲时间"
                    rules={[{ required: true, message: '请选择时间' }]}
                  >
                    <TimePicker className="w-full rounded-lg" size="large" format="HH:mm" />
                  </Form.Item>

                  <Form.Item
                    name="contact_name"
                    label="联系人姓名"
                    rules={[{ required: true, message: '请输入联系人' }]}
                  >
                    <Input placeholder="您的姓名" size="large" className="rounded-lg" />
                  </Form.Item>

                  <Form.Item
                    name="contact_phone"
                    label="联系电话"
                    rules={[
                      { required: true, message: '请输入电话' },
                      { pattern: /^1[3-9]\d{9}$/, message: '请输入正确手机号' },
                    ]}
                  >
                    <Input placeholder="11位手机号" size="large" className="rounded-lg" />
                  </Form.Item>

                  <Form.Item
                    name="pickup_address"
                    label="接亲地址"
                    rules={[{ required: true, message: '请输入接亲地址' }]}
                  >
                    <Input placeholder="汉中市XX区XX路XX号" size="large" className="rounded-lg" />
                  </Form.Item>

                  <Form.Item
                    name="ceremony_address"
                    label="仪式酒店"
                    rules={[{ required: true, message: '请输入仪式酒店' }]}
                  >
                    <Input placeholder="汉中市XX酒店" size="large" className="rounded-lg" />
                  </Form.Item>
                </div>

                <Form.Item name="remark" label="备注需求">
                  <Input.TextArea
                    placeholder="鲜花装饰 / 特殊要求 / 如有需要请在此说明..."
                    rows={3}
                    className="rounded-lg"
                  />
                </Form.Item>
              </Form>
            </Card>

            {/* 服务套餐选择 */}
            <Card
              title={
                <Space>
                  <span className="w-6 h-6 rounded-full bg-[#D4380D] text-white text-xs flex items-center justify-center">2</span>
                  <span className="text-base font-medium">选择服务套餐</span>
                </Space>
              }
              className="rounded-xl shadow-sm mb-6"
              style={{ border: '1px solid #F0E0D8' }}
            >
              <div className="space-y-3">
                {PACKAGES.map(pkg => (
                  <Card
                    key={pkg.key}
                    hoverable
                    size="small"
                    className={`cursor-pointer ${selectedPkg === pkg.key ? 'border-2 border-[#D4380D] bg-[#FFF1F0]' : ''}`}
                    onClick={() => setSelectedPkg(pkg.key)}
                    style={{ borderRadius: '12px' }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Radio checked={selectedPkg === pkg.key} />
                        <div>
                          <Text strong className="text-base">{pkg.name}</Text>
                          <div className="text-xs text-gray-400">{pkg.desc}</div>
                        </div>
                      </div>
                      <Text className="text-xl font-bold" style={{ color: '#D4380D' }}>
                        ¥{pkg.price.toLocaleString()}
                      </Text>
                    </div>
                  </Card>
                ))}
              </div>

              {selectedPkg === 'fleet' && (
                <div className="mt-4 p-4 bg-[#FFF8F5] rounded-xl border border-[#F0E0D8]">
                  <Text strong className="block mb-3">跟车配置</Text>
                  <div className="flex items-center gap-4 mb-3">
                    <Text className="text-gray-500">跟车数量：</Text>
                    <Select
                      value={followCount}
                      onChange={setFollowCount}
                      options={FOLLOW_COUNTS.map(n => ({ value: n, label: `${n} 辆` }))}
                      className="w-32"
                    />
                  </div>
                  <div className="flex items-center gap-4">
                    <Text className="text-gray-500">跟车车型：</Text>
                    <Radio.Group defaultValue="unified">
                      <Radio value="unified">统一品牌</Radio>
                      <Radio value="custom">自由搭配</Radio>
                    </Radio.Group>
                  </div>
                </div>
              )}
            </Card>
          </Col>

          {/* 右侧费用明细 */}
          <Col xs={24} lg={8}>
            <div className="sticky top-24">
              <Card
                title={
                  <Space>
                    <SafetyOutlined className="text-[#D4380D]" />
                    <span className="text-base font-medium">费用明细</span>
                  </Space>
                }
                className="rounded-xl shadow-sm"
                style={{ border: '1px solid #F0E0D8' }}
              >
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Text className="text-gray-500">租金（{packageDetail?.name}）</Text>
                    <Text strong>¥{basePrice.toLocaleString()}</Text>
                  </div>
                  {selectedPkg === 'fleet' && (
                    <div className="flex justify-between">
                      <Text className="text-gray-500">跟车（{followCount}辆）</Text>
                      <Text strong>¥{(followCount * 800).toLocaleString()}</Text>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <Text className="text-gray-500">超时押金</Text>
                    <Text strong>¥500</Text>
                  </div>
                  <div className="flex justify-between">
                    <Text className="text-gray-500">装饰费</Text>
                    <Text strong>¥0</Text>
                  </div>

                  <Divider className="my-2" />

                  <div className="flex justify-between">
                    <Text className="text-gray-500">优惠券</Text>
                    <Button type="link" className="!p-0 !text-[#D4380D]">选择优惠券 ▸</Button>
                  </div>

                  <Divider className="my-2" />

                  <div className="flex justify-between">
                    <Text className="text-lg font-bold">合计</Text>
                    <Text className="text-2xl font-bold" style={{ color: '#D4380D' }}>
                      ¥{(selectedPkg === 'fleet' ? basePrice + followCount * 800 : basePrice).toLocaleString()}
                    </Text>
                  </div>

                  <div className="bg-[#FFF8F5] rounded-lg p-3">
                    <div className="flex justify-between text-sm mb-1">
                      <Text className="text-gray-500">首付定金（30%）</Text>
                      <Text strong style={{ color: '#D4380D' }}>
                        ¥{Math.round((selectedPkg === 'fleet' ? basePrice + followCount * 800 : basePrice) * 0.3).toLocaleString()}
                      </Text>
                    </div>
                    <div className="flex justify-between text-sm">
                      <Text className="text-gray-500">尾款</Text>
                      <Text className="text-gray-600">
                        ¥{Math.round((selectedPkg === 'fleet' ? basePrice + followCount * 800 : basePrice) * 0.7).toLocaleString()}
                      </Text>
                    </div>
                  </div>
                </div>

                <Button
                  type="primary"
                  size="large"
                  block
                  className="mt-4 h-12 text-lg rounded-xl"
                  loading={loading}
                  onClick={handleSubmit}
                >
                  提交订单 · 去支付
                </Button>

                <div className="text-center mt-3">
                  <Text className="text-xs text-gray-400">
                    <GiftOutlined /> 订单保留15分钟，超时自动取消
                  </Text>
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default OrderCreatePage;