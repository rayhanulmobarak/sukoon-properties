import '../models/property.dart';


class PropertyData {


  static List<Property> properties = [


    Property(

      id: "1",

      name: "Sukoon Green Residence",

      location: "Dhaka, Bangladesh",

      price: "85 Lac BDT",

      area: "1200 Sq Ft",

      type: "Apartment",

      image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",

      description:
      "Modern family apartment with beautiful environment and security system.",

      facilities: [

        "24 Hours Security",
        "Parking",
        "Lift",
        "Community Area"

      ],

    ),



    Property(

      id: "2",

      name: "Sukoon Hill View Resort",

      location: "Khagrachhari, Bangladesh",

      price: "40 Lac BDT",

      area: "2000 Sq Ft",

      type: "Land & Villa",

      image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c",

      description:
      "Peaceful natural housing project surrounded by hills and greenery.",

      facilities: [

        "Natural View",
        "Security",
        "Road Access",
        "Electricity"

      ],

    ),



    Property(

      id: "3",

      name: "Sukoon Coastal Living",

      location: "Cox's Bazar, Bangladesh",

      price: "1.2 Crore BDT",

      area: "1500 Sq Ft",

      type: "Luxury Apartment",

      image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea",

      description:
      "Premium living space near the sea with modern facilities.",

      facilities: [

        "Sea View",
        "Swimming Pool",
        "Parking",
        "Security"

      ],

    ),


  ];


}
