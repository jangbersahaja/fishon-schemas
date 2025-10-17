// src/charter.ts
import { z } from "zod";
var isClient = typeof window !== "undefined";
var fileSchema = z.any().refine((file) => !isClient || file instanceof File, "Upload a valid file");
var tripSchema = z.object({
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
  pickup: true
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
  trips: z2.array(
    z2.object({
      id: z2.string().nullable().optional(),
      name: z2.string().optional(),
      tripType: z2.string().optional(),
      price: z2.number().nullable().optional(),
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
    videos: z4.array(MediaFileSchema).max(5),
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
    ).max(5),
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
export {
  CharterUpdateSchema,
  CreateUploadSchema,
  DraftPatchSchema,
  FinalizeMediaSchema,
  FinishFormSchema,
  IncomingMediaSchema,
  ListQuerySchema,
  MediaFileSchema,
  MediaRemovalSchema,
  ProcessStatusEnum,
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