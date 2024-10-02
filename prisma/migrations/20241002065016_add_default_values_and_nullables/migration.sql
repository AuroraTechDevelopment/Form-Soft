-- AlterEnum
ALTER TYPE "UserStatus" ADD VALUE 'INCOMPLETE';

-- AlterTable
ALTER TABLE "Feedback" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Form" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Report" ALTER COLUMN "createAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Submission" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "profilePicture" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'UNVERIFIED',
ALTER COLUMN "role" SET DEFAULT 'USER',
ALTER COLUMN "preferences" DROP NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "lastLogin" SET DEFAULT CURRENT_TIMESTAMP;
