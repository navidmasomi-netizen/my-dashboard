const prisma = require("../lib/prisma");

const getAll = async (req, res) => {
  const commissions = await prisma.commission.findMany({
    include: { partner: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(commissions);
};

const create = async (req, res) => {
  const { partnerId, amount, type } = req.body;
  const commission = await prisma.commission.create({
    data: { partnerId: Number(partnerId), amount: Number(amount), type },
  });
  res.status(201).json(commission);
};

const markPaid = async (req, res) => {
  const commission = await prisma.commission.update({
    where: { id: Number(req.params.id) },
    data: { paidAt: new Date() },
  });
  res.json(commission);
};

module.exports = { getAll, create, markPaid };
