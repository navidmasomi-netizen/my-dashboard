const router = require("express").Router();
const c = require("../controllers/commissionsController");

router.get("/", c.getAll);
router.post("/", c.create);
router.patch("/:id/pay", c.markPaid);

module.exports = router;
