class Property {
  final String id;
  final String title;
  final String location;
  final String price;
  final String size;
  final int bedrooms;
  final int bathrooms;
  final String imageUrl;
  final String type; // 'Apartment', 'Plot', 'Commercial'
  final bool isFeatured;
  final String description;

  Property({
    required this.id,
    required this.title,
    required this.location,
    required this.price,
    required this.size,
    required this.bedrooms,
    required this.bathrooms,
    required this.imageUrl,
    required this.type,
    this.isFeatured = false,
    required this.description,
  });

  static List<Property> sampleProperties = [
    Property(
      id: 'p1',
      title: 'বসুন্ধরা আর/এ ৩-বেডরুম লাক্সারি অ্যাপার্টমেন্ট',
      location: 'ব্লক-সি, বসুন্ধরা আর/এ, ঢাকা',
      price: '১ কোটি ৬৫ লাখ টাকা',
      size: '১৮৫০ বর্গফুট',
      bedrooms: 3,
      bathrooms: 3,
      imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
      type: 'Apartment',
      isFeatured: true,
      description: 'আধুনিক স্থাপত্য শৈলীতে নির্মিত সুপরিসর ৩ বেডরুমের প্রাইম অ্যাপার্টমেন্ট। সাথে থাকছে ৩টি বারান্দা, ১টি সার্ভেন্ট রুম, কার পার্কিং এবং ২৪ ঘণ্টা নিরাপত্তা ব্যবস্থা।',
    ),
    Property(
      id: 'p2',
      title: 'মিরপুর ১০ সাশ্রয়ী রেডি ফ্ল্যাট',
      location: 'মিরপুর ১০ (মেট্রোরেল স্টেশন সংলগ্ন), ঢাকা',
      price: '৭৫ লাখ টাকা',
      size: '১২৫০ বর্গফুট',
      bedrooms: 3,
      bathrooms: 2,
      imageUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      type: 'Apartment',
      isFeatured: true,
      description: 'মেট্রোরেল স্টেশনের খুব কাছে চমৎকার লোকেশনে রেডি ফ্ল্যাট। পরিবার নিয়ে বসবাসের জন্য আদর্শ পরিবেশ।',
    ),
    Property(
      id: 'p3',
      title: 'ধানমন্ডি ১৫/এ প্রিমিয়াম ডুপ্লেক্স ফ্ল্যাট',
      location: 'ধানমন্ডি, ঢাকা',
      price: '৩ কোটি ২০ লাখ টাকা',
      size: '২৮০০ বর্গফুট',
      bedrooms: 4,
      bathrooms: 4,
      imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      type: 'Apartment',
      isFeatured: false,
      description: 'অভিজাত ধানমন্ডিতে ডুপ্লেক্স রেসিডেন্সial স্যুট। প্রাইভেট রুফটপ গার্ডেন এবং সুইমিং পুল সুবিধা অন্তর্ভুক্ত।',
    ),
    Property(
      id: 'p4',
      title: 'পূর্বাচল আমেরিকান সিটি প্রজেক্ট প্লট',
      location: 'পূর্বাচল, ঢাকা',
      price: '৪৫ লাখ টাকা / কাঠা',
      size: '৫ কাঠা',
      bedrooms: 0,
      bathrooms: 0,
      imageUrl: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800',
      type: 'Plot',
      isFeatured: true,
      description: 'ভবিষ্যতের স্মার্ট সিটি পূর্বাচলে রেডি রেজিস্ট্রি প্লট। এখনই বাড়ি বানানোর উপযোগী।',
    ),
  ];
}
