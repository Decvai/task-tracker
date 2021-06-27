import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/default';
import { achievementRouter } from './routes/achievement.route';
import { authRouter } from './routes/auth.route';
import { statusRouter } from './routes/statuse.route';
import { taskRouter } from './routes/task.route';

const app = express();

const PORT = config.port;
const mongodbUri: string = config.mongodbUri!;

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/achievements', achievementRouter);
app.use('/api/statuses', statusRouter);

async function start() {
	try {
		await mongoose.connect(mongodbUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		});
		app.listen(PORT, () => {
			console.log(`server started at http://localhost:${PORT}`);
		});
	} catch (err) {
		console.log('ERROR:', err);
	}
}

start();
