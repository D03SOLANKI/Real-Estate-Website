// Centralized site configuration
// All components, pages, metadata, and links must read from this config.

export const siteConfig = {
  projectName: "Aurelia Residence",
  companyName: "Aurelia Living Spaces",
  tagline: "Modern Living, Timeless Comfort",
  address: "24 Skyline Avenue, Ahmedabad, Gujarat, India",
  phone: "+91 98765 43210",
  email: "hello@aurelialiving.example",
  website: "https://aurelialiving.example",
  instagram: "https://instagram.com/aureliaresidence",
  facebook: "https://facebook.com/aureliaresidence",
  youtube: "https://youtube.com/@aureliaresidence",
  linkedin: "https://linkedin.com/company/aurelia-living-spaces",
  whatsapp: "+919876543210",
  formEndpoint: "", // Empty by default; connect Formspree/EmailJS endpoint here

  // Placeholders for details not provided in brief (clearly listed in report)
  reraNumber: "PR/GJ/AHMEDABAD/AURELIA/RAA10982/SAMPLE",
  completionDate: "Q4 2026",
  architect: "Studio Aurelia & Associates [SAMPLE CONTENT]",
  totalUnits: 25,
  officeHours: "Monday – Saturday: 10:00 AM – 7:00 PM IST [SAMPLE CONTENT]",

  // Helper getters for derived links (no hardcoding elsewhere)
  get telLink() {
    return `tel:${this.phone.replace(/[^+\d]/g, '')}`;
  },
  get mailLink() {
    return `mailto:${this.email}`;
  },
  get whatsappLink() {
    const cleanNum = this.whatsapp.replace(/[^+\d]/g, '').replace('+', '');
    return `https://wa.me/${cleanNum}`;
  }
};

export default siteConfig;
