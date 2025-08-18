const Address = require('../models/address.model');



const createAddress = async (req, res) => {
    try {
        const { street, city, postalCode, country, phone } = req.body;
        const userId = req.user._id;
        const address = await Address.create({
            user: userId,
            street,
            city,
            postalCode,
            country,
            phone,
        });

        res.status(201).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAddresses = async (req, res) => {
    try {
        const userId = req.user._id;
        const addresses = await Address.find({ user: userId });
        res.status(200).json(addresses);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



const getAddressById = async (req, res) => {
    try {
        const address = await Address.findOne({ _id: req.params.id, user: req.user._id });

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        res.status(200).json(address);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};



const updateAddress = async (req, res) => {
    try {
        const address = await Address.findOne({ _id: req.params.id, user: req.user._id });

        if (!address) {
            return res.status(404).json({ message: 'Address not found' });
        }

        const updated = await Address.findByIdAndUpdate(
            req.params.id,
            { ...req.body },
            { new: true, runValidators: true }
        );

        res.status(200).json(updated);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteAddress = async (req, res) => {
    try {
        const address = await Address.findOneAndDelete({ _id: req.params.id, user: req.user._id });

        if (!address) {
            return res.status(404).json({ message: 'Address not found or not authorized' });
        }

        res.status(200).json({ message: 'Address deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { createAddress, getAddresses, getAddressById, updateAddress, deleteAddress };
