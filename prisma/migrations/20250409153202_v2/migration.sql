/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - The `language` column on the `UserPreferences` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `themePreference` column on the `UserPreferences` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `editorTheme` column on the `UserPreferences` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `defaultCodeLanguage` column on the `UserPreferences` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `defaultSnippetVisibility` column on the `UserPreferences` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Language" AS ENUM ('en', 'es', 'fr', 'de', 'pt', 'ja', 'zh');

-- CreateEnum
CREATE TYPE "ThemePreference" AS ENUM ('light', 'dark', 'system');

-- CreateEnum
CREATE TYPE "CodeLanguage" AS ENUM ('javascript', 'typescript', 'python', 'go', 'rust', 'html', 'css', 'cpp', 'java', 'sql', 'json', 'markdown');

-- CreateEnum
CREATE TYPE "EditorTheme" AS ENUM ('dracula', 'monokai', 'solarized_light', 'solarized_dark', 'github_light', 'github_dark', 'nord', 'night_owl', 'catppuccin_latte', 'catppuccin_frappe', 'catppuccin_macchiato', 'catppuccin_mocha');

-- CreateEnum
CREATE TYPE "SnippetVisibility" AS ENUM ('public', 'private');

-- DropIndex
DROP INDEX "Session_sessionToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "username" TEXT;

-- AlterTable
ALTER TABLE "UserPreferences" DROP COLUMN "language",
ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'en',
DROP COLUMN "themePreference",
ADD COLUMN     "themePreference" "ThemePreference" NOT NULL DEFAULT 'system',
DROP COLUMN "editorTheme",
ADD COLUMN     "editorTheme" "EditorTheme" NOT NULL DEFAULT 'catppuccin_latte',
DROP COLUMN "defaultCodeLanguage",
ADD COLUMN     "defaultCodeLanguage" "CodeLanguage" NOT NULL DEFAULT 'typescript',
DROP COLUMN "defaultSnippetVisibility",
ADD COLUMN     "defaultSnippetVisibility" "SnippetVisibility" NOT NULL DEFAULT 'public';
