import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
    const products = await prisma.product.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: "desc" },
    });

    return res.json(products);
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
