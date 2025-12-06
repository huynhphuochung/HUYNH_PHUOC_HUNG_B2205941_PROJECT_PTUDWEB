const express = require("express");
const router = express.Router();
const BorrowController = require("../controllers/borrow.controller");

let controller;

async function initRouter() {
  // MongoDB phải đã connect trước
  controller = new BorrowController();

  router.post("/", (req, res) => controller.create(req, res));
  router.get("/", (req, res) => controller.getAll(req, res));
  router.put("/approve/:id", (req, res) => controller.approve(req, res));
  router.put("/reject/:id", (req, res) => controller.reject(req, res));
router.put("/confirm-return/:id", (req, res) =>
  controller.confirmReturn(req, res)
);

  return router;
}
module.exports = initRouter;
