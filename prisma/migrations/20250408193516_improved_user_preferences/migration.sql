-- AlterTable
ALTER TABLE "UserPreferences" ADD COLUMN     "autosave" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "defaultCodeLanguage" TEXT NOT NULL DEFAULT 'typescript',
ADD COLUMN     "defaultSnippetVisibility" TEXT NOT NULL DEFAULT 'public',
ADD COLUMN     "editorFontSize" INTEGER NOT NULL DEFAULT 13,
ADD COLUMN     "editorTheme" TEXT NOT NULL DEFAULT 'default',
ADD COLUMN     "keyboardShortcuts" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lineNumbers" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "showWelcomeTips" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "themePreference" TEXT NOT NULL DEFAULT 'system';
