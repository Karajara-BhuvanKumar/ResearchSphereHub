import { Prisma } from "@prisma/client";
import prisma from "../lib/prisma.js";
import { notFoundError } from "../utils/errors.js";

export interface CreateResearchPaperInput {
  title: string;
  authors: string[];
  type: "PAPER" | "JOURNAL" | "CONFERENCE";
  content: string;
  source: string;
  publishDate?: Date;
  tags?: string[];
}

export interface UpdateResearchPaperInput {
  title?: string;
  authors?: string[];
  content?: string;
  source?: string;
  publishDate?: Date;
  tags?: string[];
}

export interface SearchFilters {
  type?: "PAPER" | "JOURNAL" | "CONFERENCE";
  tags?: string[];
  search?: string;
  limit?: number;
  offset?: number;
}

/**
 * Research Paper Service - handles research paper operations
 */
export class ResearchService {
  /**
   * Create a new research paper (uploaded by user)
   */
  static async createResearchPaper(userId: string, data: CreateResearchPaperInput) {
    const paper = await prisma.researchPaper.create({
      data: {
        ...data,
        tags: data.tags || [],
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    return paper;
  }

  /**
   * Get a single research paper by ID
   */
  static async getResearchPaperById(paperId: string) {
    const paper = await prisma.researchPaper.findUnique({
      where: { id: paperId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        bookmarks: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!paper) {
      throw notFoundError("Research paper not found");
    }

    return paper;
  }

  /**
   * Search and filter research papers
   */
  static async searchResearchPapers(filters: SearchFilters) {
    const { type, tags, search, limit = 10, offset = 0 } = filters;

    const where: Prisma.ResearchPaperWhereInput = {};

    // Filter by type
    if (type) {
      where.type = type;
    }

    // Filter by tags (any tag match)
    if (tags && tags.length > 0) {
      where.tags = {
        hasSome: tags,
      };
    }

    // Search by title and content
    if (search) {
      where.OR = [
        { title: { contains: search, mode: "insensitive" } },
        { content: { contains: search, mode: "insensitive" } },
        { authors: { hasSome: [search] } },
      ];
    }

    const [papers, total] = await Promise.all([
      prisma.researchPaper.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
            },
          },
          bookmarks: {
            select: {
              userId: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip: offset,
      }),
      prisma.researchPaper.count({ where }),
    ]);

    return {
      data: papers,
      total,
      limit,
      offset,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Get user's research papers
   */
  static async getUserResearchPapers(
    userId: string,
    limit: number = 10,
    offset: number = 0
  ) {
    const [papers, total] = await Promise.all([
      prisma.researchPaper.findMany({
        where: { userId },
        include: {
          bookmarks: {
            select: {
              userId: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        take: limit,
        skip: offset,
      }),
      prisma.researchPaper.count({ where: { userId } }),
    ]);

    return {
      data: papers,
      total,
      limit,
      offset,
      pages: Math.ceil(total / limit),
    };
  }

  /**
   * Update a research paper
   */
  static async updateResearchPaper(
    paperId: string,
    userId: string,
    data: UpdateResearchPaperInput
  ) {
    // Check if paper exists and belongs to user
    const paper = await prisma.researchPaper.findFirst({
      where: {
        id: paperId,
        userId,
      },
    });

    if (!paper) {
      throw notFoundError("Research paper not found");
    }

    const updatedPaper = await prisma.researchPaper.update({
      where: { id: paperId },
      data,
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return updatedPaper;
  }

  /**
   * Delete a research paper
   */
  static async deleteResearchPaper(paperId: string, userId: string) {
    // Check if paper exists and belongs to user
    const paper = await prisma.researchPaper.findFirst({
      where: {
        id: paperId,
        userId,
      },
    });

    if (!paper) {
      throw notFoundError("Research paper not found");
    }

    await prisma.researchPaper.delete({
      where: { id: paperId },
    });

    return { message: "Research paper deleted successfully" };
  }
}
