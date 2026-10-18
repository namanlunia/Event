/**
 * Central Site Configuration for OWOC (Omnikon Winter of Code)
 * Single source of truth for organization metadata, contacts, social links,
 * ambassador rewards, and demonstration mode toggles.
 */

export interface AmbassadorTierPerk {
  tier: string;
  tierName: string;
  minReferrals: number;
  referrals: string;
  perks: string[];
}

export const SITE_CONFIG = {
  // Organization identity
  ORG_NAME: process.env.NEXT_PUBLIC_ORG_NAME || "Omnikon",
  FULL_PROGRAM_NAME: "Omnikon Winter of Code",
  SHORT_PROGRAM_NAME: "OWOC",
  
  // Contact & Inquiries
  CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@omnikon.org",
  CONDUCT_EMAIL: process.env.NEXT_PUBLIC_CONDUCT_EMAIL || "conduct@omnikon.org",

  // Social Links (only rendered if URL string is populated)
  SOCIAL_LINKS: {
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
    discord: process.env.NEXT_PUBLIC_DISCORD_URL || "",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },

  // Demonstration mode toggle (defaults to false in production)
  // When false (default): Only verified real data and clean empty states render.
  // When true: Sample demonstration data renders with disclaimer banner and "Sample" tags.
  DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE !== "false",

  // Ambassador Rewards (Deliverable & confirmed items only)
  AMBASSADOR_REWARDS: [
    {
      tier: "Bronze Tier",
      tierName: "Bronze Tier",
      minReferrals: 10,
      referrals: "10+ Registrations",
      perks: [
        "Official Campus Ambassador Certificate",
        "Public Recognition on OWOC Website",
        "Access to Ambassador Community Channels",
        // Physical swag commented out until confirmed:
        // "OWOC Winter Sticker Pack (Enable only if confirmed)",
      ],
    },
    {
      tier: "Silver Tier",
      tierName: "Silver Tier",
      minReferrals: 25,
      referrals: "25+ Registrations",
      perks: [
        "Distinguished Ambassador Digital Certificate",
        "Featured Ambassador Profile on Website",
        "Organizers Recommendation on LinkedIn (Upon review)",
        // Physical swag commented out until confirmed:
        // "Official Winter T-Shirt (Enable only if confirmed)",
      ],
    },
    {
      tier: "Gold Tier",
      tierName: "Gold Tier",
      minReferrals: 50,
      referrals: "50+ Registrations",
      perks: [
        "Executive Leadership Certificate of Excellence",
        "Priority invitation to mentor in subsequent editions",
        "Written Recommendation Letter from Organizers",
        // Physical swag commented out until confirmed:
        // "Official Winter Hoodie & Swag Kit (Enable only if confirmed)",
      ],
    },
    {
      tier: "Diamond Tier",
      tierName: "Diamond Tier",
      minReferrals: 100,
      referrals: "100+ Registrations",
      perks: [
        "Top Campus Champion Digital Accolade",
        "Campus Chapter Lead Digital Credential",
        "Direct Invitation to future organizing steering sessions",
        // Physical swag commented out until confirmed:
        // "Full Tech Swag Box & Electronics Kit (Enable only if confirmed)",
      ],
    },
  ] as AmbassadorTierPerk[],
};
