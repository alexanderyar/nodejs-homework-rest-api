const express = require("express");

const router = express.Router();

const contactsCTRL = require("../../controllers/contacts");

const { authenticate, isValidIdMiddleware } = require("../../helpers/");

router.get("/", authenticate, contactsCTRL.getAllContacts);

router.get(
  "/:contactId",
  isValidIdMiddleware,
  authenticate,
  contactsCTRL.getById
);

router.post("/", authenticate, contactsCTRL.addContact);

router.delete(
  "/:contactId",
  isValidIdMiddleware,
  authenticate,
  contactsCTRL.deleteContact
);

router.put(
  "/:contactId",
  isValidIdMiddleware,
  authenticate,
  contactsCTRL.contactUpdateInfo
);

router.patch(
  "/:contactId/favorite",
  isValidIdMiddleware,
  authenticate,
  contactsCTRL.contactUpdateFavorite
);

module.exports = router;
