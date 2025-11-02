// src/charter.ts
import { z } from "zod";
var isClient = typeof window !== "undefined";
var fileSchema = z.any().refine((file) => !isClient || file instanceof File, "Upload a valid file");
var tripSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Trip name is required"),
  tripType: z.string().min(1, "Select a trip type"),
  price: z.number().min(0, { message: "Price must be zero or more" }),
  promoPrice: z.number().min(0, { message: "Promo/low season price must be zero or more" }).optional(),
  durationHours: z.number().int({ message: "Duration must be whole hours" }).min(1, { message: "At least 1 hour" }),
  startTimes: z.array(z.string().regex(/^\d{2}:\d{2}$/u, "Use 24 hour format, e.g. 07:00")).min(1, "Add at least one start time"),
  maxAnglers: z.number().int({ message: "Whole numbers only" }).min(1, { message: "At least 1 angler" }),
  charterStyle: z.enum(["private", "shared"], {
    error: "Select charter style"
  }),
  description: z.string().optional(),
  species: z.array(z.string()).default([]),
  techniques: z.array(z.string()).default([])
});
var policiesSchema = z.object({
  licenseProvided: z.boolean().optional().default(false),
  catchAndKeep: z.boolean().optional().default(false),
  catchAndRelease: z.boolean().optional().default(false),
  childFriendly: z.boolean().optional().default(false),
  liveBaitProvided: z.boolean().optional().default(false),
  alcoholNotAllowed: z.boolean().optional().default(false),
  smokingNotAllowed: z.boolean().optional().default(false)
});
var charterFormSchema = z.object({
  operator: z.object({
    // Names + email now sourced from account session (removed fields retained in DB via captainProfile when finalizing)
    displayName: z.string().min(1, "Preferred operator name is required"),
    experienceYears: z.number().int({ message: "Whole numbers only" }).min(0, { message: "Years must be zero or more" }),
    bio: z.string().min(20, "Tell anglers about yourself (min 20 characters)"),
    phone: z.string().min(1, "Phone number is required").regex(/^[+]?[-\d\s()]{6,}$/u, "Enter a valid phone number"),
    backupPhone: z.string().min(1).regex(/^[+]?[-\d\s()]{6,}$/u, "Enter a valid phone number").optional().or(z.literal("")),
    avatar: fileSchema.optional(),
    avatarUrl: z.string().url().optional()
  }),
  charterType: z.string().min(1, "Select a charter type"),
  charterName: z.string().min(1, "Charter name is required"),
  state: z.string().min(1, "Select a state"),
  city: z.string().min(1, "Enter a city/town"),
  startingPoint: z.string().min(1, "Starting point is required"),
  // address full string from Places
  placeId: z.string().optional(),
  // Optionally later we could add placeId if we want to persist it
  postcode: z.string().regex(/^\d{5}$/u, "Use a 5 digit postcode"),
  latitude: z.number().min(-90, { message: "Latitude must be between -90 and 90" }).max(90, { message: "Latitude must be between -90 and 90" }),
  longitude: z.number().min(-180, { message: "Longitude must be between -180 and 180" }).max(180, { message: "Longitude must be between -180 and 180" }),
  // User editable final description (can start from auto-generated). Increase minimum length.
  description: z.string().min(40, "Description should be at least 40 characters"),
  // Internal: last generated description baseline for personalization diff.
  generatedDescription: z.string().optional(),
  // Tone selection for generator.
  tone: z.enum(["friendly", "adventurous", "professional"]).default("friendly"),
  // Service without boat checkbox
  withoutBoat: z.boolean().optional().default(false),
  boat: z.object({
    name: z.string().optional(),
    type: z.string().optional(),
    lengthFeet: z.number().positive({ message: "Length must be positive" }).optional(),
    capacity: z.number().int({ message: "Whole numbers only" }).positive({ message: "Capacity must be positive" }).optional(),
    features: z.array(z.string()).optional().default([])
  }),
  amenities: z.array(z.string()).optional().default([]).optional(),
  policies: policiesSchema,
  pickup: z.object({
    available: z.boolean(),
    fee: z.number().nullable(),
    areas: z.array(z.string()),
    notes: z.string().optional()
  }).superRefine((val, ctx) => {
    if (val.available && !Number.isFinite(val.fee ?? NaN)) {
      ctx.addIssue({
        path: ["fee"],
        code: z.ZodIssueCode.custom,
        message: "Enter pickup fee"
      });
    }
  }),
  // Charter operational schedule
  scheduleType: z.enum(["EVERYDAY", "WEEKDAYS", "WEEKENDS", "CUSTOM"]).default("EVERYDAY"),
  operationalDays: z.array(z.number().min(0).max(6)).optional().default([]),
  trips: z.array(tripSchema).min(1, "Add at least one trip"),
  photos: z.array(fileSchema).min(3, "Upload at least 3 photos").max(15, "Maximum 15 photos"),
  videos: z.array(fileSchema).max(10, "Maximum 10 videos").optional().default([]),
  // Persisted (already uploaded) media metadata for draft reload (NOT validated as user input fields)
  uploadedPhotos: z.array(
    z.object({
      name: z.string(),
      url: z.string().url()
    })
  ).optional().default([]),
  uploadedVideos: z.array(
    z.object({
      name: z.string(),
      url: z.string().url()
    })
  ).optional().default([])
});
var basicsStepSchema = charterFormSchema.pick({
  operator: true,
  charterType: true,
  charterName: true,
  state: true,
  city: true,
  startingPoint: true,
  postcode: true,
  latitude: true,
  longitude: true
});
var experienceStepSchema = charterFormSchema.pick({
  boat: true,
  amenities: true,
  policies: true,
  pickup: true,
  scheduleType: true,
  operationalDays: true
});
var tripsStepSchema = charterFormSchema.pick({ trips: true });
var mediaPricingStepSchema = charterFormSchema.pick({
  photos: true,
  videos: true
});
var descriptionStepSchema = charterFormSchema.pick({
  description: true,
  generatedDescription: true,
  tone: true
});

// src/charter-update.ts
import { z as z2 } from "zod";
var CharterUpdateSchema = z2.object({
  charter: z2.object({
    charterType: z2.string().optional(),
    name: z2.string().optional(),
    state: z2.string().optional(),
    city: z2.string().optional(),
    startingPoint: z2.string().optional(),
    postcode: z2.string().optional(),
    latitude: z2.number().nullable().optional(),
    longitude: z2.number().nullable().optional(),
    description: z2.string().optional(),
    backupPhone: z2.string().nullable().optional(),
    // "tone" is a client-only helper for description generation; accept & ignore.
    tone: z2.string().optional()
  }).optional(),
  captain: z2.object({
    displayName: z2.string().optional(),
    phone: z2.string().optional(),
    bio: z2.string().optional(),
    experienceYrs: z2.number().int().optional()
  }).optional(),
  boat: z2.object({
    name: z2.string().optional(),
    type: z2.string().optional(),
    lengthFt: z2.number().int().nullable().optional(),
    capacity: z2.number().int().nullable().optional(),
    features: z2.array(z2.string()).optional()
  }).optional(),
  amenities: z2.array(z2.string()).optional(),
  features: z2.array(z2.string()).optional(),
  policies: z2.object({
    licenseProvided: z2.boolean().optional(),
    catchAndKeep: z2.boolean().optional(),
    catchAndRelease: z2.boolean().optional(),
    childFriendly: z2.boolean().optional(),
    liveBaitProvided: z2.boolean().optional(),
    alcoholNotAllowed: z2.boolean().optional(),
    smokingNotAllowed: z2.boolean().optional()
  }).optional(),
  pickup: z2.object({
    available: z2.boolean().optional(),
    fee: z2.number().nullable().optional(),
    notes: z2.string().optional(),
    areas: z2.array(z2.string()).optional()
  }).optional(),
  schedule: z2.object({
    scheduleType: z2.enum(["EVERYDAY", "WEEKDAYS", "WEEKENDS", "CUSTOM"]).optional(),
    operationalDays: z2.array(z2.number().min(0).max(6)).optional()
  }).optional(),
  trips: z2.array(
    z2.object({
      id: z2.string().nullable().optional(),
      name: z2.string().optional(),
      tripType: z2.string().optional(),
      price: z2.number().nullable().optional(),
      promoPrice: z2.number().nullable().optional(),
      durationHours: z2.number().int().nullable().optional(),
      maxAnglers: z2.number().int().nullable().optional(),
      style: z2.string().optional(),
      description: z2.string().nullable().optional(),
      startTimes: z2.array(z2.string()).optional(),
      species: z2.array(z2.string()).optional(),
      techniques: z2.array(z2.string()).optional(),
      _delete: z2.boolean().optional()
    })
  ).optional()
});

// src/draft.ts
import { z as z3 } from "zod";
var DraftPatchSchema = z3.object({
  dataPartial: z3.any(),
  // already sanitized at merge stage; could be narrowed further per form version
  clientVersion: z3.number().int().nonnegative(),
  currentStep: z3.number().int().min(0).max(10).optional()
});

// src/media.ts
import { z as z4 } from "zod";
var MediaFileSchema = z4.object({
  // 'name' is used as a storage key; allow longer keys to accommodate
  // directory prefixes (e.g., charters/<id>/media/<file>). Keep generous cap.
  name: z4.string().min(1).max(512).refine(
    (val) => {
      if (/^[\w.-]+\.(jpg|jpeg|png|webp|gif)$/i.test(val)) return true;
      if (val.startsWith("captains/") && val.includes("/avatar/"))
        return true;
      if (val.startsWith("verification/")) return true;
      if (val.startsWith("captains/") && val.includes("/media/")) return true;
      if (val.startsWith("temp/") && val.includes("/original/")) return true;
      if (val.startsWith("charters/") && val.includes("/media/")) return true;
      return false;
    },
    { message: "Invalid storage key path pattern" }
  ),
  url: z4.string().url(),
  mimeType: z4.string().min(3).max(128).optional(),
  sizeBytes: z4.number().int().positive().max(200 * 1024 * 1024).optional(),
  // hard ceiling 200MB (videos)
  width: z4.number().int().positive().max(1e4).optional(),
  height: z4.number().int().positive().max(1e4).optional()
});
var FinalizeMediaSchema = z4.object({
  media: z4.object({
    // Allow zero images to support edit re-use of existing media. Create path still enforces >=1 later.
    images: z4.array(MediaFileSchema).max(20),
    videos: z4.array(MediaFileSchema).max(10),
    imagesOrder: z4.array(z4.number().int().nonnegative()).optional(),
    videosOrder: z4.array(z4.number().int().nonnegative()).optional(),
    imagesCoverIndex: z4.number().int().nonnegative().nullish(),
    videosCoverIndex: z4.number().int().nonnegative().nullish(),
    avatar: MediaFileSchema.nullable().optional()
  })
});
function normalizeFinalizeMedia(raw) {
  if (!raw || typeof raw !== "object") return null;
  const obj = raw;
  function pickArray(key) {
    const v = obj[key];
    return Array.isArray(v) ? v : [];
  }
  function pickNumberArray(key) {
    const arr = pickArray(key);
    return arr.length ? arr : void 0;
  }
  function pickNumber(key) {
    const v = obj[key];
    return typeof v === "number" ? v : void 0;
  }
  function pickObj(key) {
    const v = obj[key];
    return v && typeof v === "object" ? v : null;
  }
  const images = pickArray("images");
  const videos = pickArray("videos");
  return {
    images,
    videos,
    imagesOrder: pickNumberArray("imagesOrder"),
    videosOrder: pickNumberArray("videosOrder"),
    imagesCoverIndex: pickNumber("imagesCoverIndex"),
    videosCoverIndex: pickNumber("videosCoverIndex"),
    avatar: pickObj("avatar")
  };
}
var IncomingMediaSchema = z4.object({
  media: z4.object({
    images: z4.array(
      z4.object({
        name: z4.string().min(1),
        url: z4.string().url(),
        thumbnailUrl: z4.string().url().optional(),
        durationSeconds: z4.number().int().positive().optional()
      })
    ).max(20),
    videos: z4.array(
      z4.object({
        name: z4.string().min(1),
        url: z4.string().url(),
        thumbnailUrl: z4.string().url().optional(),
        durationSeconds: z4.number().int().positive().optional()
      })
    ).max(10),
    deleteKeys: z4.array(z4.string()).optional()
  }),
  deleteKeys: z4.array(z4.string()).optional(),
  order: z4.object({
    images: z4.array(z4.number().int().nonnegative()).optional(),
    videos: z4.array(z4.number().int().nonnegative()).optional()
  }).optional()
});
var MediaRemovalSchema = z4.object({
  mediaId: z4.string().optional(),
  // direct CharterMedia id
  storageKey: z4.string().optional()
  // fallback if id not known yet
});
var VideoThumbnailSchema = z4.object({
  storageKey: z4.string().min(1),
  dataUrl: z4.string().min(50).refine((v) => v.startsWith("data:image/"), "must be data:image/* base64"),
  durationSeconds: z4.number().int().positive().max(60 * 60 * 6).optional()
});

// src/video.ts
import { z as z5 } from "zod";
var ProcessStatusEnum = z5.enum([
  "queued",
  "processing",
  "ready",
  "failed"
]);
var CreateUploadSchema = z5.object({
  fileName: z5.string().min(1).max(256),
  fileType: z5.string().refine(
    (type) => {
      if (type === "") return true;
      if (type.startsWith("video/")) return true;
      if (type === "application/octet-stream") return true;
      return false;
    },
    { message: "Must be a video file" }
  )
});
var FinishFormSchema = z5.object({
  videoUrl: z5.string().url(),
  startSec: z5.number().min(0).max(86400),
  // Added optional endSec (exclusive) to allow backend to know trimmed selection length
  endSec: z5.number().min(0).max(86400).optional(),
  // Added metadata fields to support bypass logic and metrics
  width: z5.number().min(0).max(1e4).optional(),
  height: z5.number().min(0).max(1e4).optional(),
  originalDurationSec: z5.number().min(0).max(86400).optional(),
  ownerId: z5.string().min(1),
  blobKey: z5.string().min(1),
  charterId: z5.string().min(1).optional(),
  didFallback: z5.boolean().optional(),
  fallbackReason: z5.string().max(300).optional()
});
var TranscodePayloadSchema = z5.object({
  videoUrl: z5.string().url(),
  startSec: z5.number().min(0).max(86400),
  videoId: z5.string().min(1)
});
var ListQuerySchema = z5.object({
  ownerId: z5.string().min(1)
});
function validateThumbFile(file) {
  const allowed = ["image/jpeg", "image/jpg", "image/webp"];
  if (!allowed.includes(file.type)) return false;
  if (file.size > 2 * 1024 * 1024) return false;
  return true;
}
var SUPPORTED_VIDEO_EXTENSIONS = [
  // Modern web formats
  "mp4",
  "webm",
  "ogg",
  // Apple formats
  "mov",
  "m4v",
  "m4p",
  // Mobile formats (Android)
  "3gp",
  "3gpp",
  // Legacy/Desktop formats
  "avi",
  "mkv",
  "flv",
  "wmv",
  // MPEG variants
  "mpg",
  "mpeg",
  "mpe",
  "mpv",
  "m2v",
  // Transport streams
  "m2ts",
  "mts"
];
var VIDEO_EXTENSION_REGEX = new RegExp(
  `\\.(${SUPPORTED_VIDEO_EXTENSIONS.join("|")})$`,
  "i"
);

// src/video-upload-types.ts
var defaultRetryPolicy = {
  maxAttempts: 3,
  baseDelayMs: 1e3,
  maxDelayMs: 3e4,
  backoffMultiplier: 2,
  jitterEnabled: true
};
var defaultVideoQueueConfig = {
  maxConcurrent: 2,
  captureThumbnail: true,
  autoStart: false,
  maxQueueSize: 20,
  cleanupPolicy: {
    maxCompletedItems: 5,
    maxFailedItems: 3,
    autoCleanupAfterMs: 5 * 60 * 1e3
    // 5 minutes
  },
  priorityWeights: {
    urgent: 1e3,
    high: 100,
    normal: 10,
    low: 1
  },
  analytics: {
    enabled: true,
    sampleRate: 0.1
    // Track 10% of operations
  },
  retryPolicy: {
    maxAttempts: 3,
    baseDelayMs: 1e3,
    maxDelayMs: 3e4,
    backoffMultiplier: 2,
    jitterEnabled: true
  },
  progressTracking: {
    enableSpeedCalculation: true,
    speedSampleWindowMs: 5e3,
    enableTimeEstimation: true
  }
};
var isActiveUpload = (i) => i.status === "uploading" || i.status === "processing";
var isTerminalUpload = (i) => i.status === "done" || i.status === "error" || i.status === "canceled";

// src/utils/defaults.ts
var FISHING_TYPES = [
  { value: "lake", label: "Lake / Dam" },
  { value: "stream", label: "Stream" },
  { value: "inshore", label: "Inshore / Island" },
  { value: "offshore", label: "Offshore / Deepsea" },
  { value: "jungle", label: "Jungle / Waterfall" }
];
var TECHNIQUE_OPTIONS = [
  "Bottom",
  "Casting",
  "Deep Sea Fishing",
  "Drift Fishing",
  "Jigging",
  "Eging",
  "Fly Fishing",
  "Prawn Fishing",
  "Trolling",
  "Apollo"
];
var AMENITIES_OPTIONS = [
  "Live bait",
  "Lures",
  "Rod & reel",
  "Terminal tackle",
  "Snacks",
  "Drinks",
  "Meals",
  "Life jackets"
];
var BOAT_FEATURE_OPTIONS = [
  "GPS",
  "Fishfinder",
  "Toilet",
  "Ice box",
  "Trolling motor",
  "Sound system",
  "Thruster/Trolling motor",
  "Kitchen",
  "Dorm",
  "Rod holders",
  "Air conditioning"
];
var BOAT_TYPES = [
  "Joan Boat",
  "Pontoon",
  "Center Console",
  "Cabin Cruiser",
  "Longboat",
  "Catamaran",
  "Skiff",
  "Traditional Wooden",
  "Yacht",
  "Inflatable"
];
var TRIP_TYPE_OPTIONS = [
  { value: "Half-Day Trip", label: "Half-Day Trip" },
  { value: "Full Day Trip", label: "Full Day Trip" },
  { value: "Overnight Trip", label: "Overnight Trip" },
  { value: "Custom", label: "Custom" }
];

// src/utils/species.ts
var SPECIES_CATEGORIES = {
  SALTWATER: "saltwater",
  FRESHWATER: "freshwater",
  SQUID: "squid"
};
var SALTWATER_SPECIES = [
  {
    id: "cobia",
    english_name: "Cobia",
    local_name: "Aruan Tasik",
    image: "/images/species/saltwater/Aruan Tasik (Cobia).png"
  },
  {
    id: "golden-pomfret",
    english_name: "Golden Pomfret",
    local_name: "Bawal Emas",
    image: "/images/species/saltwater/Bawal Emas (Golden Pomfret).png"
  },
  {
    id: "black-pomfret",
    english_name: "Black Pomfret",
    local_name: "Bawal Hitam",
    image: "/images/species/saltwater/Bawal Hitam (Black Pomfret).png"
  },
  {
    id: "hardtail-scad",
    english_name: "Hardtail Scad",
    local_name: "Cencaru",
    image: "/images/species/saltwater/Cencaru (Hardtail Scad).png"
  },
  {
    id: "diamond-trevally",
    english_name: "Diamond Trevally",
    local_name: "Ebek",
    image: "/images/species/saltwater/Ebek (Diamond Trevally).png"
  },
  {
    id: "croaker",
    english_name: "Croaker",
    local_name: "Gelama",
    image: "/images/species/saltwater/Gelama (Croaker).png"
  },
  {
    id: "grunter",
    english_name: "Grunter",
    local_name: "Gerut",
    image: "/images/species/saltwater/Gerut (Grunter).png"
  },
  {
    id: "indian-trevally",
    english_name: "Indian Trevally",
    local_name: "Ikan Cermin",
    image: "/images/species/saltwater/Ikan Cermin (Indian Trevally).png"
  },
  {
    id: "marine-catfish",
    english_name: "Marine Catfish",
    local_name: "Ikan Duri",
    image: "/images/species/saltwater/Ikan Duri (Marine Catfish).png"
  },
  {
    id: "giant-trevally",
    english_name: "Giant Trevally",
    local_name: "Ikan GT",
    image: "/images/species/saltwater/Ikan GT (Giant Trevally).png"
  },
  {
    id: "red-snapper",
    english_name: "Red Snapper",
    local_name: "Ikan Merah",
    image: "/images/species/saltwater/Ikan Merah (Red Snapper).png"
  },
  {
    id: "golden-snapper",
    english_name: "Golden Snapper",
    local_name: "Jenahak",
    image: "/images/species/saltwater/Jenahak (Golden Snapper).png"
  },
  {
    id: "indian-mackerel",
    english_name: "Indian Mackerel",
    local_name: "Kembung",
    image: "/images/species/saltwater/Kembung (Indian Mackerel).png"
  },
  {
    id: "grouper",
    english_name: "Grouper",
    local_name: "Kerapu",
    image: "/images/species/saltwater/Kerapu (Grouper).png"
  },
  {
    id: "threadfin",
    english_name: "Threadfin",
    local_name: "Kurau",
    image: "/images/species/saltwater/Kurau (Threadfin).png"
  },
  {
    id: "sailfish",
    english_name: "Sailfish",
    local_name: "Layaran",
    image: "/images/species/saltwater/Layaran (Sailfish).png"
  },
  {
    id: "mahimahi",
    english_name: "Mahimahi",
    local_name: "Mahimahi",
    image: "/images/species/saltwater/Mahimahi.png"
  },
  {
    id: "daggertooth",
    english_name: "Daggertooth",
    local_name: "Malong",
    image: "/images/species/saltwater/Malong (Daggertooth).png"
  },
  {
    id: "marlin",
    english_name: "Marlin",
    local_name: "Mersuji",
    image: "/images/species/saltwater/Mersuji (Marlin).png"
  },
  {
    id: "rayfish",
    english_name: "Rayfish",
    local_name: "Pari",
    image: "/images/species/saltwater/Pari (Rayfish).png"
  },
  {
    id: "salmon",
    english_name: "Salmon",
    local_name: "Salmon",
    image: "/images/species/saltwater/Salmon.png"
  },
  {
    id: "yellowtail-scad",
    english_name: "Yellowtail Scad",
    local_name: "Selar",
    image: "/images/species/saltwater/Selar (Yellowtail Scad).png"
  },
  {
    id: "sardine",
    english_name: "Sardine",
    local_name: "Selayang",
    image: "/images/species/saltwater/Selayang (Sardine).png"
  },
  {
    id: "eeltail-catfish",
    english_name: "Eeltail Catfish",
    local_name: "Semilang",
    image: "/images/species/saltwater/Semilang (Eeltail Catfish).png"
  },
  {
    id: "fourfinger-threadfin",
    english_name: "Fourfinger Threadfin",
    local_name: "Senangin",
    image: "/images/species/saltwater/Senangin (Fourfinger Threadfin).png"
  },
  {
    id: "barramundi",
    english_name: "Barramundi",
    local_name: "Siakap",
    image: "/images/species/saltwater/Siakap (Barramundi).png"
  },
  {
    id: "mangrove-jack",
    english_name: "Mangrove Jack",
    local_name: "Siakap Merah",
    image: "/images/species/saltwater/Siakap Merah (Mangrove Jack).png"
  },
  {
    id: "queenfish",
    english_name: "Queenfish",
    local_name: "Talang",
    image: "/images/species/saltwater/Talang (Queenfish).png"
  },
  {
    id: "anchovy",
    english_name: "Anchovy",
    local_name: "Tamban",
    image: "/images/species/saltwater/Tamban (Anchovy).png"
  },
  {
    id: "russells-snapper",
    english_name: "Russell's Snapper",
    local_name: "Tanda",
    image: "/images/species/saltwater/Tanda (Russell\u2019s Snapper).png"
  },
  {
    id: "sweetlip-emperor",
    english_name: "Sweetlip Emperor",
    local_name: "Tebal Sisik",
    image: "/images/species/saltwater/Tebal Sisik (Sweetlip Emperor).png"
  },
  {
    id: "spanish-mackerel",
    english_name: "Spanish Mackerel",
    local_name: "Tenggiri",
    image: "/images/species/saltwater/Tenggiri (Spanish Mackerel).png"
  },
  {
    id: "needlefish",
    english_name: "Needlefish",
    local_name: "Todak",
    image: "/images/species/saltwater/Todak (Needlefish).png"
  },
  {
    id: "mackerel-tuna",
    english_name: "Mackerel Tuna",
    local_name: "Tongkol",
    image: "/images/species/saltwater/Tongkol (Mackerel Tuna).png"
  },
  {
    id: "tuna",
    english_name: "Tuna",
    local_name: "Tuna",
    image: "/images/species/saltwater/Tuna.png"
  },
  {
    id: "shark",
    english_name: "Shark",
    local_name: "Yu",
    image: "/images/species/saltwater/Yu (Shark).png"
  }
].map((s) => ({ ...s, category: SPECIES_CATEGORIES.SALTWATER }));
var FRESH_WATER_SPECIES = [
  {
    id: "aligator-gar",
    english_name: "Aligator Gar",
    local_name: "Ikan Buaya",
    image: "/images/species/freshwater/1. Alligator Gar.png"
  },
  {
    id: "giant-snakehead",
    english_name: "Giant Snakehead",
    local_name: "Toman",
    image: "/images/species/freshwater/2. Giant Snakehead.png"
  },
  {
    id: "channa-striata",
    english_name: "Channa Striata",
    local_name: "Haruan",
    image: "/images/species/freshwater/3. Channa Striata.png"
  },
  {
    id: "climbing-perch",
    english_name: "Climbing Perch",
    local_name: "Puyu",
    image: "/images/species/freshwater/4. Climbing Perch.png"
  },
  {
    id: "giant-freshwater-prawn",
    english_name: "Giant Freshwater Prawn",
    local_name: "Udang Galah",
    image: "/images/species/freshwater/5. Giant Freshwater Prawn.png"
  },
  {
    id: "peacock-bass",
    english_name: "Peacock Bass",
    local_name: "Ikan Raja",
    image: "/images/species/freshwater/6. Peacock Bass.png"
  },
  {
    id: "arapaimas",
    english_name: "Arapaimas",
    local_name: "Arapaima",
    image: "/images/species/freshwater/7. Arapaima.png"
  },
  {
    id: "channa-maru",
    english_name: "Channa Maru",
    local_name: "Kerandang",
    image: "/images/species/freshwater/8. Channa Maru.png"
  },
  {
    id: "temensis",
    english_name: "Temensis",
    local_name: "Ikan Temensis",
    image: "/images/species/freshwater/9. Temensis.png"
  },
  {
    id: "mayan-cichlid",
    english_name: "Mayan Cichlid",
    local_name: "Ikan Mayan",
    image: "/images/species/freshwater/10. Mayan Cichlids.png"
  },
  {
    id: "gourami",
    english_name: "Gourami",
    local_name: "Kaloi",
    image: "/images/species/freshwater/11. Gourami Kaloi.png"
  },
  {
    id: "tinfoil-barb",
    english_name: "Tinfoil Barb",
    local_name: "Lampam",
    image: "/images/species/freshwater/12. Tinfoil Barb Lampam.png"
  },
  {
    id: "hampala",
    english_name: "Hampala",
    local_name: "Sebarau",
    image: "/images/species/freshwater/13. Hampala Sebarau.png"
  },
  {
    id: "sharkcatfish",
    english_name: "Sharkcatfish",
    local_name: "Patin",
    image: "/images/species/freshwater/14. Patin Sharkcatfish.png"
  },
  {
    id: "chao-praya-catfish",
    english_name: "Chao Praya Catfish",
    local_name: "Chao Phraya",
    image: "/images/species/freshwater/15. Chao Phraya.png"
  },
  {
    id: "mekong-giant-catfish",
    english_name: "Mekong Giant Catfish",
    local_name: "Mekong",
    image: "/images/species/freshwater/16. Mekong Giant Catfish.png"
  },
  {
    id: "redtail-catfish",
    english_name: "Redtail Catfish",
    local_name: "Baung Ekor Merah",
    image: "/images/species/freshwater/17. Redtail Catfish.png"
  },
  {
    id: "jaguar-cichlid",
    english_name: "Jaguar Cichlid",
    local_name: "Jaguar",
    image: "/images/species/freshwater/18. Jaguar Cichlid.png"
  },
  {
    id: "mahseer",
    english_name: "Mahseer",
    local_name: "Tengas",
    image: "/images/species/freshwater/19. Tengas Mahseer.png"
  },
  {
    id: "putitor-mahseer",
    english_name: "Putitor Mahseer",
    local_name: "Kelah",
    image: "/images/species/freshwater/20. Kelah Putitor Mahseer.png"
  },
  {
    id: "rohu",
    english_name: "Rohu",
    local_name: "Rohu",
    image: "/images/species/freshwater/21. Rohu.png"
  },
  {
    id: "catfish",
    english_name: "Catfish",
    local_name: "Keli",
    image: "/images/species/freshwater/22. Keli Catfish.png"
  },
  {
    id: "blue-tilapia",
    english_name: "Blue Tilapia",
    local_name: "Tilapia",
    image: "/images/species/freshwater/23. Blue Tilapia.png"
  },
  {
    id: "red-tilapia",
    english_name: "Red Tilapia",
    local_name: "Tilapia",
    image: "/images/species/freshwater/24. Red Tilapia.png"
  },
  {
    id: "arowana",
    english_name: "Arowana",
    local_name: "Arowana",
    image: "/images/species/freshwater/25. Arowana.png"
  },
  {
    id: "pacu",
    english_name: "Pacu",
    local_name: "Pacu",
    image: "/images/species/freshwater/26. Pacu.png"
  },
  {
    id: "hemibagrus",
    english_name: "Hemibagrus",
    local_name: "Baung",
    image: "/images/species/freshwater/27. Baung Hemibagrus.png"
  },
  {
    id: "forest-channa",
    english_name: "Forest Channa",
    local_name: "Bujuk",
    image: "/images/species/freshwater/28. Bujuk Forest Channa.png"
  },
  {
    id: "tengalan",
    english_name: "Tengalan",
    local_name: "Tengalan",
    image: "/images/species/freshwater/29. Tengalan.png"
  },
  {
    id: "jelawat",
    english_name: "Jelawat",
    local_name: "Jelawat",
    image: "/images/species/freshwater/30. Jelawat.png"
  },
  {
    id: "wallago-attu",
    english_name: "Wallago Attu",
    local_name: "Tapah",
    image: "/images/species/freshwater/31. Tapah Wallago Attu.png"
  },
  {
    id: "knifefish",
    english_name: "Knifefish",
    local_name: "Belida",
    image: "/images/species/freshwater/32. Belida Knifefish.png"
  },
  {
    id: "bighead-carp",
    english_name: "Bighead Carp",
    local_name: "Tongsan",
    image: "/images/species/freshwater/33. Tongsan Bighead Carp.png"
  },
  {
    id: "sucker-barb",
    english_name: "Sucker Barb",
    local_name: "Bentulu",
    image: "/images/species/freshwater/Bentulu - Sucker Barb.png"
  },
  {
    id: "mystacoleus",
    english_name: "Mystacoleus",
    local_name: "Ikan Masai",
    image: "/images/species/freshwater/Ikan Masai -  Mystacoleucus marginatus.png"
  },
  {
    id: "king-of-terbul",
    english_name: "King of Terbul",
    local_name: "Kelabau",
    image: "/images/species/freshwater/Kelabau - King of Terbul.png"
  },
  {
    id: "goonch-catfish",
    english_name: "Goonch Catfish",
    local_name: "Kenerak",
    image: "/images/species/freshwater/Kenerak - Goonch Catfish.png"
  },
  {
    id: "freshwater-dorab",
    english_name: "Freshwater Dorab",
    local_name: "Parang Sungai",
    image: "/images/species/freshwater/Parang Sungai - Fresh Water Dorab.png"
  },
  {
    id: "malayan-trout",
    english_name: "Malayan Trout",
    local_name: "Sikang",
    image: "/images/species/freshwater/Sikang - Malayan Trout.png"
  },
  {
    id: "temelian",
    english_name: "Temelian",
    local_name: "Temoleh",
    image: "/images/species/freshwater/Temoleh - Temelian.png"
  },
  {
    id: "beardless-barb",
    english_name: "Beardless Barb",
    local_name: "Temperas",
    image: "/images/species/freshwater/Temperas - Beardless Barb.png"
  }
].map((s) => ({ ...s, category: SPECIES_CATEGORIES.FRESHWATER }));
var SQUID_SPECIES = [
  {
    id: "octopus",
    english_name: "Octopus",
    local_name: "Kurita",
    image: "/images/species/squid/Kurita (Octopus).png"
  },
  {
    id: "bigfin-reef-squid",
    english_name: "Bigfin Reef Squid",
    local_name: "Mabang",
    image: "/images/species/squid/Mabang (Bigfin Reef Squid).png"
  },
  {
    id: "needle-squid",
    english_name: "Needle Squid",
    local_name: "Sotong Jarum",
    image: "/images/species/squid/Sotong Jarum (NeedleSquid).png"
  },
  {
    id: "cuttlefish",
    english_name: "Cuttlefish",
    local_name: "Sotong Katak",
    image: "/images/species/squid/Sotong Katak (Cuttlefish).png"
  },
  {
    id: "squid",
    english_name: "Squid",
    local_name: "Sotong Ketupat",
    image: "/images/species/squid/Sotong Ketupat (Squid).png"
  },
  {
    id: "squid2",
    english_name: "Squid",
    local_name: "Sotong Torak",
    image: "/images/species/squid/Sotong Torak (Squid).png"
  }
].map((s) => ({ ...s, category: SPECIES_CATEGORIES.SQUID }));
var ALL_SPECIES = [
  ...SALTWATER_SPECIES,
  ...FRESH_WATER_SPECIES,
  ...SQUID_SPECIES
];
var SPECIES_BY_ID = ALL_SPECIES.reduce(
  (acc, item) => {
    acc[item.id] = item;
    return acc;
  },
  {}
);
var SPECIES_BY_CATEGORY = {
  [SPECIES_CATEGORIES.SALTWATER]: SALTWATER_SPECIES,
  [SPECIES_CATEGORIES.FRESHWATER]: FRESH_WATER_SPECIES,
  [SPECIES_CATEGORIES.SQUID]: SQUID_SPECIES
};
export {
  ALL_SPECIES,
  AMENITIES_OPTIONS,
  BOAT_FEATURE_OPTIONS,
  BOAT_TYPES,
  CharterUpdateSchema,
  CreateUploadSchema,
  DraftPatchSchema,
  FISHING_TYPES,
  FinalizeMediaSchema,
  FinishFormSchema,
  IncomingMediaSchema,
  ListQuerySchema,
  MediaFileSchema,
  MediaRemovalSchema,
  ProcessStatusEnum,
  SPECIES_BY_CATEGORY,
  SPECIES_BY_ID,
  SPECIES_CATEGORIES,
  TECHNIQUE_OPTIONS,
  TRIP_TYPE_OPTIONS,
  TranscodePayloadSchema,
  VideoThumbnailSchema,
  basicsStepSchema,
  charterFormSchema,
  defaultRetryPolicy,
  defaultVideoQueueConfig,
  descriptionStepSchema,
  experienceStepSchema,
  isActiveUpload,
  isTerminalUpload,
  mediaPricingStepSchema,
  normalizeFinalizeMedia,
  policiesSchema,
  tripSchema,
  tripsStepSchema,
  validateThumbFile
};
//# sourceMappingURL=index.mjs.map