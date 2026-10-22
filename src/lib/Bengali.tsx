// ইংরেজি সংখ্যাকে বাংলা সংখ্যায় রূপান্তর করার ফাংশন
export const toBengaliNumber = (num: number | string): string => {
  const map: { [key: string]: string } = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯', '.': '.'
  };
  return num.toString().replace(/[0-9.]/g, (char) => map[char] || char);
};

// ইউনিটের নাম বাংলায় রূপান্তর করার ফাংশন
export const getUnitText = (unit: string): string => {
  switch (unit) {
    case 'kg': return 'প্রতি কেজি';
    case 'litre': return 'প্রতি লিটার';
    case 'dozen': return 'প্রতি ডজন';
    case 'piece': return 'প্রতি পিস';
    default: return 'প্রতি কেজি';
  }
};