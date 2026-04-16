const prisma = require("../lib/prisma");

const getAll = async (req, res) => {
  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: "desc" },
    });
    return res.status(200).json({
      success: true,
      data: leads,
      message: "Leads retrieved successfully",
    });
  } catch (err) {
    console.error("leads.getAll error:", err);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Database error, please try again",
    });
  }
};

const create = async (req, res) => {
  const { name, email, country, status, assignedTo } = req.body;

  if (!name) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Field name is required",
    });
  }
  if (!email) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Field email is required",
    });
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        email,
        country: country ?? null,
        status: status ?? "New",
        assignedTo: assignedTo ?? null,
      },
    });
    return res.status(201).json({
      success: true,
      data: lead,
      message: "Lead created successfully",
    });
  } catch (err) {
    console.error("leads.create error:", err);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Database error, please try again",
    });
  }
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const { name, email, country, status, assignedTo } = req.body;

  try {
    const lead = await prisma.lead.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email }),
        ...(country !== undefined && { country }),
        ...(status !== undefined && { status }),
        ...(assignedTo !== undefined && { assignedTo }),
      },
    });
    return res.status(200).json({
      success: true,
      data: lead,
      message: "Lead updated successfully",
    });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Record not found",
      });
    }
    console.error("leads.update error:", err);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Database error, please try again",
    });
  }
};

const remove = async (req, res) => {
  const id = Number(req.params.id);

  try {
    await prisma.lead.delete({ where: { id } });
    return res.status(200).json({
      success: true,
      data: null,
      message: "Lead deleted successfully",
    });
  } catch (err) {
    if (err.code === "P2025") {
      return res.status(404).json({
        success: false,
        data: null,
        message: "Record not found",
      });
    }
    console.error("leads.remove error:", err);
    return res.status(500).json({
      success: false,
      data: null,
      message: "Database error, please try again",
    });
  }
};

module.exports = { getAll, create, update, remove };
