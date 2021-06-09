import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import { config } from './config/default';
import { userRouter } from './routes/userRoute';

const app: Application = express();

const PORT = config.port;
const mongodbUri: string = config.mongodbUri!;

app.use('/users', userRouter);

async function start() {
	try {
		await mongoose.connect(mongodbUri, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});

		app.listen(PORT, () => {
			console.log(`server started at http://localhost:${PORT}`);
		});
	} catch (err) {
		console.log('ERROR:', err);
	}
}

start();
