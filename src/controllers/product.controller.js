import prisma from "../lib/prisma.js";

export const create = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: { ...req.body, userId: req.user.id },
    });

    return res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

export const getAll = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;
    const search = req.query.search?.trim() || "";

    const where = {
      userId: req.user.id,
      ...(search && {
        OR: [
          { name: { contains: search } },
          { description: { contains: search } },
        ],
      }),
    };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    return res.json({
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findFirst({
      where: { id: Number(id), userId: req.user.id },
    });

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    return res.json(product);
  } catch (error) {
    next(error);
  }
};

export const update = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findFirst({
      where: { id: Number(id), userId: req.user.id },
    });

    if (!existing) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: req.body,
    });

    return res.json(product);
  } catch (error) {
    next(error);
  }
};

export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;

    const existing = await prisma.product.findFirst({
      where: { id: Number(id), userId: req.user.id },
    });

    if (!existing) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }

    await prisma.product.delete({ where: { id: Number(id) } });

    return res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    next(error);
  }
};
