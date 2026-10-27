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
  CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@omnikonhub.com",
  CONDUCT_EMAIL: process.env.NEXT_PUBLIC_CONDUCT_EMAIL || "contact@omnikonhub.com",

  // Social Links
  WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.omnikonhub.com/",
  SOCIAL_LINKS: {
    website: process.env.NEXT_PUBLIC_WEBSITE_URL || "https://www.omnikonhub.com/",
    discord: process.env.NEXT_PUBLIC_DISCORD_URL || "https://discord.gg/yWtjK2Tb8T",
    linkedin: process.env.NEXT_PUBLIC_LINKEDIN_URL || "https://www.linkedin.com/company/omnikon-org/",
    twitter: process.env.NEXT_PUBLIC_TWITTER_URL || "https://x.com/OmnikonOrg",
    github: process.env.NEXT_PUBLIC_GITHUB_URL || "https://github.com/Omnikon-Org",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_URL || "",
  },

  // Demonstration mode toggle (defaults to false in production)
  // When false (default): Only verified real data and clean empty states render.
  // When true: Sample demonstration data renders with disclaimer banner and "Sample" tags.
  DEMO_MODE: process.env.NEXT_PUBLIC_DEMO_MODE === "true",

  // Ambassador Rewards (Deliverable & confirmed items only)
  AMBASSADOR_REWARDS: [
    {
      tier: "Bronze",
      tierName: "Bronze",
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
      tier: "Silver",
      tierName: "Silver",
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
      tier: "Gold",
      tierName: "Gold",
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
      tier: "Diamond",
      tierName: "Diamond",
      minReferrals: 100,
      referrals: "100+ Registrations",
      perks: [
        "Top Campus Ambassador Digital Accolade",
        "Campus Chapter Lead Digital Credential",
        "Direct Invitation to future organizing steering sessions",
        // Physical swag commented out until confirmed:
        // "Full Tech Swag Box & Electronics Kit (Enable only if confirmed)",
      ],
    },
  ] as AmbassadorTierPerk[],
};
