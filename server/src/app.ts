import express from 'express';
import mongoose from 'mongoose';
import { config } from './config/default';
import { achievementRouter } from './routes/achievementRoute';
import { authRouter } from './routes/authRoute';
import { taskRouter } from './routes/taskRoute';

const app = express();

const PORT = config.port;
const mongodbUri: string = config.mongodbUri!;

app.use(express.json());

app.use('/api/auth', authRouter);
app.use('/api/tasks', taskRouter);
app.use('/api/achievements', achievementRouter);

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
