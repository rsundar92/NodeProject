//@desc Get all contacts
//@route GET /api/contacts
//@access public

const expressAsyncHandler = require ("express-async-handler");
const Contact = require('../models/contactModel');

const getContacts =  expressAsyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

const getContact =  expressAsyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error('contact not found')
    }
    res.status(200).json(contact);
});

const createContact =  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const {email, name, phone} = req.body;
    if (!email) {
        res.status(400);
        throw new Error('All fields are mandatory');
    }
    const contact = await Contact.create({name, email, phone});

    res.status(201).json(contact);
})

const updateContact =  expressAsyncHandler(async(req, res) => {
    console.log(req.params.id);
    res.status(200).json({message :"update contact"});
}) 

const deleteContact = expressAsyncHandler(async (req, res) => {
    console.log(req.params.id);
    res.status(200).json({message :"delete contact"});
}) 

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact
}