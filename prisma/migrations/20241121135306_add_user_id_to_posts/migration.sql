-- Add the userId column with a default value
ALTER TABLE "Post" ADD COLUMN "userId" INT DEFAULT 0;  -- Or any valid User ID

-- Make the column NOT NULL
ALTER TABLE "Post" ALTER COLUMN "userId" SET NOT NULL;

-- Add the foreign key constraint
ALTER TABLE "Post" ADD CONSTRAINT "Post_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
