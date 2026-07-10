import { Prisma } from "../../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { EmbeddingService } from "./embedding.service";

const toVectorLiteral = (vector: number[]) => `[${vector.join(",")}]`;

export class IndexingService {
    private embeddingService: EmbeddingService;

    constructor() {
        this.embeddingService = new EmbeddingService();
    }

    async indexDocument(
        chunkKey: string,
        sourceType: string,
        sourceId: string,
        content: string,
        sourceLabel?: string,
        metadata?: Record<string, unknown>,
    ) {
        try {
            const embedding = await this.embeddingService.generateEmbedding(content);
            const vectorLiteral = toVectorLiteral(embedding);

            await prisma.$executeRaw(Prisma.sql`
        INSERT INTO "document_embeddings"
        (
            "id",
          "chunkKey",
          "sourceType",
          "sourceId",
          "sourceLabel",
          "content",
          "metadata",
          "embedding",
          "updatedAt"
        )
        VALUES
        (
            ${Prisma.raw("gen_random_uuid()")},
            ${chunkKey},
          ${sourceType},
          ${sourceId},
          ${sourceLabel || null},
          ${content},
          ${JSON.stringify(metadata || {})} :: jsonb,
          CAST(${vectorLiteral} AS vector),
          NOW()
        )
        ON CONFLICT ("chunkKey")
        DO UPDATE SET
            "sourceType" = EXCLUDED."sourceType",
          "sourceId" = EXCLUDED."sourceId",
          "sourceLabel" = EXCLUDED."sourceLabel",
          "content" = EXCLUDED."content",
          "metadata" = EXCLUDED."metadata",
          "embedding" = EXCLUDED."embedding",
          "isDeleted" = false,
          "deletedAt" = null,
          "updatedAt" = NOW()
        `);


        } catch (error) {
            console.log(error);
            throw(error);
        }
    }

    async indexMealsData() {
        try {
            console.log("fetching meal data for indexing......");

            const meals = await prisma.meal.findMany({
                where: { isAvailable: true },
                include: {
                    category: true,
                    provider: {
                        include: {
                            user: true
                        }
                    },
                    reviews: {
                        include: {
                            customer: true,
                        }
                    }
                }
            });

            let indexedCount = 0;
            for (const meal of meals) {
                // format category
                const category = meal.category.name;


                // format reviews
                const reviewsText = meal.reviews
                    .map(
                        (r) =>
                            `- Rating: ${r.rating}/5 . Comment: ${r.comment || "No comment"}`
                    )
                    .join("\n");

                const content = `
                            Meal Name: ${meal.name}
                            Category: ${category}
                            Restaurant: ${meal.provider.restaurantName}
                            Price: ${meal.price} BDT

                            Description:
                            ${meal.description || "No description"}

                            Customer Reviews:
                            ${reviewsText || "No reviews"}
                            `;
                const metadata = {
                    mealId: meal.id,
                    mealName: meal.name,
                    category: meal.category.name,
                    restaurant: meal.provider.restaurantName,
                    providerId: meal.provider.id,
                    price: meal.price,
                    isAvailable: meal.isAvailable,
                    averageRating:
                        meal.reviews.length > 0
                            ? (
                                meal.reviews.reduce((sum, review) => sum + review.rating, 0) /
                                meal.reviews.length
                            ).toFixed(1)
                            : null,
                    totalReviews: meal.reviews.length,
                };

                const chunkKey = `meal-${meal.id}`;

                await this.indexDocument(
                    chunkKey,
                    "MEAL",
                    meal.id,
                    content,
                    meal.name,
                    metadata
                );

                indexedCount++;
            };

            console.log(`Successfully Indexed ${indexedCount} meals.`);

            return {
                success: true,
                message: `Successfully Indexed ${indexedCount} meals.`,
                indexedCount,
            }
        } catch (error) {
            console.log(error);
            throw(error);
        }
    }
}

