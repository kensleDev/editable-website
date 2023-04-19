-- CreateTable
CREATE TABLE "Article" (
    "article_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "teaser" TEXT NOT NULL,
    "content" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "published_at" TIMESTAMP(3),
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "Article_pkey" PRIMARY KEY ("article_id")
);

-- CreateTable
CREATE TABLE "Session" (
    "session_id" TEXT NOT NULL DEFAULT gen_random_uuid(),
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("session_id")
);

-- CreateTable
CREATE TABLE "Page" (
    "page_id" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("page_id")
);

-- CreateTable
CREATE TABLE "Counter" (
    "counter_id" TEXT NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "Counter_pkey" PRIMARY KEY ("counter_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Article_slug_key" ON "Article"("slug");
