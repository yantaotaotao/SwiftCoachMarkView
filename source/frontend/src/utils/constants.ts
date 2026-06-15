export const CAR_BRANDS = ['奔驰', '宝马', '奥迪', '保时捷', '玛莎拉蒂', '路虎', '红旗', '复古'];
export const CAR_COLORS = ['黑色', '白色', '红色', '银色', '其他'];
export const DISTRICTS = ['汉台区', '南郑区', '城固县', '洋县', '勉县', '西乡县', '略阳县', '宁强县', '镇巴县', '留坝县', '佛坪县'];

export const ORDER_STATUS_MAP: Record<string, { label: string; color: string }> = {
  pending_pay: { label: '待付款', color: '#faad14' },
  pending_confirm: { label: '待确认', color: '#1890ff' },
  confirmed: { label: '已确认', color: '#52c41a' },
  in_progress: { label: '进行中', color: '#722ed1' },
  completed: { label: '已完成', color: '#8c8c8c' },
  cancelled: { label: '已取消', color: '#ff4d4f' },
  refunding: { label: '退款中', color: '#fa541c' },
  refunded: { label: '已退款', color: '#595959' },
};

export const PACKAGES = [
  { key: 'half_day', name: '半天套餐', desc: '4小时 / 50km内' },
  { key: 'full_day', name: '全天套餐', desc: '8小时 / 100km内' },
  { key: 'fleet', name: '车队套餐', desc: '主婚车+跟车组合' },
];