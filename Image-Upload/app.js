const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const indexRouter = require('./routes/Index');

app.use(express.static('public')); // Serve static files from the 'public' directory
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
