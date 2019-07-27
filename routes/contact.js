const router = require("express").Router();
const Contact = require("../model/Contact");
const { contactValidation } = require("../validation");

//create contact
router.post("/", async (req, res) => {
  const { error } = contactValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //create contact
  const contact = new Contact({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  });

  try {
    const savedContact = await contact.save();
    res.status(201).send(savedContact);
  } catch (error) {
    res.status(400).send(error);
  }
});

//get contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find({ isBlocked: false });
    res.status(200).json({ contacts });
  } catch (error) {
    res.status(400).json(`${error}`);
  }
});

//get single contact
router.get("/:contactId", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    res.status(200).json({ contact });
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
});

router.delete("/:contactId", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.contactId);
    res
      .status(200)
      .json(
        `Contact with the id of ${
          req.params.contactId
        } has been deleted successfuly`
      );
  } catch (error) {
    res.status(400).json(`Error: ${error}`);
  }
});

router.put("/:contactId", async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      {
        new: true
      }
    );
    res.status(200).json({ data: { contact } });
  } catch (error) {
    res.status(404).json(`Error: ${error}`);
  }
});

router.post("/block/:contactId", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    contact.isBlocked = true;
    res
      .status(200)
      .json({
        message: `contact with the id of ${
          req.params.contactId
        } blocked successfully`,
        contact
      });
  } catch (error) {
    res.status(404).json(`Error: ${error}`);
  }
});

module.exports = router;
