import chalk from 'chalk';

import app from './app';
import './config/setup';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    chalk.greenBright.bold(`Server is running on http://localhost:${PORT}`),
  );
});
