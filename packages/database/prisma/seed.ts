import { PrismaClient, PackageType, FITAddOnCategory } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // Create admin user
  const adminPassword = await bcrypt.hash('Admin@123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gotravel.com' },
    update: {},
    create: {
      email: 'admin@gotravel.com',
      name: 'GoTravel Admin',
      password: adminPassword,
      role: 'ADMIN',
      phone: '+919999999999',
    },
  });
  console.log('✅ Admin user created');

  // Create sample users
  const user1 = await prisma.user.upsert({
    where: { email: 'john@example.com' },
    update: {},
    create: {
      email: 'john@example.com',
      name: 'John Doe',
      phone: '+919876543210',
      role: 'USER',
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'manali-summer',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'priya@example.com' },
    update: {},
    create: {
      email: 'priya@example.com',
      name: 'Priya Sharma',
      phone: '+918765432109',
      role: 'USER',
      utmSource: 'instagram',
      utmMedium: 'social',
    },
  });

  // ---- MANALI ----
  const manali = await prisma.destination.upsert({
    where: { slug: 'manali' },
    update: {},
    create: {
      slug: 'manali',
      name: 'Manali',
      state: 'Himachal Pradesh',
      city: 'Manali',
      description: 'Nestled in the Beas River Valley, Manali is a high-altitude Himalayan resort town and hub for adventure sports. With snow-capped peaks, lush green valleys, ancient temples, and vibrant local culture, Manali offers an unforgettable experience for every traveler.',
      shortDescription: 'Adventure capital of Himachal Pradesh with stunning Himalayan landscapes',
      heroImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=1920',
      galleryImages: [
        'https://images.unsplash.com/photo-1589793463509-80a5dde81ce2?w=800',
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
        'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=800',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      ],
      latitude: 32.2396,
      longitude: 77.1887,
      bestTimeToVisit: 'October to June (avoid July-September due to monsoon)',
      weatherInfo: 'Cold to moderate. Winter: -10°C to 10°C. Summer: 10°C to 25°C',
      tags: ['Adventure', 'Mountains', 'Snow', 'Trekking', 'Skiing', 'Honeymoon'],
      categories: ['Adventure', 'Nature', 'Hill Station'],
      basePricePerPerson: 12000,
      isFeatured: true,
      seoTitle: 'Manali Tour Packages 2024 | Best Deals from ₹12,000 | GoTravel',
      seoDescription: 'Book Manali tour packages with GoTravel. Snow-capped mountains, adventure sports, and cultural experiences. Best deals starting ₹12,000/person.',
      seoKeywords: ['manali tour package', 'manali trip', 'manali adventure', 'himachal tour'],
    },
  });

  // Manali Package 1 - Group Tour
  const manaliGroup = await prisma.package.upsert({
    where: { slug: 'manali-group-adventure-5d' },
    update: {},
    create: {
      destinationId: manali.id,
      name: 'Manali Group Adventure',
      slug: 'manali-group-adventure-5d',
      type: PackageType.GROUP,
      durationDays: 5,
      durationNights: 4,
      basePrice: 15000,
      discountedPrice: 12999,
      inclusions: ['Accommodation in 3-star hotel', 'Daily breakfast and dinner', 'Airport/railway pickup & drop', 'Sightseeing in AC cab', 'Experienced tour guide', 'All entry fees'],
      exclusions: ['Airfare/train tickets', 'Lunch', 'Personal expenses', 'Adventure activities', 'Travel insurance'],
      highlights: ['Solang Valley Snow Point', 'Rohtang Pass', 'Hadimba Temple', 'Old Manali Market', 'Naggar Castle'],
      maxGroupSize: 20,
      minGroupSize: 8,
      difficultyLevel: 'Easy',
      isActive: true,
      isFeatured: true,
    },
  });

  // Manali itineraries
  await prisma.itinerary.createMany({
    data: [
      {
        packageId: manaliGroup.id,
        dayNumber: 1,
        title: 'Arrival & Manali Exploration',
        description: 'Arrive at Manali. Check in to hotel. Evening walk at Mall Road and Old Manali.',
        activities: { items: ['Hotel check-in', 'Mall Road walk', 'Old Manali market exploration', 'Welcome dinner'] },
        mealsIncluded: ['dinner'],
        accommodationType: '3-star hotel',
        images: [],
      },
      {
        packageId: manaliGroup.id,
        dayNumber: 2,
        title: 'Solang Valley & Snow Activities',
        description: 'Full day at Solang Valley - enjoy snow activities like skiing, snowmobiling and ropeway.',
        activities: { items: ['Solang Valley visit', 'Snow activities', 'Ropeway ride', 'Photography'] },
        mealsIncluded: ['breakfast', 'dinner'],
        accommodationType: '3-star hotel',
        distanceKm: 14,
        images: [],
      },
      {
        packageId: manaliGroup.id,
        dayNumber: 3,
        title: 'Rohtang Pass Excursion',
        description: 'Early morning drive to Rohtang Pass. Experience snow at 3,978m altitude.',
        activities: { items: ['Rohtang Pass drive', 'Snow play', 'Photography', 'Beas Kund view'] },
        mealsIncluded: ['breakfast', 'dinner'],
        accommodationType: '3-star hotel',
        distanceKm: 51,
        images: [],
      },
      {
        packageId: manaliGroup.id,
        dayNumber: 4,
        title: 'Local Sightseeing',
        description: 'Visit Hadimba Temple, Manu Temple, Club House and Vashisht hot springs.',
        activities: { items: ['Hadimba Temple', 'Manu Temple', 'Vashisht Hot Springs', 'Club House', 'Tibetan Monastery'] },
        mealsIncluded: ['breakfast', 'dinner'],
        accommodationType: '3-star hotel',
        images: [],
      },
      {
        packageId: manaliGroup.id,
        dayNumber: 5,
        title: 'Departure',
        description: 'Morning breakfast. Check out and transfer to bus stand/airport.',
        activities: { items: ['Breakfast', 'Check-out', 'Transfer to bus stand/airport'] },
        mealsIncluded: ['breakfast'],
        images: [],
      },
    ],
    skipDuplicates: true,
  });

  // Manali FIT Add-ons
  await prisma.fITAddOn.createMany({
    data: [
      {
        destinationId: manali.id,
        name: 'Paragliding at Solang Valley',
        description: 'Experience the thrill of paragliding over the beautiful Solang Valley with certified instructors. Enjoy breathtaking aerial views of snow-capped peaks.',
        category: FITAddOnCategory.ACTIVITY,
        pricePerPerson: 2500,
        durationHours: 2,
        images: ['https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=800'],
        locationName: 'Solang Valley',
        latitude: 32.3157,
        longitude: 77.1541,
        aiTags: ['adventure', 'aerial', 'popular', 'thrilling'],
        isAvailable: true,
        isPopular: true,
      },
      {
        destinationId: manali.id,
        name: 'Rohtang Pass Snowmobile',
        description: 'Ride a snowmobile on the pristine snow of Rohtang Pass at 3,978m. An exhilarating experience you will never forget.',
        category: FITAddOnCategory.ACTIVITY,
        pricePerPerson: 3200,
        durationHours: 1,
        images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800'],
        locationName: 'Rohtang Pass',
        latitude: 32.3719,
        longitude: 77.2468,
        aiTags: ['snow', 'adventure', 'winter', 'unique'],
        isAvailable: true,
        isPopular: false,
      },
      {
        destinationId: manali.id,
        name: 'Hampta Pass Trek (1 Day)',
        description: 'A stunning one-day trek through the Hampta Pass trail, crossing meadows and streams with panoramic mountain views.',
        category: FITAddOnCategory.ACTIVITY,
        pricePerPerson: 4500,
        durationHours: 8,
        images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800'],
        locationName: 'Hampta Pass Trail',
        latitude: 32.2695,
        longitude: 77.2474,
        aiTags: ['trekking', 'nature', 'mountains', 'fitness'],
        isAvailable: true,
        isPopular: true,
      },
      {
        destinationId: manali.id,
        name: 'Kullu River Rafting',
        description: 'Experience white water rafting on the Beas River near Kullu. Suitable for beginners and adventure enthusiasts alike.',
        category: FITAddOnCategory.ACTIVITY,
        pricePerPerson: 1800,
        durationHours: 3,
        images: ['https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800'],
        locationName: 'Kullu, Beas River',
        latitude: 31.9592,
        longitude: 77.1089,
        aiTags: ['water sports', 'rafting', 'adventure', 'river'],
        isAvailable: true,
        isPopular: false,
      },
      {
        destinationId: manali.id,
        name: 'Local Himachali Food Experience',
        description: 'Join a local family for an authentic Himachali cooking class and meal. Learn to cook traditional dishes like Dham, Madra, and Mittha.',
        category: FITAddOnCategory.MEAL,
        pricePerPerson: 800,
        durationHours: 3,
        images: ['https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800'],
        locationName: 'Old Manali',
        aiTags: ['food', 'culture', 'local', 'cooking'],
        isAvailable: true,
        isPopular: false,
      },
      {
        destinationId: manali.id,
        name: 'Manali to Kasol Day Trip',
        description: 'Full day trip to the beautiful Parvati Valley. Visit Kasol, Kheerganga trail start, and Manikaran Gurudwara.',
        category: FITAddOnCategory.TRANSPORT,
        pricePerPerson: 2000,
        durationHours: 10,
        images: ['https://images.unsplash.com/photo-1598177597087-87b7d1e6ec0d?w=800'],
        locationName: 'Kasol, Parvati Valley',
        aiTags: ['day trip', 'valley', 'backpacker', 'scenic'],
        isAvailable: true,
        isPopular: true,
      },
      {
        destinationId: manali.id,
        name: 'Heritage Hotel Upgrade',
        description: 'Upgrade your stay to a charming heritage hotel with traditional Himachali architecture, mountain views, and premium amenities.',
        category: FITAddOnCategory.ACCOMMODATION,
        pricePerPerson: 3000,
        durationHours: 24,
        images: ['https://images.unsplash.com/photo-1455587734955-081b22074882?w=800'],
        locationName: 'Manali Town',
        aiTags: ['luxury', 'heritage', 'upgrade', 'comfort'],
        isAvailable: true,
        isPopular: false,
      },
      {
        destinationId: manali.id,
        name: 'Royal Enfield Bike Rental',
        description: 'Rent a Royal Enfield Bullet for the day and explore Manali on your own terms. Perfect for the Leh-Manali road enthusiast.',
        category: FITAddOnCategory.TRANSPORT,
        pricePerPerson: 1200,
        durationHours: 8,
        images: ['https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800'],
        locationName: 'Manali',
        aiTags: ['bike', 'freedom', 'road trip', 'adventure'],
        isAvailable: true,
        isPopular: true,
      },
      {
        destinationId: manali.id,
        name: 'Spa & Wellness Package',
        description: 'Rejuvenate with traditional Ayurvedic massage and spa treatments. Includes hot stone therapy, aromatherapy, and herbal bath.',
        category: FITAddOnCategory.EXPERIENCE,
        pricePerPerson: 2500,
        durationHours: 3,
        images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'],
        locationName: 'Manali Spa Resort',
        aiTags: ['wellness', 'relaxation', 'spa', 'ayurveda'],
        isAvailable: true,
        isPopular: false,
      },
      {
        destinationId: manali.id,
        name: 'Mountain Photography Tour',
        description: "Join a professional photographer for a guided photography tour of Manali's most photogenic spots at golden hour.",
        category: FITAddOnCategory.EXPERIENCE,
        pricePerPerson: 1500,
        durationHours: 4,
        images: ['https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800'],
        locationName: 'Manali & Surroundings',
        aiTags: ['photography', 'art', 'landscapes', 'creative'],
        isAvailable: true,
        isPopular: false,
      },
    ],
    skipDuplicates: true,
  });

  // ---- GOA ----
  const goa = await prisma.destination.upsert({
    where: { slug: 'goa' },
    update: {},
    create: {
      slug: 'goa',
      name: 'Goa',
      state: 'Goa',
      city: 'Panaji',
      description: "India's smallest state, Goa is famous for its beaches, Portuguese heritage, vibrant nightlife, and delicious seafood. From tranquil northern beaches to party-filled southern shores, Goa has something for everyone.",
      shortDescription: "Sun, sand, and sea - India's premier beach destination",
      heroImage: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=1920',
      galleryImages: [
        'https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800',
        'https://images.unsplash.com/photo-1568708234869-6d3c3a04dbde?w=800',
        'https://images.unsplash.com/photo-1601053607705-59d48ae5fd6e?w=800',
      ],
      latitude: 15.2993,
      longitude: 74.1240,
      bestTimeToVisit: 'November to February (dry season with perfect beach weather)',
      weatherInfo: 'Tropical. Winter: 20-32°C. Summer: 25-35°C. Monsoon: June-September',
      tags: ['Beach', 'Nightlife', 'Water Sports', 'Heritage', 'Seafood', 'Party'],
      categories: ['Beach', 'Party', 'Heritage', 'Relaxation'],
      basePricePerPerson: 8000,
      isFeatured: true,
      seoTitle: 'Goa Tour Packages 2024 | Best Beach Holiday from ₹8,000 | GoTravel',
      seoDescription: 'Book Goa tour packages with GoTravel. Pristine beaches, water sports, and vibrant nightlife. Best deals starting ₹8,000/person.',
      seoKeywords: ['goa tour package', 'goa trip', 'goa beach holiday', 'north goa south goa'],
    },
  });

  const goaPackage = await prisma.package.upsert({
    where: { slug: 'goa-beach-bliss-4d' },
    update: {},
    create: {
      destinationId: goa.id,
      name: 'Goa Beach Bliss',
      slug: 'goa-beach-bliss-4d',
      type: PackageType.GROUP,
      durationDays: 4,
      durationNights: 3,
      basePrice: 10000,
      discountedPrice: 8499,
      inclusions: ['Beach resort accommodation', 'Daily breakfast', 'Airport transfers', 'North Goa sightseeing', 'South Goa sightseeing'],
      exclusions: ['Flights', 'Lunch and dinner', 'Water sports', 'Casino entry', 'Personal expenses'],
      highlights: ['Baga Beach', 'Anjuna Flea Market', 'Dudhsagar Falls', 'Basilica of Bom Jesus', 'Calangute Beach'],
      maxGroupSize: 25,
      minGroupSize: 6,
      difficultyLevel: 'Easy',
      isActive: true,
      isFeatured: true,
    },
  });

  // Goa FIT Add-ons
  await prisma.fITAddOn.createMany({
    data: [
      {
        destinationId: goa.id,
        name: 'Scuba Diving at Grande Island',
        description: 'Discover the underwater world of Goa with a guided scuba diving session at Grande Island. See colorful fish, coral reefs, and even shipwrecks.',
        category: FITAddOnCategory.ACTIVITY,
        pricePerPerson: 3500,
        durationHours: 4,
        images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800'],
        locationName: 'Grande Island, South Goa',
        aiTags: ['diving', 'underwater', 'marine', 'adventure'],
        isAvailable: true,
        isPopular: true,
      },
      {
        destinationId: goa.id,
        name: 'Sunset Cruise on Mandovi River',
        description: 'Enjoy a romantic sunset cruise on the Mandovi River with live Goan folk music, dance performances, and complimentary drinks.',
        category: FITAddOnCategory.EXPERIENCE,
        pricePerPerson: 800,
        durationHours: 2,
        images: ['https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800'],
        locationName: 'Panaji',
        aiTags: ['romantic', 'sunset', 'cruise', 'music'],
        isAvailable: true,
        isPopular: true,
      },
      {
        destinationId: goa.id,
        name: 'Dudhsagar Falls Day Trip',
        description: 'Full day excursion to the magnificent four-tiered Dudhsagar Waterfall inside Mollem National Park. Includes jeep safari and swimming.',
        category: FITAddOnCategory.TRANSPORT,
        pricePerPerson: 1800,
        durationHours: 10,
        images: ['https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=800'],
        locationName: 'Dudhsagar, South Goa',
        aiTags: ['waterfall', 'nature', 'day trip', 'trekking'],
        isAvailable: true,
        isPopular: false,
      },
    ],
    skipDuplicates: true,
  });

  // ---- KERALA ----
  const kerala = await prisma.destination.upsert({
    where: { slug: 'kerala' },
    update: {},
    create: {
      slug: 'kerala',
      name: 'Kerala',
      state: 'Kerala',
      city: 'Kochi',
      description: "God's Own Country, Kerala is a tropical paradise known for its backwaters, tea gardens, Ayurvedic treatments, and diverse wildlife. The serene backwaters of Alleppey and the misty hills of Munnar offer contrasting but equally breathtaking experiences.",
      shortDescription: "God's Own Country with backwaters, tea gardens, and Ayurveda",
      heroImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=1920',
      galleryImages: [
        'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
        'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?w=800',
      ],
      latitude: 10.8505,
      longitude: 76.2711,
      bestTimeToVisit: 'September to March (post-monsoon and winter)',
      weatherInfo: 'Tropical. Temperature: 20-35°C. Monsoon: June-August',
      tags: ['Backwaters', 'Tea Gardens', 'Ayurveda', 'Wildlife', 'Beaches', 'Culture'],
      categories: ['Nature', 'Wellness', 'Cultural', 'Beach'],
      basePricePerPerson: 14000,
      isFeatured: true,
      seoTitle: 'Kerala Tour Packages 2024 | Backwaters & Munnar from ₹14,000 | GoTravel',
      seoDescription: 'Book Kerala tour packages. Explore Munnar tea gardens, Alleppey backwaters, and Kochi heritage. Deals from ₹14,000/person.',
      seoKeywords: ['kerala tour package', 'alleppey backwaters', 'munnar trip', 'kerala holiday'],
    },
  });

  const keralaPackage = await prisma.package.upsert({
    where: { slug: 'kerala-backwaters-munnar-6d' },
    update: {},
    create: {
      destinationId: kerala.id,
      name: 'Kerala Backwaters & Munnar',
      slug: 'kerala-backwaters-munnar-6d',
      type: PackageType.GROUP,
      durationDays: 6,
      durationNights: 5,
      basePrice: 18000,
      discountedPrice: 15999,
      inclusions: ['Houseboat stay (1 night)', 'Resort accommodation (4 nights)', 'All meals on houseboat', 'Daily breakfast at hotels', 'AC vehicle for transfers', 'All sightseeing'],
      exclusions: ['Flights', 'Ayurvedic treatments', 'Personal expenses', 'Camera fees'],
      highlights: ['Alleppey Backwater Houseboat', 'Munnar Tea Gardens', 'Periyar Wildlife Sanctuary', 'Kochi Fort', 'Chinese Fishing Nets'],
      maxGroupSize: 20,
      minGroupSize: 4,
      difficultyLevel: 'Easy',
      isActive: true,
      isFeatured: false,
    },
  });

  await prisma.fITAddOn.createMany({
    data: [
      {
        destinationId: kerala.id,
        name: 'Ayurvedic Full Body Massage',
        description: 'Indulge in a traditional Ayurvedic full body massage by expert therapists using herbal oils. Perfect for rejuvenation.',
        category: FITAddOnCategory.EXPERIENCE,
        pricePerPerson: 2200,
        durationHours: 2,
        images: ['https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800'],
        locationName: 'Munnar Ayurveda Centre',
        aiTags: ['wellness', 'ayurveda', 'healing', 'relaxation'],
        isAvailable: true,
        isPopular: true,
      },
      {
        destinationId: kerala.id,
        name: 'Tea Estate Walking Tour',
        description: 'Walk through the lush green tea estates of Munnar with a local guide. Learn about tea cultivation, processing, and enjoy fresh brew.',
        category: FITAddOnCategory.ACTIVITY,
        pricePerPerson: 600,
        durationHours: 3,
        images: ['https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800'],
        locationName: 'Munnar Tea Estates',
        aiTags: ['tea', 'nature', 'walking', 'culture'],
        isAvailable: true,
        isPopular: false,
      },
      {
        destinationId: kerala.id,
        name: 'Kathakali Dance Performance',
        description: 'Witness the ancient classical dance-drama of Kerala - Kathakali. Watch artists in elaborate costumes perform stories from Hindu epics.',
        category: FITAddOnCategory.EXPERIENCE,
        pricePerPerson: 500,
        durationHours: 2,
        images: ['https://images.unsplash.com/photo-1598632640487-6ea4a4e8b963?w=800'],
        locationName: 'Kochi Cultural Centre',
        aiTags: ['culture', 'dance', 'traditional', 'art'],
        isAvailable: true,
        isPopular: false,
      },
    ],
    skipDuplicates: true,
  });

  // ---- RAJASTHAN ----
  const rajasthan = await prisma.destination.upsert({
    where: { slug: 'rajasthan' },
    update: {},
    create: {
      slug: 'rajasthan',
      name: 'Rajasthan',
      state: 'Rajasthan',
      city: 'Jaipur',
      description: 'The Land of Kings, Rajasthan is a regal tapestry of majestic forts, opulent palaces, golden sand dunes, and vibrant culture. From the Pink City of Jaipur to the Blue City of Jodhpur and the golden sands of Jaisalmer, every corner tells a story of valor and grandeur.',
      shortDescription: 'Royal forts, golden deserts, and vibrant culture of the Land of Kings',
      heroImage: 'https://images.unsplash.com/photo-1477587458883-47145ed94245?w=1920',
      galleryImages: [
        'https://images.unsplash.com/photo-1599930113854-d6d7fd521f10?w=800',
        'https://images.unsplash.com/photo-1524613032530-449a5dd58c07?w=800',
      ],
      latitude: 27.0238,
      longitude: 74.2179,
      bestTimeToVisit: 'October to March (pleasant winter weather)',
      weatherInfo: 'Desert climate. Winter: 8-28°C. Summer: 25-45°C. Avoid April-June.',
      tags: ['Heritage', 'Desert', 'Forts', 'Palaces', 'Culture', 'Photography'],
      categories: ['Heritage', 'Cultural', 'Desert', 'Photography'],
      basePricePerPerson: 18000,
      isFeatured: true,
      seoTitle: 'Rajasthan Tour Packages 2024 | Royal Circuit from ₹18,000 | GoTravel',
      seoDescription: 'Explore royal Rajasthan with GoTravel. Jaipur, Jodhpur, Jaisalmer forts and palaces. Packages from ₹18,000/person.',
      seoKeywords: ['rajasthan tour', 'jaipur jodhpur jaisalmer trip', 'rajasthan heritage tour', 'golden triangle tour'],
    },
  });

  const rajPackage = await prisma.package.upsert({
    where: { slug: 'royal-rajasthan-circuit-7d' },
    update: {},
    create: {
      destinationId: rajasthan.id,
      name: 'Royal Rajasthan Circuit',
      slug: 'royal-rajasthan-circuit-7d',
      type: PackageType.GROUP,
      durationDays: 7,
      durationNights: 6,
      basePrice: 24000,
      discountedPrice: 21999,
      inclusions: ['Heritage hotel accommodation', 'Daily breakfast and dinner', 'AC vehicle throughout', 'Expert guide', 'All monument entries', 'Camel safari in Jaisalmer'],
      exclusions: ['Flights/trains', 'Lunch', 'Personal expenses', 'Shopping'],
      highlights: ['Amber Fort Jaipur', 'Mehrangarh Fort Jodhpur', 'Jaisalmer Fort', 'Sam Sand Dunes', 'City Palace Jaipur', 'Blue City Walk'],
      maxGroupSize: 16,
      minGroupSize: 4,
      difficultyLevel: 'Easy',
      isActive: true,
      isFeatured: true,
    },
  });

  await prisma.fITAddOn.createMany({
    data: [
      {
        destinationId: rajasthan.id,
        name: 'Camel Safari at Sam Dunes',
        description: 'Ride a camel across the golden Sam Sand Dunes at sunset and enjoy a cultural performance with dinner under the stars.',
        category: FITAddOnCategory.ACTIVITY,
        pricePerPerson: 2800,
        durationHours: 5,
        images: ['https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=800'],
        locationName: 'Sam Sand Dunes, Jaisalmer',
        aiTags: ['desert', 'camel', 'sunset', 'culture'],
        isAvailable: true,
        isPopular: true,
      },
      {
        destinationId: rajasthan.id,
        name: 'Hot Air Balloon Jaipur',
        description: "Soar over the Pink City in a hot air balloon at sunrise. See Amber Fort and the city from a bird's eye view.",
        category: FITAddOnCategory.ACTIVITY,
        pricePerPerson: 8500,
        durationHours: 2,
        images: ['https://images.unsplash.com/photo-1507608616759-54f48f0af0ee?w=800'],
        locationName: 'Jaipur',
        aiTags: ['luxury', 'aerial', 'sunrise', 'unique'],
        isAvailable: true,
        isPopular: true,
      },
      {
        destinationId: rajasthan.id,
        name: 'Royal Rajput Cooking Class',
        description: 'Learn to cook authentic Rajasthani cuisine like Dal Baati Churma, Gatte ki Sabzi, and Laal Maas from a royal family kitchen.',
        category: FITAddOnCategory.MEAL,
        pricePerPerson: 1500,
        durationHours: 4,
        images: ['https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800'],
        locationName: 'Jaipur',
        aiTags: ['cooking', 'culture', 'food', 'heritage'],
        isAvailable: true,
        isPopular: false,
      },
    ],
    skipDuplicates: true,
  });

  // ---- LADAKH ----
  const ladakh = await prisma.destination.upsert({
    where: { slug: 'ladakh' },
    update: {},
    create: {
      slug: 'ladakh',
      name: 'Ladakh',
      state: 'Jammu & Kashmir',
      city: 'Leh',
      description: 'The Land of High Passes, Ladakh is a remote and hauntingly beautiful region at over 3,500m altitude. Ancient Buddhist monasteries, crystal-clear lakes like Pangong Tso, and dramatic mountain landscapes make it a bucket-list destination.',
      shortDescription: 'Land of high passes with monasteries, lakes, and dramatic landscapes',
      heroImage: 'https://images.unsplash.com/photo-1572463940-50b6ba38a58a?w=1920',
      galleryImages: [
        'https://images.unsplash.com/photo-1598127968869-0bdf53a50fb3?w=800',
        'https://images.unsplash.com/photo-1602549718440-5c2c9bf85b78?w=800',
      ],
      latitude: 34.1526,
      longitude: 77.5770,
      bestTimeToVisit: 'May to September (roads open)',
      weatherInfo: 'Cold arid. Summer: 3-25°C. Winter: -20 to 5°C. Altitude sickness risk.',
      tags: ['Adventure', 'Spiritual', 'Photography', 'Motorcycling', 'Monasteries', 'Lakes'],
      categories: ['Adventure', 'Spiritual', 'Photography'],
      basePricePerPerson: 25000,
      isFeatured: true,
      seoTitle: 'Ladakh Tour Packages 2024 | Pangong Lake & Leh from ₹25,000 | GoTravel',
      seoDescription: 'Explore Ladakh with GoTravel. Pangong Lake, Nubra Valley, monasteries, and Khardung La pass. Packages from ₹25,000/person.',
      seoKeywords: ['ladakh tour package', 'leh ladakh trip', 'pangong lake tour', 'ladakh bike trip'],
    },
  });

  const ladakhPackage = await prisma.package.upsert({
    where: { slug: 'leh-ladakh-explorer-7d' },
    update: {},
    create: {
      destinationId: ladakh.id,
      name: 'Leh Ladakh Explorer',
      slug: 'leh-ladakh-explorer-7d',
      type: PackageType.GROUP,
      durationDays: 7,
      durationNights: 6,
      basePrice: 32000,
      discountedPrice: 28999,
      inclusions: ['Hotel & guesthouse accommodation', 'All meals (breakfast, lunch, dinner)', 'Airport pickup & drop', 'All sightseeing by cab', 'Inner Line Permits', 'Experienced mountain guide'],
      exclusions: ['Flights to/from Leh', 'Personal expenses', 'Oxygen cylinders (if needed)', 'Travel insurance'],
      highlights: ['Pangong Tso Lake', 'Nubra Valley', 'Khardung La Pass', 'Thiksey Monastery', 'Magnetic Hill', 'Hemis Monastery'],
      maxGroupSize: 12,
      minGroupSize: 4,
      difficultyLevel: 'Moderate',
      isActive: true,
      isFeatured: true,
    },
  });

  await prisma.fITAddOn.createMany({
    data: [
      {
        destinationId: ladakh.id,
        name: 'Pangong Lake Camping',
        description: 'Stay overnight in a luxury tent on the banks of the famous Pangong Tso Lake. Watch the stars reflect in the highest saltwater lake.',
        category: FITAddOnCategory.ACCOMMODATION,
        pricePerPerson: 4500,
        durationHours: 24,
        images: ['https://images.unsplash.com/photo-1572463940-50b6ba38a58a?w=800'],
        locationName: 'Pangong Tso Lake',
        aiTags: ['camping', 'lake', 'stars', 'luxury'],
        isAvailable: true,
        isPopular: true,
      },
      {
        destinationId: ladakh.id,
        name: 'Monastery Meditation Retreat',
        description: 'Spend a morning with Buddhist monks at Hemis or Thiksey Monastery. Participate in morning prayers and meditation session.',
        category: FITAddOnCategory.EXPERIENCE,
        pricePerPerson: 1000,
        durationHours: 4,
        images: ['https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800'],
        locationName: 'Hemis Monastery, Leh',
        aiTags: ['spiritual', 'meditation', 'culture', 'buddhism'],
        isAvailable: true,
        isPopular: true,
      },
    ],
    skipDuplicates: true,
  });

  // ---- ANDAMAN ----
  const andaman = await prisma.destination.upsert({
    where: { slug: 'andaman' },
    update: {},
    create: {
      slug: 'andaman',
      name: 'Andaman Islands',
      state: 'Andaman & Nicobar Islands',
      city: 'Port Blair',
      description: 'The Andaman Islands are a tropical paradise with pristine white sand beaches, crystal clear turquoise waters, and vibrant coral reefs. The islands offer some of the best snorkeling and scuba diving in India, along with a rich colonial history.',
      shortDescription: 'Tropical paradise with pristine beaches and world-class diving',
      heroImage: 'https://images.unsplash.com/photo-1586861203927-800a5acdcc4d?w=1920',
      galleryImages: [
        'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?w=800',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      ],
      latitude: 11.7401,
      longitude: 92.6586,
      bestTimeToVisit: 'October to May (dry season)',
      weatherInfo: 'Tropical island. Temperature: 23-30°C. Avoid June-September (monsoon).',
      tags: ['Beach', 'Diving', 'Snorkeling', 'Islands', 'Honeymoon', 'Marine Life'],
      categories: ['Beach', 'Adventure', 'Honeymoon'],
      basePricePerPerson: 22000,
      isFeatured: false,
      seoTitle: 'Andaman Tour Packages 2024 | Island Paradise from ₹22,000 | GoTravel',
      seoDescription: 'Book Andaman Islands tour packages. Radhanagar Beach, Havelock Island, Ross Island. Best deals from ₹22,000/person.',
      seoKeywords: ['andaman tour package', 'havelock island trip', 'andaman diving', 'andaman holiday'],
    },
  });

  const andamanPackage = await prisma.package.upsert({
    where: { slug: 'andaman-island-hopper-5d' },
    update: {},
    create: {
      destinationId: andaman.id,
      name: 'Andaman Island Hopper',
      slug: 'andaman-island-hopper-5d',
      type: PackageType.GROUP,
      durationDays: 5,
      durationNights: 4,
      basePrice: 26000,
      discountedPrice: 23999,
      inclusions: ['Beach resort accommodation', 'Daily breakfast', 'Ferry tickets (Port Blair - Havelock - Neil)', 'Airport transfers', 'Guided island tours'],
      exclusions: ['Flights', 'Lunch and dinner', 'Water sports', 'Personal expenses'],
      highlights: ['Radhanagar Beach', 'Havelock Island', 'Neil Island', 'Cellular Jail', 'Ross Island', 'Elephant Beach'],
      maxGroupSize: 20,
      minGroupSize: 4,
      difficultyLevel: 'Easy',
      isActive: true,
      isFeatured: false,
    },
  });

  // ---- COORG ----
  const coorg = await prisma.destination.upsert({
    where: { slug: 'coorg' },
    update: {},
    create: {
      slug: 'coorg',
      name: 'Coorg',
      state: 'Karnataka',
      city: 'Madikeri',
      description: 'Known as the Scotland of India, Coorg (Kodagu) is a lush hill station famous for its coffee and spice plantations, misty mountains, orange-tinted waterfalls, and warm hospitality of the Kodava people.',
      shortDescription: 'Scotland of India with coffee estates and misty mountains',
      heroImage: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1920',
      galleryImages: [
        'https://images.unsplash.com/photo-1443926818681-717d074a57af?w=800',
      ],
      latitude: 12.3375,
      longitude: 75.8069,
      bestTimeToVisit: 'October to March (cool and pleasant)',
      weatherInfo: 'Cool and misty. Temperature: 15-25°C. Monsoon: June-September.',
      tags: ['Coffee', 'Nature', 'Waterfalls', 'Trekking', 'Plantation', 'Relaxation'],
      categories: ['Nature', 'Relaxation', 'Hill Station'],
      basePricePerPerson: 8000,
      isFeatured: false,
      seoTitle: 'Coorg Tour Packages 2024 | Coffee Estate Experience from ₹8,000 | GoTravel',
      seoDescription: "Explore Coorg with GoTravel. Coffee estates, Abbey Falls, Raja's Seat. Packages from ₹8,000/person.",
      seoKeywords: ['coorg tour package', 'kodagu trip', 'coorg coffee estate', 'coorg holiday'],
    },
  });

  const coorgPackage = await prisma.package.upsert({
    where: { slug: 'coorg-coffee-trail-3d' },
    update: {},
    create: {
      destinationId: coorg.id,
      name: 'Coorg Coffee Trail',
      slug: 'coorg-coffee-trail-3d',
      type: PackageType.GROUP,
      durationDays: 3,
      durationNights: 2,
      basePrice: 10000,
      discountedPrice: 8499,
      inclusions: ['Plantation resort stay', 'All meals', 'Coffee estate tour', 'Local sightseeing', 'Plantation walks'],
      exclusions: ['Transport to Coorg', 'Personal expenses', 'Adventure activities'],
      highlights: ["Abbey Falls", "Raja's Seat", 'Dubbare Elephant Camp', 'Coffee Estate Walk', 'Madikeri Fort'],
      maxGroupSize: 15,
      minGroupSize: 2,
      difficultyLevel: 'Easy',
      isActive: true,
      isFeatured: false,
    },
  });

  // ---- RISHIKESH ----
  const rishikesh = await prisma.destination.upsert({
    where: { slug: 'rishikesh' },
    update: {},
    create: {
      slug: 'rishikesh',
      name: 'Rishikesh & Haridwar',
      state: 'Uttarakhand',
      city: 'Rishikesh',
      description: 'The Yoga Capital of the World and gateway to the Himalayas, Rishikesh is where the sacred Ganges emerges from the mountains. Combined with the ancient pilgrimage city of Haridwar, this journey offers a perfect blend of spiritual enlightenment and adventure sports.',
      shortDescription: 'Yoga capital and adventure hub on the holy Ganges river',
      heroImage: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1920',
      galleryImages: [
        'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?w=800',
      ],
      latitude: 30.0869,
      longitude: 78.2676,
      bestTimeToVisit: 'February to April and September to November',
      weatherInfo: 'Pleasant year-round. Winter: 5-20°C. Summer: 20-38°C.',
      tags: ['Spiritual', 'Yoga', 'Adventure', 'Rafting', 'Bungee', 'Ganges', 'Wellness'],
      categories: ['Spiritual', 'Adventure', 'Wellness'],
      basePricePerPerson: 6000,
      isFeatured: false,
      seoTitle: 'Rishikesh Haridwar Tour Packages 2024 | Yoga & Adventure from ₹6,000 | GoTravel',
      seoDescription: 'Explore Rishikesh and Haridwar with GoTravel. Yoga retreats, Ganga Aarti, river rafting, and bungee jumping. From ₹6,000/person.',
      seoKeywords: ['rishikesh tour package', 'haridwar trip', 'rishikesh yoga retreat', 'rishikesh rafting'],
    },
  });

  const rishikeshPackage = await prisma.package.upsert({
    where: { slug: 'rishikesh-haridwar-spiritual-4d' },
    update: {},
    create: {
      destinationId: rishikesh.id,
      name: 'Rishikesh & Haridwar Spiritual Journey',
      slug: 'rishikesh-haridwar-spiritual-4d',
      type: PackageType.GROUP,
      durationDays: 4,
      durationNights: 3,
      basePrice: 8000,
      discountedPrice: 6999,
      inclusions: ['Guesthouse accommodation', 'Daily breakfast', 'Haridwar Ganga Aarti', 'Rishikesh sightseeing', 'Yoga session'],
      exclusions: ['Transport to Rishikesh', 'Lunch and dinner', 'Adventure activities', 'Personal expenses'],
      highlights: ['Haridwar Ganga Aarti', 'Ram Jhula', 'Lakshman Jhula', 'Neelkanth Mahadev Temple', 'Beatles Ashram', 'Triveni Ghat'],
      maxGroupSize: 20,
      minGroupSize: 4,
      difficultyLevel: 'Easy',
      isActive: true,
      isFeatured: false,
    },
  });

  await prisma.fITAddOn.createMany({
    data: [
      {
        destinationId: rishikesh.id,
        name: 'White Water Rafting (16 km)',
        description: 'Thrilling white water rafting on the Ganges from Shivpuri to Rishikesh. Includes rapids like Three Blind Mice and The Wall.',
        category: FITAddOnCategory.ACTIVITY,
        pricePerPerson: 1500,
        durationHours: 3,
        images: ['https://images.unsplash.com/photo-1530866495561-507c9faab2ed?w=800'],
        locationName: 'Shivpuri to Rishikesh',
        aiTags: ['rafting', 'adventure', 'ganges', 'water sports'],
        isAvailable: true,
        isPopular: true,
      },
      {
        destinationId: rishikesh.id,
        name: 'Bungee Jumping (83 meters)',
        description: "India's highest fixed bungee jump at Jumpin Heights, Rishikesh. The 83-meter drop over a river gorge is not for the faint-hearted.",
        category: FITAddOnCategory.ACTIVITY,
        pricePerPerson: 3550,
        durationHours: 1,
        images: ['https://images.unsplash.com/photo-1601024445121-e5b82f020549?w=800'],
        locationName: 'Jumpin Heights, Rishikesh',
        aiTags: ['extreme', 'bungee', 'adventure', 'thrilling'],
        isAvailable: true,
        isPopular: true,
      },
      {
        destinationId: rishikesh.id,
        name: 'Yoga & Meditation Retreat (Full Day)',
        description: "A transformative full-day yoga and meditation retreat at one of Rishikesh's renowned ashrams. Includes pranayama, asanas, and guided meditation.",
        category: FITAddOnCategory.EXPERIENCE,
        pricePerPerson: 1200,
        durationHours: 8,
        images: ['https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800'],
        locationName: 'Rishikesh Ashram',
        aiTags: ['yoga', 'meditation', 'wellness', 'spiritual'],
        isAvailable: true,
        isPopular: false,
      },
    ],
    skipDuplicates: true,
  });

  // Create sample testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        userName: 'Rahul Mehta',
        userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
        rating: 5,
        review: 'Absolutely amazing experience with GoTravel! The Manali trip was perfectly organized. The FIT builder feature helped me customize my itinerary exactly how I wanted. Highly recommend!',
        destination: 'Manali',
        isActive: true,
      },
      {
        userName: 'Priya Singh',
        userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b830?w=100',
        rating: 5,
        review: 'Kerala backwaters on a houseboat was a dream come true. GoTravel made everything seamless from booking to return. The team was always available on WhatsApp.',
        destination: 'Kerala',
        isActive: true,
      },
      {
        userName: 'Aditya Kumar',
        userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
        rating: 5,
        review: 'Ladakh trip was the best decision of my life! GoTravel handled all permits, acclimatization schedule, and logistics perfectly. The AI itinerary suggestions were spot-on.',
        destination: 'Ladakh',
        isActive: true,
      },
      {
        userName: 'Sneha Patel',
        userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
        rating: 4,
        review: 'Booked Rajasthan Royal Circuit for our family. The heritage hotels were fantastic and the camel safari was the highlight for kids. Will definitely book again!',
        destination: 'Rajasthan',
        isActive: true,
      },
      {
        userName: 'Vikram Nair',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
        rating: 5,
        review: 'Goa trip for our bachelor party was epic! GoTravel customized the itinerary with all the right add-ons. The sunset cruise was the perfect ending to a perfect trip.',
        destination: 'Goa',
        isActive: true,
      },
      {
        userName: 'Anita Reddy',
        userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100',
        rating: 5,
        review: 'Excellent service from start to finish. The team at GoTravel is extremely professional and knowledgeable. Our Andaman honeymoon package was absolutely perfect!',
        destination: 'Andaman Islands',
        isActive: true,
      },
    ],
    skipDuplicates: true,
  });

  // Create sample leads
  const lead1 = await prisma.lead.create({
    data: {
      userName: 'Rohit Verma',
      userEmail: 'rohit@example.com',
      userPhone: '+919876123456',
      destinationId: manali.id,
      sourcePage: '/destinations/manali',
      utmSource: 'google',
      utmMedium: 'cpc',
      status: 'NEW',
      message: 'Interested in Manali package for 2 adults in December',
    },
  });

  const lead2 = await prisma.lead.create({
    data: {
      userName: 'Meena Krishnan',
      userEmail: 'meena@example.com',
      userPhone: '+919812345678',
      destinationId: kerala.id,
      sourcePage: '/destinations/kerala/fit',
      utmSource: 'instagram',
      utmMedium: 'social',
      status: 'CONTACTED',
      message: 'Looking for Kerala backwaters + FIT customization for honeymoon',
    },
  });

  // Create sample bookings
  const booking1 = await prisma.booking.create({
    data: {
      userId: user1.id,
      packageId: manaliGroup.id,
      status: 'CONFIRMED',
      travelDate: new Date('2024-12-20'),
      returnDate: new Date('2024-12-25'),
      numAdults: 2,
      numChildren: 0,
      totalAmount: 25998,
      paidAmount: 25998,
      specialRequests: 'Need vegetarian food and ground floor room',
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      userId: user2.id,
      packageId: keralaPackage.id,
      status: 'PAID',
      travelDate: new Date('2024-11-10'),
      returnDate: new Date('2024-11-15'),
      numAdults: 2,
      numChildren: 0,
      totalAmount: 31998,
      paidAmount: 31998,
    },
  });

  // Create admin notifications
  await prisma.adminNotification.createMany({
    data: [
      {
        type: 'LEAD',
        title: 'New Lead: Manali Trip',
        message: 'Rohit Verma is interested in Manali package for December',
        data: { leadId: lead1.id, source: 'google' },
        isRead: false,
        relatedUserId: null,
      },
      {
        type: 'BOOKING',
        title: 'New Booking Confirmed',
        message: 'John Doe confirmed Manali Group Adventure booking (₹25,998)',
        data: { bookingId: booking1.id },
        isRead: true,
        relatedBookingId: booking1.id,
      },
      {
        type: 'PAYMENT',
        title: 'Payment Received',
        message: 'Payment of ₹31,998 received for Kerala Backwaters booking',
        data: { bookingId: booking2.id, amount: 31998 },
        isRead: false,
        relatedBookingId: booking2.id,
      },
    ],
    skipDuplicates: true,
  });

  // Create sample blog posts
  await prisma.blogPost.createMany({
    data: [
      {
        slug: 'best-time-to-visit-manali',
        title: '10 Best Things to Do in Manali for an Unforgettable Trip',
        content: `Manali, nestled in the Beas River Valley of Himachal Pradesh, is one of India's most popular hill stations. Here are the top 10 things you must do when visiting Manali...`,
        excerpt: 'Discover the must-do activities in Manali, from paragliding at Solang Valley to exploring the ancient Hadimba Temple.',
        featuredImage: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=800',
        tags: ['Manali', 'Himachal Pradesh', 'Adventure', 'Travel Tips'],
        seoTitle: 'Top 10 Things to Do in Manali | GoTravel Travel Guide',
        seoDescription: 'Complete guide to the best activities in Manali. Paragliding, trekking, snow activities, and cultural experiences.',
        isPublished: true,
        publishedAt: new Date('2024-10-15'),
        authorId: admin.id,
      },
      {
        slug: 'kerala-backwaters-complete-guide',
        title: 'Kerala Backwaters: Your Complete Houseboat Travel Guide',
        content: `The Kerala backwaters are a network of canals, rivers, lakes, and inlets that form a 900km stretch of waterway. This complete guide will help you plan the perfect houseboat experience...`,
        excerpt: 'Everything you need to know about Kerala backwaters - best routes, houseboat types, and what to expect.',
        featuredImage: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800',
        tags: ['Kerala', 'Backwaters', 'Houseboat', 'Travel Guide'],
        seoTitle: 'Kerala Backwaters Houseboat Guide 2024 | GoTravel',
        seoDescription: 'Complete guide to Kerala backwater houseboat cruise. Best routes, pricing, what to pack, and insider tips.',
        isPublished: true,
        publishedAt: new Date('2024-10-20'),
        authorId: admin.id,
      },
      {
        slug: 'ladakh-first-time-travel-guide',
        title: "First Timer's Guide to Ladakh: Everything You Need to Know",
        content: `Planning your first trip to Ladakh? The Land of High Passes is breathtakingly beautiful but requires careful preparation. Here's everything a first-time visitor needs to know...`,
        excerpt: 'Essential guide for first-time Ladakh travelers - permits, acclimatization, best routes, and what to pack.',
        featuredImage: 'https://images.unsplash.com/photo-1572463940-50b6ba38a58a?w=800',
        tags: ['Ladakh', 'Leh', 'High Altitude', 'First Time Travel'],
        seoTitle: 'First Time Ladakh Travel Guide 2024 | GoTravel',
        seoDescription: 'Complete guide for first-time Ladakh visitors. Permits, altitude sickness prevention, best time to visit, and must-see places.',
        isPublished: true,
        publishedAt: new Date('2024-11-01'),
        authorId: admin.id,
      },
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seed completed successfully!');
  console.log('📊 Created:');
  console.log('  - 8 destinations (Manali, Goa, Kerala, Rajasthan, Ladakh, Andaman, Coorg, Rishikesh)');
  console.log('  - Multiple packages per destination');
  console.log('  - FIT add-ons for all destinations');
  console.log('  - 6 testimonials');
  console.log('  - Sample leads, bookings, and notifications');
  console.log('  - 3 blog posts');
  console.log('  - Admin user: admin@gotravel.com / Admin@123');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
