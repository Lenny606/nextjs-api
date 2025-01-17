import mongoose from 'mongoose';

const MONGODB_URI : any = process.env.MONGODB_URI;

const connect = async () => {
    const connectionState = mongoose.connection.readyState;

    if (connectionState === 1) {
        console.log('Already connect ')
        return;
    }
    if (connectionState === 2) {
        console.log('Connecting...')
        return;
    }

    try {
        mongoose.connect(MONGODB_URI, {
            dbName: 'next-js-api',
            bufferCommands: true
        })
        console.log('Connected')
    } catch (err: any) {
        console.log('Error connecting: ', err)
        throw new Error("Error: ", err)
    }
};

export default connect;