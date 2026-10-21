const validateTask = (req, res, next) => {
    const { title, description } = req.body;

    if (!title || !title.trim()) {
        return res.status(400).json({
            error: "Title is required"
        });
    }

    if (!description || !description.trim()) {
        return res.status(400).json({
            error: "Description is required"
        });
    }

    req.body.title = title.trim();
    req.body.description = description.trim();

    next();
};

module.exports = validateTask;