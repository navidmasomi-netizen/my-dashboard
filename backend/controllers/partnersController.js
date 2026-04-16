const prisma = require("../lib/prisma");

const getAll = async (req, res) => {
  const partners = await prisma.partner.findMany({ orderBy: { createdAt: "desc" } });
  res.json(partners);
};

const getOne = async (req, res) => {
  const partner = await prisma.partner.findUnique({ where: { id: Number(req.params.id) } });
  if (!partner) return res.status(404).json({ error: "Partner not found" });
  res.json(partner);
};

const create = async (req, res) => {
  const { name, email, country } = req.body;
  const partner = await prisma.partner.create({ data: { name, email, country } });
  res.status(201).json(partner);
};

const update = async (req, res) => {
  const partner = await prisma.partner.update({
    where: { id: Number(req.params.id) },
    data: req.body,
  });
  res.json(partner);
};

const remove = async (req, res) => {
  await prisma.partner.delete({ where: { id: Number(req.params.id) } });
  res.status(204).send();
};

module.exports = { getAll, getOne, create, update, remove };
