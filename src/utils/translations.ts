import { LanguageCode } from '../types';

export interface TranslationSchema {
  // Navigation
  navHome: string;
  navOrder: string;
  navAbout: string;
  navFaqs: string;
  navHistory: string;
  navTrack: string;
  navContact: string;
  navPlaceOrder: string;
  navAdmin: string;

  // Hero
  companyName: string;
  tagline: string;
  heroSubtext: string;
  placeYourOrder: string;
  explorePacks: string;
  freshStock: string;
  callOwner: string;
  callGM: string;
  whatsappGM: string;

  // Why Choose Us
  whyChooseHeading: string;
  whyChooseSubheading: string;
  featureQualityTitle: string;
  featureQualityDesc: string;
  featureServiceTitle: string;
  featureServiceDesc: string;
  featureEasyTitle: string;
  featureEasyDesc: string;
  featureSupportTitle: string;
  featureSupportDesc: string;
  featureDeliveryTitle: string;
  featureDeliveryDesc: string;

  // Pack Sizes
  packSizesHeading: string;
  packSizesSubheading: string;
  pack125gTitle: string;
  pack250gTitle: string;
  pack500gTitle: string;
  pack1kgTitle: string;
  quantityLabel: string;
  packsSelected: string;
  selectPacksForOrder: string;
  totalTeaWeight: string;
  kgUnit: string;

  // Order Page
  orderPageTitle: string;
  orderPageSubtitle: string;
  step1Heading: string;
  step2Heading: string;
  step3Heading: string;
  customerNameLabel: string;
  customerNamePlaceholder: string;
  shopNameLabel: string;
  shopNamePlaceholder: string;
  mobileLabel: string;
  mobilePlaceholder: string;
  addressLabel: string;
  addressPlaceholder: string;
  cityLabel: string;
  cityPlaceholder: string;
  notesLabel: string;
  notesPlaceholder: string;
  paymentMethodHeading: string;
  codTitle: string;
  codDesc: string;
  easyPaisaTitle: string;
  easyPaisaDesc: string;
  easyPaisaNumberInfo: string;
  reviewOrderBtn: string;
  clearSelectionBtn: string;
  requiredFieldsAlert: string;
  selectAtLeastOnePackAlert: string;

  // Review & Bill
  orderReviewTitle: string;
  orderReviewSubtitle: string;
  customerDetailsHeading: string;
  orderDetailsHeading: string;
  paymentInfoHeading: string;
  editOrderBtn: string;
  confirmOrderBtn: string;
  orderIdLabel: string;
  orderDateLabel: string;

  // Order Confirmation
  orderConfirmedTitle: string;
  orderConfirmedMsg: string;
  trackOrderBtn: string;
  viewBillBtn: string;
  printBillBtn: string;
  contactCompanyBtn: string;
  orderMoreBtn: string;
  orderStatusLabel: string;

  // Tracker
  trackerTitle: string;
  trackerSubtitle: string;
  enterOrderIdLabel: string;
  orderIdPlaceholder: string;
  trackBtn: string;
  orderReceived: string;
  orderConfirmed: string;
  orderProcessing: string;
  orderOutForDelivery: string;
  orderDelivered: string;
  orderCancelled: string;
  currentStatus: string;
  notFoundAlert: string;

  // History
  historyTitle: string;
  historySubtitle: string;
  noOrdersYet: string;
  reorderBtn: string;
  viewDetailsBtn: string;
  searchHistoryPlaceholder: string;

  // About
  aboutTitle: string;
  aboutSubtitle: string;
  leadershipTitle: string;
  ownerLabel: string;
  ownerName: string;
  gmLabel: string;
  gmName: string;
  aboutQualityText: string;
  aboutServiceText: string;
  aboutCommitmentText: string;

  // FAQs
  faqsTitle: string;
  faqsSubtitle: string;

  // Message Management
  messageMgmtTitle: string;
  messageMgmtSubtitle: string;
  messageLabel: string;
  messagePlaceholder: string;
  sendWhatsAppBtn: string;
  directCallHeading: string;

  // Footer
  footerAbout: string;
  quickLinks: string;
  contactDetails: string;
  allRightsReserved: string;
}

const rawTranslations: Record<LanguageCode, TranslationSchema> = {
  'simple-english': {
    navHome: 'Home',
    navOrder: 'Order',
    navAbout: 'About',
    navFaqs: 'FAQs',
    navHistory: 'History',
    navTrack: 'Track Order',
    navContact: 'Contact',
    navPlaceOrder: 'Place Order',
    navAdmin: 'Admin Portal',

    companyName: 'SK Tea Company',
    tagline: 'Quality Tea, Trusted Service.',
    heroSubtext: 'Premium aromatic tea directly supplied to shops, hotels, and households with pure taste, rich color, and reliable fast delivery.',
    placeYourOrder: 'Place Your Order',
    explorePacks: 'Explore Pack Sizes',
    freshStock: '100% Pure & Fresh Stock',
    callOwner: 'Call Owner (Azam)',
    callGM: 'Call GM (Zeeshan)',
    whatsappGM: 'WhatsApp GM',

    whyChooseHeading: 'Why Choose SK Tea Company',
    whyChooseSubheading: 'Built on uncompromising quality, prompt delivery, and long-term relationships with shopkeepers.',
    featureQualityTitle: 'Quality Tea',
    featureQualityDesc: 'Selected premium tea leaves offering rich aroma, deep color, and strong invigorating taste in every cup.',
    featureServiceTitle: 'Reliable Service',
    featureServiceDesc: 'Consistent supply, timely dispatch, and transparent communication for every order large or small.',
    featureEasyTitle: 'Easy Ordering',
    featureEasyDesc: 'Order in seconds by selecting your required pack sizes and entering your shop details effortlessly.',
    featureSupportTitle: 'Customer Support',
    featureSupportDesc: 'Direct phone & WhatsApp access to management for custom requirements, urgent supply, and feedback.',
    featureDeliveryTitle: 'Convenient Delivery',
    featureDeliveryDesc: 'Direct delivery to your doorstep, shop, or commercial premises with Cash on Delivery and EasyPaisa.',

    packSizesHeading: 'Available Tea Pack Sizes',
    packSizesSubheading: 'Choose any combination of pack sizes. Quantities and total weight are automatically calculated.',
    pack125gTitle: '125g Pack',
    pack250gTitle: '250g Pack',
    pack500gTitle: '500g Pack',
    pack1kgTitle: '1 KG Pack',
    quantityLabel: 'Quantity',
    packsSelected: 'packs selected',
    selectPacksForOrder: 'Select Packs',
    totalTeaWeight: 'Total Tea Quantity',
    kgUnit: 'KG',

    orderPageTitle: 'Book Your Tea Order',
    orderPageSubtitle: 'Select pack sizes, enter your shop and delivery details, and review your instant invoice bill.',
    step1Heading: '1. Select Pack Sizes & Quantities',
    step2Heading: '2. Customer / Shop Details',
    step3Heading: '3. Payment Method',
    customerNameLabel: 'Customer / Shopkeeper Name',
    customerNamePlaceholder: 'e.g. Muhammad Aslam',
    shopNameLabel: 'Shop / Business Name',
    shopNamePlaceholder: 'e.g. Aslam General Store',
    mobileLabel: 'Mobile Phone Number',
    mobilePlaceholder: 'e.g. 03001234567',
    addressLabel: 'Complete Delivery Address',
    addressPlaceholder: 'e.g. Shop # 4, Main Bazar, Near City Mosque',
    cityLabel: 'City / Area',
    cityPlaceholder: 'e.g. Lahore / Rawalpindi / Gujranwala',
    notesLabel: 'Additional Delivery Notes (Optional)',
    notesPlaceholder: 'e.g. Deliver between 10 AM and 4 PM, call on arrival',
    paymentMethodHeading: 'Select Payment Method',
    codTitle: 'Cash on Delivery (COD)',
    codDesc: 'Pay in cash when your tea order arrives at your shop or home.',
    easyPaisaTitle: 'EasyPaisa',
    easyPaisaDesc: 'Send payment via EasyPaisa to General Manager account.',
    easyPaisaNumberInfo: 'EasyPaisa Number: 03327223733 (Muhammad Zeeshan - GM)',
    reviewOrderBtn: 'Review Full Bill',
    clearSelectionBtn: 'Clear Quantities',
    requiredFieldsAlert: 'Please fill in all required customer details.',
    selectAtLeastOnePackAlert: 'Please select at least 1 pack size before proceeding.',

    orderReviewTitle: 'Order Review & Bill',
    orderReviewSubtitle: 'Please review all order details carefully before confirming submission.',
    customerDetailsHeading: 'Customer & Shop Details',
    orderDetailsHeading: 'Order Breakdown',
    paymentInfoHeading: 'Payment & Delivery Info',
    editOrderBtn: 'Edit Order',
    confirmOrderBtn: 'Confirm & Place Order',
    orderIdLabel: 'Order ID',
    orderDateLabel: 'Date & Time',

    orderConfirmedTitle: 'Order Successfully Placed!',
    orderConfirmedMsg: 'Thank you for your order with SK Tea Company. Your tea order has been recorded and will be processed shortly.',
    trackOrderBtn: 'Track This Order',
    viewBillBtn: 'View Invoice Bill',
    printBillBtn: 'Print / Save Bill',
    contactCompanyBtn: 'Contact Management',
    orderMoreBtn: 'Place Another Order',
    orderStatusLabel: 'Current Status',

    trackerTitle: 'Track Your Order',
    trackerSubtitle: 'Enter your Order ID (e.g. SKT-000101) to view real-time status and delivery updates.',
    enterOrderIdLabel: 'Enter Order ID',
    orderIdPlaceholder: 'SKT-XXXXXX',
    trackBtn: 'Track Status',
    orderReceived: 'Order Received',
    orderConfirmed: 'Confirmed',
    orderProcessing: 'Processing',
    orderOutForDelivery: 'Out for Delivery',
    orderDelivered: 'Delivered',
    orderCancelled: 'Cancelled',
    currentStatus: 'Status',
    notFoundAlert: 'Order not found. Please check your Order ID.',

    historyTitle: 'Order History',
    historySubtitle: 'View your previous orders, review invoices, or re-order in one click.',
    noOrdersYet: 'No previous orders found on this device. Place your first order today!',
    reorderBtn: 'Reorder Now',
    viewDetailsBtn: 'View Bill',
    searchHistoryPlaceholder: 'Search by Order ID or Shop Name...',

    aboutTitle: 'About SK Tea Company',
    aboutSubtitle: 'Committed to delivering pure, aromatic, and superior quality tea across Pakistan.',
    leadershipTitle: 'Company Leadership & Management',
    ownerLabel: 'Owner',
    ownerName: 'Muhammad Azam',
    gmLabel: 'General Manager',
    gmName: 'Muhammad Zeeshan',
    aboutQualityText: 'At SK Tea Company, we believe a great cup of tea starts with authentic, carefully chosen leaves. We maintain strict quality standards to ensure our blend delivers consistent strength, vibrant color, and rich flavor.',
    aboutServiceText: 'We take pride in our honest, dependable service. Shopkeepers, retailers, and tea stalls trust us for timely deliveries, accurate pack weights, and fair pricing.',
    aboutCommitmentText: 'Our focus is building long-term, trusted relationships with every customer through personal attention, responsive support, and unwavering dedication to tea excellence.',

    faqsTitle: 'Frequently Asked Questions (FAQs)',
    faqsSubtitle: 'Everything you need to know about ordering tea from SK Tea Company.',

    messageMgmtTitle: 'Direct Message to Management',
    messageMgmtSubtitle: 'Have a question, bulk inquiry, or special request? Send a direct message to General Manager Muhammad Zeeshan.',
    messageLabel: 'Your Message / Inquiry',
    messagePlaceholder: 'Write your question, required quantity, or feedback here...',
    sendWhatsAppBtn: 'Send Message via WhatsApp',
    directCallHeading: 'Official Direct Call Numbers',

    footerAbout: 'SK Tea Company provides high-grade tea packs in 125g, 250g, 500g, and 1 KG sizes with trusted service and swift doorstep delivery.',
    quickLinks: 'Quick Links',
    contactDetails: 'Official Contacts',
    allRightsReserved: 'All Rights Reserved. SK Tea Company.',
  },

  'roman-english': {
    navHome: 'Home',
    navOrder: 'Order Karein',
    navAbout: 'Hamare Baare Mein',
    navFaqs: 'Sawaal Jawab',
    navHistory: 'Order History',
    navTrack: 'Order Track',
    navContact: 'Raabta',
    navPlaceOrder: 'Order Book Karein',
    navAdmin: 'Admin Portal',

    companyName: 'SK Tea Company',
    tagline: 'Quality Tea, Trusted Service.',
    heroSubtext: 'Behtareen aur khushbudaar chai jo dukanon, hotelon aur gharon tak behtareen zaiqe, rangat aur bharosemand delivery ke sath pohanchai jaati hai.',
    placeYourOrder: 'Apna Order Book Karein',
    explorePacks: 'Pack Sizes Dekhein',
    freshStock: '100% Khalis aur Taza Stock',
    callOwner: 'Owner ko Call Karein (Azam)',
    callGM: 'GM ko Call Karein (Zeeshan)',
    whatsappGM: 'GM ko WhatsApp Karein',

    whyChooseHeading: 'SK Tea Company Kyun Chunein?',
    whyChooseSubheading: 'Aala quality chai, waqt par delivery aur dukan daron ke sath mustaqil aitmaad.',
    featureQualityTitle: 'Behtareen Chai',
    featureQualityDesc: 'Chuni hui aala patti jo har cup mein lajawab khushbu, gaarha rang aur zabardast zaiqa deti hai.',
    featureServiceTitle: 'Bharosemand Service',
    featureServiceDesc: 'Baqadgi se stock ki farahmi, waqt par dispatch aur har order par transparent service.',
    featureEasyTitle: 'Aasan Order',
    featureEasyDesc: 'Chann seconds mein pack sizes chunein aur dukan ki maloomat darj kar ke order dein.',
    featureSupportTitle: 'Customer Support',
    featureSupportDesc: 'Zaroorat ya maloomat ke liye management se direct phone aur WhatsApp raabta.',
    featureDeliveryTitle: 'Aasan Delivery',
    featureDeliveryDesc: 'Aapki dukan ya ghar tak seedhi delivery, Cash on Delivery aur EasyPaisa ki sahoolat ke sath.',

    packSizesHeading: 'Dastyab Tea Pack Sizes',
    packSizesSubheading: 'Har pack size ki tadaad chunein. Kul wazan (Total KG) foran hisaab ho jayega.',
    pack125gTitle: '125g Pack',
    pack250gTitle: '250g Pack',
    pack500gTitle: '500g Pack',
    pack1kgTitle: '1 KG Pack',
    quantityLabel: 'Tadaad (Quantity)',
    packsSelected: 'packs chune gaye',
    selectPacksForOrder: 'Packs Chunein',
    totalTeaWeight: 'Chai ka Kul Wazan (Total KG)',
    kgUnit: 'KG',

    orderPageTitle: 'Apna Chai ka Order Book Karein',
    orderPageSubtitle: 'Pack size aur tadaad chunein, apni dukan ki maloomat likhein aur apna bill check karein.',
    step1Heading: '1. Pack Sizes aur Tadaad Chunein',
    step2Heading: '2. Customer aur Dukan ki Maloomat',
    step3Heading: '3. Payment ka Tareeqa',
    customerNameLabel: 'Customer / Dukandar ka Naam',
    customerNamePlaceholder: 'Maslan: Muhammad Aslam',
    shopNameLabel: 'Dukan / Karobar ka Naam',
    shopNamePlaceholder: 'Maslan: Aslam General Store',
    mobileLabel: 'Mobile Phone Number',
    mobilePlaceholder: 'Maslan: 03001234567',
    addressLabel: 'Mukammal Delivery Pata',
    addressPlaceholder: 'Maslan: Dukan # 4, Main Bazar, Purani Chungi',
    cityLabel: 'Shehar / Area',
    cityPlaceholder: 'Maslan: Lahore / Rawalpindi / Gujranwala',
    notesLabel: 'Khaas Hidayat (Optional)',
    notesPlaceholder: 'Maslan: Dukan subah 10 baje khulti hai, aane se pehle phone karein',
    paymentMethodHeading: 'Payment ka Tareeqa Chunein',
    codTitle: 'Cash on Delivery (COD)',
    codDesc: 'Jab chai aapki dukan par pohnche tab cash ada karein.',
    easyPaisaTitle: 'EasyPaisa',
    easyPaisaDesc: 'General Manager ke EasyPaisa account par raqam bheinjein.',
    easyPaisaNumberInfo: 'EasyPaisa Number: 03327223733 (Muhammad Zeeshan - GM)',
    reviewOrderBtn: 'Mukammal Bill Check Karein',
    clearSelectionBtn: 'Quantity Reset Karein',
    requiredFieldsAlert: 'Meharbani farma kar zaroori maloomat darj karein.',
    selectAtLeastOnePackAlert: 'Kam az kam 1 pack size ki quantity select karein.',

    orderReviewTitle: 'Order Review aur Bill',
    orderReviewSubtitle: 'Order confirm karne se pehle apna mukammal bill aur maloomat check kar lein.',
    customerDetailsHeading: 'Customer aur Dukan ki Details',
    orderDetailsHeading: 'Order ki Tafseelat',
    paymentInfoHeading: 'Payment aur Delivery Info',
    editOrderBtn: 'Order Tabdeel Karein',
    confirmOrderBtn: 'Order Confirm Karein',
    orderIdLabel: 'Order ID',
    orderDateLabel: 'Tareekh aur Waqt',

    orderConfirmedTitle: 'Order Kamyabi se Book Ho Gaya!',
    orderConfirmedMsg: 'SK Tea Company se rabtay ka shukriya. Aapka order darj ho chuka hai aur jald dispatch hoga.',
    trackOrderBtn: 'Order Track Karein',
    viewBillBtn: 'Invoice Bill Dekhein',
    printBillBtn: 'Bill Print / Save Karein',
    contactCompanyBtn: 'Management se Raabta',
    orderMoreBtn: 'Naya Order Dein',
    orderStatusLabel: 'Maujuda Status',

    trackerTitle: 'Apna Order Track Karein',
    trackerSubtitle: 'Apna Order ID (maslan SKT-000101) likhein aur live delivery status check karein.',
    enterOrderIdLabel: 'Order ID Likhein',
    orderIdPlaceholder: 'SKT-XXXXXX',
    trackBtn: 'Status Check Karein',
    orderReceived: 'Order Masool Hua (Received)',
    orderConfirmed: 'Order Tasdeeq Hua (Confirmed)',
    orderProcessing: 'Tayyari Jari Hai (Processing)',
    orderOutForDelivery: 'Delivery par Nikal Gaya',
    orderDelivered: 'Pohanch Gaya (Delivered)',
    orderCancelled: 'Mansookh Hua (Cancelled)',
    currentStatus: 'Status',
    notFoundAlert: 'Yeh Order ID nahi mili. Meharbani kar ke sahi Order ID darj karein.',

    historyTitle: 'Order History',
    historySubtitle: 'Pichlay tamam orders dekhein aur 1-click mein dubara order karein.',
    noOrdersYet: 'Is device par abhi koi pichla order nahi mila. Naya order dein!',
    reorderBtn: 'Dubara Order Karein',
    viewDetailsBtn: 'Bill Dekhein',
    searchHistoryPlaceholder: 'Order ID ya Dukan ke naam se dhoondein...',

    aboutTitle: 'SK Tea Company ke Baare Mein',
    aboutSubtitle: 'Pakistan bhar mein khalis, khushbudaar aur behtareen chai ki farahmi hamara azam hai.',
    leadershipTitle: 'Company Leadership & Management',
    ownerLabel: 'Owner (Malik)',
    ownerName: 'Muhammad Azam',
    gmLabel: 'General Manager',
    gmName: 'Muhammad Zeeshan',
    aboutQualityText: 'SK Tea Company mein hum maante hain ke achi chai aala patti se banti hai. Hum safai aur aala meyaar ka pura khayal rakhte hain.',
    aboutServiceText: 'Hamari pehchan imandari aur bharosemand service hai. Dukandar hum par purn-aitmaad hain.',
    aboutCommitmentText: 'Hamara maqsad har customer ke sath mustaqil aur khushgawar taaluq qaim rakhna hai.',

    faqsTitle: 'Aam Sawaalat (FAQs)',
    faqsSubtitle: 'SK Tea Company ke mutalliq aam pooche janay walay sawaal.',

    messageMgmtTitle: 'Management ko Direct Paigham',
    messageMgmtSubtitle: 'Koi sawaal ya khaas darkhwast hai? General Manager Muhammad Zeeshan ko direct WhatsApp paigham bhejein.',
    messageLabel: 'Aapka Paigham',
    messagePlaceholder: 'Apna sawaal ya matlooba tadaad yahan likhein...',
    sendWhatsAppBtn: 'WhatsApp par Paigham Bhejein',
    directCallHeading: 'Official Call Numbers',

    footerAbout: 'SK Tea Company 125g, 250g, 500g aur 1 KG packs mein aala patti dukanon aur gharon tak pohanchati hai.',
    quickLinks: 'Aham Links',
    contactDetails: 'Official Raabtah',
    allRightsReserved: 'Tamam Huqooq Mehfooz Hain. SK Tea Company.',
  },

  'urdu': {
    navHome: 'ہوم',
    navOrder: 'آرڈر کریں',
    navAbout: 'ہمارے متعلق',
    navFaqs: 'عام سوالات',
    navHistory: 'آرڈر ہسٹری',
    navTrack: 'آرڈر ٹریک کریں',
    navContact: 'رابطہ',
    navPlaceOrder: 'آرڈر بک کریں',
    navAdmin: 'ایڈمن پورٹل',

    companyName: 'ایس کے ٹی کمپنی (SK Tea Company)',
    tagline: 'معیاری چائے، قابلِ اعتماد سروس۔',
    heroSubtext: 'شاندار، خوشبودار اور خالص چائے جو دکانوں، ہوٹلوں اور گھروں تک بہترین رنگت اور تیز ذائقے کے ساتھ بروقت پہنچائی جاتی ہے۔',
    placeYourOrder: 'اپنا آرڈر بک کریں',
    explorePacks: 'پیک سائز دیکھیں',
    freshStock: '۱۰۰٪ خالص اور تازہ اسٹاک',
    callOwner: 'مالک سے رابطہ (محمد اعظم)',
    callGM: 'جنرل مینیجر سے رابطہ (محمد ذیشان)',
    whatsappGM: 'واٹس ایپ پر رابطہ',

    whyChooseHeading: 'ایس کے ٹی کمپنی کیوں منتخب کریں؟',
    whyChooseSubheading: 'اعلیٰ کوالٹی چائے، تیز رفتار ڈیلیوری اور دکانداروں کے ساتھ دیرپا اعتماد۔',
    featureQualityTitle: 'اعلیٰ معیار چائے',
    featureQualityDesc: 'منتخب کردہ عمدہ پتی جو ہر پیالی میں بہترین خوشبو، گہرا رنگ اور لاجواب ذائقہ فراہم کرتی ہے۔',
    featureServiceTitle: 'قابلِ اعتماد سروس',
    featureServiceDesc: 'اسٹاک کی باقاعدہ ترسیل اور ہر چھوٹے بڑے آرڈر پر شفاف اور تسلی بخش سروس۔',
    featureEasyTitle: 'آسان آرڈرنگ',
    featureEasyDesc: 'چند سیکنڈز میں مطلوبہ پیک سائز منتخب کریں اور دکان کی تفصیل درج کر کے آرڈر دیں۔',
    featureSupportTitle: 'کسٹمر سپورٹ',
    featureSupportDesc: 'ضرورت یا رہنمائی کے لیے مینیجمنٹ سے براہِ راست فون اور واٹس ایپ رابطہ۔',
    featureDeliveryTitle: 'آسان ڈیلیوری',
    featureDeliveryDesc: 'آپ کی دکان یا گھر پر کیش آن ڈیلیوری اور ایزی پیسہ کی سہولت کے ساتھ ڈیلیوری۔',

    packSizesHeading: 'دستیاب ٹی پیک سائزز',
    packSizesSubheading: 'اپنی ضرورت کے مطابق پیک سائزز منتخب کریں۔ کل وزن (KG) خودکار طریقے سے بن جائے گا۔',
    pack125gTitle: '۱۲۵ گرام پیک',
    pack250gTitle: '۲۵۰ گرام پیک',
    pack500gTitle: '۵۰۰ گرام پیک',
    pack1kgTitle: '۱ کلو گرام پیک',
    quantityLabel: 'تعداد (Quantity)',
    packsSelected: 'پیکس منتخب شدہ',
    selectPacksForOrder: 'پیکس منتخب کریں',
    totalTeaWeight: 'چائے کا کل وزن (Total KG)',
    kgUnit: 'کلوگرام',

    orderPageTitle: 'چائے کا آرڈر بک کریں',
    orderPageSubtitle: 'پیک سائز اور تعداد منتخب کریں، دکان کی تفصیل درج کریں اور اپنا بل دیکھیں۔',
    step1Heading: '۱. پیک سائز اور تعداد منتخب کریں',
    step2Heading: '۲. دکاندار / گاہک کی معلومات',
    step3Heading: '۳. ادائیگی کا طریقہ',
    customerNameLabel: 'گاہک / دکاندار کا نام',
    customerNamePlaceholder: 'مثلاً: محمد اسلم',
    shopNameLabel: 'دکان / کاروبار کا نام',
    shopNamePlaceholder: 'مثلاً: اسلم جنرل اسٹور',
    mobileLabel: 'موبائل فون نمبر',
    mobilePlaceholder: 'مثلاً: 03001234567',
    addressLabel: 'مکمل ڈیلیوری ایڈریس',
    addressPlaceholder: 'مثلاً: دکان نمبر ۴، مین بازار، نزد جامع مسجد',
    cityLabel: 'شہر / علاقہ',
    cityPlaceholder: 'مثلاً: لاہور / راولپنڈی / گوجرانوالہ',
    notesLabel: 'اضافی ہدایات (اختیاری)',
    notesPlaceholder: 'مثلاً: صبح ۱۰ سے شام ۴ بجے کے درمیان ڈلیور کریں',
    paymentMethodHeading: 'ادائیگی کا طریقہ منتخب کریں',
    codTitle: 'کیش آن ڈیلیوری (COD)',
    codDesc: 'جب چائے آپ کی دکان پر پہنچے تب رقم ادا کریں۔',
    easyPaisaTitle: 'ایزی پیسہ (EasyPaisa)',
    easyPaisaDesc: 'جنرل مینیجر کے ایزی پیسہ نمبر پر رقم منتقل کریں۔',
    easyPaisaNumberInfo: 'ایزی پیسہ نمبر: 03327223733 (محمد ذیشان - GM)',
    reviewOrderBtn: 'مکمل بل چیک کریں',
    clearSelectionBtn: 'تعداد ری سیٹ کریں',
    requiredFieldsAlert: 'برائے مہربانی تمام ضروری خانے پُر کریں۔',
    selectAtLeastOnePackAlert: 'کم از کم ایک پیک سائز کی تعداد درج کریں۔',

    orderReviewTitle: 'آرڈر ریویو اور بل',
    orderReviewSubtitle: 'آرڈر کنفرم کرنے سے پہلے اپنا مکمل بل اور تفصیلات اچھی طرح دیکھ لیں۔',
    customerDetailsHeading: 'گاہک اور دکان کی تفصیلات',
    orderDetailsHeading: 'آرڈر کی تفصیل',
    paymentInfoHeading: 'ادائیگی اور ڈیلیوری',
    editOrderBtn: 'آرڈر تبدیل کریں',
    confirmOrderBtn: 'آرڈر کنفرم کریں',
    orderIdLabel: 'آرڈر آئی ڈی',
    orderDateLabel: 'تاریخ اور وقت',

    orderConfirmedTitle: 'آرڈر کامیابی سے درج ہو گیا!',
    orderConfirmedMsg: 'ایس کے ٹی کمپنی پر اعتماد کرنے کا شکریہ۔ آپ کا آرڈر نوٹ کر لیا گیا ہے اور جلد روانہ کیا جائے گا۔',
    trackOrderBtn: 'آرڈر ٹریک کریں',
    viewBillBtn: 'بل دیکھیں',
    printBillBtn: 'بل پرنٹ / محفوظ کریں',
    contactCompanyBtn: 'مینیجمنٹ سے رابطہ',
    orderMoreBtn: 'نیا آرڈر دیں',
    orderStatusLabel: 'موجودہ اسٹیٹس',

    trackerTitle: 'آرڈر ٹریک کریں',
    trackerSubtitle: 'اپنی آرڈر آئی ڈی (مثلاً SKT-000101) درج کریں اور آرڈر کا اسٹیٹس دیکھیں۔',
    enterOrderIdLabel: 'آرڈر آئی ڈی درج کریں',
    orderIdPlaceholder: 'SKT-XXXXXX',
    trackBtn: 'اسٹیٹس چیک کریں',
    orderReceived: 'آرڈر موصول ہوا',
    orderConfirmed: 'کنفرم ہوا',
    orderProcessing: 'تیاری کے مرحلے میں',
    orderOutForDelivery: 'ڈیلیوری کے لیے روانہ',
    orderDelivered: 'پہنچ گیا',
    orderCancelled: 'منسوخ ہو گیا',
    currentStatus: 'موجودہ صورتحال',
    notFoundAlert: 'آرڈر نہیں ملا۔ برائے مہربانی درست آرڈر آئی ڈی درج کریں۔',

    historyTitle: 'آرڈر ہسٹری',
    historySubtitle: 'پچھلے تمام آرڈرز کی تفصیلات دیکھیں یا ایک کلک میں دوبارہ آرڈر کریں۔',
    noOrdersYet: 'اس ڈیوائس پر کوئی پرانا آرڈر نہیں ملا۔ آج ہی اپنا پہلا آرڈر بک کروائیں!',
    reorderBtn: 'دوبارہ آرڈر کریں',
    viewDetailsBtn: 'بل دیکھیں',
    searchHistoryPlaceholder: 'آرڈر آئی ڈی یا دکان کے نام سے تلاش کریں...',

    aboutTitle: 'ایس کے ٹی کمپنی کے متعلق',
    aboutSubtitle: 'خالص، خوشبودار اور معیاری چائے کی بروقت فراہمی ہمارا نصب العین ہے۔',
    leadershipTitle: 'کمپنی کی قیادت اور مینیجمنٹ',
    ownerLabel: 'مالک (Owner)',
    ownerName: 'محمد اعظم',
    gmLabel: 'جنرل مینیجر (General Manager)',
    gmName: 'محمد ذیشان',
    aboutQualityText: 'ایس کے ٹی کمپنی میں ہم سمجھتے ہیں کہ ایک بہترین پیالی کا راز خالص پتی میں ہے۔ ہم اعلیٰ معیار اور خوشبو برقرار رکھنے کے لیے پرعزم ہیں۔',
    aboutServiceText: 'ہماری پہچان دیانتداری اور بروقت سروس ہے۔ دکاندار اور کاروباری حضرات ہم پر مکمل اعتماد کرتے ہیں۔',
    aboutCommitmentText: 'ہماری اولین ترجیح ہر گاہک کے ساتھ عزت، اعتماد اور دیرپا تجارتی تعلق قائم رکھنا ہے۔',

    faqsTitle: 'اکثر پوچھے جانے والے سوالات (FAQs)',
    faqsSubtitle: 'ایس کے ٹی کمپنی سے متعلق اہم معلومات۔',

    messageMgmtTitle: 'مینیجمنٹ کو براہِ راست پیغام',
    messageMgmtSubtitle: 'کوئی سوال، تجاویز یا بلک آرڈر کی معلومات کے لیے جنرل مینیجر محمد ذیشان کو واٹس ایپ پیغام بھیجیں۔',
    messageLabel: 'آپ کا پیغام',
    messagePlaceholder: 'اپنا سوال یا پیغام یہاں تحریر کریں...',
    sendWhatsAppBtn: 'واٹس ایپ پر پیغام بھیجیں',
    directCallHeading: 'براہِ راست فون کال کے نمبرز',

    footerAbout: 'ایس کے ٹی کمپنی ۱۲۵ گرام، ۲۵۰ گرام، ۵۰۰ گرام اور ۱ کلو گرام پیک سائزز میں دکانوں اور ہوٹلوں کو خالص چائے فراہم کرتی ہے۔',
    quickLinks: 'اہم لنکس',
    contactDetails: 'سرکاری رابطے',
    allRightsReserved: 'جملہ حقوق بحق ایس کے ٹی کمپنی محفوظ ہیں۔',
  },
};

export const getTranslation = (lang?: string): TranslationSchema => {
  if (!lang) return rawTranslations['roman-english'];
  if (lang === 'en-roman' || lang === 'roman' || lang === 'roman-urdu') return rawTranslations['roman-english'];
  if (lang === 'simple-english' || lang === 'en' || lang === 'english') return rawTranslations['simple-english'];
  if (lang === 'urdu' || lang === 'ur') return rawTranslations['urdu'];
  return (rawTranslations as Record<string, TranslationSchema>)[lang] || rawTranslations['roman-english'];
};

export const translations: Record<LanguageCode, TranslationSchema> = new Proxy(rawTranslations, {
  get(target, prop) {
    if (typeof prop === 'string') {
      if (prop in target) {
        return (target as any)[prop];
      }
      if (prop === 'en-roman' || prop === 'roman' || prop === 'roman-urdu') {
        return target['roman-english'];
      }
      if (prop === 'en' || prop === 'english') {
        return target['simple-english'];
      }
      if (prop === 'ur') {
        return target['urdu'];
      }
    }
    return target['roman-english'] || target['simple-english'];
  },
}) as Record<LanguageCode, TranslationSchema>;

export const PACK_CONFIGS = [
  {
    key: '125g' as const,
    label: '125g Pack',
    weightInKg: 0.125,
    description: 'Perfect mini size for retail shelves and fast turnover.',
    recommendedFor: 'Small general stores & households',
    approxRatePerPack: 280,
  },
  {
    key: '250g' as const,
    label: '250g Pack',
    weightInKg: 0.25,
    description: 'Most popular consumer retail pack for weekly household use.',
    recommendedFor: 'Grocery stores & families',
    approxRatePerPack: 550,
  },
  {
    key: '500g' as const,
    label: '500g Pack',
    weightInKg: 0.5,
    description: 'Half KG value pack for large families and busy dhabas.',
    recommendedFor: 'Medium shops, cafes & offices',
    approxRatePerPack: 1080,
  },
  {
    key: '1kg' as const,
    label: '1 KG Pack',
    weightInKg: 1.0,
    description: 'Master commercial pack for high-consumption tea stalls and hotels.',
    recommendedFor: 'Tea hotels, restaurants & wholesale',
    approxRatePerPack: 2100,
  },
];
