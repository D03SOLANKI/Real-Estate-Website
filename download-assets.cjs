const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    name: 'hero-day.jpg',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2560&q=85',
    photographer: 'R Architecture',
    unsplashId: 'photo-1600585154340-be6161a56a0c',
    description: 'Modern luxury residential facade with pool and architectural lighting under day sun'
  },
  {
    name: 'hero-night.jpg',
    url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2560&q=85',
    photographer: 'R Architecture',
    unsplashId: 'photo-1600596542815-ffad4c1539a9',
    description: 'Bespoke modern residence illuminated at dusk with reflections and serene warm ambient glow'
  },
  {
    name: 'architecture-exterior.jpg',
    url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2400&q=85',
    photographer: 'R Architecture',
    unsplashId: 'photo-1600607687939-ce8a6c25118c',
    description: 'Contemporary architectural lines, natural stone, and private outdoor living terraces'
  },
  {
    name: 'amenity-pool.jpg',
    url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=2400&q=85',
    photographer: 'Dim Hou',
    unsplashId: 'photo-1576013551627-0cc20b96c2a7',
    description: 'Saltwater infinity swimming pool with sun loungers and lush tropical landscaping'
  },
  {
    name: 'amenity-spa-gym.jpg',
    url: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?auto=format&fit=crop&w=2400&q=85',
    photographer: 'Sven Mieke',
    unsplashId: 'photo-1540497077202-7c8a3999166f',
    description: 'Wellness gym and spa facility with modern equipment and natural wood accents'
  },
  {
    name: 'amenity-garden.jpg',
    url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=2400&q=85',
    photographer: 'Max Harlynking',
    unsplashId: 'photo-1585320806297-9794b3e4eeae',
    description: 'Lush private garden paths connecting residences with indigenous Mediterranean flora'
  },
  {
    name: 'amenity-lounge.jpg',
    url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=2400&q=85',
    photographer: 'R Architecture',
    unsplashId: 'photo-1600566753376-12c8ab7fb75b',
    description: 'Exclusive residents clubhouse and private lounge with high ceilings and fireplace'
  },
  {
    name: 'amenity-parking.jpg',
    url: 'https://images.unsplash.com/photo-1590674899484-d5640e854abe?auto=format&fit=crop&w=2400&q=85',
    photographer: 'Chuttersnap',
    unsplashId: 'photo-1590674899484-d5640e854abe',
    description: 'Secure underground parking bay with private electric vehicle charging stations'
  },
  {
    name: 'interior-living.jpg',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=85',
    photographer: 'R Architecture',
    unsplashId: 'photo-1600210492486-724fe5c67fb0',
    description: 'Open-concept living room with floor-to-ceiling glass doors opening onto the terrace'
  },
  {
    name: 'interior-kitchen.jpg',
    url: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=2400&q=85',
    photographer: 'R Architecture',
    unsplashId: 'photo-1600585152220-90363fe7e115',
    description: 'Minimalist designer kitchen with natural stone island and premium integrated appliances'
  },
  {
    name: 'interior-bedroom.jpg',
    url: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=2400&q=85',
    photographer: 'Spacejoy',
    unsplashId: 'photo-1616594039964-ae9021a400a0',
    description: 'Master bedroom suite bathed in warm natural morning light with private balcony'
  },
  {
    name: 'interior-bathroom.jpg',
    url: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=2400&q=85',
    photographer: 'Sanibell BV',
    unsplashId: 'photo-1584622650111-993a426fbf0a',
    description: 'Spa-inspired bathroom featuring large-format stone tiles and freestanding soaking tub'
  },
  {
    name: 'terrace-solarium.jpg',
    url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=2400&q=85',
    photographer: 'Frames For Your Heart',
    unsplashId: 'photo-1512917774080-9991f1c4c750',
    description: 'Panoramic rooftop solarium with lounge seating and sunset skyline views'
  },
  {
    name: 'location-neighborhood.jpg',
    url: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=2400&q=85',
    photographer: 'Teddy Kelley',
    unsplashId: 'photo-1506157786151-b8491531f063',
    description: 'Upscale tranquil avenue with lush mature tree-lined streets near city conveniences'
  }
];

function download(item) {
  return new Promise((resolve, reject) => {
    const dest = path.join(__dirname, 'public', 'assets', 'images', item.name);
    const file = fs.createWriteStream(dest);
    
    function get(url) {
      https.get(url, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          get(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          reject(new Error(`Failed to download ${item.name}: status code ${res.statusCode}`));
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            const stats = fs.statSync(dest);
            console.log(`Downloaded ${item.name} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
            resolve();
          });
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    }
    get(item.url);
  });
}

async function run() {
  console.log('Starting download of curated high-resolution photography...');
  for (const img of images) {
    try {
      await download(img);
    } catch (e) {
      console.error(e.message);
    }
  }

  // Generate CREDITS.md
  let credits = `# Asset Credits & Licensing

All photography used on Aurelia Residence has been carefully curated for exceptional high resolution (at least 2400px on the long edge), sharp architectural composition, and consistent warm contemporary tone. All images are licensed under the Unsplash License (free for commercial and non-commercial use, no permission required).

> **Note**: Images are for illustration purposes only to represent the architectural atmosphere and lifestyle of Aurelia Residence.

| Image Asset | Section | Photographer | Resolution | License | Source URL |
| :--- | :--- | :--- | :--- | :--- | :--- |
`;

  images.forEach(img => {
    credits += `| \`${img.name}\` | ${img.description} | **${img.photographer}** | 2400px+ (Original HQ) | Unsplash License | [Unsplash Photo](https://unsplash.com/photos/${img.unsplashId}) |\n`;
  });

  credits += `\n## Floor Plans & Architectural Drawings\n- In-house vector SVG floor plans designed specifically for Aurelia Residence (Ground floor + basement, Ground floor garden, and Penthouse duplex with private rooftop solarium).\n`;

  fs.writeFileSync(path.join(__dirname, 'CREDITS.md'), credits);
  console.log('Successfully written CREDITS.md');
}

run();
