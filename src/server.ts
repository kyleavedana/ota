import 'dotenv/config';
import app from './index';
import config from './config';

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log(`listening on port ${config.port}`);
});
