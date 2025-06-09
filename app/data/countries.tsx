// app/data/countries.ts
export interface Country {
  value: string;
  label: string;
}

export const countries: Country[] = [
  { value: 'TH', label: 'ประเทศไทย' },
  { value: 'US', label: 'สหรัฐอเมริกา' },
  { value: 'GB', label: 'สหราชอาณาจักร' },
  { value: 'CA', label: 'แคนาดา' },
  { value: 'AU', label: 'ออสเตรเลีย' },
  { value: 'JP', label: 'ญี่ปุ่น' },
  { value: 'KR', label: 'เกาหลีใต้' },
  { value: 'CN', label: 'จีน' },
  { value: 'SG', label: 'สิงคโปร์' },
  { value: 'MY', label: 'มาเลเซีย' },
  { value: 'VN', label: 'เวียดนาม' },
  { value: 'ID', label: 'อินโดนีเซีย' },
  { value: 'PH', label: 'ฟิลิปปินส์' },
  { value: 'IN', label: 'อินเดีย' },
  { value: 'FR', label: 'ฝรั่งเศส' },
  { value: 'DE', label: 'เยอรมนี' },
  { value: 'IT', label: 'อิตาลี' },
  { value: 'ES', label: 'สเปน' },
  { value: 'NL', label: 'เนเธอร์แลนด์' },
  { value: 'BR', label: 'บราซิล' },
  { value: 'MX', label: 'เม็กซิโก' },
  { value: 'AR', label: 'อาร์เจนตินา' },
  { value: 'RU', label: 'รัสเซีย' },
  { value: 'SA', label: 'ซาอุดีอาระเบีย' },
  { value: 'AE', label: 'สหรัฐอาหรับเอมิเรตส์' },
  { value: 'ZA', label: 'แอฟริกาใต้' },
  { value: 'EG', label: 'อียิปต์' },
  { value: 'TR', label: 'ตุรกี' },
];
