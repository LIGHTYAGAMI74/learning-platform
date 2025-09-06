import { integer, pgTable, varchar, boolean, json } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  subscriptionId: varchar({ length: 255 }),
});


export const coursesTable = pgTable("courses", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  title: varchar({ length: 255 }).notNull(),
  description: varchar({ length: 1000 }).notNull(),
  noOfChapters: integer().notNull().default(1),
  includePrerequisites: boolean().notNull().default(false),
  difficultyLevel: varchar({ length: 255 }).notNull(),
  category: varchar({ length: 255 }).notNull(),
  courseJson: json(),
  userId: integer().references(() => usersTable.id).notNull(),
});