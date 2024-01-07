import * as z from "zod";

const optionsSchema = z.object({
  path: z
    .string()
    .min(3, { message: "path must be at least 3 characters long" }),
  type: z.enum(["pdf", "text", "json", "csv", "url"]).default("text"),
  save: z.boolean().default(false),
  verbose: z.boolean().default(false),
  location: z
    .string()
    .min(3, { message: "location must be at least 3 characters long" })
    .optional(),
  name: z
    .string()
    .min(3, { message: "name must be at least 3 characters long" })
    .optional()
});

export default optionsSchema;
