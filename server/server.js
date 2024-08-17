const dotenv = require('dotenv');
const app = require('./index')

dotenv.config();


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));